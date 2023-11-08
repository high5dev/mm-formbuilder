const script = function(props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let socialBar = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'social-bar' },
      components: (props) => {
        const socialList = props.attributes.socialList;
        const components = [];

        for (let i = 0; i < socialList; i++) {
          const socialItem = socialList[i];
          components.push(`
            <a href="${socialItem.url}" target="_blank" rel="noreferrer">
              <img
                src="${socialItem.image}"
                alt="${socialItem.name}"
              />
            </a>
          `);
        }
        return components;
      },
      socialList: [
        {
          id: 'instagram',
          name: 'Instagram',
          url: 'https://www.instagram.com',
          image: '',
          type: 'webaddress'
        },
        {
          id: 'facebook',
          name: 'Facebook',
          url: 'https://www.facebook.com',
          image: '',
          type: 'webaddress'
        },
        {
          id: 'twitter',
          name: 'Twitter',
          url: 'https://www.twitter.com',
          image: '',
          type: 'webaddress'
        },
        {
          id: 'linkedin',
          name: 'LinkedIn',
          url: 'https://www.linkedin.com',
          image: '',
          type: 'webaddress'
        },
        {
          id: 'youtube',
          name: 'Youtube',
          url: 'https://www.youtube.com',
          image: '',
          type: 'webaddress'
        },
        {
          id: 'tiktok',
          name: 'TikTok',
          url: 'https://www.tiktok.com',
          image: '',
          type: 'webaddress'
        }
      ],
      traits: [
        {
          type: 'number',
          name: 'socialList',
          changeProp: true,
          min: 1,
        },
      ],
      
      styles: `.social-bar {display: flex; flex-direction: row; justify-content: space-between;}`,
      stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius'],
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:socialList', this.handleChangeSocialList);
    },
    handleChangeSocialList() {
      const comps = this.model.get('components');
      const numPerRow = this.model.get('socialList');
      comps.reset();
      // comps.parent.addStyle({ 'grid-socialList-columns': `repeat(${numPerRow}, 1fr)` })
      this.render();
    },
  }
};

export default socialBar;
