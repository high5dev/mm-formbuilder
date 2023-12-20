let productpage = {
  isComponent: (el) => el.tagName === 'DIV' && el.classList.contains('productpage'),
  model: {
    defaults: {
      tagName: 'div',
      draggable: true,
      droppable: false,
      attributes: {
        class: 'productpage',
        productId: '',
        fieldnames: 'name,description,price',
        showcartbutton: 1,
        buttontext: 'Add to Cart',
        alignstyle: 'align1',
        buttonstyle: 'style1',
        fillopacity: 100,
        borderwidth: 0,
        buttoncornerradius: 0
      },
      components: (props) => {
        return `
          <div class="product-content" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <img src="https://i.ibb.co/6br0NxL/1.png" class="product-img" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false"/>
          </div>
          <div class="product-content" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <div class="product-name" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false">I'm a product</div>
            <div class="product-price" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false">USD 100</div>
            <div class="product-quantity-title" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false">Quantity</div>
            <input type="number" class="product-quantity" pattern="[0-9]*" data-hook="number-input-spinner-input" aria-label="Quantity" max="99999" min="1" value="1" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false"/>
            <div class="product-item-cart" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false">Add to cart</div>
            <div class="product-detail" draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false">asdf</div>
          </div>
        `;
      },
      productId: '',
      product: {},
      fieldnames: 'name,description,price',
      showcartbutton: 1,
      buttontext: 'Add to Cart',
      alignstyle: 'align1',
      buttonstyle: 'style1',
      fillopacity: 100,
      borderwidth: 0,
      buttoncornerradius: 0,
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
          display: flex;
          flex-direction: column;
        }

        .product-content.align1 {
          align-items: flex-start;
        }
        
        .product-content.align2 {
          align-items: center;
        }

        .product-content.align3 {
          align-items: flex-end;
        }

        .product-img {
          width: 100%;
          height: 100%;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
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

        .product-item-cart.hide {
          display: none;
        }

        .product-description {
          margin-top: 24px;
          font-size: 15px;
        }
      `,
      script: function () {}
    }
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:productId', this.handleChangeProductId);
      this.listenTo(this.model, 'change:product', this.handleChangeProduct);
      this.listenTo(this.model, 'change:fieldnames', this.handleChangeFieldNames);
      this.listenTo(this.model, 'change:showcartbutton', this.handleChangeShowCartButton);
      this.listenTo(this.model, 'change:buttontext', this.handleChangeButtonText);
      this.listenTo(this.model, 'change:alignstyle', this.handleChangeAlignStyle);
      this.listenTo(this.model, 'change:buttonstyle', this.handleChangeButtonStyle);
      this.listenTo(this.model, 'change:fillopacity', this.handleChangeFillOpacity);
      this.listenTo(this.model, 'change:borderwidth', this.handleChangeBorderWidth);
      this.listenTo(this.model, 'change:buttoncornerradius', this.handleChangeButtonCornerRadius);
    },

    handleChangeButtonCornerRadius(e) {
      this.model.addAttributes({ buttoncornerradius: this.model.get('buttoncornerradius') });
      this.handleUpdateComponent();
    },

    handleChangeBorderWidth(e) {
      this.model.addAttributes({ borderwidth: this.model.get('borderwidth') });
      this.handleUpdateComponent();
    },

    handleChangeFillOpacity(e) {
      this.model.addAttributes({ fillopacity: this.model.get('fillopacity') });
      this.handleUpdateComponent();
    },

    handleChangeButtonStyle(e) {
      this.model.addAttributes({ buttonstyle: this.model.get('buttonstyle') });
      this.handleUpdateComponent();
    },

    handleChangeAlignStyle(e) {
      this.model.addAttributes({ alignstyle: this.model.get('alignstyle') });
      this.handleUpdateComponent();
    },

    handleChangeButtonText(e) {
      this.model.addAttributes({ buttontext: this.model.get('buttontext') });
      this.handleUpdateComponent();
    },

    handleChangeShowCartButton(e) {
      this.model.addAttributes({ showcartbutton: this.model.get('showcartbutton') });
      this.handleUpdateComponent();
    },

    handleChangeFieldNames(e) {
      this.model.addAttributes({ fieldnames: this.model.get('fieldnames') });
      this.handleUpdateComponent();
    },

    handleChangeProduct(e) {
      let product = this.model.get('product');
      this.model.set('productId', product.id);
      this.handleUpdateComponent();
    },

    handleChangeProductId(e) {
      this.model.addAttributes({ productId: this.model.get('productId') });
    },

    handleUpdateComponent(e) {
      let product = this.model.get('product');
      let comps = this.model.get('components');
      while (comps.length > 0) {
        comps.pop();
      }
      let comp = (
        <div
          class="product-content"
          draggable="false"
          data-gjs-selectable="false"
          data-gjs-hoverable="false"
        >
          <img
            src={product?.url}
            class="product-img"
            draggable="false"
            data-gjs-selectable="false"
            data-gjs-hoverable="false"
          />
        </div>
      );
      comps.push(comp);
      comp = (
        <div
          class={'product-content ' + this.model.get('alignstyle')}
          draggable="false"
          data-gjs-selectable="false"
          data-gjs-hoverable="false"
        >
          <div
            class="product-name"
            draggable="false"
            data-gjs-selectable="false"
            data-gjs-hoverable="false"
          >
            {product?.name}
          </div>
          <div
            class="product-price"
            draggable="false"
            data-gjs-selectable="false"
            data-gjs-hoverable="false"
          >
            {product?.currency} {product?.price}
          </div>
          <div
            class="product-quantity-title"
            draggable="false"
            data-gjs-selectable="false"
            data-gjs-hoverable="false"
          >
            Quantity
          </div>
          <input
            type="number"
            class="product-quantity"
            pattern="[0-9]*"
            data-hook="number-input-spinner-input"
            aria-label="Quantity"
            max="99999"
            min="1"
            value="1"
            draggable="false"
            data-gjs-selectable="false"
            data-gjs-hoverable="false"
          />
          <div
            class={'product-item-cart' + (this.model.get('showcartbutton') == 0 ? ' hide' : '')}
            draggable="false"
            data-gjs-selectable="false"
            data-gjs-hoverable="false"
            style={
              'background-color: rgba(0, 0, 0, ' +
              this.model.get("fillopacity") / 100.0 +
              '); border: ' +
              this.model.get("borderwidth") +
              'px solid black; border-radius: ' +
              this.model.get("buttoncornerradius") +
              'px; color: ' +
              (this.model.get("buttonstyle") == 'style1' ||
              this.model.get("buttonstyle") == 'style2' ||
              this.model.get("buttonstyle") == 'style3'
                ? 'white'
                : 'black')
            }
          >
            {this.model.get('buttontext')}
          </div>
          <div
            class="product-detail"
            draggable="false"
            data-gjs-selectable="false"
            data-gjs-hoverable="false"
          >
            {product?.description}
          </div>
        </div>
      );
      comps.push(comp);
      comps = comps.models[1].components();
      const fieldNames = Object.keys(product);
      fieldNames.map((fieldName) => {
        if (
          this.model.get('fieldnames').includes(fieldName) &&
          fieldName != 'name' &&
          fieldName != 'price' &&
          fieldName != 'description'
        ) {
          comp = (
            <div
              class="product-detail"
              draggable="false"
              data-gjs-selectable="false"
              data-gjs-hoverable="false"
            >
              {product[fieldName]}
            </div>
          );
          comps.push(comp);
        }
      });
      this.render();
    }
  }
};

export default productpage;
