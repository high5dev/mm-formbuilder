const script = function(props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let multiChoiceEl = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'multi-choice-element' },
      components: (props) => {
          const elProps = props.attributes.elProps;
          return(
            <div>
              {
              elProps && elProps.map((elProp)=>{
                return(
                      <div>
                         <label><input type={elProp.type} class="input-single-choice-item"  id={elProp.id} name={elProp.name}/>{elProp.label}</label>
                      </div>
                )
  
              })
              }
            </div>
          )
        },
      elProps:[
          {   
              id: 'multi_choice'+ Math.random().toString(36).substring(2,7),
              label:'Option1',
              type:'radio',
              name:'option',
              checked:true
          },
          {   
            id: 'multi_choice'+ Math.random().toString(36).substring(2,7),
            label:'Option2',
            type:'radio',
            name:'option',
            checked:false
          },
          {   
            id: 'multi_choice'+ Math.random().toString(36).substring(2,7),
            label:'Option3',
            type:'radio',
            name:'option',
            checked:false
          }
      ],
      styles: `
      .multi-choice-element {padding:10px; width:450px; margin-left:40px}
      .input-single-choice-item{padding:5px}
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
      const elProps=this.model.get('elProps');
      while (comps.length > 0) {
        comps.pop();
      };
      comps.push(
        <div>
            {
            elProps && elProps.map((elProp)=>{
              return(
                    <div>
                      <label><input type={elProp.type} id={elProp.id} name={elProp.name} checked={elProp.checked}/>{elProp.label}</label>
                    </div>
              )
    
            })
            }
        </div>
      );
      this.render();
    },
  }
};

export default multiChoiceEl;
