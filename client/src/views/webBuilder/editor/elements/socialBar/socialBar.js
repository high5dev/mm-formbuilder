let socialBar = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('social-bar')),
  model: {
    defaults: {
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'social-bar' },
      components: (props) => {
        const socialList = props.attributes.socialList;
        return (
          <div class="social-bar-container">
            {
              socialList && socialList.map((socialItem)=>{
                return(
                  `
                  <a href=${socialItem.url} target='_parent'>
                    <img src=${socialItem.image} class="social-icon" alt=${socialItem.name}>
                  </a>
                  `
                )
              })
            }
          </div>
        )
      },
      socialList: [
        {
          name: 'Instagram',
          url: 'https://www.instagram.com',
          image: 'https://i.ibb.co/XWvs3qw/instagram.png',
          type: 'webaddress'
        },
        {
          name: 'Facebook',
          url: 'https://www.facebook.com',
          image: 'https://i.ibb.co/0BCsZKL/facebook-1.png',
          type: 'webaddress'
        },
        {
          name: 'Twitter',
          url: 'https://www.twitter.com',
          image: 'https://i.ibb.co/BCwkqfN/twitter.png',
          type: 'webaddress'
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com',
          image: 'https://i.ibb.co/8sL8mF4/linkedin.png',
          type: 'webaddress'
        },
        {
          name: 'Youtube',
          url: 'https://www.youtube.com',
          image: 'https://i.ibb.co/tm0rJ2c/youtube-1.png',
          type: 'webaddress'
        },
        {
          name: 'TikTok',
          url: 'https://www.tiktok.com',
          image: 'https://i.ibb.co/ZWnZPqr/tiktok.png',
          type: 'webaddress'
        }
      ],
      traits: [
        {
          type: 'social-link',
          name: 'socialList',
          changeProp: true,
          min: 1,
        },
      ],
      
      styles: `
        .social-bar {display: flex; flex-direction: row; width: fit-content; height:60px}
        .social-bar-container{display:flex}
        .social-icon {width: 40px; height: 40px; margin: 5px; border-radius: 5px;}
      `,
      stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius'],
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:socialList', this.handleChangeSocialList);
    },
    handleChangeSocialList() {
      let socialList = this.model.get('socialList');
      let components=this.model.components().models;
      let compTemps=[...components];
      this.model.components.models=[];
      let compTemp=compTemps[0];
      let tempComponents=[];
      for(let i=0; i<socialList.length; i++){
        let tempTmp = compTemp.clone();
        const social_item=socialList[i];
        tempTmp.setAttributes({href:social_item.url});
        tempTmp.attributes.href=social_item.url;
        tempTmp.components().models[0].setAttributes({src:social_item.image});
        tempTmp.components().models[0].attributes.src=social_item.image;
        tempComponents.push(tempTmp)
      };
      let comps = this.model.get('components');
      while (comps.length > 0) {
        comps.pop();
      };
      for(let i=0; i<tempComponents.length; i++){
        comps.push(tempComponents[i]);
      }
      
      this.render();
    },
  }
};

export default socialBar;
