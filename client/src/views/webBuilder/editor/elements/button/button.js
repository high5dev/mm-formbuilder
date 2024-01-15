let linkButton = {
  isComponent: (el) => el.tagName === 'DIV' && el.classList.contains('link-element'),
  model: {
    defaults: {
      tagName: 'div',
      draggable: '*',
      droppable: false,
      selectable: true,
      highlightable: true,
      attributes: { class: 'link-element', id: 'link-element' + new Date().getTime() },
      components: (props) => {
        const elProp = props.attributes.elProps[0];
        return (
          <div
            id={elProp.id}
            type="submit"
            name={elProp.name}
            class={`input-link-element theme-button-${elProp.theme}`}
          >
            {elProp.label}
          </div>
        );
      },
      elProps: [
        {
          id: 'link_' + new Date().getTime(),
          label: 'Button',
          type: 'button',
          name: 'link_' + new Date().getTime(),
          theme: 'primary',
          linkType: 'button',
          tab: '_blank',
          icon: 'None',
          iconDirection: 'fa-roate-0',
          Url: ''
        }
      ],
      traits: [
        {
          type: 'page-link',
          name: 'Attributes',
          changeProp: true,
          min: 1
        }
      ],
      styles: `
        .link-element {width: fit-content; min-width:120px; padding:5px}
        .link-element-icon {margin-right:10px}
        .link-parent-element {display:flex; justify-content:space-around}
        .input-link-element {width:fit-content; min-width:120px; padding:10px; border:1px solid; text-align:center}
        .link-submit-element{text-decoration:none; width:fit-content; color:white; min-width:120px; display:block}
      `,
      stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
    }
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:elProps', this.handleChangeProps);
    },
    handleChangeProps(e) {
      const comps = this.model.get('components');
      const elProp = this.model.get('elProps')[0];
      while (comps.length > 0) {
        comps.pop();
      }
      let item;
      if (elProp.linkType === 'button') {
        if (elProp.icon != 'None') {
          item = (
            <div
              id={elProp.id}
              name={elProp.name}
              class={`input-link-element theme-button-${elProp.theme}`}
            >
              <span class="link-element-icon">
                <i class={`${elProp.icon} ${elProp.iconDirection}`}></i>
              </span>
              {elProp.label}
            </div>
          );
        } else {
          item = (
            <div
              id={elProp.id}
              name={elProp.name}
              class={`input-link-element theme-button-${elProp.theme}`}
            >
              {elProp.label}
            </div>
          );
        }
      } else {
        const target = elProp.tab;
        if (elProp.linkType === 'external link') {
          const _href = elProp.Url;
          if (elProp.icon != 'None') {
            item=<a
              href={_href}
              class={`link-submit-element`}
              target={target}
              id={elProp.id}
              name={elProp.name}
            >
              <div
                id={elProp.id}
                name={elProp.name}
                class={`input-link-element theme-button-${elProp.theme}`}
              >
                <span class="link-element-icon">
                  <i class={`${elProp.icon} ${elProp.iconDirection}`}></i>
                </span>
                {elProp.label}
              </div>
            </a>;
          } else {
            item = (
              <a
                href={_href}
                class={`link-submit-element`}
                target={target}
                id={elProp.id}
                name={elProp.name}
              >
                <div
                  id={elProp.id}
                  name={elProp.name}
                  class={`input-link-element theme-button-${elProp.theme}`}
                >
                  {elProp.label}
                </div>
              </a>
            );
          }
        } else if (elProp.linkType === 'mail') {
          const mail_href = 'mailto:' + elProp.Url;
          if(elProp.icon!='None'){
            item = (
              <a
                href={mail_href}
                class={`link-submit-element`}
                target={target}
                id={elProp.id}
                name={elProp.name}
              >
                           <div
                id={elProp.id}
                name={elProp.name}
                class={`input-link-element theme-button-${elProp.theme}`}
              >
                <span class="link-element-icon">
                  <i class={`${elProp.icon} ${elProp.iconDirection}`}></i>
                </span>
                {elProp.label}
              </div>
              </a>
            );
          }
          else{
            item=<a
              href={mail_href}
              class={`link-submit-element`}
              target={target}
              id={elProp.id}
              name={elProp.name}
            >
                  <div
                  id={elProp.id}
                  name={elProp.name}
                  class={`input-link-element theme-button-${elProp.theme}`}
                >
                  {elProp.label}
                </div>
            </a>
          }
        } else if (elProp.linkType === 'pages') {
          if(elProp.icon!='None'){
            item = (
              <a
                href={elProp.Url}
                class={`link-submit-element`}
                target={target}
                id={elProp.id}
                name={elProp.name}
              >
               <div
                id={elProp.id}
                name={elProp.name}
                class={`input-link-element theme-button-${elProp.theme}`}
              >
                <span class="link-element-icon">
                  <i class={`${elProp.icon} ${elProp.iconDirection}`}></i>
                </span>
                {elProp.label}
              </div>
              </a>
            )
          }
          else{
            item = (
              <a
                href={elProp.Url}
                class={`link-submit-element`}
                target={target}
                id={elProp.id}
                name={elProp.name}
              >
               <div
                id={elProp.id}
                name={elProp.name}
                class={`input-link-element theme-button-${elProp.theme}`}
              >
                {elProp.label}
              </div>
              </a>
            )
          };
        } else if (elProp.linkType === 'phone') {
          const tel_href = 'tel:' + elProp.Url;
          if(elProp.icon!='None'){
            item = (
              <a
                href={tel_href}
                class={`link-submit-element`}
                target={target}
                id={elProp.id}
                name={elProp.name}
              >
  
  <div
                id={elProp.id}
                name={elProp.name}
                class={`input-link-element theme-button-${elProp.theme}`}
              >
                <span class="link-element-icon">
                  <i class={`${elProp.icon} ${elProp.iconDirection}`}></i>
                </span>
                {elProp.label}
              </div>
  
              </a>
            );
          }
          else{
            item = (
              <a
                href={tel_href}
                class={`link-submit-element`}
                target={target}
                id={elProp.id}
                name={elProp.name}
              >
  
             <div
                id={elProp.id}
                name={elProp.name}
                class={`input-link-element theme-button-${elProp.theme}`}
              >
                {elProp.label}
              </div>
  
              </a>
            );
          }
        }
      }
      console.log('item================', item);
      comps.push(item);
      this.render();
    }
  }
};

export default linkButton;
