let linkButton = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('link-element')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'link-element', id:'link-element'+new Date().getTime()},
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            return(
                <div class="link-parent-element">
                    <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-link-element" value={elProp.label}/> 
                </div>  
            )
          },
        elProps:[
            {   
                id: 'link_'+ new Date().getTime(),
                label:'Button',
                type:'button',
                name:'link_'+ new Date().getTime(),
                linkType:'button',
                tab:'_blank',
                Url:''
            }
        ],
        traits: [
            {
                type: 'page-link',
                name: 'Attributes',
                changeProp: true,
                min: 1,
            },
          ],
        styles: `
        .link-element {padding:5px; width:120px}
        .link-parent-element {display:flex; justify-content:space-around}
        .input-link-element {padding:10px; font-size:14px; width:100px; background-color:#174ae7; color:white; border:1px solid}
        .link-submit-element{text-decoration:none}
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
        console.log('elProp', elProp)
        while (comps.length > 0) {
          comps.pop();
        };
        let item;
        if(elProp.linkType==='button'){
            item=
              <div class="link-parent-element">
                <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-link-element" value={elProp.label}/> 
              </div>;
        }
        else{
            const target=elProp.tab;
            if(elProp.linkType==='external link'){
                const _href=elProp.Url;
                item=
                <a href={_href} class="link-submit-element" target={target}>
                    <div class="link-parent-element">
                    <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-link-element" value={elProp.label}/> 
                    </div>
                </a>
            }
            if(elProp.linkType==='mail'){
                const mail_href='mailto:'+elProp.Url;
                item=
                <a href={mail_href} class="link-submit-element" target={target}>
                    <div class="link-parent-element">
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-link-element" value={elProp.label}/> 
                    </div>
                </a>
            }
            if(elProp.linkType==='pages'){
                item=
                    <a href={elProp.Url} class="link-submit-element" target={target}>
                        <div class="link-parent-element">
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-link-element" value={elProp.label}/> 
                        </div>
                    </a>
            }
            if(elProp.linkType==='phone'){
                const tel_href='tel:'+elProp.Url;
                item=
                <a href={tel_href} class="link-submit-element" target={target}>
                    <div class="link-parent-element">
                        <input id={elProp.id} type={elProp.type} name={elProp.name} class="input-link-element" value={elProp.label}/> 
                    </div>
                </a>
            }
        }

        comps.push(item);
        this.render();
      },
    }
  };
  
  export default linkButton;
    