let socialbarType = {
    model: {
      defaults: {
        tagName: 'div',
        draggable: '.section-column-child',
        droppable: true,
        attributes: { class: 'social-form-builder-wrapper' },
        components: [
          {
            tagName: 'ul',
            hoverable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'social-links' },
            components: [
              {
                tagName: 'li',
                components: [
                  {
                    tagName: 'a',
                    attributes: {
                      href: 'https://www.example.com',
                      target: '_blank',
                      class: 'fa fa-facebook'
                    },
                  }
                ]
              }
            ]
          }
        ],
        styles: ''
      }
    }
  };
  
  export default socialbarType;

  
  