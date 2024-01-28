const script = function(props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let dropdownEl = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('dropdown-element')),
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'dropdown-element' },
      components: (props) => {
          const elProps = props.attributes.elProps;
          return(
            <div>
              <div>
                <select id={elProps[0].id} name={elProps[0].name} class="select-dropdown-element">
                  {
                  elProps && elProps.map((elProp)=>{
                    return(
                        <option value={elProp.label}>{elProp.label}</option>
                    )
      
                  })
                  }
                </select>
              </div>
            </div>

          )

      },
      elProps:[
          {   
            id: 'dropdown_'+ new Date().getTime(),
            name:'select',
            type:'select',
            label:'Option1',
            value:'Option1',
          },
          {
            id: 'dropdown_'+ new Date().getTime(),
            name:'select',
            type:'select',
            label:'Option2',
            value:'Option2',
          },
          {  
            id: 'dropdown_'+ new Date().getTime(),
            name:'select',
            type:'select', 
            label:'Option3',
            value:'Option3',
          },

      ],
      styles: `
      .dropdown-element {padding:10px; display:flex; justify-content:space-around}
      .select-dropdown-element {fontSize:16px; padding:10px; width:200px}
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
          <div>
            <select id={elProps[0].id} name={elProps[0].name} class="select-dropdown-element">
              {
              elProps && elProps.map((elProp)=>{
                return(
                    <option value={elProp.label}>{elProp.label}</option>
                )

              })
              }
            </select>
          </div>
        </div>
      );
      this.render();
    },
  }
};

export default dropdownEl;
