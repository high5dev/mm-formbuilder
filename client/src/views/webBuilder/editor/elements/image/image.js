import * as api from  '../../../store/api';
let imageItem = {
    isComponent: el => (el.tagName === 'IMG' && el.classList.contains('image-item')),
    model: {
      defaults: {
        tagName: 'img',
        draggable: true,
        droppable: true,
        attributes: { class: 'image-item', src:'https://i.ibb.co/xM56xB3/image-large-3.png' },
        styles: `.image-item {width:100px; height:100px}`,
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
        const {data}=await api.getImageFromMedia(payload);
        if(data.data){
          let temp_images=[];
          for(let i=0; i<data.data.length; i++){
            temp_images.push({id:data.data[i]._id, url:data.data[i].imageUrl});
          };
        this.model.set('images', temp_images);
        }
        this.listenTo(this.model, 'change:url', this.handleChangeUrl);
        this.listenTo(this.model, 'change:images', this.handleChangeImages);
      },
      handleChangeUrl(e) {
        const url=this.model.get('url');
        this.model.attributes.attributes.src=url;
        this.model.attributes.src=url;
        // this.model.setAttributes({ src: url });
        this.render();
      },
      async handleChangeImages(e){
        this.render();
      }
    }
  };
  
  export default imageItem;