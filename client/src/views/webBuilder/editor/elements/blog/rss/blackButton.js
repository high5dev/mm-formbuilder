let blackButton = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('black-button')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'black-button' },
        components: (props) => {
          return (
            <img src="https://i.ibb.co/jH2JzG3/rss-1.png" width="40px" height="40px"/>
          );
        },
  
        styles: `
            .black-button{padding:5px; width:40px; height:40px}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
    }
  };
  
  export default blackButton;
  