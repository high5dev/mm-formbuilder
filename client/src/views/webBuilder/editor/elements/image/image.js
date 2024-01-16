import * as api from  '../../../store/api';
let imageItem = {
    isComponent: el => (el.tagName === 'A' && el.classList.contains('photo-element')),
    model: {
      defaults: {
        tagName: 'a',
        draggable: true,
        droppable: true,
        attributes: { class: 'photo-element'},
        components: (props) => {
          return (
            <img src="https://i.ibb.co/xM56xB3/image-large-3.png" class='theme-image image-item'/>
          )
        },
        styles: `
        .photo-element{display:block; width:fit-content}
        .image-item {width:100px; height:100px}
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
          },
          {
            type: 'href',
            name: 'href',
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
        this.listenTo(this.model, 'change:href', this.handleChangeUrl);
        this.listenTo(this.model, 'change:images', this.handleChangeImages);
      },
      handleChangeUrl(e) {
        let url=this.model.get('url');
        if(url==='' || url===undefined){
          url="https://i.ibb.co/xM56xB3/image-large-3.png";
        };
        const href=this.model.get('href');
        this.model.attributes.attributes.href=href;
        this.model.attributes.href=href;
        this.model.get('components').pop();
        this.model.get('components').push(
          `<img src=${url} class='theme-image image-item'/>`
        );
        this.render();
      },
      async handleChangeImages(e){
        this.render();
      }
    }
  };
  
  export default imageItem;