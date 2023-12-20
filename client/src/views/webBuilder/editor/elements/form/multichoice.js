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
          const elProp=elProps[0];
          return(
            <div class="multi-choice-container">
              <div class='multi-choice-title'>
                <label for={elProp.name}>{elProp.name}</label>
              </div>
              <div>
                {
                  elProps && elProps.map((elProp)=>{
                    return(
                          <div>
                            <label><input type={elProp.type} class="input-single-choice-item"  id={elProp.id} name={elProp.name} value={elProp.label}/>{elProp.label}</label>
                          </div>
                    )

                  })
                }
              </div>
            </div>
          )
        },
      elProps:[
          {   
              id: 'multi_choice'+ new Date().getTime(),
              label:'Option1',
              type:'checkbox',
              name:'Multi Choice',
              checked:true
          },
          {   
            id: 'multi_choice'+ new Date().getTime(),
            label:'Option2',
            type:'checkbox',
            name:'Multi Choice',
            checked:false
          },
          {   
            id: 'multi_choice'+new Date().getTime(),
            label:'Option3',
            type:'checkbox',
            name:'Multi Choice',
            checked:false
          }
      ],
      styles: `
      .multi-choice-element {padding:10px; margin-left:40px; display:flex; justify-content:space-around}
      .multi-choice-title {margin-bottom:10px}
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
      const elProp=elProps[0];
      while (comps.length > 0) {
        comps.pop();
      };
      comps.push(
        <div class="multi-choice-container">
              <div class='multi-choice-title'>
                <label for={elProp.name}>{elProp.name}</label>
              </div>
              <div>
                  {
                    elProps && elProps.map((elProp)=>{
                      return(
                            <div>
                              <label><input type={elProp.type} id={elProp.id} name={elProp.name} checked={elProp.checked} value={elProp.label}/>{elProp.label}</label>
                            </div>
                      )
            
                    })
                }
              </div>

        </div>
      );
      this.render();
    },
  }
};

export default multiChoiceEl;
