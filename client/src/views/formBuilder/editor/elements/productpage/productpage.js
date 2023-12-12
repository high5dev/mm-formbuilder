let productpage = {
  isComponent: el => el.tagName === 'DIV' && el.classList.contains('productpage'),
  model: {
    defaults: {
      tagName: 'div',
      draggable: true,
      droppable: false,
      attributes: { class: 'productpage', productId: "" },
      components: (props) => {
        return `
          <div class="product-content">
            <img src="https://i.ibb.co/6br0NxL/1.png" class="product-img" />
          </div>
          <div class="product-content">
            <div class="product-name">I'm a product</div>
            <div class="product-price">USD 100</div>
            <div class="product-quantity-title">Quantity</div>
            <input type="number" class="product-quantity" pattern="[0-9]*" data-hook="number-input-spinner-input" aria-label="Quantity" max="99999" min="1" value="1">
            <div class="product-item-cart">Add to cart</div>
            <div class="product-detail>asdf</div>
          </div>
        `;
      },
      productId: "",
      product: {},
      styles: `
        .productpage {
          width: 100%;
          max-width: 1440px;
          padding-left: 20px;
          padding-right: 20px;
          display: flex;
          align-items: center;
        }

        .product-content {
          width: 50%;
        }

        .product-img {
          width: 100%;
        }

        .product-name {
          color: #575757;
          font-size: 32px;
          line-height: 1.2em;
          word-wrap: break-wrap;
        }

        .product-price {
          margin-top: 10px;
          font-size: 20px;
        }

        .product-quantity-title {
          margin-top: 20px;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .product-quantity {
          height: 30px;
        }

        .product-item-cart {
          margin-top: 32px;
          width: 100%;
          height: 40px;
          background-color: #384AD3;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-description {
          margin-top: 24px;
          font-size: 15px;
        }
      `,
      script: function () {

      }
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:productId', this.handleChangeProductId);
      this.listenTo(this.model, 'change:product', this.handleChangeProduct);
    },

    handleChangeProduct(e) {
      let product = this.model.get('product');
      this.model.set('productId', product.id);
    },

    handleChangeProductId(e) {
      this.model.setAttributes({ class: 'productpage', 'productId': this.model.get('productId') });
    }
  }
};

export default productpage;
