let gallery = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('gallery')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: true,
        attributes: { class: 'gallery' },
        components: (props) => {
          const components = [];
          const item = {
            type: 'gallery-item',
          };
  
          for (let i = 0; i < 8; i++) {
            components.push(item);
          }
          return components;
        },
        styles: `.gallery {display: grid; grid-template-columns: repeat(4, 2fr); column-gap: 0px; row-gap: 0px;padding:3px}`,
      },

    },
    view: {
      init() {
      }
    }
  };
  
  export default gallery;
  