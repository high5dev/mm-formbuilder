import * as api from  '../../../store/api';
let galleryItem = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('gallery-item')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: false,
        droppable: false,
        attributes: { class: 'gallery-item'},
        components:(props) =>{
          return(
            <div class="gallery-item-element">
              <a target="_blank" href="https://i.ibb.co/xM56xB3/image-large-3.png">
               <img src="https://i.ibb.co/xM56xB3/image-large-3.png" width='100' height='100'/>
            </a>
            </div>
          )
        },
        styles: `
        .gallery-item {width:110px;height:110px; padding:5px}
        .gallery-item-element {display:flex; align-items:center; justify-content:space-around}
        
        `,
        stylable: ['width', 'height', 'background-color', 'margin', 'align-items', 'border', 'justify-content', 'display'],
        images:[],
        traits: [
          {
            type: 'string',
            name: 'alt',
            changeProp: true,
            min: 1,
          },
          {
            type: 'image-url',
            name: 'url',
            changeProp: true,
            min: 1,
          }
        ],
      },
    },
    view: {
      async init() {
        const payload={page:1, pageSize:21};
        const {data}=await api.getImageLibrary(payload);
        if(data.data){
          let temp_images=[];
          for(let i=0; i<data.data.length; i++){
            temp_images.push({id:data.data[i]._id, url:data.data[i].image});
          };
        this.model.set('images', temp_images);
        }
        this.listenTo(this.model, 'change:url', this.handleChangeUrl);
        this.listenTo(this.model, 'change:images', this.handleChangeImages);
      },
      handleChangeUrl(e) {
        const comps=this.model.get('components');
        const _element=comps.parent.getEl();
        const url=this.model.get('url');
        let images=_element.getElementsByTagName('img');
        let links=_element.getElementsByTagName('a');
        for(let i=0; i<images.length;i++){
          const image=images[i];
          image.setAttribute('src', url);
        }
        for(let i=0; i<links.length;i++){
          const link=links[i];
          link.setAttribute('href', url);
        };
        const item=_element.innerHTML;
        console.log('item', item);
        while (comps.length > 0) {
          comps.pop();
        };
        comps.push(item)
        this.render();
      },
      async handleChangeImages(e){
        this.render();
      }
    }
  };
  
  export default galleryItem;