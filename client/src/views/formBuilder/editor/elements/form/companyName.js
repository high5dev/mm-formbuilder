const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let companyNameEl = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('company-name-element')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'company-name-element', id:'company-name-element' + new Date().getTime()},
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <div>
                          <label for={elProp.id}>{elProp.label}</label>
                        </div>
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-company-element" placeholder={elProp.placeholder} required={elProp.required}/> 
                    </div>   
            )
          },
        elProps:[
            {   
                id: 'company_name_'+ new Date().getTime(),
                label:'Company name',
                type:'text',
                name:'company name',
                placeholder:'Enter your company name.',
                required: true
            }
        ],
        styles: `
        .company-name-element {padding:10px; display:flex; justify-content:space-around}
        .company-name-label{margin-bottom:10px}
        .input-company-element {padding:10px; font-size:14px; width:480px}
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
          <div class="company-name-label">
            <label for={elProp.id}>{elProp.label}</label>
          </div>
          <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-phone-element" placeholder={elProp.placeholder} required={elProp.required}/> 
        </div>;
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default companyNameEl;
  