import { GiConsoleController } from "react-icons/gi";
import repeater from "./repeater/repeater"
import repeaterItem from "./repeater/repeaterItem";
import gallery from './gallery/gallery';
import galleryItem from './gallery/galleryItem'
import { blocks } from "./Blocks";
import { customSectors, customProperties } from "./CustomStyles";
import * as api from  '../../store/api'

export const webBuilderPlugin = (editor) => {
  editor.DomComponents.addType('repeater-item', repeaterItem);
  editor.DomComponents.addType('repeater', repeater);
  editor.DomComponents.addType('gallery-item', galleryItem);
  editor.DomComponents.addType('gallery', gallery);
  editor.TraitManager.addType('image-url', {
    createInput({trait, component}){
      let image_url="https://storage.googleapis.com/mymember-storage/my-manager/a4fbe6f0-192e-4c2a-bf03-7db291aafbd2-@fabbiyedev.png";
      let _url;
      let _id;
      let pageSize=21;
      let pageNum=2;
      let selected_index;
      const trait_name=trait.get('name');
      let images=component.get('images');
      const src=component.getAttributes().src;
      const newLinkElement = document.createElement('div');
      newLinkElement.className = 'trait-image-url';
      newLinkElement.innerHTML = `
        <input class="input-image-url" type="url" placeholder="Insert link URL" value=${src}>/>
        <button class="btn-primary trait-image-btn">...</button>`;
      const modalElement=document.createElement('div');
      modalElement.innerHTML=`
        <div class="gallery-image-list">
          ${
            images && images.map((item)=>{
                return(
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
      newLinkElement.querySelector('.trait-image-btn').addEventListener('click', (ev)=>{
        editor.Modal.open({
          title: 'Select Gallery Image', 
          content: modalElement
        });
      });

      const scrollElement=modalElement.querySelector(".gallery-image-list")
      scrollElement.addEventListener('scroll', (ev)=>{
        if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight) {
          const payload={
            page:pageNum,
            pageSize 
          }
          api.getImageLibrary(payload).then((res)=>{
            if(res.data){
              pageNum+=1;
              const result=res.data;
              if(result.data){
                let temp_images=images;
                for(let i=0; i<result.data.length; i++){
                  temp_images.push({id:result.data[i]._id, url:result.data[i].image});
                };

              document.querySelector(".gallery-image-list").innerHTML= 
              temp_images && temp_images.map((item)=>{
                    return(
                      `<img class="select-image-item" id=${item.id} src=${item.url} width="110" height="110"/>`
                    )
                }).join('');
                modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
                  item.addEventListener('click', event => {
                    _url=event.target.src;
                    _id=event.target.id;
                    selected_index=index;
                    newLinkElement.querySelector('.input-image-url').value=_url;
                    for(let i=0; i<modalElement.querySelectorAll('.select-image-item').length; i++){
                      const el=modalElement.querySelectorAll('.select-image-item')[i];
                      if (selected_index===i){
                        el.style.border="2px solid blue";
                      }
                      else{
                        el.style.border="none";
                      }
                    }
                  });
                });
              const parentElements = component.parents();
              let parentRepeater=null;
              for (let i = 0; i < parentElements.length; i++) {
                if (parentElements[i].get('type') === 'gallery') {
                  parentRepeater = parentElements[i];
                  break;
                }
              }
              for (let i = 0; i < parentRepeater.components().length; i++){
                parentRepeater.getChildAt(i).set('images', temp_images);
              }   
              }
            }
          })
        } 
      })
      modalElement.querySelectorAll('.select-image-item').forEach((item, index) => {
        item.addEventListener('click', event => {
          _url=event.target.src;
          _id=event.target.id;
          selected_index=index;
          newLinkElement.querySelector('.input-image-url').value=_url;
          for(let i=0; i<modalElement.querySelectorAll('.select-image-item').length; i++){
            const el=modalElement.querySelectorAll('.select-image-item')[i];
            if (selected_index===i){
              el.style.border="2px solid blue";
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
      modalElement.querySelector('#del-btn').addEventListener('click', (ev)=>{
        if(_id){
          api.delImageFromLibrary(_id).then((res)=>{
            const {data}=res;
            if(data.success){
              let _images=images && images.filter((item)=>item.id!=_id);
              component.set('images', _images);
              document.getElementById(_id).remove();
              const parentElements = component.parents();
              let parentRepeater=null;
              for (let i = 0; i < parentElements.length; i++) {
                if (parentElements[i].get('type') === 'gallery') {
                  parentRepeater = parentElements[i];
                  break;
                }
              }
              for (let i = 0; i < parentRepeater.components().length; i++){
                parentRepeater.getChildAt(i).set('images', _images);
              }
            }
          }
          )
        }
        else{
          editor.Modal.close();
        }
        // api.addToImageLibrary({image:image_url});
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