import { GiConsoleController } from "react-icons/gi";
import repeater from "./repeater/repeater"
import repeaterItem from "./repeater/repeaterItem";
import iframe from "./iframe/iframe";
import { blocks } from "./Blocks";
import { customSectors, customProperties } from "./CustomStyles";
import socialBar from "./socialBar/socialBar";
import socialLink from "./traits/socialLink";

const testImageUrls = [
  'https://i.ibb.co/ZWnZPqr/tiktok.png',
  'https://i.ibb.co/tm0rJ2c/youtube-1.png',
  'https://i.ibb.co/0BCsZKL/facebook-1.png',
  'https://i.ibb.co/XWvs3qw/instagram.png',
  'https://i.ibb.co/BCwkqfN/twitter.png',
  'https://i.ibb.co/8sL8mF4/linkedin.png',
  'https://i.ibb.co/XLK7HJx/image-5.png',
];

export const webBuilderPlugin = (editor) => {
  editor.DomComponents.addType('repeater-item', repeaterItem);
  editor.DomComponents.addType('repeater', repeater);
  editor.DomComponents.addType('iframe-element', iframe);
  editor.DomComponents.addType('social-bar', socialBar);

  editor.TraitManager.addType('social-link', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const socialList = component.props().socialList;
      const traitName = trait.get('name');
      let newName = '';
      let newUrl = '';
      let newImage = '';
      // Here we can decide to use properties from the trait
      // const traitOpts = trait.get('options') || [];
      // const options = traitOpts.length ? traitOpts : [
      //   { id: 'url', name: 'URL' },
      //   { id: 'email', name: 'Email' },
      // ];
  
      // Create a new element container and add some content
      const el = document.createElement('div');
      el.className = 'trait-social-bar';
      el.innerHTML = `<h6>Social links</h6>`;
  
      const containerElement = document.createElement('div');
      containerElement.className = 'trait-social-items-container';
      const socialItems = [];
      socialList.forEach((item, index) => {
        socialItems.push(`
          <div class="trait-social-link-item">
            <img id="link-img-id-${index}" class="trait-social-link-item-img" src=${item.image || "https://i.ibb.co/1Q0tjDs/image-7.png"} width="50" height="50"/>
            <div class="trait-social-link-item-detail">
              <input id="link-name-id-${index}" class="trait-social-link-name" type="text" placeholder="Insert link name" value="${item.name}"/>
              <input id="link-url-id-${index}" class="trait-social-link-url" type="url" placeholder="Insert link URL" value="${item.url}"/>
            </div>
            <button class="trait-social-link-delete"><i class="fa fa-trash"></i></button>
          </div>
        `);
      });
      containerElement.innerHTML = socialItems.join('');
  
      const newLinkElement = document.createElement('div');
      newLinkElement.className = 'trait-new-social';
      newLinkElement.innerHTML = `
        <div class="trait-new-social-label">New link</div>
        <div class="trait-new-social-link">
          <input class="trait-new-social-link__name" type="text" placeholder="Insert link name"/>
          <input class="trait-new-social-link__url" type="url" placeholder="Insert link URL"/>
          <input class="trait-new-social-link__icon" placeholder="Select icon" id="new-select-icon"/>
        </div>
        <button class="btn btn-primary mb-1 trait-new-social-link-add-btn">Add</button>
      `;
  
      el.appendChild(containerElement);
      el.appendChild(newLinkElement);
  
      // Let's make our content interactive
      const newLinkName = el.querySelector('.trait-new-social-link__name');
      const newLinkUrl = el.querySelector('.trait-new-social-link__url');
      const newLinkIcon = el.querySelector('.trait-new-social-link__icon');
      const btnAdd = el.querySelector('.trait-new-social-link-add-btn');

      newLinkName.addEventListener('change', ev => {
        newName = ev.target.value;
      })

      newLinkUrl.addEventListener('change', ev => {
        newUrl = ev.target.value;
      })

      const modalElement = document.createElement('div');
      modalElement.className = "select-image-modal";

      modalElement.innerHTML = `
        <div class="select-image-view-image">
          ${
            testImageUrls.map((imageUrl, idx) => {
              return (
                `<img class="select-image-item" src=${imageUrl} width="70" height="70"/>`
              );
            })
          }
        </div>
        <div class="select-image-upload-image">
          <input id="file-browser" type="file" class="upload-image-input" multiple hidden />
          <label for="file-browser" class="drop-file-panel mb-1">Drop files here or click to upload</label>
          <button class="btn btn-primary mb-1 mt-1 img-upload-btn">Upload</button>
        </div>
      `;

      modalElement.querySelector('.upload-image-input').addEventListener('change', (ev) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = ev.target.value;
        const uploadBtnElm = modalElement.querySelector('.img-upload-btn')
        modalElement.querySelector('.select-image-upload-image').insertBefore(tempElement, uploadBtnElm);
      });

      modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
        item.addEventListener('click', event => {
          const url = event.target.src;
          newImage = url;
          newLinkIcon.value = url;
          editor.Modal.close();
        })
      });

      newLinkIcon.addEventListener('focus', ev => {
        editor.Modal.open({
          title: 'Select new link Image', // string | HTMLElement
          content: modalElement, // string | HTMLElement
        });
      })
  
      el.querySelectorAll('.trait-social-link-delete').forEach((item, index) => {
        item.addEventListener('click', event => {
          //handle click
          const tempList = [...socialList];
          tempList.splice(index, 1);
          component.set(traitName, tempList);
        })
      })
  
      btnAdd.addEventListener('click', ev => {
        newLinkIcon.value = '';
        newLinkName.value = '';
        newLinkUrl.value = '';
        component.set(traitName, [
          ...component.props().socialList,
          {
            name: newName,
            url: newUrl,
            image: newImage,
            type: 'webaddress'
          }
        ]);
        newName = '';
        newUrl = '';
        newImage = '';
      })
  
      return el;
    },
  
    onEvent({ elInput, component, event }) {
      if (event.target.name) {
        const index = parseInt(event.target.id.split('-')[3], 10);
        const socialList = [...component.props().socialList];
        const itemToChange = socialList[index];
        socialList.splice(index, 1, {...itemToChange, [event.target.name]: event.target.value});
        component.set('socialList', socialList.slice(0, socialList.length));
      }
    },
  
    onUpdate({ elInput, component }) {
      const socialList = component.props().socialList;
      const itemsContainer = elInput.querySelector('.trait-social-items-container');
  
      while (itemsContainer.hasChildNodes()) {
        itemsContainer.removeChild(itemsContainer.firstChild);
      }
  
      const socialItems = [];
      socialList.forEach((item, index) => {
        socialItems.push(`
          <div class="trait-social-link-item">
            <img id="link-img-id-${index}" name="image" class="trait-social-link-item-img" src=${item.image || "https://i.ibb.co/1Q0tjDs/image-7.png"} width="50" height="50"/>
            <div class="trait-social-link-item-detail">
              <input id="link-name-id-${index}" name="name" class="trait-social-link-name" type="text" placeholder="Insert link name" value="${item.name}"/>
              <input id="link-url-id-${index}" name="url" class="trait-social-link-url" type="url" placeholder="Insert link URL" value="${item.url}"/>
            </div>
            <button class="trait-social-link-delete"><i class="fa fa-trash"></i></button>
          </div>
        `);
      });
      itemsContainer.innerHTML = socialItems.join('');
  
      itemsContainer.querySelectorAll('.trait-social-link-delete').forEach((item, index) => {
        item.addEventListener('click', event => {
          const tempList = [...socialList];
          tempList.splice(index, 1);
          component.set('socialList', tempList);
        })
      });

      let selectedItemIndex = -1;
      const modalElement = document.createElement('div');
      modalElement.className = "select-image-modal";

      modalElement.innerHTML = `
        <div class="select-image-view-image">
          ${
            testImageUrls.map((imageUrl, idx) => {
              return (
                `<img class="select-image-item" src=${imageUrl} width="70" height="70"/>`
              );
            })
          }
        </div>
        <div class="select-image-upload-image">
          <input id="file-browser" type="file" class="upload-image-input" multiple hidden />
          <label for="file-browser" class="drop-file-panel mb-1">Drop files here or click to upload</label>
          <button class="btn btn-primary mb-1 mt-1 img-upload-btn">Upload</button>
        </div>
      `;

      modalElement.querySelector('.upload-image-input').addEventListener('change', (ev) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = ev.target.value;
        const uploadBtnElm = modalElement.querySelector('.img-upload-btn')
        modalElement.querySelector('.select-image-upload-image').insertBefore(tempElement, uploadBtnElm);
      });

      modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
        item.addEventListener('click', event => {
          const url = event.target.src;
          const socialList = [...component.props().socialList];
          const itemToChange = socialList[selectedItemIndex];
          socialList.splice(selectedItemIndex, 1, {...itemToChange, image: url});
          component.set('socialList', socialList.slice(0, socialList.length));
          editor.Modal.close();
        })
      });
  
      itemsContainer.querySelectorAll('.trait-social-link-item-img').forEach((item, index) => {
        item.addEventListener('click', event => {
          selectedItemIndex = index;
          
          editor.Modal.open({
            title: 'Select Image', // string | HTMLElement
            content: modalElement, // string | HTMLElement
          });
        })
      });      
    },
  });


  blocks.forEach(block => {
    editor.Blocks.add(block.id, block);
  })

  customSectors.forEach(sector => {
    editor.StyleManager.addSector(sector.id, sector);
  })

  customProperties.forEach(property => {
    editor.StyleManager.addProperty(property.sector, property);
  })

  // editor.on(`block:drag:stop`, (component, block) => {
  //   if (component && component.isChildOf('repeater-item')) {
  //     const index = component.index();
  //     const parentElements = component.parents();
  //     const parentIndexes = [];
  //     let parentRepeater = null;
  //     for (let i = 0; i < parentElements.length; i++) {
  //       if (parentElements[i].get('type') === 'repeater') {
  //         parentRepeater = parentElements[i];
  //         break;
  //       }

  //       const tempIndex = parentElements[i].index();
  //       parentIndexes.splice(0, 0, tempIndex);
  //     }
  //     for (let i = 0; i < parentRepeater.components().length; i++) {
  //       if (i === parentIndexes[0]) continue;
  //       let tempCpt = parentRepeater.getChildAt(i);
  //       for (let j = 1; j < parentIndexes.length; j++) {
  //         tempCpt = tempCpt.getChildAt(parentIndexes[j]);
  //       }
  //       tempCpt.append(component.clone(), {at: index})
  //     }
  //   }
  // });

  editor.on(`canvas:drop`, (a, b) => {
    console.log('aaaaaaaaaaaaa------------', a, b)
  });

  editor.on(`component:update:numOfItems`, (model) => {
    if (model.get('type') === 'repeater') {
      const itemCmp = editor.getSelected().getLastChild();
      // const html = itemCmp.toHTML();
      // const css = editor.CodeManager.getCode(itemCmp, 'css', { cssc: editor.CssComposer });
      editor.getSelected().append(itemCmp.clone());
    }
  });

  editor.on(`style:property:update`, ({property, from, to}) => {
    const component = editor.getSelected();
    if (component?.isChildOf('repeater-item')) {
      const index = component.index();
      const changedStyle = {...component.getStyle(), ...property.getStyle()};
      const parentElements = component.parents();
      const parentIndexes = [];
      let parentRepeater = null;
      for (let i = 0; i < parentElements.length; i++) {
        if (parentElements[i].get('type') === 'repeater') {
          parentRepeater = parentElements[i];
          break;
        }

        const tempIndex = parentElements[i].index();
        parentIndexes.splice(0, 0, tempIndex);
      }

      for (let i = 0; i < parentRepeater.components().length; i++) {
        if (i === parentIndexes[0]) continue;
        let tempCpt = parentRepeater.getChildAt(i);
        for (let j = 1; j < parentIndexes.length; j++) {
          tempCpt = tempCpt.getChildAt(parentIndexes[j]);
        }
        tempCpt?.getChildAt(index)?.setStyle(changedStyle);
      }
    }

    if (component?.get('type') === 'repeater-item') {
      const changedStyle = {...component.getStyle(), ...property.getStyle()};
      const parentRepeater = component.parent();

      for (let i = 0; i < parentRepeater.components().length; i++) {
        parentRepeater.getChildAt(i).setStyle(changedStyle);
      }
    }
  });

  editor.on('run:core:component-delete:before', () => {
    const component = editor.getSelected();
    if (component && component.isChildOf('repeater-item')) {
      const index = component.index();
      const parentElements = component.parents();
      const parentIndexes = [];
      let parentRepeater = null;

      for (let i = 0; i < parentElements.length; i++) {
        if (parentElements[i].get('type') === 'repeater') {
          parentRepeater = parentElements[i];
          break;
        }

        const tempIndex = parentElements[i].index();
        parentIndexes.splice(0, 0, tempIndex);
      }

      for (let i = 0; i < parentRepeater.components().length; i++) {
        if (i === parentIndexes[0]) continue;
        let tempCpt = parentRepeater.getChildAt(i);
        for (let j = 1; j < parentIndexes.length; j++) {
          tempCpt = tempCpt.getChildAt(parentIndexes[j]);
        }
        if (tempCpt?.getChildAt(index)) {
          editor.selectAdd(tempCpt.getChildAt(index)); 
        }
      }
    }
  });
}