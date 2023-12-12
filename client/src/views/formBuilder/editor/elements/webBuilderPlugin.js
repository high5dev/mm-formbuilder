import { GiConsoleController } from "react-icons/gi";
import repeater from "./repeater/repeater"
import repeaterItem from "./repeater/repeaterItem";
import gallery from './gallery/gallery';
import galleryItem from './gallery/galleryItem'
import iframe from "./iframe/iframe";
import { blocks } from "./Blocks";
import { customSectors, customProperties } from "./CustomStyles";
import * as api from '../../store/api'
import socialBar from "./socialBar/socialBar";
import socialLink from "./traits/socialLink";
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
      const src = component.getAttributes().src;
      const newLinkElement = document.createElement('div');
      newLinkElement.className = 'trait-image-url';
      newLinkElement.innerHTML = `
        <input class="input-image-url" type="url" placeholder="Insert link URL" value=${src}>/>
        <button class="btn-primary trait-image-btn">...</button>`;
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
          api.getImageLibrary(payload).then((res) => {
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
                      `<img class="select-image-item" id=${item.id} src=${item.url} width="110" height="110"/>`
                    )
                  }).join('');
                modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
                  item.addEventListener('click', event => {
                    _url = event.target.src;
                    _id = event.target.id;
                    selected_index = index;
                    newLinkElement.querySelector('.input-image-url').value = _url;
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
          newLinkElement.querySelector('.input-image-url').value = _url;
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
  editor.DomComponents.addType('shopping-cart', shoppingcart);
  editor.DomComponents.addType('add-to-cart-button', addtocartbutton);
  editor.DomComponents.addType('currency-converter', currencyconverter);
  editor.DomComponents.addType('product-item', productItem);
  editor.DomComponents.addType('productpage', productpage);
  editor.DomComponents.addType('cartpage', cartpage);
  editor.DomComponents.addType('thankyoupage', thankyoupage);
  editor.TraitManager.addType('social-link', {
    noLabel: true,
    // Expects as return a simple HTML string or an HTML element
    createInput({ trait, component }) {
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