import * as api from  '../../../store/api';
let galleryItem = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('gallery-item')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: true,
        droppable: true,
        attributes: { class: 'gallery-item'},
        components:(props) =>{
          return(
               <img src="https://i.ibb.co/xM56xB3/image-large-3.png" width='100' height='100'/>
          )
        },
        styles: `.gallery-item {padding:3px}`,
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
        for(let i=0; i<images.length;i++){
          const image=images[i];
          image.setAttribute('src', url);
        }
        const item=_element.innerHTML;
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