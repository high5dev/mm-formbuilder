const script = function(props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let checkboxEl = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'checkbox-element' },
      components: (props) => {
          const elProp = props.attributes.elProps[0];
          return(
                  <div>
                      <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-checkbox-element" checked={elProp.checked} required={elProp.required}/> 
                      <span>{elProp.label}</span>
                  </div>   
          )
        },
      elProps:[
          {   
              id: 'checkbox_'+ Math.random().toString(36).substring(2,7),
              label:'Checkbox',
              type:'checkbox',
              name:'checkbox',
              checked:false,
              required: true
          }
      ],
      styles: `
      .checkbox-element {padding:10px; margin-left:40px; width:450px}
      .input-checkbox-element {padding:10px; font-size:14px}
    `,
      stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius'],
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:elProps', this.handleChangeProps);
    },
    handleChangeProps(e) {
      const comps=this.model.get('components');
      const elProp=this.model.get('elProps')[0];
      while (comps.length > 0) {
        comps.pop();
      };
      const item=
      <div>
        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-checkbox-element" checked={elProp.checked} required={elProp.required}/> 
        <span>{elProp.label}</span>
      </div>;
      comps.push(item);
      this.render();
    },
  }
};

export default checkboxEl;
