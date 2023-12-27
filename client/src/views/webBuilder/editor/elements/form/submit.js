let submitButton = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('submit-element')),
  model: {
    defaults: {
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
              isButton:true,
              isUrl:false,
              isNewTab:false,
              isPage:false,
              pageUrl:{label:'', value:''},
              isEmail:false,
              email:'',
              isCall:false,
              callNumber:'',
              isDownload:false,
              fileUrl:'',
              url:'',
          }
      ],
      styles: `
      .submit-element {padding:10px; display:flex; justify-content:space-around}
      .submit-parent-element {display:flex; justify-content:space-around}
      .input-submit-element {padding:10px; font-size:14px; width:100px; background-color:#174ae7; color:white; border:1px solid}
      .message{text-align:center; margin-top:10px; display:none}
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
      let item;
      if(elProp.isButton){
          item=
          <div>
            <div class="submit-parent-element">
              <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
            </div>
            <div id="message-container" class="message">{elProp.description}</div>
          </div>;
      }
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
      if(elProp.isEmail){
        const mail_href='mailto:'+elProp.email;
        item=
        <a href={mail_href} class="submit-link-element" target="_blank">
          <div>
            <div class="submit-parent-element">
              <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
            </div>
          </div>
        </a>
      }
      if(elProp.isPage){
        item=
          <a href={elProp.pageUrl.value} class="submit-link-element" target="_blank">
            <div>
              <div class="submit-parent-element">
                <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
              </div>
            </div>
          </a>
      }
      if(elProp.isCall){
        const tel_href='tel:'+elProp.email;
        item=
        <a href={tel_href} class="submit-link-element" target="_blank">
          <div>
            <div class="submit-parent-element">
              <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
            </div>
          </div>
        </a>
      }
      if(elProp.isDownload){
        item=
        <a href={elProp.fileUrl} file={true} class="submit-link-element" target="_blank" raw_url={elProp.fileUrl}>
          <div>
            <div class="submit-parent-element">
              <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-submit-element" value={elProp.label}/> 
            </div>
          </div>
        </a>
      }

      comps.push(item);
      this.render();
    },
  }
};

export default submitButton;
  