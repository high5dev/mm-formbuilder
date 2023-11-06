let repeaterItem = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      tagName: 'div',
      draggable: false,
      droppable: true,
      attributes: { class: 'repeater-item' },
      styles: `.repeater-item {min-height: 300px; background-color: #b9dbcb;}`,
      stylable: ['width', 'background-color', 'margin', 'align-items', 'border', 'justify-content', 'display'],
    },
  },
};

export default repeaterItem;
