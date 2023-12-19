let repeaterItem = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('repeater-item')),
  model: {
    defaults: {
      tagName: 'div',
      draggable: false,
      droppable: true,
      selectable: false,
      attributes: { class: 'repeater-item' },
      styles: `.repeater-item {min-height: 300px; background-color: #b9dbcb;}`,
      stylable: ['width', 'height', 'background-color', 'margin', 'align-items', 'border', 'justify-content', 'display'],
    },
  },
};

export default repeaterItem;
