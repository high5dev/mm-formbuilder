let menu = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('menu')),
  model: {
    defaults: {
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'menu', id: `menu-${new Date().getTime()}` },
      components: (props) => {
        const menus = props.attributes.menus;

        let components = '';
        menus.map(m => {
          components = components + `<a class="menu-item" href="${m.pageLink}">${m.name}</a>`
        });

        return components;
      },
      menus: [
        {
          name: 'Home',
          pageLink: '',
          isActive: true,
        },
        {
          name: 'About Us',
          pageLink: '',
          isActive: false,
        },
        {
          name: 'Contact',
          pageLink: '',
          isActive: false,
        }
      ],
      traits: [
        {
          type: 'menu',
          name: 'menus',
          changeProp: true,
        }
      ],
      styles: `.menu {display: flex; padding: 10px; width: fit-content; height: fit-content}
        .menu-item {margin-right: 15px; margin-left: 15px}  
      `,
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:menus', this.handleChangeMenus);
    },
    handleChangeMenus(e) {
      const comps = this.model.get('components');
      const menus = this.model.get('menus');
      comps.reset();
      menus.map(m => {
        comps.push(<a href={m.pageLink} class="menu-item">{m.name}</a>);
      });
      this.render();
    },
  }
};

export default menu;
