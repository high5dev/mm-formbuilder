import { GiConsoleController } from "react-icons/gi";
import repeater from "./repeater/repeater"
import repeaterItem from "./repeater/repeaterItem";
import gallery from './gallery/gallery';
import galleryItem from './gallery/galleryItem'
import { blocks } from "./Blocks";
import { customSectors, customProperties } from "./CustomStyles";

export const webBuilderPlugin = (editor) => {
  editor.DomComponents.addType('repeater-item', repeaterItem);
  editor.DomComponents.addType('repeater', repeater);
  editor.DomComponents.addType('gallery-item', galleryItem);
  editor.DomComponents.addType('gallery', gallery);
  editor.TraitManager.addType('image-url', {
    createInput({trait, component}){
      let _url;
      let selected_index;
      const trait_name=trait.get('name');
      const src=component.getAttributes().src;
      const gallery_list= [
        "https://i.ibb.co/S3sTCQY/image-large.png",
        "https://i.ibb.co/1qb5Kbs/image-large-1.png",
        "https://i.ibb.co/4VkNYMt/image-large.png",
        "https://i.ibb.co/RgdgdZK/image-fixed-width-1.png",
        "https://i.ibb.co/G3Cqdcp/1-1.png",
        "https://i.ibb.co/y0WGRGR/1-3.webp",
        "https://i.ibb.co/SQKpyVj/1-4.webp",
        "https://i.ibb.co/BCC4bWK/1-5.webp",
        
      ];  
      const newLinkElement = document.createElement('div');
      newLinkElement.className = 'trait-image-url';
      newLinkElement.innerHTML = `
        <input class="input-image-url" type="url" placeholder="Insert link URL" value=${src}>/>
        <button class="btn-primary trait-image-btn">...</button>`;
      const modalElement=document.createElement('div');
      modalElement.innerHTML=`
        <div class="gallery-image-list">
          ${
            gallery_list.map((url)=>{
              return(
                `<img class="select-image-item" src=${url} width="120" height="120"/>`
              )
            })
          }
        </div>
        <div class="gallery-view-footer d-flex justify-content-center">
          <div class="mx-3">
            <button id="select-btn" class="btn btn-primary">Ok</button>
          </div>
          <div class="mx-3">
           <button id="cancel-btn" class="btn btn-secondary">Cancel</button>
          </div>
        <div>
      `;
      newLinkElement.querySelector('.trait-image-btn').addEventListener('click', (ev)=>{
        editor.Modal.open({
          title: 'Select Gallery Image', 
          content: modalElement
        });
      });
      modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
        item.addEventListener('click', event => {
          _url=event.target.src;
          selected_index=index;
          newLinkElement.querySelector('.input-image-url').value=_url;
          for(let i=0; i<modalElement.querySelectorAll('.select-image-item').length; i++){
            const el=modalElement.querySelectorAll('.select-image-item')[i];
            if (selected_index===i){
              el.style.border="1px solid blue";
            }
            else{
              el.style.border="none";
            }
          }

        });
      });

      modalElement.querySelector('#select-btn').addEventListener('click', (ev)=>{
        if(_url){
          component.set(trait_name, _url);
          editor.Modal.close();
        }
      });
      modalElement.querySelector('#cancel-btn').addEventListener('click', (ev)=>{
        editor.Modal.close();
      });
      return newLinkElement;
    }
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

  editor.on(`block:drag:stop`, (component, block) => {
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
        tempCpt.append(component.clone(), {at: index})
      }
    }
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