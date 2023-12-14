let navbarType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child',
      droppable: true,
      attributes: { class: 'navbar-form-builder-wrapper' },
      components: [
        {
          tagName: 'ul',
          components: [
            {
              tagName: 'li',
              components: [
                {
                  tagName: 'a',
                  attributes: { href: '#', class: 'navbar-form-builder-wrapper' },
                  components: [
                    {
                      tagName: 'img',
                      attributes: { src: '/assets/images/photo.png', class: '', alt: 'Demo Image' },
                      name: 'NavBar Image'
                    }
                  ]
                }
              ]
            }
          ],
          hoverable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'navbar-links' }
        }
      ],
      styles: ''
    }
  }
};

export default navbarType;
