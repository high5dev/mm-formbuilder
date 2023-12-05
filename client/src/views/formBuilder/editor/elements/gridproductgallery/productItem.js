let productItem = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      tagName: 'div',
      draggable: false,
      droppable: true,
      attributes: { class: 'repeater-item' },
      styles: `.repeater-item { min-height: 300px; min-width: 300px; background-color: #b9dbcb; margin-right: 15px }`,
      stylable: ['width', 'height', 'background-color', 'margin', 'align-items', 'border', 'justify-content', 'display'],
    },
  },
};

export default productItem;
