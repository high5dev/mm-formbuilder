const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let firstNameEl = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('first-name-element')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'first-name-element', id: 'first_name_element'+new Date().getTime()},
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <div class="first-name-label">
                          <label>{elProp.label}</label>
                        </div>
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-first-name-element" placeholder={elProp.placeholder} required={elProp.required}/> 
                    </div>
                    
            )
          },
        elProps:[
            {   
                id:'first_name'+new Date().getTime(),
                label:'First name',
                type:'text',
                name:'first name',
                placeholder:'Enter your first name',
                required: true
            }
        ],
        styles: `
        .first-name-element {padding:10px; display:flex; justify-content:space-around}
        .first-name-label{margin-bottom:10px}
        .input-first-name-element {padding:10px; font-size:14px; width:480px}
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
          <div class="first-name-label">
            <label>{elProp.label}</label>
          </div>
          <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-first-name-element" placeholder={elProp.placeholder} required={elProp.required}/> 
        </div>;
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default firstNameEl;
  