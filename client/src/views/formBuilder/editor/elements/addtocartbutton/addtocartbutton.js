let addtocartbutton = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('addtocartbutton')),
  model: {
    defaults: {
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'addtocartbutton' },
      components: (props) => {
        return `
        <button class="addbutton">
          <span class="carttext">Add to Cart</span>
        </button>
      `;
      },
      // viewSplit: 'true',
      // viewLabel: 'true',
      traits: [
        // {
        //   type: 'checkbox',
        //   name: 'viewSplit',
        //   changeProp: true,
        //   valueTrue: 'YES',
        //   valueFalse: 'NO',
        // },
        // {
        //   type: 'checkbox',
        //   name: 'viewLabel',
        //   changeProp: true,
        //   valueTrue: 'YES',
        //   valueFalse: 'NO',
        // },
      ],
      styles: `
        .addtocartbutton {
          height: 55px;
          width: 200px;
        }
        .addbutton {
          color: #FFFFFF;
          background-color: #384AD3;
          border-width: 0;
          width: 100%;
          height: 100%;
        }
        .carttext {
          margin: 0 auto;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          line-height: 1.5;
          display: block;
        }
      `,
      script: function () {

      }
    },
  },
};

export default addtocartbutton;
