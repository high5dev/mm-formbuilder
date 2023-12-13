let productItem = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      tagName: 'div',
      draggable: false,
      droppable: false,
      attributes: { class: 'product-item', productId: "" },
      components: (props) => {
        return `
        <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light" style="max-width: 22rem;">
          <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" class="product-img1" alt="Louvre" />
          <a href="#!">
            <div class="mask">
              <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/114.webp" class="product-img2" />
              <div class="quick-view">Quick View</div>
            </div>
          </a>
          <div class="product-name">Product 1</div>
          <div class="product-price">USD 100</div>
          <div class="product-cart">Add to cart</div>
        </div>`;
      },
      styles: `
        .product-item { 
          width: 300px;
        }
        
        .hover-overlay {
            /* Example hover overlay effect */
            position: relative;
        }
        
        .hover-overlay:hover .mask {
            opacity: 1;
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
          width: 300px;
          height: 300px;
        }

        .product-img2 {
          width: 300px;
          height: 300px;
        }
        
        .w-100 {
            width: 100%;
        }
        
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 300px;
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
          background-color: black;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          cursor: pointer;
        }
      `,
      stylable: ['width', 'height', 'background-color', 'margin', 'align-items', 'border', 'justify-content', 'display'],
      product: {}
    },
  },

  view: {
    init() {
      this.listenTo(this.model, 'change:product', this.handleChangeProduct);
    },

    handleChangeProduct(e) {
      let product = this.model.get('product');
      this.model.setAttributes({ class: 'product-item', productId: product.id });
      let comps = this.model.get('components');
      while (comps.length > 0) {
        comps.pop();
      }
      const comp = (
        <div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-mdb-ripple-color="light" style="max-width: 22rem;">
          <img src={product.url ? product.url : "https://i.ibb.co/6br0NxL/1.png"} class="product-img1" alt="Louvre" />
          <div class="product-hover">
            <div class="mask">
              <img src={product.url1 ? product.url1 : "https://i.ibb.co/6br0NxL/1.png"} class="product-img2" />
              <div class="quick-view">Quick View</div>
            </div>
          </div>
          <div class="product-name">{product.name}</div>
          <div class="product-price">{product.currency} {product.price}</div>
          <div class="product-cart">Add to cart</div>
        </div>
      )
      comps.push(comp);
      this.render();
    }
  }
};

export default productItem;
