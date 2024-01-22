const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let lastNameEl = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('last-name-element')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'last-name-element', id:'last_name_element'+ new Date().getTime() },
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <div class="last-name-label">
                          <label>{elProp.label}</label>
                        </div>
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-last-name-element" placeholder={elProp.placeholder} required={elProp.required}/> 
                    </div>
                    
            )
          },
        elProps:[
            {   
                id:'last_name'+new Date().getTime(),
                label:'Last name',
                type:'text',
                name:'lastname',
                placeholder:'Enter your last name',
                required: true
            }
        ],
        styles: `
        .last-name-element {padding:10px; display:flex; justify-content:space-around}
        .last-name-label{margin-bottom:10px}
        .input-last-name-element {padding:10px; font-size:14px; width:480px}
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
          <div class="last-name-label">
            <label>{elProp.label}</label>
          </div>
          <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-last-name-element" placeholder={elProp.placeholder} required={elProp.required}/> 
        </div>;
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default lastNameEl;
  