let productItem = {
  isComponent: (el) => el.tagName === 'div' && el.classList.contains('product-item'),
  model: {
    defaults: {
      tagName: 'div',
      draggable: false,
      droppable: false,
      selectable: false,
      hoverable: false,
      attributes: { class: 'product-item', productId: '' },
      components: (props) => {
        return `
        <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-gjs-selectable="false" data-mdb-ripple-color="light" style="max-width: 22rem;">
          <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" class="product-img1" alt="Louvre" />
          <a href="#!">
            <div class="mask">
              <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/114.webp" class="product-img2" />
              <div class="quick-view">Quick View</div>
            </div>
          </a>
          <div class="product-name" data-gjs-selectable="false">Product 1</div>
          <div class="product-price" data-gjs-selectable="false">USD 100</div>
          <div class="product-cart" data-gjs-selectable="false">Add to cart</div>
        </div>`;
      },
      styles: `
        .product-item { 
          width: 240px;
        }

        .product-item .bg-image {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
        }

        .product-item .style3 {
          border: 1px solid black;
        }

        .product-item .style2 .product-text {
          display: none;
        }
        
        .product-item .style4 {
          align-items: center;
        }

        .product-item .align1 {
          align-items: flex-start;
        }

        .product-item .align2 {
          align-items: center;
        }
        
        .product-item .align3 {
          align-items: flex-end;
        }
        
        .hover-overlay {
            /* Example hover overlay effect */
            position: relative;
        }

        .hover-zoom {
          position: relative;
        }
        
        .hover-overlay:hover .mask {
            opacity: 1;
        }

        .hover-zoom:hover .mask {
          opacity: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .ripple {
            /* Material design ripple effect requires JavaScript */
        }
        
        .shadow-1-strong {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }
        
        .rounded {
            border-radius: 0.25rem; /* Bootstrap's default border-radius */
        }

        .product-img1 {
          max-width: 240px !important;
          max-height: 240px !important;
          min-height: 240px !important;
          width: 100%;
          height: 100%;
        }

        .product-img2 {
          max-width: 240px !important;
          max-height: 240px !important;
          min-height: 240px !important;
          width: 100%;
          height: 100%;
        }

        .hover-zoom:hover .product-img2 {
          width: 300px !important;
          height: 300px !important;
        }
        
        .w-100 {
          width: 100%;
        }
        
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 240px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .quick-view {
          width: 100%;
          height: 50px;
          position: absolute;
          bottom: 0px;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: black;
        }

        .product-cart {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          cursor: pointer;
        }
      `,
      stylable: [
        'width',
        'height',
        'background-color',
        'margin',
        'align-items',
        'border',
        'justify-content',
        'display'
      ],
      product: {},
      productsetting: {
        fieldnames: 'name,price',
        hovereffect: 'Swap',
        showcartbutton: 1,
        displaystyle: 'style1',
        alignstyle: 'align1',
        sidepadding: 0,
        tppadding: 0,
        cornerradius: 0,
        buttontext: 'Add to Cart',
        buttonstyle: 'style3',
        fillopacity: 100,
        borderwidth: 0,
        buttoncornerradius: 0
      }
    }
  },

  view: {
    init() {
      this.listenTo(this.model, 'change:product', this.handleChangeProduct);
      this.listenTo(this.model, 'change:productsetting', this.handleChangeProduct);
    },

    handleChangeProduct(e) {
      let product = this.model.get('product');
      this.model.setAttributes({ class: 'product-item', productId: product.id });
      let comps = this.model.get('components');
      let productsetting = this.model.get('productsetting');
      while (comps.length > 0) {
        comps.pop();
      }
      const fieldNames = Object.keys(product);
      let comp = (
        <div
          class={
            'bg-image ripple shadow-1-strong rounded ' +
            productsetting.displaystyle +
            ' ' +
            productsetting.alignstyle +
            (productsetting.hovereffect === 'Swap'
              ? ' hover-overlay'
              : productsetting.hovereffect === 'Zoom'
              ? ' hover-zoom'
              : '')
          }
          data-gjs-selectable="false"
          data-mdb-ripple-color="light"
          draggable="false"
          data-gjs-hoverable="false"
        >
          <div
            style={'padding:' + productsetting.sidepadding + 'px; width: 100%;'}
            data-gjs-selectable="false"
            draggable="false"
            data-gjs-hoverable="false"
          >
            <img
              src={product.url ? product.url : 'https://i.ibb.co/6br0NxL/1.png'}
              class="product-img1"
              alt="Louvre"
              data-gjs-selectable="false"
              draggable="false"
              data-gjs-hoverable="false"
              style={
                'margin-top:' +
                productsetting.tppadding +
                'px; margin-bottom: ' +
                productsetting.tppadding +
                'px; border-radius: ' +
                productsetting.cornerradius +
                'px'
              }
            />
          </div>
          <div
            class="product-hover"
            data-gjs-selectable="false"
            draggable="false"
            data-gjs-hoverable="false"
          >
            <div
              class="mask"
              data-gjs-selectable="false"
              draggable="false"
              data-gjs-hoverable="false"
            >
              <img
                src={product.url1 ? product.url1 : 'https://i.ibb.co/6br0NxL/1.png'}
                class="product-img2"
                draggable="false"
                data-gjs-selectable="false"
                data-gjs-hoverable="false"
                style={
                  'margin-top:' +
                  productsetting.tppadding +
                  'px; margin-bottom: ' +
                  productsetting.tppadding +
                  'px; border-radius: ' +
                  productsetting.cornerradius +
                  'px'
                }
              />
              <div
                class="quick-view"
                draggable="false"
                data-gjs-selectable="false"
                data-gjs-hoverable="false"
              >
                Quick View
              </div>
            </div>
          </div>
          <div
            class="product-name product-text"
            data-gjs-selectable="false"
            draggable="false"
            data-gjs-hoverable="false"
          >
            {product.name}
          </div>
          <div
            class="product-price product-text"
            data-gjs-selectable="false"
            draggable="false"
            data-gjs-hoverable="false"
          >
            {product.currency} {product.price}
          </div>
        </div>
      );
      comps.push(comp);
      comps = comps.models[0].components();
      fieldNames.map((fieldName) => {
        if (
          productsetting.fieldnames.includes(fieldName) &&
          fieldName != 'name' &&
          fieldName != 'price'
        ) {
          comp = (
            <div
              class="product-price product-text"
              data-gjs-selectable="false"
              draggable="false"
              data-gjs-hoverable="false"
            >
              {product[fieldName]}
            </div>
          );
          comps.push(comp);
        }
      });
      if (productsetting.showcartbutton == 1) {
        comp = (
          <div
            class="product-cart"
            data-gjs-selectable="false"
            draggable="false"
            data-gjs-hoverable="false"
            style={'background-color: rgba(0, 0, 0, ' + productsetting.fillopacity / 100.0 + '); border: ' + productsetting.borderwidth + 'px solid black; border-radius: ' + productsetting.buttoncornerradius + 'px; color: ' + (productsetting.buttonstyle == 'style1' || productsetting.buttonstyle == 'style2' || productsetting.buttonstyle == 'style3' ? 'white' : 'black') }
          >
            {productsetting.buttontext}
          </div>
        );
        comps.push(comp);
      }
      this.render();
    }
  }
};

export default productItem;
