import { ChangeDesc } from "@uiw/react-codemirror";

const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let submitButton = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('submit-element')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'submit-element', id:'submit-element'+new Date().getTime() },
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
              <div>
                <div class="submit-parent-element">
                    <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
                </div>
                <div id="message-container" class="message" >{elProp.description}</div>   
              </div>    
            )
          },
        elProps:[
            {   
                id: 'submit_'+ new Date().getTime(),
                label:'Submit',
                type:'button',
                name:'submit_'+ new Date().getTime(),
                description:'Thanks, we received your submission.',
                isUrl:false,
                isNewTab:false,
                isEmail:false,
                emailInput:'',
                isCall:false,
                callInput:'',
                isDownload:false,
                fileUrl:'',
                url:'',
            }
        ],
        styles: `
        .submit-element {padding:10px, width:450px}
        .submit-parent-element {display:flex; justify-content:space-around}
        .input-submit-element {padding:10px; font-size:14px; width:100px; background-color:#174ae7; color:white; border:1px solid}
        .message{text-align:center; margin-top:10px}
        .submit-link-element{text-decoration:none; text-color:black}
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
        console.log('isUrl', elProp.isUrl);
        let item;
        if(elProp.isUrl){
          if(elProp.isNewTab){
              item=
              <a href={elProp.url} class="submit-link-element" target="_blank">
                <div>
                  <div class="submit-parent-element">
                    <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
                  </div>
                </div>
              </a>
          }
          else{
            item=
            <a href={elProp.url} class="submit-link-element">
              <div>
                <div class="submit-parent-element">
                  <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
                </div>
              </div>
            </a>
          }
        }
        else{
          item=
          <div>
            <div class="submit-parent-element">
              <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
            </div>
            <div id="message-container" class="message">{elProp.description}</div>
          </div>;
        }
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default submitButton;
  