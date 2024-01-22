import { GiConsoleController } from "react-icons/gi";
import repeater from "./repeater/repeater"
import repeaterItem from "./repeater/repeaterItem";
import gallery from './gallery/gallery';
import galleryItem from './gallery/galleryItem'
import iframe from "./iframe/iframe";
import { blocks } from "./Blocks";
import { customSectors, customProperties } from "./CustomStyles";
import * as api from '../../store/api';
import imageItem from "./image/image";
import socialBar from "./socialBar/socialBar";
import socialLink from "./traits/socialLink";
import linkButton from "../elements/button/button";
import postLarge from "../elements/blog/postlarge/postlarge";
import postCard from "../elements/blog/postcard/postcard";
import postSidebar from "../elements/blog/postsidebar/postsidebar";
import recentPost from "../elements/blog/recentpost/recentpost";
import categoryMenu from "../elements/blog/categorymenu/categorymenu";
import archiveMenu from "../elements/blog/archive/archive";
import yellowButton from "../elements/blog/rss/yellowButton";
import blackButton from "./blog/rss/blackButton";
import grayButton from "../elements/blog/rss/grayButton";
import blackoutlineButton from "./blog/rss/blackoutlineButton";
import grayoutlineButton from "../elements/blog/rss/grayoutlineButton";
import countDown from "./countdown/countdown";
import popup from "./popup/popup";
import gridproductgallery from "./gridproductgallery/gridproductgallery";
import sliderproductgallery from "./slideproductgallery/sliderproductgallery";
import relatedproducts from "./relatedproducts/relatedproducts";
import shoppingcart from "./shoppingcart/shoppingcart";
import addtocartbutton from "./addtocartbutton/addtocartbutton";
import currencyconverter from "./currencyconverter/currencyconverter";
import productItem from "./gridproductgallery/productItem";
import productpage from "./productpage/productpage";
import cartpage from "./cartpage/cartpage";
import thankyoupage from "./thankyoupage/thankyoupage";

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import menu from "./menu/menu";
import map from "./map/map";

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
  editor.DomComponents.addType('gallery-item', galleryItem);
  editor.DomComponents.addType('gallery', gallery);
  editor.DomComponents.addType('photo', imageItem);
  editor.DomComponents.addType('post-list-large', postLarge);
  editor.DomComponents.addType('post-card-large', postCard);
  editor.DomComponents.addType('post-list-sidebar', postSidebar);
  editor.DomComponents.addType('recent-post', recentPost);
  editor.DomComponents.addType('category-menu', categoryMenu);
  editor.DomComponents.addType('archive-menu', archiveMenu);
  editor.DomComponents.addType('rss-yellow-button', yellowButton);
  editor.DomComponents.addType('rss-black-button', blackButton);
  editor.DomComponents.addType('rss-gray-button', grayButton);
  editor.DomComponents.addType('rss-outline-black-button', blackoutlineButton);
  editor.DomComponents.addType('rss-outline-gray-button', grayoutlineButton);
  editor.DomComponents.addType('count-down', countDown);
  editor.DomComponents.addType('button', linkButton);
  editor.DomComponents.addType('popup', popup);
  editor.TraitManager.addType('image-url', {
    createInput({ trait, component }) {
      let image_url = "https://storage.googleapis.com/mymember-storage/my-manager/a4fbe6f0-192e-4c2a-bf03-7db291aafbd2-@fabbiyedev.png";
      let _url;
      let _id;
      let pageSize = 21;
      let pageNum = 2;
      let selected_index;
      const trait_name = trait.get('name');
      let images = component.get('images');
      let src='';
      const newLinkContainer=document.createElement('div');
      newLinkContainer.className ='image-url-container';
      const newLinkElement = document.createElement('div');
      newLinkElement.className = 'trait-image-url';
      newLinkElement.innerHTML = `
        <input id="input-image-url" type="url" placeholder="Insert link URL" value=${src}>/>
        <button class="btn-primary trait-image-btn">...</button>`;
      const newUploadElement=document.createElement('div');
      newUploadElement.className="upload-file-element";
      newUploadElement.innerHTML=`
      <div>
          <input type="file" id="file" name="file" class="upload-image-element"/>
      </div>
      `;
      document.querySelector('#trait-manager-container').append(newUploadElement);
      document.querySelector('.upload-image-element').addEventListener('change', function(e){
        const file=e.target.files[0];
        if(file){
          const formData = new FormData();
          formData.append("file", file);
          api.uploadFile(formData).then((res)=>{
            console.log('response', response)
            // newLinkElement.querySelector('#input-image-url').value = _url;
          })
        }
      })
      const modalElement = document.createElement('div');
      modalElement.innerHTML = `
        <div class="gallery-image-list">
          ${images && images.map((item) => {
        return (
          `<img class="select-image-item" id=${item.id} src=${item.url} width="110" height="110"/>`
        )
      }).join('')
        }
        </div>
        <div class="gallery-view-footer d-flex justify-content-between">
          <div class="">
            <button id="del-btn" class="btn btn btn-outline-danger">Delete</button>
          </div>
          <div class="d-flex">
            <div class="mx-3">
            <button id="select-btn" class="btn btn-primary">Ok</button>
            </div>
            <div class="mx-3">
               <button id="cancel-btn" class="btn btn-secondary">Cancel</button>
            </div>
          </div>
        <div>
      `;
      newLinkElement.querySelector('.trait-image-btn').addEventListener('click', (ev) => {
        editor.Modal.open({
          title: 'Select Gallery Image',
          content: modalElement
        });
      });

      const scrollElement = modalElement.querySelector(".gallery-image-list")
      scrollElement.addEventListener('scroll', (ev) => {
        if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
          const payload = {
            page: pageNum,
            pageSize
          }
          api.getImageFromMedia(payload).then((res) => {
            if (res.data) {
              pageNum += 1;
              const result = res.data;
              if (result.data) {
                let temp_images = images;
                for (let i = 0; i < result.data.length; i++) {
                  temp_images.push({ id: result.data[i]._id, url: result.data[i].image });
                };

                document.querySelector(".gallery-image-list").innerHTML =
                  temp_images && temp_images.map((item) => {
                    return (
                      `<img class="select-image-item" id=${item.id} src=${item.imageUrl} width="110" height="110"/>`
                    )
                  }).join('');
                modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
                  item.addEventListener('click', event => {
                    _url = event.target.src;
                    _id = event.target.id;
                    selected_index = index;
                    newLinkElement.querySelector('#input-image-url').value = _url;
                    for (let i = 0; i < modalElement.querySelectorAll('.select-image-item').length; i++) {
                      const el = modalElement.querySelectorAll('.select-image-item')[i];
                      if (selected_index === i) {
                        el.style.border = "2px solid blue";
                      }
                      else {
                        el.style.border = "none";
                      }
                    }
                  });
                });
                const parentElements = component.parents();
                let parentRepeater = null;
                for (let i = 0; i < parentElements.length; i++) {
                  if (parentElements[i].get('type') === 'gallery') {
                    parentRepeater = parentElements[i];
                    break;
                  }
                }
                for (let i = 0; i < parentRepeater.components().length; i++) {
                  parentRepeater.getChildAt(i).set('images', temp_images);
                }
              }
            }
          })
        }
      })
      modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
        item.addEventListener('click', event => {
          _url = event.target.src;
          _id = event.target.id;
          selected_index = index;
          newLinkElement.querySelector('#input-image-url').value = _url;
          for (let i = 0; i < modalElement.querySelectorAll('.select-image-item').length; i++) {
            const el = modalElement.querySelectorAll('.select-image-item')[i];
            if (selected_index === i) {
              el.style.border = "2px solid blue";
            }
            else {
              el.style.border = "none";
            }
          }
        });
      });
      modalElement.querySelector('#select-btn').addEventListener('click', (ev) => {
        if (_url) {
          component.set(trait_name, _url);
          editor.Modal.close();
        }
      });
      modalElement.querySelector('#del-btn').addEventListener('click', (ev) => {
        if (_id) {
          api.delImageFromLibrary(_id).then((res) => {
            const { data } = res;
            if (data.success) {
              let _images = images && images.filter((item) => item.id != _id);
              component.set('images', _images);
              document.getElementById(_id).remove();
              const parentElements = component.parents();
              let parentRepeater = null;
              for (let i = 0; i < parentElements.length; i++) {
                if (parentElements[i].get('type') === 'gallery') {
                  parentRepeater = parentElements[i];
                  break;
                }
              }
              for (let i = 0; i < parentRepeater.components().length; i++) {
                parentRepeater.getChildAt(i).set('images', _images);
              }
            }
          }
          )
        }
        else {
          editor.Modal.close();
        }
        // api.addToImageLibrary({image:image_url});
      });
      newLinkElement.querySelector('#input-image-url').addEventListener('change', (ev)=>{
        component.set(trait_name, ev.target.value);
      })
      document.querySelector('.upload-image-element').addEventListener('change', function(e){
        const file=e.target.files[0];
        if(file){
          const formData = new FormData();
          formData.append("file", file);
          api.uploadFile(formData).then((res)=>{
            if(res){
              const {data}=res;
              newLinkElement.querySelector('#input-image-url').value = data.data;
              if(data.data!=''){
                component.set(trait_name, data.data);
              }
              
            }
          })
        }
      })
      modalElement.querySelector('#cancel-btn').addEventListener('click', (ev) => {
        editor.Modal.close();
      });
      
      return newLinkElement;
    }
  });
  editor.DomComponents.addType('iframe-element', iframe);
  editor.DomComponents.addType('social-bar', socialBar);
  editor.DomComponents.addType('gridproductgallery', gridproductgallery);
  editor.DomComponents.addType('sliderproductgallery', sliderproductgallery);
  editor.DomComponents.addType('relatedproducts', relatedproducts);
  editor.DomComponents.addType('shoppingcart', shoppingcart);
  editor.DomComponents.addType('addtocartbutton', addtocartbutton);
  editor.DomComponents.addType('currency-converter', currencyconverter);
  editor.DomComponents.addType('product-item', productItem);
  editor.DomComponents.addType('productpage', productpage);
  editor.DomComponents.addType('cartpage', cartpage);
  editor.DomComponents.addType('thankyoupage', thankyoupage);
  editor.DomComponents.addType('map-location', map);
  editor.TraitManager.addType('social-link', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait, component }) {
      const traitName = trait.get('name');
      let newName = '';
      let newUrl = '';
      let newImage = '';
      let newIcon='';
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
     
      const socialList = component.props().socialList;
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

      newLinkIcon.addEventListener('change', ev => {
        newIcon=ev.target.value;
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
            icon:newIcon,
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
        socialList.splice(index, 1, { ...itemToChange, [event.target.name]: event.target.value });
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
            <div>
                <i id="link-img-id-${index}" name="image" class="fab ${item.icon}"></i>
            </div>
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
          ${testImageUrls.map((imageUrl, idx) => {
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
          socialList.splice(selectedItemIndex, 1, { ...itemToChange, image: url });
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

  editor.DomComponents.addType('menu', menu);
  editor.TraitManager.addType('menu',{
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait, component }) {
      const traitName = trait.get('name');
      let newName = '';
      let newUrl = '';
      let newImage = '';
      let subMainMenu='';
      let subPage='';
      let subName='';
      
      // Create a new element container and add some content
      const el = document.createElement('div');
      el.className = 'trait-menu';
      el.innerHTML = `<h6>Menu items</h6>`;

      const containerElement = document.createElement('div');
      containerElement.className = 'trait-menu-items-container';
     
      const menuItems = component.props().menus;
      subMainMenu=menuItems[0].name;
      let socialItemsStr = '';
      if(menuItems.length>0){
        for(let i=0; i<menuItems.length;i++){
          const item=menuItems[i];
          const subMenus=menuItems[i].subMenus;
          let subMenuStr='';
          if(subMenus.length>0){
            subMenus.map((_subMenu)=>{
              subMenuStr=subMenuStr+`<div class="trait-menu-item-link-item">
              <div class="subMenu-item">${_subMenu.name}</div>
              <button class="trait-submenu-item-link-delete"><i class="fa fa-trash"></i></button>
            </div>`
            });
          }
          socialItemsStr = socialItemsStr + `
          <div class="trait-menu-item-link-item">
            <div class="menu-item">${item.name}</div>
            <button class="trait-menu-item-link-delete"><i class="fa fa-trash"></i></button>
          </div>
        `;
        socialItemsStr=socialItemsStr+subMenuStr;
        }
      }
      containerElement.innerHTML = socialItemsStr;

      const newLinkElement = document.createElement('div');
      newLinkElement.className = 'trait-new-menu-item';
      newLinkElement.innerHTML = `
        <div class="trait-new-menu-item-label">New item</div>
        <div class="trait-new-menu-item-link">
          <input class="trait-new-menu-item-link__name" type="text" placeholder="Insert link name"/>
          <div class="trait-new-menu-item-pagelink"></div>
        </div>
        <button class="btn btn-primary mb-1 trait-new-menu-item-link-add-btn">Add</button>
      `;
      const subLinkElement=document.createElement('div');
      subLinkElement.innerHTML=`
        <div>
          <div class="submenu-label">
            New Sub Item
          </div>
          <div class="submenu-container">
            <div class="mainmenu-container">
               <label>Menu</label>
               <select class="trait-menu-selection">
                  ${menuItems && menuItems.map((_menuItem, i)=>{
                    return(
                      `<option value=${_menuItem.name}>
                        ${_menuItem.name}
                      </option>`
                    )
                  })}
               </select>
            </div>
            <div class="pages-container">
            </div>
            <div class="submenu-name-container">
              <label>Name</label>
              <input type="text" class="trait-submenu-name-element" placeholder="Insert submenu name">
            </div>
            <div class="submenu-btn-container">
              <button class="btn btn-primary mb-1 trait-submenu-add-btn">Add</button>
            </div>
          </div>
        </div>
      `;

      const link=window.location.href;
      const websiteId=link.split('/').slice(-1)[0];
      api.getWebBuilder(websiteId).then(res=>{
        if(res && res.data){
          const {formData, websiteData}=res.data.data;
          const pages=formData && formData.map((pageInfo)=>{
            return({
              label:pageInfo.name,
              value:'/website/'+websiteId+'/'+pageInfo.name
            })
          });
          subPage=pages[0].value;
          el.querySelector(".trait-new-menu-item-pagelink").innerHTML=
          `
            <select class="trait-menu-pages-selection">
              ${pages && pages.map((_page, i)=>{
                return(
                  `<option value=${_page.value}>
                    ${_page.label}
                  </option>`
                )
              })}
            </select>
          `;
          el.querySelector(".pages-container").innerHTML=
          `
          <label>Page</label>
          <select class="trait-submenu-page-selection">
              ${pages && pages.map((_page, i)=>{
                return(
                  `<option value=${_page.value}>
                    ${_page.label}
                  </option>`
                )
              })}
          </select>  
          `;
          el.querySelector('.trait-menu-pages-selection').addEventListener('change', (ev)=>{
            newUrl=ev.target.value;
          })
          el.querySelector('.trait-submenu-page-selection').addEventListener('change', (ev)=>{
            subPage=ev.target.value;
          })
        }
      })

      el.appendChild(containerElement);
      el.appendChild(newLinkElement);
      el.appendChild(subLinkElement);

      // Let's make our content interactive
      const newLinkName = el.querySelector('.trait-new-menu-item-link__name');
      const btnAdd = el.querySelector('.trait-new-menu-item-link-add-btn');
      const newMenu=el.querySelector('.trait-menu-selection');
      const newSubLink=el.querySelector('.trait-submenu-name-element');
      // const newSubBtn=el.querySelector('.trait-submenu-add-btn');
      // newSubBtn.addEventListener('click', ev=>{
      //   newSubLink.value='';
      //   let tempMenus=[...component.props().menus];
      //   if(tempMenus.length>0){
      //     tempMenus.map((_menu)=>{
      //       if(_menu.name===subMainMenu){
      //         _menu.subMenus.push({
      //           menu:subMainMenu,
      //           page:subPage,
      //           name:subName
      //         });
      //         return _menu
      //       }
      //       else{
      //         return _menu
      //       }
      //     })
      //   };
      //   console.log('tempMenus', tempMenus);
      //   component.set('menus', [
      //     ...tempMenus
      //   ]);
      //   subName='';
      // })
      newLinkName.addEventListener('change', ev => {
        newName = ev.target.value;
      })

      el.querySelectorAll('.trait-menu-item-link-delete').forEach((item, index) => {
        item.addEventListener('click', event => {
          //handle click
          const tempList = [...menuItems];
          tempList.splice(index, 1);
          component.set(traitName, tempList);
        })
      })

      newMenu.addEventListener('change', ev=>{
        subMainMenu=ev.target.value;
      })

      newSubLink.addEventListener('change', ev=>{
        subName=ev.target.value;
        console.log('subName============', subName)
      })


      btnAdd.addEventListener('click', ev => {
        newLinkName.value = '';
        component.set(traitName, [
          ...component.props().menus,
          {
            name: newName,
            pageLink: newUrl,
            isActive:false,
            subMenus:[]
          }
        ]);
        newName = '';
        newUrl = '';
      })

      // newSubBtn.addEventListener('click', ev=>{
      //   newSubLink.value='';
      //   let tempMenus=[...component.props().menus];
      //   console.log('tempMenus', tempMenus);
      //   if(tempMenus.length>0){
      //     tempMenus.map((_menu)=>{
      //       if(_menu.name===subMainMenu){
      //         _menu.subMenus.push({
      //           menu:subMainMenu,
      //           page:subPage,
      //           name:subName
      //         });
      //         return _menu
      //       }
      //       else{
      //         return _menu
      //       }
      //     })
      //   };
      //   component.set(traitName, [
      //     ...tempMenus
      //   ]);
      //   subName='';
      // })


      return el;
    },

    onEvent({ elInput, component, event }) {
      if (event.target.name) {
        const index = parseInt(event.target.id.split('-')[3], 10);
        const menus = [...component.props().menus];
        const itemToChange = menus[index];
        menus.splice(index, 1, { ...itemToChange, [event.target.name]: event.target.value });
        component.set('menus', menus.slice(0, socialList.length));
      }
    },

    onUpdate({ elInput, component }) {
      let subMainMenu='';
      let subPage='';
      let subName='';
      const menuItems = [...component.props().menus];
      const link=window.location.href;
      const websiteId=link.split('/').slice(-1)[0];
      api.getWebBuilder(websiteId).then(res=>{
        if(res && res.data){
          const {formData, websiteData}=res.data.data;
          const pages=formData && formData.map((pageInfo)=>{
            return({
              label:pageInfo.name,
              value:'/website/'+websiteId+'/'+pageInfo.name
            })
          });
          subPage=pages[0].value;
        }
      })
      const itemsContainer = elInput.querySelector('.trait-menu-items-container');
      const menuContainer=elInput.querySelector('.mainmenu-container');
      const newSubLink=elInput.querySelector('.trait-submenu-name-element');
      while (itemsContainer.hasChildNodes()) {
        itemsContainer.removeChild(itemsContainer.firstChild);
      }
      while(menuContainer.hasChildNodes()){
        menuContainer.removeChild(menuContainer.firstChild);
      }

      let socialItemsStr = '';
      if(menuItems.length>0){
        for(let i=0; i<menuItems.length;i++){
          const item=menuItems[i];
          const subMenus=menuItems[i].subMenus;
          let subMenuStr='';
          if(subMenus.length>0){
            subMenus.map((_subMenu)=>{
              subMenuStr=subMenuStr+`<div class="trait-menu-item-link-item">
              <div class="subMenu-item">${_subMenu.name}</div>
            </div>`
            });
          }
          socialItemsStr = socialItemsStr + `
          <div class="trait-menu-item-link-item">
            <div class="menu-item">${item.name}</div>
            <button class="trait-menu-item-link-delete"><i class="fa fa-trash"></i></button>
          </div>
        `;
        socialItemsStr=socialItemsStr+subMenuStr;
        }
      }
      itemsContainer.innerHTML = socialItemsStr;
      itemsContainer.querySelectorAll('.trait-menu-item-link-delete').forEach((item, index) => {
        item.addEventListener('click', event => {
          //handle click
          const tempList = [...menuItems];
          tempList.splice(index, 1);
          component.set('menus', tempList);
        })
      })
      let menuStr='<label>Menu</label>';
      let selectStr='';
      menuItems.forEach((_item, index) => {
        selectStr = selectStr + `
        <option value=${_item.name}>
                ${_item.name}
          </option>
        `;
      });
      menuStr+=`<select class="trait-menu-selection">${selectStr}</select>`
      menuContainer.innerHTML=menuStr;
      newSubLink.addEventListener('change', (ev)=>{
        subName = ev.target.value;
      });
      elInput.querySelector('.trait-menu-selection').addEventListener('change', (ev)=>{
        subMainMenu=ev.target.value;
      });
      const newSubBtn=elInput.querySelector('.trait-submenu-add-btn');
      newSubBtn.addEventListener('click', ev=>{
        newSubLink.value='';
        let tempMenus=[...component.props().menus];
        let tempSubMenus=[...component.props().subMenus];
        if(tempMenus.length>0){
          tempMenus.map((_menu)=>{
            if(_menu.name===subMainMenu){
              if(_menu.subMenus && _menu.subMenus.length>0){
                const duplicateSubMenu=_menu.subMenus.filter((_subMenu)=>_subMenu.name===subName);
                if(duplicateSubMenu.length>0){
                  console.log('duplicated')
                }
                else{
                  _menu.subMenus.push({
                    menu:subMainMenu,
                    page:subPage,
                    name:subName
                  });
                  tempSubMenus.push(subName);
                }
              }
              else{
                _menu.subMenus.push({
                  menu:subMainMenu,
                  page:subPage,
                  name:subName
                });
                tempSubMenus.push(subName);
            }
              return {..._menu}
            }
            else{
              return _menu
            }
          })
        };
        component.set('menus', [
          ...tempMenus
        ]);
        component.set('subMenus', [
          ...tempSubMenus
        ]);
        subName='';
        socialItemsStr='';
        const itemsContainer = elInput.querySelector('.trait-menu-items-container');
        while (itemsContainer.hasChildNodes()) {
          itemsContainer.removeChild(itemsContainer.firstChild);
        }
        if(tempMenus.length>0){
          for(let i=0; i<tempMenus.length;i++){
            const item=tempMenus[i];
            const subMenus=tempMenus[i].subMenus;
            let subMenuStr='';
            if(subMenus.length>0){
              subMenus.map((_subMenu)=>{
                subMenuStr=subMenuStr+`<div class="trait-menu-item-link-item">
                <div class="subMenu-item">${_subMenu.name}</div>
              </div>`
              });
            }
            socialItemsStr = socialItemsStr + `
            <div class="trait-menu-item-link-item">
              <div class="menu-item">${item.name}</div>
              <button class="trait-menu-item-link-delete"><i class="fa fa-trash"></i></button>
            </div>
          `;
          socialItemsStr=socialItemsStr+subMenuStr;
          }
        }
        itemsContainer.innerHTML = socialItemsStr;
        itemsContainer.querySelectorAll('.trait-menu-item-link-delete').forEach((item, index) => {
          item.addEventListener('click', event => {
            //handle click
            const tempList = [...menuItems];
            tempList.splice(index, 1);
            component.set('menus', tempList);
          })
        })
      })
    },
  })

  editor.TraitManager.addType('date', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const time = component.props()[traitName];
      
      const el = document.createElement('div');
      el.className = 'trait-date';
      el.innerHTML = `<h6>${traitLabel}</h6>`;
  
      const startElement = document.createElement('div');
      startElement.className = 'trait-date-flatpicker';
      
      const flatpickrElStart = document.createElement('input');
      flatpickrElStart.className = 'flatpickr-input'
      flatpickr(flatpickrElStart, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
      });
      flatpickrElStart.value = time;
  
      startElement.appendChild(flatpickrElStart);
      el.appendChild(startElement);

      flatpickrElStart.addEventListener('input', e=> {
        component.set(traitName, e.target.value);
      })
  
      return el;
    },
  });

  editor.TraitManager.addType('popup-cycle', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitLabel = trait.get('label');
      const el = document.createElement('div');
      el.className = 'trait-popup-cycle';
      const cycleDetailContainer = document.createElement('div');
      cycleDetailContainer.className = 'cycle-details';
      el.appendChild(cycleDetailContainer);
      return el;
    },
    onUpdate({elInput, component}) {
      const cycleDetailContainer = elInput.querySelector('.cycle-details');
      const cycleDetails = component.props().cycleDetails;
      let tempHtmlStr = '';
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if ('afterSeconds' in cycleDetails) {
        tempHtmlStr += `
          <div class="d-flex align-items-center">
            <h6 class="mb-0">After Seconds</h6>
            <input class="popup-trait-afterseconds border border-secondary" type="number"  style="border-radius: 3px;" value="${cycleDetails.afterSeconds}" />
          </div>
        `;
      }
      if ('days' in cycleDetails) {
        tempHtmlStr += `<h6>Days</h6><div class="d-flex flex-wrap mb-1">`;
        days.map(d => {
          tempHtmlStr += `
            <div class="form-check me-1">
              <input class="form-check-input border-primary trait-popup-day" name="${d}" ${cycleDetails.days.indexOf(d) !== -1 && 'checked'} style="width: 20px; height: 20px; margin-right: 5px;" type="checkbox" value="" id="trait-check-${d}">
              <label class="form-check-label trait-popup-day-label" for="trait-check-${d}">
                ${d}
              </label>
            </div>
          `;
        })
        tempHtmlStr += `</div>`;
      }
      if ('dates' in cycleDetails) {
        tempHtmlStr += `
          <div class="d-flex align-items-center mb-1">
            <h6 class="mb-0">Dates</h6>
            <input class="popup-trait-dates border border-secondary ms-1" type="text" style="border-radius: 3px;" value="${cycleDetails.dates}" />
          </div>
        `;
      }
      
      cycleDetailContainer.innerHTML = tempHtmlStr;
      if ('time' in cycleDetails) {
        const timeLabelEl = document.createElement('h6');
        timeLabelEl.innerText = 'Time';
        timeLabelEl.className = 'mb-0';
        const timeElement = document.createElement('div');
        timeElement.className = 'trait-date-flatpicker d-flex align-items-center';
        timeElement.appendChild(timeLabelEl);
        const flatpickrEl = document.createElement('input');
        flatpickrEl.className = 'flatpickr-input ms-1'
        flatpickr(flatpickrEl, {
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          time_24hr: true
        });
        flatpickrEl.value = cycleDetails.time;
    
        timeElement.appendChild(flatpickrEl);
        cycleDetailContainer.appendChild(timeElement);

        flatpickrEl.addEventListener('change', e => {
          component.set('cycleDetails', {...cycleDetails, time: e.target.value});
        });
      }
      elInput.appendChild(cycleDetailContainer);

      const afterSecondsEl = elInput.querySelector('.popup-trait-afterseconds');
      const dayEls = elInput.getElementsByClassName('trait-popup-day');
      const datesEl = elInput.querySelector('.popup-trait-dates');

      afterSecondsEl?.addEventListener('change', e => {
        component.set('cycleDetails', {...cycleDetails, afterSeconds: e.target.value});
      });

      for (let i=0; i<dayEls.length; i++) {
        dayEls[i].addEventListener('click', e => {
          console.log(e.target.checked, e.target.name);
          const tempDays = [...cycleDetails.days];
          if (!e.target.checked) {
            const index = days.indexOf(e.target.name);
            tempDays.splice(index, 1);
          } else {
            tempDays.push(e.target.name);
          }
          component.set('cycleDetails', {...cycleDetails, days: tempDays});
        });
      }

      datesEl?.addEventListener('change', e => {
        component.set('cycleDetails', {...cycleDetails, dates: e.target.value});
      });
    }
  });

  editor.TraitManager.addType('count-down-view-items', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const viewItems = component.props()[traitName];
      
      const el = document.createElement('div');
      el.className = 'trait-count-down-items';

      el.innerHTML = `
        <h6>${traitLabel}</h6>
        <div class="form-check d-flex align-items-center">
          <input class="form-check-input border-primary me-1" type="checkbox" value="" id="dayCheck" style="width: 20px; height: 20px" ${viewItems.days && 'checked'}>
          <label class="form-check-label" for="dayCheck">
            Days
          </label>
        </div>
        <div class="form-check d-flex align-items-center">
          <input class="form-check-input border-primary me-1" type="checkbox" value="" id="hourCheck" style="width: 20px; height: 20px" ${viewItems.hours && 'checked'}>
          <label class="form-check-label" for="hourCheck">
            Hours
          </label>
        </div>
        <div class="form-check d-flex align-items-center">
          <input class="form-check-input border-primary me-1" type="checkbox" value="" id="minCheck" style="width: 20px; height: 20px" ${viewItems.mins && 'checked'}>
          <label class="form-check-label" for="minCheck">
            Minutes
          </label>
        </div>
        <div class="form-check d-flex align-items-center">
          <input class="form-check-input border-primary me-1" type="checkbox" value="" id="secCheck" style="width: 20px; height: 20px" ${viewItems.secs && 'checked'}>
          <label class="form-check-label" for="secCheck">
            Seconds
          </label>
        </div>`;

      return el;
    },
    onUpdate({elInput, component}) {
      const viewItems = component.props().viewItems;
      const dayEl = elInput.querySelector('#dayCheck');
      dayEl.addEventListener('click', e => {
        if (e.target.checked) {
          component.set('viewItems', {...viewItems, days: true});
        } else {
          component.set('viewItems', {...viewItems, days: false});
        } 
      })

      const hourEl = elInput.querySelector('#hourCheck');
      hourEl.addEventListener('click', e => {
        if (e.target.checked) {
          component.set('viewItems', {...viewItems, hours: true});
        } else {
          component.set('viewItems', {...viewItems, hours: false});
        } 
      })

      const minEl = elInput.querySelector('#minCheck');
      minEl.addEventListener('click', e => {
        if (e.target.checked) {
          component.set('viewItems', {...viewItems, mins: true});
        } else {
          component.set('viewItems', {...viewItems, mins: false});
        } 
      })

      const secEl = elInput.querySelector('#secCheck');
      secEl.addEventListener('click', e => {
        if (e.target.checked) {
          component.set('viewItems', {...viewItems, secs: true});
        } else {
          component.set('viewItems', {...viewItems, secs: false});
        } 
      })
    }
  });

  editor.TraitManager.addType('count-down-rules', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const rules = component.props()[traitName];
      
      const el = document.createElement('div');
      el.className = 'trait-count-down-rules';
      el.innerHTML = `
        <h6>${traitLabel}</h6>
        <div class="form-check d-flex align-items-center">
          <input class="form-check-input border-primary me-1" type="radio" name="flexRadioDefault" id="hideCountDown"  style="width: 15px; height: 15px" ${rules.hideCountDown && 'checked'}>
          <label class="form-check-label" for="hideCountDown">
            Hide countdown
          </label>
        </div>
        <div class="form-check d-flex align-items-center">
          <input class="form-check-input border-primary me-1" type="radio" name="flexRadioDefault" id="closeForm"  style="width: 15px; height: 15px" ${rules.closeForm && 'checked'}>
          <label class="form-check-label" for="closeForm">
            Close form
          </label>
        </div>
      `;

      // el.innerHTML = `
      //   <h6>${traitLabel}</h6>
      //   <div class="form-check d-flex align-items-center">
      //     <input class="form-check-input border-primary me-1" type="radio" name="flexRadioDefault" id="hideCountDown"  style="width: 15px; height: 15px" ${rules.hideCountDown && 'checked'}>
      //     <label class="form-check-label" for="hideCountDown">
      //       Hide countdown
      //     </label>
      //   </div>
      //   <div class="form-check d-flex align-items-center">
      //     <input class="form-check-input border-primary me-1" type="radio" name="flexRadioDefault" id="closeForm"  style="width: 15px; height: 15px" ${rules.closeForm && 'checked'}>
      //     <label class="form-check-label" for="closeForm">
      //       Close form
      //     </label>
      //   </div>
      //   <div class="form-check d-flex align-items-center">
      //     <input class="form-check-input border-primary me-1" type="radio" name="flexRadioDefault" id="hidePage"  style="width: 15px; height: 15px" ${rules.hidePage && 'checked'}>
      //     <label class="form-check-label" for="hidePage">
      //       Hide page
      //     </label>
      //   </div>
      //   <div class="form-check d-flex align-items-center">
      //     <input class="form-check-input border-primary me-1" type="radio" name="flexRadioDefault" id="showOtherPage"  style="width: 15px; height: 15px" ${rules.showOtherPage && 'checked'}>
      //     <label class="form-check-label" for="showOtherPage">
      //       Show other page
      //     </label>
      //   </div>
      //   <div class="form-check d-flex align-items-center">
      //     <input class="form-check-input border-primary me-1" type="radio" name="flexRadioDefault" id="showOtherElement"  style="width: 15px; height: 15px" ${rules.showOtherElement && 'checked'}>
      //     <label class="form-check-label" for="showOtherElement">
      //       Show other element
      //     </label>
      //   </div>
      // `;

      return el;
    },
    onUpdate({elInput, component}) {
      const viewItems = component.props().viewItems;
      const hideCountDownEl = elInput.querySelector('#hideCountDown');
      hideCountDownEl.addEventListener('click', e => {
        component.set('rules', {
          hideCountDown: true,
          closeForm: false,
          hidePage: false,
          showOtherPage: false,
          showOtherElement: false,
        });
      })

      const closeFormEl = elInput.querySelector('#closeForm');
      closeFormEl.addEventListener('click', e => {
        component.set('rules', {
          hideCountDown: false,
          closeForm: true,
          hidePage: false,
          showOtherPage: false,
          showOtherElement: false,
        });
      })

      // const hidePageEl = elInput.querySelector('#hidePage');
      // hidePageEl.addEventListener('click', e => {
      //   component.set('rules', {
      //     hideCountDown: false,
      //     closeForm: false,
      //     hidePage: true,
      //     showOtherPage: false,
      //     showOtherElement: false,
      //   });
      // })

      // const showOtherPageEl = elInput.querySelector('#showOtherPage');
      // showOtherPageEl.addEventListener('click', e => {
      //   component.set('rules', {
      //     hideCountDown: false,
      //     closeForm: false,
      //     hidePage: false,
      //     showOtherPage: true,
      //     showOtherElement: false,
      //   });
      // })

      // const showOtherElementEl = elInput.querySelector('#showOtherElement');
      // showOtherElementEl.addEventListener('click', e => {
      //   component.set('rules', {
      //     hideCountDown: false,
      //     closeForm: false,
      //     hidePage: false,
      //     showOtherPage: false,
      //     showOtherElement: true,
      //   });
      // })
    }
  });

  editor.TraitManager.addType('page-link', {
    noLabel: true,
    createInput({trait, component}) { 
      let elProp=component.get('elProps')[0];
      const el = document.createElement('div');
      el.className = 'trait-link-element-container';
      const link=window.location.href;
      const websiteId=link.split('/').slice(-1)[0];
      el.innerHTML = `
            <div>
                <label>Label</label>
                <input type="text" class="trait-link-element-label" value=${elProp.label}>
            </div>
            <div>
              <label>Link Setting</label>
              <select id='trait-page-setting' class='trait-page-setting'>
                <option value='button'>Button</option>
                <option value='external link'>External Link</option>
                <option value='pages'>Pages</option>
                <option value='mail'>Email</option>
                <option value='phone'>Call</option>
              </select>
            </div>
            <div>
              <label>Type</label>
              <select id='trait-button-selection' class='trait-button-selection'>
                  <option value='primary'>Primary</option>
                  <option value='secondary'>Secondary</option>
              </select>
            </div>
            <div class='trait-pages'>
            </div>
            <div class="trait-tab-selection-container">
              <label>Position</label>
              <select id='trait-tab-selection' class='trait-tab-selection'>
                  <option value='none'>New Tab</option>
                  <option value='_parent'>Current Tab</option>
              </select>
            </div>
            <div class="trait-input-address-container">
              <label>URL</label>
              <input type='text' class='trait-input-address' placeholder="please input link information"/>
            </div>
            <div>
                <label>Icon</label>
                <select id='trait-icon-selection' class='fa trait-icon-selection'>
                   <option class="fa" value='None'>None</option>
                   <option class="fa" value='fa fa-search'>&#xf002 Search</option>
                   <option class="fa" value='fa fa-angle-down'>&#xf107 Down</option>
                   <option class="fa" value='fa fa-angle-left'>&#xf104 Left</option>
                   <option class="fa" value='fa fa-angle-right'>&#xf105 Right</option>
                   <option class="fa" value='fa fa-angle-up'>&#xf106 Up</option>
                   <option class="fa" value='fa fa-redo'>&#xf01e Redo</option>
                </select>
            </div>
            <div>
              <label>Icon Direction</label>
              <select id='trait-direction-selection' class='fa trait-direction-selection'>
                <option class="fa" value='fa-roate-0'>None</option>
                <option class="fa" value='fa-rotate-90'>90</option>
                <option class="fa" value='fa-rotate-180'>180</option>
                <option class="fa" value='fa-rotate-180'>270</option>
              </select>
            </div>
      `;
      el.querySelector('.trait-link-element-label').addEventListener('change', (ev)=>{
        let tempElProps=[];
        const label=ev.target.value;
        elProp={...elProp, label:label};
        tempElProps.push(elProp);
        component.set('elProps', tempElProps);
      })
      el.querySelector('.trait-page-setting').addEventListener('change', (ev)=>{
        if(ev.target.value==='pages'){
          api.getWebBuilder(websiteId).then(res=>{
            if(res && res.data){
              const {formData, websiteData}=res.data.data;
              const pages=formData && formData.map((pageInfo)=>{
                return({
                  label:pageInfo.name,
                  value:'/'+websiteId+'/'+pageInfo.name
                })
              });
              el.querySelector(".trait-pages").innerHTML=
              `
                <select class="trait-menu-pages-selection">
                  ${pages && pages.map((_page, i)=>{
                    return(
                      `<option value=${_page.value}>
                        ${_page.label}
                      </option>`
                    )
                  })}
                </select>
              `;
              let tempElProps=[];
              const url=pages[0].value;
              elProp={...elProp, linkType:'pages', Url:url};
              tempElProps.push(elProp);
              component.set('elProps', tempElProps);
              el.querySelector('.trait-pages-selection').addEventListener('change', (ev)=>{
                let tempElProps=[];
                const url=ev.target.value;
                elProp={...elProp, Url:url};
                tempElProps.push(elProp);
                component.set('elProps', tempElProps);
              })
              el.querySelector('.trait-input-address-container').style.display='none';
            }
          })
        }
        else{
          if(ev.target.value==='external link'){
            el.querySelector('.trait-input-address').placeholder='ex:https://mymanager.com';
          }
          else if(ev.target.value ==='phone'){
            el.querySelector('.trait-input-address').placeholder='ex:111-111-111';
          }
          else if(ev.target.value==='mail'){
            el.querySelector('.trait-input-address').placeholder='ex:superadmin@outlook.com';
          }
          el.querySelector('.trait-input-address-container').style.display='block';
          el.querySelector(".trait-pages").innerHTML=``;
          let tempElProps = [];
          const value=ev.target.value;
          elProp={...elProp, linkType:value, Url:''};
          tempElProps.push(elProp);
          component.set('elProps', tempElProps);
        }
        if(ev.target.value==='button'){
          el.querySelector('.trait-input-address-container').style.display='none';
          el.querySelector('.trait-tab-selection-container').style.display='none';
        }
        else{
          el.querySelector('.trait-tab-selection-container').style.display='block';
        }
      });
      el.querySelector('.trait-tab-selection').addEventListener('change', (ev)=>{
        let tempElProps=[];
        const value=ev.target.value;
        elProp={...elProp, tab:value};
        tempElProps.push(elProp);
        component.set('elProps', tempElProps);
      });
      el.querySelector('.trait-icon-selection').addEventListener('change', (ev)=>{
        let tempElProps=[];
        const value=ev.target.value;
        elProp={...elProp, icon:value};
        tempElProps.push(elProp);
        component.set('elProps', tempElProps);
      });
      el.querySelector('.trait-direction-selection').addEventListener('change', (ev)=>{
        let tempElProps=[];
        const value=ev.target.value;
        elProp={...elProp, iconDirection:value};
        tempElProps.push(elProp);
        component.set('elProps', tempElProps);
      });
      el.querySelector('.trait-button-selection').addEventListener('change', (ev)=>{
        let tempElProps=[];
        const value=ev.target.value;
        elProp={...elProp, theme:value};
        tempElProps.push(elProp);
        component.set('elProps', tempElProps);
      });
      el.querySelector('.trait-input-address').addEventListener('change', (ev)=>{
        let tempElProps=[];
        const url=ev.target.value;
        elProp={...elProp, Url:url};
        tempElProps.push(elProp);
        component.set('elProps', tempElProps);
      })
      return el;
    },

  })

  editor.TraitManager.addType('gallery-show-items', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const products = component.props()["products"];
      const selectedFields = component.props()['fieldnames'].split(",");
      let showItems = "";
      products.fields.forEach((field, idx) => {
        let checked = false;
        selectedFields.forEach((selectedField) => {
          if(selectedField == field.name) checked = true;
        })
        if(checked) {
          showItems += `<div class="d-flex mt-1">
            <input id="field${idx}" name="${field.name}" type="checkbox" class="me-1 border-primary form-check-input" checked=${checked} style="width:17.98px">
            <label for="field${idx}">${field.name}</label></div>`;
        } else {
          showItems += `<div class="d-flex mt-1">
            <input id="field${idx}" name="${field.name}" type="checkbox" class="me-1 border-primary form-check-input" style="width:17.98px">
            <label for="field${idx}">${field.name}</label></div>`;
        }
      })
      const el = document.createElement('div');

      el.className = 'gallery-show-items';

      el.innerHTML = `
        <h6>${traitLabel}</h6>
        ${showItems}
        `;

      return el;
    },
    onUpdate({elInput, component}) {
      const fieldnames = component.props().fieldnames;
      let checkedFields = [];
      const fields = elInput.querySelectorAll('[id^="field"]');
      fields.forEach(checkbox => {
        // Check if the checkbox is checked
        checkbox.addEventListener('change', function() {
          
          fields.forEach(field => {
            if (field.checked) {
              // Log the 'name' attribute of the checkbox
              checkedFields.push(field.name);
            }
          });
          component.set('fieldnames', checkedFields.join());
          checkedFields = [];
        })
        
      });
    }
  });

  editor.TraitManager.addType('gallery-image-hover-effect', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const hoverEffect = component.props()["hovereffect"];
      const el = document.createElement('div');

      el.className = 'gallery-image-hover-effect mt-2';

      let content = `
        <div class="mt-1 d-grid hover-list">
          <div
          class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          >
            <div class="${'item-bg' + (hoverEffect === 'Nothing' ? ' selected' : '')}" name="Nothing">
              <svg viewBox="0 0 70 70" fill="currentColor" width="70" height="70" color="#ee5951">
                <path d="M0 0 H70 V70 H0 Z" fill="none"></path>
                <path d="M0 70 L70 0" stroke="currentColor" stroke-width="2"></path>
              </svg>
            </div>
            <div class="mt-1 text-nowrap d-flex justify-content-center">Nothing</div>
          </div>
          <div
            class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          >
            <div class="${'item-bg' + (hoverEffect === 'Swap' ? ' selected' : '')}" name="Swap">
              <svg viewBox="0 0 72 72" fill="currentColor" width="72" height="72">
                <g class="Thumbnail_Store Galleries_Hover_Swap image_Selected">
                  <path
                    fill="#80b1ff"
                    d="M17 26h22c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H17c-1.1 0-2-.9-2-2V28c0-1.1.9-2 2-2zm28-6H23c-1.1 0-2 .9-2 2v2h18c2.21 0 4 1.79 4 4v14h2c1.1 0 2-.9 2-2V22c0-1.1-.9-2-2-2z"
                    class="illus-clr-1"
                  ></path>
                  <path
                    fill="#e7f0ff"
                    d="M35.57 41h-15c-.81 0-1.28-.85-.81-1.47l3.17-4.14c.36-.47 1.08-.52 1.51-.12l2.49 2.33 2.89-4.17c.38-.55 1.21-.58 1.63-.06l4.91 6.07c.51.63.04 1.56-.79 1.56z"
                    class="illus-clr-3"
                  ></path>
                  <path
                    fill="#116dff"
                    d="M60.05 32.96v10c0 1.65-1.35 3-3 3h-9v-2h9c.55 0 1-.45 1-1v-10c0-.55-.45-1-1-1h-3.72l2.16 2.16-1.41 1.41-4.64-4.64 4.64-4.64 1.41 1.41-2.3 2.3h3.86c1.65 0 3 1.35 3 3z"
                    class="illus-clr-2"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="mt-1 text-nowrap d-flex justify-content-center">Swap image</div>
          </div>
          <div
            class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
          >
            <div class="${'item-bg' + (hoverEffect === 'Zoom' ? ' selected' : '')}" name="Zoom">
              <svg viewBox="0 0 72 72" fill="currentColor" width="72" height="72">
                <g class="Thumbnail_Store Galleries_Hover_Zoom_Selected">
                  <path
                    fill="#80b1ff"
                    d="M26 25h22c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H26c-1.1 0-2-.9-2-2V27c0-1.1.9-2 2-2z"
                    class="illus-clr-1"
                  ></path>
                  <path
                    fill="#e7f0ff"
                    d="M44.57 40h-15c-.81 0-1.28-.85-.81-1.47l3.17-4.14c.36-.47 1.08-.52 1.51-.12l2.49 2.33 2.89-4.17c.38-.55 1.21-.58 1.63-.06l4.91 6.07c.51.63.04 1.56-.79 1.56z"
                    class="illus-clr-3"
                  ></path>
                  <path
                    fill="#116dff"
                    d="M23.76 48.66l-3.29 3.29h2.59v2h-6v-6h2v2.59l3.29-3.29 1.41 1.41zm27.29-30.71v2h2.59l-3.29 3.29 1.41 1.41 3.29-3.29v2.59h2v-6h-6z"
                    class="illus-clr-2"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="mt-1 text-nowrap d-flex justify-content-center">Zoom</div>
          </div>
        </div>
        `;
      el.innerHTML = `
            <h6>${traitLabel}</h6>
            ${content}
            `
      return el;
    },
    onUpdate({ elInput, component }) {
      const items = elInput.querySelectorAll('.item-bg');
      items.forEach(item => {
        item.addEventListener('click', function () {
          console.log('Item clicked:', this);
          component.set('hovereffect', this.getAttribute("name"));
          items.forEach(it => {
            it.classList.remove('selected');
          });
          item.classList.add("selected");
          // Add your click event logic here
        });
      });
    }
  });

  editor.TraitManager.addType('gallery-show-cart-button', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const hoverEffect = component.props()["hovereffect"];
      const el = document.createElement('div');

      el.className = 'gallery-show-cart-button mt-2';
      el.innerHTML = `
            <h6>${traitLabel}</h6>
            <div class="mt-1 d-flex justify-content-between align-items-center">
              <div>Show button</div>
              <input type="checkbox" class="me-3 border-primary form-check-input" checked=${component.props().showcartbutton == 1 ? true : ""} style="width:17.98px">
            </div>
            `
      return el;
    },
    onUpdate({ elInput, component }) {
      const checkBox = elInput.querySelector('.form-check-input');
      checkBox.addEventListener('change', function() {
        if(this.checked) {
          component.set('showcartbutton', 1);
        } else {
          component.set('showcartbutton', 0);
        }
      });
    }
  });

  editor.TraitManager.addType('gallery-product-display-style', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const displayStyle = component.props()["displaystyle"];
      const alignStyle = component.props()["alignstyle"];
      const el = document.createElement('div');

      el.className = 'gallery-product-display-style mt-2';

      let styleContent = `
        <div class="mt-1 d-grid hover-list">
          <div
            class="hover-item style-item d-flex flex-column justify-content-center align-items-center cursor-hand"
            name="style1"
          >
            <div
              class="${
                'item-bg d-flex align-items-center justify-content-center' +
                (displayStyle === 'style1' ? ' selected' : '')
              }"
            >
              <svg
                id="Layer_1"
                width="40"
                height="72"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                class="_2rXrQ"
                data-hook="layout-classic-icon"
              >
                <rect class="_1J3ON" width="40" height="28.2" rx="3.3" ry="3.3" fill="#4eb7f5"></rect>
                <path
                  class="_1GJ2c"
                  d="M124.4,490.4a1,1,0,0,0-1.2-.3l-0.3.3-6.5,6.4h6.4l3.5-3.4Z"
                  transform="translate(-108.8 -472.8)"
                  fill="#fff"
                ></path>
                <path
                  class="_1r8bf"
                  d="M133.3,486.7l-6.9,6.7-3.5,3.4h18.4l-6.5-10a1,1,0,0,0-1.2-.3Z"
                  transform="translate(-108.8 -472.8)"
                  fill="#d3edff"
                ></path>
                <ellipse class="_1r8bf" cx="12.7" cy="7.6" rx="2.3" ry="2.3" fill="#d3edff"></ellipse>
                <rect class="_1J3ON" y="34.2" width="19.4" height="1.77" fill="#4eb7f5"></rect>
                <rect class="_1J3ON" y="38.2" width="9.1" height="1.77" fill="#4eb7f5"></rect>
              </svg>
            </div>
          </div>
          <div
            class="hover-item style-item d-flex flex-column justify-content-center align-items-center cursor-hand"
            name="style2"
          >
            <div
              class="${
                'item-bg d-flex align-items-center justify-content-center' +
                (displayStyle === 'style2' ? ' selected' : '')
              }"
            >
              <svg
                id="Layer_1"
                width="40"
                height="72"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                class="hnf8b"
                data-hook="layout-image-only-icon"
              >
                <rect class="_2C-G3" width="40" height="40" rx="3.3" ry="3.3" fill="#4eb7f5"></rect>
                <path
                  class="_1y7dW"
                  d="M224.3,495.6a1,1,0,0,0-1.2-.3l-0.3.3-6.5,6.4h6.4l3.5-3.4Z"
                  transform="translate(-208.8 -472.6)"
                  fill="#fff"
                ></path>
                <path
                  class="_2A5ER"
                  d="M233.2,491.9l-6.9,6.7-3.5,3.4h18.4l-6.5-10a1,1,0,0,0-1.2-.3Z"
                  transform="translate(-208.8 -472.6)"
                  fill="#d3edff"
                ></path>
                <ellipse class="_2A5ER" cx="12.7" cy="13" rx="2.3" ry="2.3" fill="#d3edff"></ellipse>
              </svg>
            </div>
          </div>
          <div
            class="hover-item style-item d-flex flex-column justify-content-center align-items-center cursor-hand"
            name="style3"
          >
            <div
              class="${
                'item-bg d-flex align-items-center justify-content-center' +
                (displayStyle === 'style3' ? ' selected' : '')
              }"
            >
              <svg
                id="Layer_1"
                width="40"
                height="72"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                class="_1NGTN"
                data-hook="layout-with-border-icon"
              >
                <path
                  class="_2WVXx"
                  d="M350,472.7H316.6l-1.3.3a3.3,3.3,0,0,0-1.8,1.8,3.4,3.4,0,0,0-.3,1.3v33.3a3.3,3.3,0,0,0,3.3,3.3H350a3.3,3.3,0,0,0,3.3-3.3V476.1A3.3,3.3,0,0,0,350,472.7Zm1.8,36.7a1.8,1.8,0,0,1-1.8,1.8H316.6a1.8,1.8,0,0,1-1.8-1.8V498.6h36.9v10.8Z"
                  transform="translate(-313.3 -472.7)"
                  fill="#4eb7f5"
                ></path>
                <path
                  class="mbZQQ"
                  d="M328.9,488.1a1,1,0,0,0-1.2-.3l-0.3.3-6.5,6.4h6.4l3.5-3.4Z"
                  transform="translate(-313.3 -472.7)"
                  fill="#fff"
                ></path>
                <path
                  class="_2DenK"
                  d="M337.8,484.4l-6.9,6.7-3.5,3.4h18.4l-6.5-10a1,1,0,0,0-1.2-.3Z"
                  transform="translate(-313.3 -472.7)"
                  fill="#d3edff"
                ></path>
                <ellipse class="_2DenK" cx="12.7" cy="7.6" rx="2.3" ry="2.3" fill="#d3edff"></ellipse>
                <rect
                  class="_2WVXx"
                  x="5.4"
                  y="29.6"
                  width="19.4"
                  height="1.77"
                  fill="#4eb7f5"
                ></rect>
                <rect class="_2WVXx" x="5.4" y="33.6" width="9.1" height="1.77" fill="#4eb7f5"></rect>
              </svg>
            </div>
          </div>
          <div
            class="hover-item style-item mt-1 d-flex flex-column justify-content-center align-items-center cursor-hand"
            name="style4"
          >
            <div
              class="${
                'item-bg d-flex align-items-center justify-content-center' +
                (displayStyle === 'style4' ? ' selected' : '')
              }"
            >
              <svg
                id="Layer_1"
                width="40"
                height="72"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                class="_1cc73"
                data-hook="layout-centered-icon"
              >
                <rect
                  class="_2rQrG"
                  width="40"
                  height="26.64"
                  rx="3.2"
                  ry="3.2"
                  fill="#4eb7f5"
                ></rect>
                <path
                  class="ctEAQ"
                  d="M430.1,490.9a1,1,0,0,0-1.2-.2l-0.3.2-6.5,6h6.4l3.5-3.2Z"
                  transform="translate(-414.6 -474.3)"
                  fill="#fff"
                ></path>
                <path
                  class="_2-ZIp"
                  d="M439,487.4l-6.9,6.3-3.5,3.2H447l-6.5-9.5a1,1,0,0,0-1.2-.3Z"
                  transform="translate(-414.6 -474.3)"
                  fill="#d3edff"
                ></path>
                <ellipse class="_2-ZIp" cx="12.7" cy="7.2" rx="2.3" ry="2.2" fill="#d3edff"></ellipse>
                <rect
                  class="_2rQrG"
                  x="10.3"
                  y="30.9"
                  width="19.4"
                  height="1.67"
                  fill="#4eb7f5"
                ></rect>
                <rect
                  class="_2rQrG"
                  x="15.5"
                  y="38.3"
                  width="9.1"
                  height="1.67"
                  fill="#4eb7f5"
                ></rect>
                <rect class="_2rQrG" x="17" y="35" width="6" height="0.93" fill="#4eb7f5"></rect>
              </svg>
            </div>
          </div>
        </div>
        `;

      let alignContent = `
            <div class="d-flex hover-list align-list mt-1 mb-2">
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand me-2"
                name="align1"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (alignStyle === 'align1' ? ' selected' : '')
                  }"
                >
                  <svg
                    class="_962Jt"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    data-hook="align-left-icon"
                  >
                    <path
                      class="fuo8c"
                      d="M26.000,27.000 C26.000,27.000 17.000,27.000 17.000,27.000 C15.852,27.000 15.000,26.000 15.000,25.000 C15.000,25.000 15.000,22.000 15.000,22.000 C15.000,21.000 15.852,20.000 17.000,20.000 C17.000,20.000 26.420,20.000 26.420,20.000 C27.569,20.000 28.000,21.000 28.000,22.000 C28.000,22.000 28.000,25.000 28.000,25.000 C28.000,26.000 27.149,27.000 26.000,27.000 ZM11.000,9.000 C11.000,9.000 13.000,9.000 13.000,9.000 C13.000,9.000 13.000,29.000 13.000,29.000 C13.000,29.000 11.000,29.000 11.000,29.000 C11.000,29.000 11.000,9.000 11.000,9.000 Z"
                      fill-rule="evenodd"
                      fill="#7fccf7"
                    ></path>
                    <path
                      class="_3n3Ns"
                      d="M25.000,16.000 C25.000,17.105 24.105,18.000 23.000,18.000 C23.000,18.000 17.000,18.000 17.000,18.000 C15.896,18.000 15.000,17.105 15.000,16.000 C15.000,16.000 15.000,13.000 15.000,13.000 C15.000,11.895 15.896,11.000 17.000,11.000 C17.000,11.000 23.000,11.000 23.000,11.000 C24.105,11.000 25.000,11.895 25.000,13.000 C25.000,13.000 25.000,16.000 25.000,16.000 Z"
                      fill-rule="evenodd"
                      fill="#3899ec"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand me-2"
                name="align2"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (alignStyle === 'align2' ? ' selected' : '')
                  }"
                >
                  <svg
                    class="_228n2"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    data-hook="align-center-icon"
                  >
                    <path
                      class="fuo8c"
                      d="M25.000,27.000 C25.000,27.000 20.000,27.000 20.000,27.000 C20.000,27.000 20.000,29.000 20.000,29.000 C20.000,29.000 18.000,29.000 18.000,29.000 C18.000,29.000 18.000,27.000 18.000,27.000 C18.000,27.000 13.000,27.000 13.000,27.000 C11.852,27.000 11.000,26.000 11.000,25.000 C11.000,25.000 11.000,22.000 11.000,22.000 C11.000,21.000 11.852,20.000 13.000,20.000 C13.000,20.000 18.000,20.000 18.000,20.000 C18.000,20.000 18.000,9.000 18.000,9.000 C18.000,9.000 20.000,9.000 20.000,9.000 C20.000,9.000 20.000,20.000 20.000,20.000 C20.000,20.000 25.420,20.000 25.420,20.000 C26.569,20.000 27.000,21.000 27.000,22.000 C27.000,22.000 27.000,25.000 27.000,25.000 C27.000,26.000 26.149,27.000 25.000,27.000 Z"
                      fill-rule="evenodd"
                      fill="#7fccf7"
                    ></path>
                    <path
                      class="_3n3Ns"
                      d="M24.000,16.000 C24.000,17.105 23.105,18.000 22.000,18.000 C22.000,18.000 16.000,18.000 16.000,18.000 C14.895,18.000 14.000,17.105 14.000,16.000 C14.000,16.000 14.000,13.000 14.000,13.000 C14.000,11.895 14.895,11.000 16.000,11.000 C16.000,11.000 22.000,11.000 22.000,11.000 C23.105,11.000 24.000,11.895 24.000,13.000 C24.000,13.000 24.000,16.000 24.000,16.000 Z"
                      fill-rule="evenodd"
                      fill="#3899ec"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
                name="align3"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (alignStyle === 'align3' ? ' selected' : '')
                  }"
                >
                  <svg
                    class="_3MgSE"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    data-hook="align-right-icon"
                  >
                    <path
                      class="fuo8c"
                      d="M26.000,29.000 C26.000,29.000 26.000,9.000 26.000,9.000 C26.000,9.000 28.000,9.000 28.000,9.000 C28.000,9.000 28.000,29.000 28.000,29.000 C28.000,29.000 26.000,29.000 26.000,29.000 ZM22.000,27.000 C22.000,27.000 13.000,27.000 13.000,27.000 C11.852,27.000 11.000,26.000 11.000,25.000 C11.000,25.000 11.000,22.000 11.000,22.000 C11.000,21.000 11.852,20.000 13.000,20.000 C13.000,20.000 22.420,20.000 22.420,20.000 C23.569,20.000 24.000,21.000 24.000,22.000 C24.000,22.000 24.000,25.000 24.000,25.000 C24.000,26.000 23.149,27.000 22.000,27.000 Z"
                      fill-rule="evenodd"
                      fill="#7fccf7"
                    ></path>
                    <path
                      class="_3n3Ns"
                      d="M24.000,16.000 C24.000,17.105 23.105,18.000 22.000,18.000 C22.000,18.000 16.000,18.000 16.000,18.000 C14.895,18.000 14.000,17.105 14.000,16.000 C14.000,16.000 14.000,13.000 14.000,13.000 C14.000,11.895 14.895,11.000 16.000,11.000 C16.000,11.000 22.000,11.000 22.000,11.000 C23.105,11.000 24.000,11.895 24.000,13.000 C24.000,13.000 24.000,16.000 24.000,16.000 Z"
                      fill-rule="evenodd"
                      fill="#3899ec"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
      `
      el.innerHTML = `
            <h6>${traitLabel}</h6>
            ${styleContent}
            <h6 class="mt-2">Product info alignment</h6>
            ${alignContent}
            `
      return el;
    },
    onUpdate({ elInput, component }) {
      const items = elInput.querySelectorAll('.hover-list .style-item');
      const alignItems = elInput.querySelectorAll('.align-list .hover-item');
      items.forEach(item => {
        item.addEventListener('click', function () {
          console.log('Item clicked:', this);
          component.set('displaystyle', this.getAttribute("name"));
          alignItems.forEach(it => {
            it.childNodes[1].classList.remove('selected');
          });
          if (this.getAttribute("name") != 'style4') {
            alignItems[0].childNodes[1].classList.add("selected");
            component.set('alignstyle', 'align1');
          } else {
            alignItems[1].childNodes[1].classList.add("selected");
            component.set('alignstyle', 'align2');
          }
          items.forEach(it => {
            it.childNodes[1].classList.remove('selected');
          });
          item.childNodes[1].classList.add("selected");
          // Add your click event logic here
        });
      });

      
      alignItems.forEach(item => {
        item.addEventListener('click', function () {
          console.log('Item clicked:', this);
          component.set('alignstyle', this.getAttribute("name"));
          alignItems.forEach(it => {
            it.childNodes[1].classList.remove('selected');
          });
          item.childNodes[1].classList.add("selected");
          // Add your click event logic here
        });
      });
    }
  });

  editor.TraitManager.addType('gallery-button-style', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const buttonStyle = component.props()["buttonstyle"];
      const el = document.createElement('div');

      el.className = 'gallery-button-style mt-2';

      let content = `
            <div class="mt-1 d-grid hover-list button-style-list align-list mb-2">
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
                name="style1"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (buttonStyle === 'style1' ? ' selected' : '')
                  }"
                >
                  <svg
                    data-aid="button-skin-1-icon"
                    class="_2AeKu"
                    width="35"
                    height="17"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 17"
                  >
                    <path
                      class="_2OBPq"
                      d="M131.5,765.4h-29a3,3,0,0,1-3-3v-11a3,3,0,0,1,3-3h29a3,3,0,0,1,3,3v11A3,3,0,0,1,131.5,765.4Z"
                      transform="translate(-99.5 -748.4)"
                      fill="#4eb7f5"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
                name="style2"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (buttonStyle === 'style2' ? ' selected' : '')
                  }"
                >
                  <svg
                    data-aid="button-skin-2-icon"
                    class="_2AeKu"
                    width="35"
                    height="17"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 17"
                  >
                    <rect class="_2OBPq" width="35" height="17" rx="8.5" ry="8.5" fill="#4eb7f5"></rect>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
                name="style3"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (buttonStyle === 'style3' ? ' selected' : '')
                  }"
                >
                  <svg
                    data-aid="button-skin-3-icon"
                    class="_2AeKu"
                    width="35"
                    height="17"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 17"
                  >
                    <rect class="_2OBPq" width="35" height="17" fill="#4eb7f5"></rect>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand mt-1"
                name="style4"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (buttonStyle === 'style4' ? ' selected' : '')
                  }"
                >
                  <svg
                    data-aid="button-skin-4-icon"
                    class="_2AeKu"
                    width="35"
                    height="17"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 17"
                  >
                    <path
                      class="_2OBPq"
                      d="M320,749.4a2,2,0,0,1,2,2v11a2,2,0,0,1-2,2H291a2,2,0,0,1-2-2v-11a2,2,0,0,1,2-2h29m0-1H291a3,3,0,0,0-3,3v11a3,3,0,0,0,3,3h29a3,3,0,0,0,3-3v-11a3,3,0,0,0-3-3h0Z"
                      transform="translate(-288 -748.4)"
                      fill="#4eb7f5"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand mt-1"
                name="style5"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (buttonStyle === 'style5' ? ' selected' : '')
                  }"
                >
                  <svg
                    data-aid="button-skin-5-icon"
                    class="_2AeKu"
                    width="35"
                    height="17"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 17"
                  >
                    <path
                      class="_2OBPq"
                      d="M375.2,749.4a7.5,7.5,0,1,1,0,15h-18a7.5,7.5,0,0,1,0-15h18m0-1h-18a8.5,8.5,0,0,0,0,17h18a8.5,8.5,0,1,0,0-17h0Z"
                      transform="translate(-348.7 -748.4)"
                      fill="#4eb7f5"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand mt-1"
                name="style6"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (buttonStyle === 'style6' ? ' selected' : '')
                  }"
                >
                  <svg
                    data-aid="button-skin-6-icon"
                    class="_2AeKu"
                    width="35"
                    height="17"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 17"
                  >
                    <path
                      class="_2OBPq"
                      d="M447,749v15H414V749h33m1-1H413v17h35V748h0Z"
                      transform="translate(-413 -748)"
                      fill="#4eb7f5"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
        `;
      el.innerHTML = `
            <h6>${traitLabel}</h6>
            ${content}
            `
      return el;
    },
    onUpdate({ elInput, component }) {
      const items = elInput.querySelectorAll('.hover-item');
      items.forEach(item => {
        item.addEventListener('click', function () {
          console.log('Item clicked:', this);
          component.set('buttonstyle', this.getAttribute("name"));
          if (this.getAttribute("name") === 'style1') {
            component.set("fillopacity", 100);
            component.set("borderwidth", 0);
            component.set("buttoncornerradius", 5);
          } else if (this.getAttribute("name") === 'style2') {
            component.set("fillopacity", 100);
            component.set("borderwidth", 0);
            component.set("buttoncornerradius", 20);
          } else if (this.getAttribute("name") === 'style3') {
            component.set("fillopacity", 100);
            component.set("borderwidth", 0);
            component.set("buttoncornerradius", 0);
          } else if (this.getAttribute("name") === 'style4') {
            component.set("fillopacity", 0);
            component.set("borderwidth", 1);
            component.set("buttoncornerradius", 5);
          } else if (this.getAttribute("name") === 'style5') {
            component.set("fillopacity", 0);
            component.set("borderwidth", 1);
            component.set("buttoncornerradius", 20);
          } else if (this.getAttribute("name") === 'style6') {
            component.set("fillopacity", 0);
            component.set("borderwidth", 1);
            component.set("buttoncornerradius", 0);
          }
          items.forEach(it => {
            it.childNodes[1].classList.remove('selected');
          });
          item.childNodes[1].classList.add("selected");
          // Add your click event logic here
        });
      });
    }
  });

  editor.TraitManager.addType('product-page-show-items', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const product = component.props()["product"];
      const selectedFields = component.props()['fieldnames'].split(",");
      let showItems = "";
      Object.keys(product).map((key, idx) => {
        let checked = false;
        selectedFields.forEach((selectedField) => {
          if(selectedField == key) checked = true;
        })
        if(checked) {
          showItems += `<div class="d-flex mt-1">
            <input id="field${idx}" name="${key}" type="checkbox" class="me-1 border-primary form-check-input" checked=${checked} style="width:17.98px">
            <label for="field${idx}">${key}</label></div>`;
        } else {
          showItems += `<div class="d-flex mt-1">
            <input id="field${idx}" name="${key}" type="checkbox" class="me-1 border-primary form-check-input" style="width:17.98px">
            <label for="field${idx}">${key}</label></div>`;
        }
      })
      const el = document.createElement('div');

      el.className = 'product-page-show-items';

      el.innerHTML = `
        <h6>${traitLabel}</h6>
        ${showItems}
        `;

      return el;
    },
    onUpdate({elInput, component}) {
      let checkedFields = [];
      const fields = elInput.querySelectorAll('[id^="field"]');
      fields.forEach(checkbox => {
        // Check if the checkbox is checked
        checkbox.addEventListener('change', function() {
          
          fields.forEach(field => {
            if (field.checked) {
              // Log the 'name' attribute of the checkbox
              checkedFields.push(field.name);
            }
          });
          component.set('fieldnames', checkedFields.join());
          checkedFields = [];
        })
        
      });
    }
  });

  editor.TraitManager.addType('product-page-show-cart-button', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const el = document.createElement('div');

      el.className = 'product-page-show-cart-button mt-2';
      el.innerHTML = `
            <div class="mt-1 d-flex justify-content-between align-items-center">
              <div>Show button</div>
              <input type="checkbox" class="me-3 border-primary form-check-input" checked=${component.props().showcartbutton == 1 ? true : ""} style="width:17.98px">
            </div>
            `
      return el;
    },
    onUpdate({ elInput, component }) {
      const checkBox = elInput.querySelector('.form-check-input');
      checkBox.addEventListener('change', function() {
        if(this.checked) {
          component.set('showcartbutton', 1);
        } else {
          component.set('showcartbutton', 0);
        }
      });
    }
  });

  editor.TraitManager.addType('product-page-align-style', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const alignStyle = component.props()["alignstyle"];
      const el = document.createElement('div');

      el.className = 'product-page-align-style mt-2';

      let alignContent = `
            <div class="d-flex hover-list align-list mt-1 mb-2">
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand me-2"
                name="align1"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (alignStyle === 'align1' ? ' selected' : '')
                  }"
                >
                  <svg
                    class="_962Jt"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    data-hook="align-left-icon"
                  >
                    <path
                      class="fuo8c"
                      d="M26.000,27.000 C26.000,27.000 17.000,27.000 17.000,27.000 C15.852,27.000 15.000,26.000 15.000,25.000 C15.000,25.000 15.000,22.000 15.000,22.000 C15.000,21.000 15.852,20.000 17.000,20.000 C17.000,20.000 26.420,20.000 26.420,20.000 C27.569,20.000 28.000,21.000 28.000,22.000 C28.000,22.000 28.000,25.000 28.000,25.000 C28.000,26.000 27.149,27.000 26.000,27.000 ZM11.000,9.000 C11.000,9.000 13.000,9.000 13.000,9.000 C13.000,9.000 13.000,29.000 13.000,29.000 C13.000,29.000 11.000,29.000 11.000,29.000 C11.000,29.000 11.000,9.000 11.000,9.000 Z"
                      fill-rule="evenodd"
                      fill="#7fccf7"
                    ></path>
                    <path
                      class="_3n3Ns"
                      d="M25.000,16.000 C25.000,17.105 24.105,18.000 23.000,18.000 C23.000,18.000 17.000,18.000 17.000,18.000 C15.896,18.000 15.000,17.105 15.000,16.000 C15.000,16.000 15.000,13.000 15.000,13.000 C15.000,11.895 15.896,11.000 17.000,11.000 C17.000,11.000 23.000,11.000 23.000,11.000 C24.105,11.000 25.000,11.895 25.000,13.000 C25.000,13.000 25.000,16.000 25.000,16.000 Z"
                      fill-rule="evenodd"
                      fill="#3899ec"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand me-2"
                name="align2"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (alignStyle === 'align2' ? ' selected' : '')
                  }"
                >
                  <svg
                    class="_228n2"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    data-hook="align-center-icon"
                  >
                    <path
                      class="fuo8c"
                      d="M25.000,27.000 C25.000,27.000 20.000,27.000 20.000,27.000 C20.000,27.000 20.000,29.000 20.000,29.000 C20.000,29.000 18.000,29.000 18.000,29.000 C18.000,29.000 18.000,27.000 18.000,27.000 C18.000,27.000 13.000,27.000 13.000,27.000 C11.852,27.000 11.000,26.000 11.000,25.000 C11.000,25.000 11.000,22.000 11.000,22.000 C11.000,21.000 11.852,20.000 13.000,20.000 C13.000,20.000 18.000,20.000 18.000,20.000 C18.000,20.000 18.000,9.000 18.000,9.000 C18.000,9.000 20.000,9.000 20.000,9.000 C20.000,9.000 20.000,20.000 20.000,20.000 C20.000,20.000 25.420,20.000 25.420,20.000 C26.569,20.000 27.000,21.000 27.000,22.000 C27.000,22.000 27.000,25.000 27.000,25.000 C27.000,26.000 26.149,27.000 25.000,27.000 Z"
                      fill-rule="evenodd"
                      fill="#7fccf7"
                    ></path>
                    <path
                      class="_3n3Ns"
                      d="M24.000,16.000 C24.000,17.105 23.105,18.000 22.000,18.000 C22.000,18.000 16.000,18.000 16.000,18.000 C14.895,18.000 14.000,17.105 14.000,16.000 C14.000,16.000 14.000,13.000 14.000,13.000 C14.000,11.895 14.895,11.000 16.000,11.000 C16.000,11.000 22.000,11.000 22.000,11.000 C23.105,11.000 24.000,11.895 24.000,13.000 C24.000,13.000 24.000,16.000 24.000,16.000 Z"
                      fill-rule="evenodd"
                      fill="#3899ec"
                    ></path>
                  </svg>
                </div>
              </div>
              <div
                class="hover-item d-flex flex-column justify-content-center align-items-center cursor-hand"
                name="align3"
              >
                <div
                  class="${
                    'item-bg d-flex align-items-center justify-content-center' +
                    (alignStyle === 'align3' ? ' selected' : '')
                  }"
                >
                  <svg
                    class="_3MgSE"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    data-hook="align-right-icon"
                  >
                    <path
                      class="fuo8c"
                      d="M26.000,29.000 C26.000,29.000 26.000,9.000 26.000,9.000 C26.000,9.000 28.000,9.000 28.000,9.000 C28.000,9.000 28.000,29.000 28.000,29.000 C28.000,29.000 26.000,29.000 26.000,29.000 ZM22.000,27.000 C22.000,27.000 13.000,27.000 13.000,27.000 C11.852,27.000 11.000,26.000 11.000,25.000 C11.000,25.000 11.000,22.000 11.000,22.000 C11.000,21.000 11.852,20.000 13.000,20.000 C13.000,20.000 22.420,20.000 22.420,20.000 C23.569,20.000 24.000,21.000 24.000,22.000 C24.000,22.000 24.000,25.000 24.000,25.000 C24.000,26.000 23.149,27.000 22.000,27.000 Z"
                      fill-rule="evenodd"
                      fill="#7fccf7"
                    ></path>
                    <path
                      class="_3n3Ns"
                      d="M24.000,16.000 C24.000,17.105 23.105,18.000 22.000,18.000 C22.000,18.000 16.000,18.000 16.000,18.000 C14.895,18.000 14.000,17.105 14.000,16.000 C14.000,16.000 14.000,13.000 14.000,13.000 C14.000,11.895 14.895,11.000 16.000,11.000 C16.000,11.000 22.000,11.000 22.000,11.000 C23.105,11.000 24.000,11.895 24.000,13.000 C24.000,13.000 24.000,16.000 24.000,16.000 Z"
                      fill-rule="evenodd"
                      fill="#3899ec"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
      `
      el.innerHTML = `
            <h6 class="mt-2">Product info alignment</h6>
            ${alignContent}
            `
      return el;
    },
    onUpdate({ elInput, component }) {
      const alignItems = elInput.querySelectorAll('.align-list .hover-item');

      alignItems.forEach(item => {
        item.addEventListener('click', function () {
          console.log('Item clicked:', this);
          component.set('alignstyle', this.getAttribute("name"));
          alignItems.forEach(it => {
            it.childNodes[1].classList.remove('selected');
          });
          item.childNodes[1].classList.add("selected");
          // Add your click event logic here
        });
      });
    }
  });

  editor.TraitManager.addType('addresses', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({trait, component}) {
      const traitName = trait.get('name');
      const traitLabel = trait.get('label');
      const addresses = component.props().addresses;
      console.log('Addresses:', addresses);
      let showItems = `<div class="address-container"></div><hr/>
        <h6>Add New Address</h6>
        <div class="mt-1">
        <input type="text" class="border rounded new-address-input" value="">
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary mt-1 trait-new-address-add-btn">Add</button>
        </div>
      </div>`;
      const el = document.createElement('div');
      el.className = 'map-addresses';
      el.innerHTML = `
        <h6 class="mb-1">${traitLabel}</h6>
        ${showItems}
      `;

      let newAddr = '';
      const newAddressEl = el.querySelector('.new-address-input');
      newAddressEl.addEventListener('change', (e) => {
        newAddr = e.target.value;
      })

      const addBtn = el.querySelector('.trait-new-address-add-btn');
      addBtn.addEventListener('click', (e) => {
        component.set('addresses', [...component.props().addresses, newAddr]);
        newAddr = '';
        newAddressEl.value = '';
      })

      return el;
    },
    onUpdate({elInput, component}) {
      const addresses = component.props().addresses;
      
      const itemsContainer = elInput.querySelector('.address-container');

      while (itemsContainer.hasChildNodes()) {
        itemsContainer.removeChild(itemsContainer.firstChild);
      }

      let addressesStr = '';
      addresses.forEach((item, index) => {
        addressesStr = addressesStr + `
          <div class="d-flex mb-1">
            <input id="address${index}" type="text" class="border rounded me-1" value="${item}">
            <button class="trait-address-delete"><i class="fa fa-trash"></i></button>
          </div>
        `;
      });
      itemsContainer.innerHTML = addressesStr;

      itemsContainer.querySelectorAll('.trait-address-delete').forEach((item, index) => {
        item.addEventListener('click', event => {
          //handle click
          const tempList = [...addresses];
          tempList.splice(index, 1);
          component.set('addresses', tempList);
        })
      })
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

  editor.on('canvas:drop', (DataTransfer, component) => {
    if (component && !Array.isArray(component) && component.isChildOf('repeater-item')) {
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
    if(component && Array.isArray(component) && component[component.length-1].get('type')==='social-bar'){
      let parentElement=component[component.length-1].getEl();
      let imageElements=parentElement.getElementsByTagName('img');
      let linkElements=parentElement.getElementsByTagName('a');
      let tempList=[];
      for(let i=0; i<linkElements.length;i++){
          const _imageEl=imageElements[i]; 
          const item={name:_imageEl.alt, url:linkElements[i].href, image:_imageEl.src, type:'webaddress'};
          tempList.push(item);
      }
      component[component.length-1].set('socialList', tempList);
    }
    if (component && !Array.isArray(component) && component.get('type')==='menu'){
      let parentElement=component.getEl();
      let linkElements=parentElement.getElementsByTagName('a');
      let tempList=[];
      for(let i=0; i<linkElements.length;i++){
        const item={name:linkElements[i].text, pageLink:linkElements[i].href, isActive: false, subMenus:[]};
        tempList.push(item);
      }
      component.set('menus', tempList);
    }
  })

  editor.on(`component:update:numOfItems`, (model) => {
    if (model.get('type') === 'repeater') {
      const itemCmp = editor.getSelected().getLastChild();
      // const html = itemCmp.toHTML();
      // const css = editor.CodeManager.getCode(itemCmp, 'css', { cssc: editor.CssComposer });
      editor.getSelected().append(itemCmp.clone());
    }
  });

  editor.on(`style:property:update`, ({ property, from, to }) => {
    const component = editor.getSelected();
    if (component?.isChildOf('repeater-item')) {
      const index = component.index();
      const changedStyle = { ...component.getStyle(), ...property.getStyle() };
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
      const changedStyle = { ...component.getStyle(), ...property.getStyle() };
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