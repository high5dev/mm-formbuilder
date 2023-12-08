const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let subscribeEl = {
    isComponent: el => el.tagName === 'div',
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'subscribe-element' },
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <input type='checkbox' id="subscribe-checkbox" required={elProp.required} checked={elProp.checked}/>
                        <label className='ms-1' htmlFor='subscribe-checkbox'>{elProp.label}</label>
                    </div>
                    
            )
          },
        elProps:[
            {   
                id: 'subscribe'+ Math.random().toString(36).substring(2,7),
                name:'subscribe',
                label:'Yes, subscribe me to your newsletter.',
                checked:false,
                required: false
            }
        ],
        styles: `
        .subscribe-element {padding:10px; width:480px; margin-left:40px}
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
            <input type='checkbox' id="subscribe-checkbox" required={elProp.required} checked={elProp.checked}/>
            <label className='ms-1' htmlFor='subscribe-checkbox'>{elProp.label}</label>
        </div>
        
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default subscribeEl;
  