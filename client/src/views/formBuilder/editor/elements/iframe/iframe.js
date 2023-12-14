const script = function (props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let iframe = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('iframe-element')),
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'iframe-element', url: 'https://www.w3school.com' },
      components: (props) => {
        return (
          <iframe src="https://www.w3school.com" width="100%" height="200px" data-gjs-selectable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-hoverable="false"></iframe>
        )
      },
      traits: [
        {
          type: 'string',
          name: 'url',
          changeProp: true,
          min: 1,
        },
      ],

      styles: `.iframe-element {min-height: 100px; min-width:100px;background-color: white;width:100%}`,
      stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius'],
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:url', this.handleChangeUrl);
    },
    handleChangeUrl(e) {
      this.model.setAttributes({ class: 'iframe-element', url: this.model.get('url') });
      this.model.get('components').pop();
      this.model.get('components').push(
        `<iframe src=${this.model.get('url')} width="100%" height="200px" data-gjs-selectable="false" data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-hoverable="false"></iframe>`
      );
      this.render();
    },
  }
};

export default iframe;
