let tableType = {
  model: {
    defaults: {
      tagName: 'div',
      droppable: true,
      attributes: { class: 'table-wrap' },
      components: [
        {
          tagName: 'table',
          attributes: { class: 'form-builder-table' },
          components: [],
          hoverable: false,
          draggable: false,
          droppable: false,
          selectable: false
        }
      ],
      styles: `.table-wrap{ padding: 10px }`
    }
  }
};

export default tableType;
