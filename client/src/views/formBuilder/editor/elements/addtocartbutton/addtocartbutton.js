let addtocartbutton = {
  isComponent: el => el.tagName === 'addtocartbutton',
  model: {
    defaults: {
      tagName: 'addtocartbutton',
      draggable: '*',
      droppable: false,
      attributes: { class: 'addtocartbutton', productId: "" },
      components: (props) => {
        return `
          <span class="carttext">Add to Cart</span>
        `;
      },
      productId: "",
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
          color: #FFFFFF;
          background-color: #384AD3;
          border-width: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
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
  view: {
    init() {
      this.listenTo(this.model, 'change:productId', this.handleChangeProductId);
    },

    handleChangeProductId(e) {
      this.model.setAttributes({ class: 'addtocartbutton', 'productId': this.model.get('productId') });
    }
  }
};

export default addtocartbutton;
