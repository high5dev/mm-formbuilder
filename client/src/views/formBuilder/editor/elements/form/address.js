const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let addressEl = {
    isComponent: el => el.tagName === 'div',
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'address-element'},
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <div class="address-label">
                          <label for={elProp.id}>{elProp.label}</label>
                        </div>
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-address-element" placeholder={elProp.placeholder} required={elProp.required}/> 
                    </div>   
            )
          },
        elProps:[
            {   
                id: 'address_'+ Math.random().toString(36).substring(2,7),
                label:'Address',
                type:'text',
                name:'address',
                placeholder:'Enter your address number.',
                required: true
            }
        ],
        styles: `
        .address-element {padding:10px; display:flex; justify-content:space-around}
        .address-label{margin-bottom:10px}
        .input-address-element {padding:10px; font-size:14px; width:480px}
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
          <div class="address-label">
            <label for={elProp.id}>{elProp.label}</label>
          </div>
          <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-address-element" placeholder={elProp.placeholder} required={elProp.required}/> 
        </div>;
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default addressEl;
  