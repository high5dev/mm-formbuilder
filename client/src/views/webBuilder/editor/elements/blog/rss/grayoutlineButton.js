let grayoutlineButton = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('gray-outline-button')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'gray-outline-button' },
        components: (props) => {
          return (
            <img src="https://i.ibb.co/JQqFgcX/rss-4.png" width="40px" height="40px"/>
          );
        },
  
        styles: `
            .gray-outline-button{padding:5px; width:40px; height:40px}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
    }
  };
  
  export default grayoutlineButton;
  