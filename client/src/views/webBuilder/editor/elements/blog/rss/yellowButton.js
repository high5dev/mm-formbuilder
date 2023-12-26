let yellowButton = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('yellow-button')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'yellow-button' },
        components: (props) => {
          return (
            <img src="https://i.ibb.co/CBwqT6V/rss.png" width="40px" height="40px"/>
          );
        },
  
        styles: `
            .yellow-button{padding:5px; width:40px; height:40px}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
    }
  };
  
  export default yellowButton;
  