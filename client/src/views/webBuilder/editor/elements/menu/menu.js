let menu = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('trait-menu')),
  model: {
    defaults: {
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'trait-menu', id: `trait-menu-${new Date().getTime()}` },
      components: (props) => {
        const menus = props.attributes.menus;
        let components = '';
        menus.map(m => {
          let subMenusStr='';
          let subMenusContainer='';
          if(m.subMenus && m.subMenus.length>0){
            m.subMenus.map((_subMenu)=>{
              subMenusStr+=`<a class="trait-submenu-item" href="${_subMenu.page}">${_subMenu.name}</a>`;
            });
            subMenusContainer=`<div class="trait-submenus-container">${subMenusStr}</div>`
          };
          components = components + `<div class="trait-menu-item-container"><a class="trait-menu-item" href="${m.pageLink}">${m.name}</a>${subMenusContainer}</div>`
        });

        return components;
      },
      menus: [
        {
          name: 'Home',
          pageLink: '',
          isActive:false,
          subMenus:[]
        },
        {
          name: 'About Us',
          pageLink: '',
          isActive:false,
          subMenus:[]
        },
        {
          name: 'Contact',
          pageLink: '',
          isActive:false,
          subMenus:[]
        }
      ],
      traits: [
        {
          type: 'menu',
          name: 'menus',
          isActive:false,
          changeProp: true,
        }
      ],
      subMenus:[],
      styles: `
        .trait-menu {display: flex; padding: 10px; width: fit-content; height: fit-content}
        .trait-menu-item-container{display: flex; flex-direction:column; align-items:center}
        .trait-menu-item {margin-right: 15px; margin-left: 15px; display:block; text-decoration:none} 
        .trait-submenus-container{padding:10px; border:1px solid gray; min-width:150px;display:none}
        .trait-submenu-item{display:block; text-decoration:none} 
      `,
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:menus', this.handleChangeMenus);
      this.listenTo(this.model, 'change:subMenus', this.handleChangeMenus);
    },
    handleChangeMenus(e) {
      const comps = this.model.get('components');
      const menus = this.model.get('menus');
      comps.reset();
      menus.map(m => {
        let subMenusStr='';
        let subMenusContainer='';
        if(m.subMenus && m.subMenus.length>0){
          m.subMenus.map((_subMenu)=>{
            subMenusStr+=`<a class="trait-submenu-item" href="${_subMenu.page}">${_subMenu.name}</a>`;
          })
          subMenusContainer=`<div class="trait-submenus-container">${subMenusStr}</div>`
        };
        comps.push( `<div class="trait-menu-item-container"><a class="trait-menu-item" href="${m.pageLink}">${m.name}</a>${subMenusContainer}</div>`);
      });
      this.render();
    },
  }
};

export default menu;
