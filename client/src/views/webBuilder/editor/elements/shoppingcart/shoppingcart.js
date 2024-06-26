let shoppingcart = {
  isComponent: el => el.tagName === 'DIV' && el.classList.contains('shoppingcart'),
  model: {
    defaults: {
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'shoppingcart' },
      components: (props) => {
        return `
        <svg  class="shoppingcartDiv" data-gjs-selectable="false"
        draggable="false"
        data-gjs-hoverable="false" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="5.7 0 105.5 126.1" preserveAspectRatio="xMinYMax meet" data-hook="svg-icon-1">
          <path data-gjs-selectable="false"
          draggable="false"
          data-gjs-hoverable="false" style="fill: #384AD3;" d="M99.8 28.4c0-1.2-0.9-2-2.1-2h-15c0 3.2 0 7.6 0 8.2 0 1.5-1.2 2.6-2.6 2.9 -1.5 0.3-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.9 0-4.7 0-8.2H40.1c0 3.2 0 7.3 0 8.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-0.6 0-5 0-8.2h-15c-1.2 0-2 0.9-2 2L8.3 124c0 1.2 0.9 2.1 2.1 2.1h96.3c1.2 0 2.1-0.9 2.1-2.1L99.8 28.4z"></path>
          <path data-gjs-selectable="false"
          draggable="false"
          data-gjs-hoverable="false" style="fill: #384AD3;" d="M59.1 5.9c-2.9 0-2 0-2.9 0 -2 0-4.4 0.6-6.4 1.5 -3.2 1.5-5.9 4.1-7.6 7.3 -0.9 1.8-1.5 3.5-1.8 5.6 0 0.9-0.3 1.5-0.3 2.3 0 1.2 0 2.1 0 3.2 0 1.5-1.2 2.9-2.6 2.9 -1.5 0-2.9-0.9-3.2-2.3 0-0.3 0-0.3 0-0.6 0-1.2 0-2.3 0-3.5 0-3.2 0.9-6.4 2-9.4 1.2-2.3 2.6-4.7 4.7-6.4 3.2-2.9 6.7-5 11.1-5.9C53.5 0.3 55 0 56.7 0c1.5 0 2.9 0 4.4 0 2.9 0 5.6 0.6 7.9 1.8 2.6 1.2 5 2.6 6.7 4.4 3.2 3.2 5.3 6.7 6.4 11.1 0.3 1.5 0.6 3.2 0.6 4.7 0 1.2 0 2.3 0 3.2 0 1.5-1.2 2.6-2.6 2.9s-2.9-0.9-3.2-2.3c0-0.3 0-0.3 0-0.6 0-1.2 0-2.6 0-3.8 0-2.3-0.6-4.4-1.8-6.4 -1.5-3.2-4.1-5.9-7.3-7.3 -1.8-0.9-3.5-1.8-5.9-1.8C61.1 5.9 59.1 5.9 59.1 5.9L59.1 5.9z"></path>
          <text data-gjs-selectable="false"
          draggable="false"
          data-gjs-hoverable="false" x="58.5" y="77" dy=".35em" text-anchor="middle" class="items-count" data-hook="items-count" style="fill: white;
          font-size: 50px;">0</text>
        </svg>
      `;
      },
      cartItemCount: 0,
      // viewSplit: 'true',
      // viewLabel: 'true',
      traits: [
        {
          type: 'string',
          name: 'size',
          changeProp: true,
          min: 1,
        }
      ],
      styles: `
      .shoppingcart {
        max-width: 50px !important;
      }
      `,
      script: function () {

      }
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:cartItemCount', this.handleChangeCartItemCount);
      this.listenTo(this.model, 'change:size', this.handleChangeSize);
    },

    handleChangeCartItemCount(e) {
      this.model.get('components').find('.items-count')[0].innerText = this.model.get('cartItemCount');
    },

    handleChangeSize(e) {
      const newSize = this.model.get('size');

      // Update the width of the shoppingcart element based on the new size
      // const shoppingcartElement = this.el.querySelector('.shoppingcart');
      // if (shoppingcartElement) {
      // this.el.style.width = `${newSize}px`;
      // }
      this.model.setAttributes({ class: 'shoppingcart', style: `width: ${newSize}px;display: block;` })
      this.render();
    }
  }
};

export default shoppingcart;
