let grayButton = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('gray-button')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'gray-button' },
        components: (props) => {
          return (
            <img src="https://i.ibb.co/VBQS6m8/rss-2.png" width="40px" height="40px"/>
          );
        },
  
        styles: `
            .gray-button{padding:5px; width:40px; height:40px}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
    }
  };
  
  export default grayButton;
  