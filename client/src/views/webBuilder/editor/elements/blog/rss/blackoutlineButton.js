let blackoutlineButton = {
    isComponent: (el) => el.tagName === 'div',
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'black-outline-button' },
        components: (props) => {
          return (
            <img src="https://i.ibb.co/z7Nh9Cx/rss-3.png" width="40px" height="40px"/>
          );
        },
  
        styles: `
            .black-outline-button{padding:5px; width:40px; height:40px}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
    }
  };
  
  export default blackoutlineButton;
  