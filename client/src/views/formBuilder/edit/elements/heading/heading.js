let headingType = {
  model: {
    // Default properties
    defaults: {
      tagName: 'div',
      attributes: { class: ' element' },
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: false, // Can't drop other elements inside
      components: [
        {
          tagName: 'h3',
          type: 'text',
          editable: true,
          content: 'Heading',
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          attributes: { class: '' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'i',
              components: '',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'fa fa-plus' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'bottom add-more-element' }
        }
      ],
      
      stylable: ['heading-1', 'heading-2', 'font-size', 'align-content']
    }
  }
};

export default headingType;
