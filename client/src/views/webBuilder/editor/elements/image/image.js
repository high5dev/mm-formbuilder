import * as api from  '../../../store/api';
let imageItem = {
    isComponent: el => (el.tagName === 'IMG' && el.classList.contains('photo-element')),
    model: {
      defaults: {
        tagName: 'img',
        draggable: true,
        droppable: true,
        attributes: { class: 'photo-element', src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+"},
        styles: `
        .photo-element{display:block; width:fit-content;width:100px; height:100px}
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
        let url=this.model.get('url');
        this.model.attributes.attributes.src=url;
        this.model.attributes.src=url;
        this.render();
      },
      async handleChangeImages(e){
        this.render();
      }
    }
  };
  
  export default imageItem;