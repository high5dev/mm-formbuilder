let galleryItem = {
    isComponent: el => el.tagName === 'div',
    model: {
      defaults: {
        tagName: 'img',
        draggable: false,
        droppable: true,
        attributes: { class: 'gallery-item', src:'https://i.ibb.co/xM56xB3/image-large-3.png' },
        styles: `.gallery-item {background-color: #b9dbcb;width:100px;height:100px}`,
        stylable: ['width', 'height', 'background-color', 'margin', 'align-items', 'border', 'justify-content', 'display'],
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
      init() {
        this.listenTo(this.model, 'change:url', this.handleChangeUrl);
      },
      handleChangeUrl(e) {
        const url=this.model.get('url');
        this.model.setAttributes({ src: url });
        this.render();
      }
    }
  };
  
  export default galleryItem;