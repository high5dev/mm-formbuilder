const script = function(props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let multiChoiceEl = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('multi-choice-element')),
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'multi-choice-element', id:'multi-choice-element'+new Date().getTime() },
      components: (props) => {
          const elProps = props.attributes.elProps;
          return(
            <div class="multi-choice-container">
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
              id: 'multi_choice'+ new Date().getTime(),
              label:'Option1',
              type:'radio',
              name:'option',
              checked:true
          },
          {   
            id: 'multi_choice'+ new Date().getTime(),
            label:'Option2',
            type:'radio',
            name:'option',
            checked:false
          },
          {   
            id: 'multi_choice'+new Date().getTime(),
            label:'Option3',
            type:'radio',
            name:'option',
            checked:false
          }
      ],
      styles: `
      .multi-choice-element {padding:10px; margin-left:40px; display:flex; justify-content:space-around}
      .multi-choice-container{width:480px}
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
        <div class="multi-choice-container">
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
