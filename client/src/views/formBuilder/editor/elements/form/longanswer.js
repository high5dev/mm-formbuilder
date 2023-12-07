const script = function(props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let longanswerEl = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'long-answer-element' },
      components: (props) => {
          const elProp = props.attributes.elProps[0];
          return(
                  <div>
                      <div class="long-answer-label">
                        <label for={elProp.id}>{elProp.label}</label>
                      </div>
                      <textarea id={elProp.id} name={elProp.name} class="input-long-answer-element" placeholder={elProp.placeholder} required={elProp.required}/> 
                  </div>
                  
          )
        },
      elProps:[
          {   
              id: 'long_answer'+ Math.random().toString(36).substring(2,7),
              label:'Long answer',
              type:'textarea',
              name:'Long answer',
              placeholder:'Enter your long answer',
              required: true
          }
      ],
      styles: `
      .long-answer-element {padding:10px; display:flex; justify-content:space-around}
      .long-answer-label{margin-bottom:10px}
      .input-long-answer-element {padding:10px; font-size:14px; width:480px}
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
        <div class="long-answer-label">
          <label for={elProp.id}>{elProp.label}</label>
        </div>
        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-short-answer-element" placeholder={elProp.placeholder} required={elProp.required}/> 
      </div>;
      comps.push(item);
      this.render();
    },
  }
};

export default longanswerEl;
