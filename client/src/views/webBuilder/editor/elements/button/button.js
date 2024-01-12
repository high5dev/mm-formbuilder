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
                <input type='button' id={elProp.id} name={elProp.name} value={elProp.label} class={`input-link-element theme-button-${elProp.theme}`}/> 
            )
          },
        elProps:[
            {   
                id: 'link_'+ new Date().getTime(),
                label:'Button',
                type:'button',
                name:'link_'+ new Date().getTime(),
                theme:'primary',
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
        .link-element {width: fit-content; min-width:120px}
        .link-parent-element {display:flex; justify-content:space-around}
        .input-link-element {width:fit-content; min-width:120px; padding:10px; border:1px solid; text-align:center}
        .link-submit-element{text-decoration:none; width:fit-content; color:white; min-width:120px}
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
        if(elProp.linkType==='button'){
            item=
            <input type='button' id={elProp.id} name={elProp.name} value={elProp.label} class={`input-link-element theme-text-default theme-button-${elProp.theme}`}/> 
        }
        else{
            const target=elProp.tab;
            if(elProp.linkType==='external link'){
                const _href=elProp.Url;
                item=
                <a href={_href} class={`link-submit-element theme-text-default theme-button-${elProp.theme}`} target={target} id={elProp.id} name={elProp.name}>
                    {elProp.label}
                </a>
            }
            else if(elProp.linkType==='mail'){
                const mail_href='mailto:'+elProp.Url;
                item=
                <a href={mail_href} class={`link-submit-element theme-text-default theme-button-${elProp.theme}`} target={target} id={elProp.id} name={elProp.name}>
                    {elProp.label}
                </a>
            }
            else if(elProp.linkType==='pages'){
                item=
                    <a href={elProp.Url} class={`link-submit-element theme-text-default theme-button-${elProp.theme}`} target={target} id={elProp.id} name={elProp.name}>
                      {elProp.label}
                    </a>
            }
            else if(elProp.linkType==='phone'){
                const tel_href='tel:'+elProp.Url;
                item=
                <a href={tel_href} class={`link-submit-element theme-text-default theme-button-${elProp.theme}`} target={target} id={elProp.id} name={elProp.name}>
                    {elProp.label}
                </a>
            }
        }
        comps.push(item);
        console.log('comps', comps);
        this.render();
      },
    }
  };
  
  export default linkButton;
    