const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
  };
  
  let zipcodeEl = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('zipcode-element')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'zipcode-element', id: 'zipcode_element'+new Date().getTime()},
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <div class="zipcode-label">
                          <label for={elProp.id}>{elProp.label}</label>
                        </div>
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-zipcode-element" placeholder={elProp.placeholder} required={elProp.required}/> 
                    </div>   
            )
          },
        elProps:[
            {   
                id: 'zipcode_'+ new Date().getTime(),
                label:'Zipcode',
                type:'text',
                name:'zipcode',
                placeholder:'Enter Zip Code.',
                required: true
            }
        ],
        styles: `
        .zipcode-element {padding:10px; display:flex; justify-content:space-around}
        .zipcode-label{margin-bottom:10px}
        .input-zipcode-element {padding:10px; font-size:14px; width:480px}
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
          <div class="zipcode-label">
            <label for={elProp.id}>{elProp.label}</label>
          </div>
          <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-zipcode-element" placeholder={elProp.placeholder} required={elProp.required}/> 
        </div>;
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default zipcodeEl;
  