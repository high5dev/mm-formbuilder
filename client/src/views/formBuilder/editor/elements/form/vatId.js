const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let vatIDEl = {
    isComponent: el => el.tagName === 'div',
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'vat-id-element' },
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <div class="vat-id-label">
                          <label for={elProp.id}>{elProp.label}</label>
                        </div>
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-vat-id" placeholder={elProp.placeholder} required={elProp.required}/> 
                    </div>   
            )
          },
        elProps:[
            {   
                id: 'vat_id_'+ Math.random().toString(36).substring(2,7),
                label:'VAT ID',
                type:'text',
                name:'vat id',
                placeholder:'Enter your VAT ID.',
                required: true
            }
        ],
        styles: `
        .vat-id-element{padding:10px; display:flex; justify-content:space-around}
        .input-vat-id {padding:10px; font-size:14px; width:480px}
        .vat-id-label{margin-bottom:10px}
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
          <div class="vat-id-label">
            <label for={elProp.id}>{elProp.label}</label>
          </div>
          <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-vat-id" placeholder={elProp.placeholder} required={elProp.required}/> 
        </div>;
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default vatIDEl;
  