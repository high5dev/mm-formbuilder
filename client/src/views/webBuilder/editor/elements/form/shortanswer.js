const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let shortanswerEl = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('short-answer-element')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'short-answer-element', id:'short-answer-element'+new Date().getTime() },
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                    <div>
                        <div class="short-answer-label">
                          <label for={elProp.id}>{elProp.label}</label>
                        </div>
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-short-answer-element" placeholder={elProp.placeholder} required={elProp.required}/> 
                    </div>    
            )
          },
        elProps:[
            {   
                id: 'short_answer'+ new Date().getTime(),
                label:'Short answer',
                type:'text',
                name:'shortanswer',
                placeholder:'Enter your short answer',
                required: true
            }
        ],
        styles: `
        .short-answer-element {padding:10px; display:flex; justify-content:space-around}
        .short-answer-label{margin-bottom:10px}
        .input-short-answer-element {padding:10px; font-size:14px; width:480px}
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
          <div class="short-answer-label">
            <label for={elProp.id}>{elProp.label}</label>
          </div>
          <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-short-answer-element" placeholder={elProp.placeholder} required={elProp.required}/> 
        </div>;
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default shortanswerEl;
  