import { render } from 'react-dom';
import ImageOne from '../../../../../assets/images/elements/beats-headphones.png';

function generateStarRating(rating, maxRating = 5) {
  const fullStar = '<i class="fa fa-star"></i>';
  const halfStar = '<i class="fa fa-star-half-o"></i>';
  const emptyStar = '<i class="fa fa-star-o"></i>';
  const roundedRating = rating;
  let ratingOutput = '';
  for (let i = 1; i <= Math.floor(roundedRating); i++) {
    ratingOutput += fullStar;
  }
  if ((Math.round(roundedRating * 2) / 2) % 1 !== 0) {
    ratingOutput += halfStar;
  }
  const remainingStars = maxRating - Math.ceil(roundedRating);
  for (let i = 1; i <= remainingStars; i++) {
    ratingOutput += emptyStar;
  }
  return `${ratingOutput} (${roundedRating} out of ${maxRating} stars)`;
}

export function createProductComponent(product) {
  return {
    tagName: 'div',
    selectable: false,
    hoverable: false,
    attributes: { class: 'col-md-4 col-sm-12 px-3 pb-4', productId: product._id },
    components: [
      {
        tagName: 'div',
        draggable: false,
        droppable: false,
        selectable: false,
        hoverable: false,
        attributes: { class: 'card p-2' },
        components: [
          {
            tagName: 'img',
            components: '',
            draggable: false,
            droppable: false,
            selectable: false,
            hoverable: false,
            attributes: {
              class: '',
              alt: 'Demo Image',
              src: product.imgUrl,
              style: 'width: 100%; height: 200px;'
            }
          },
          {
            tagName: 'div',
            selectable: false,
            hoverable: false,
            attributes: { class: 'scale-rating element' },
            components: [
              {
                tagName: 'div',
                draggable: '.section-column-child',
                droppable: false,
                selectable: false,
                hoverable: false,
                attributes: { class: 'html-container' },
                content: `<div class='d-flex justify-content-between'>
                          <div class="rating_scale">
                              ${generateStarRating(product.rating)}
                          </div>
                          <h3>$${product?.price}</h3>
                      </div>
                      `
              }
            ]
          },
          {
            tagName: 'h3',
            selectable: false,
            hoverable: false,
            attributes: { class: 'product-title p-1' },
            components: [product?.name]
          },
          {
            tagName: 'p',
            selectable: false,
            hoverable: false,
            attributes: { class: 'product-description p-1' },
            components: [product?.description]
          },
          {
            tagName: 'div',
            selectable: false,
            hoverable: false,
            attributes: { class: 'd-flex justify-content-between' },
            components: [
              {
                tagName: 'div',
                droppable: false,
                selectable: false,
                hoverable: false,
                attributes: { class: 'html-container' },
                content: `
                       <div class='d-flex justify-content-between'>
                          <Button class="favrote btn" name="product-favourite" data-content="${encodeURIComponent(
                            JSON.stringify(product)
                          )}"><i class='fa fa-heart'></i> Favorite </Button>
                          <Button class="primary btn" name="product-buy" data-content="${encodeURIComponent(
                            JSON.stringify(product)
                          )}"><i class='fa fa-shopping-cart'></i> Move to Cart</Button>
                       </div>
                    `
              }
            ]
          }
        ]
      }
    ]
  };
}

export function renderCategorySidebar(category) {
  
  return `<div class="card">
      <div class="card-body">
        <h5>Categories</h5>
        <div>
          <div>
            <input
              name="products"
              type="checkbox"
              class="form-check-input"
              ${category.products ? 'checked' : ''}
            />
            <label class="form-label">Products</label>
          </div>
          <div>
            <input name="memberships" type="checkbox" class="form-check-input" ${
              category.memberships ? 'checked' : ''
            } />
            <label class="form-label">Memberships</label>
          </div>
          <div>
            <input name="courses" type="checkbox" class="form-check-input" ${
              category.courses ? 'checked' : ''
            } />
            <label class="form-label">Courses</label>
          </div>
        </div>
      </div>
    </div>`;
}

export function renderProductList() {
  return `<div class="ecommerce-card card">
      <div class="item-img text-center mx-auto">
        <a href="/ecommerce/shop/mymanager/test-product">
          <img
            class="img-fluid card-img-top"
            src="https://storage.googleapis.com/mymember-storage/my-manager/660ec421-0113-452a-9366-b714e5104549-Screen-Shot-2023-04-25-at-9.45.38-AM.png"
            alt="test"
            data-xblocker="passed"
            style="height: 150px; visibility: visible;"
          />
        </a>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <div class="my-auto">
            <ul class="unstyled-list list-inline">
              <li class="ratings-list-item me-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class=""
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li class="ratings-list-item me-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class=""
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li class="ratings-list-item me-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class=""
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li class="ratings-list-item me-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class=""
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
              <li class="ratings-list-item me-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class=""
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </li>
            </ul>
          </div>
          <div>
            <h6 class="item-price">$20</h6>
            <span class="badge bg-light-success">public</span>
          </div>
        </div>
        <h6 class="item-name">
          <a class="text-body" href="/ecommerce/shop/mymanager/test-product">
            test
          </a>
        </h6>
        <p>
          By <span class="text-primary">mymanager</span>
        </p>
        <p class="item-description card-text">description for product </p>
      </div>
      <div class="item-options text-center">
        <button
          type="button"
          class="btn-wishlist w-50 btn btn-light"
          style="border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="me-50"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>Favorite</span>
        </button>
        <button
          type="button"
          class="btn-cart w-50 btn btn-primary"
          style="border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-left-radius: 0px;"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="me-50"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span>Move to Cart</span>
        </button>
      </div>
    </div>`;
}

export function createShopComponent(shop) {
  return {
    tagName: 'div',
    selectable: false,
    hoverable: false,
    attributes: { class: 'shop p-1' },
    content: shop,
    components: [
      {
        tagName: 'div',
        draggable: '.section-column-child',
        droppable: false,
        selectable: false,
        hoverable: false,
        attributes: { class: 'html-container' },
        components: [
          {
            tagName: 'div',
            draggable: false,
            droppable: false,
            selectable: false,
            hoverable: false,
            attributes: { class: 'row justify-content-between' },
            components: [
              {
                tagName: 'div',
                draggable: false,
                droppable: false,
                selectable: false,
                hoverable: false,
                attributes: { class: 'category-sidebar col-md-3 col-sm-12 px-3 mb-3' },
                components: [],
                content: renderCategorySidebar(shop?.category)
              },
              {
                tagName: 'div',
                draggable: false,
                droppable: false,
                selectable: false,
                hoverable: false,
                attributes: { class: 'ecommerce-container col-md-9 col-sm-12' },
                components: [
                  {
                    tagName: 'div',
                    draggable: false,
                    droppable: false,
                    selectable: false,
                    hoverable: false,
                    attributes: { class: 'ecommerce-list row' },
                    components: shop?.list?.map((product) => {
                      return createProductComponent(product);
                    })
                    // components: [
                    //   createProductComponent({
                    //     _id: 1,
                    //     imgUrl: ImageOne,
                    //     name: 'Lenovo Thinkpad',
                    //     category: 'Product',
                    //     subCategory: 'Laptop',
                    //     description: 'Everyone please give your full name and email address',
                    //     rating: 5,
                    //     price: 234,
                    //     stock: 29
                    //   }),
                    //   createProductComponent({
                    //     _id: 1,
                    //     imgUrl: ImageOne,
                    //     name: 'Lenovo Thinkpad',
                    //     category: 'Product',
                    //     subCategory: 'Laptop',
                    //     description: 'Everyone please give your full name and email address',
                    //     rating: 5,
                    //     price: 234,
                    //     stock: 29
                    //   }),
                    //   createProductComponent({
                    //     _id: 1,
                    //     imgUrl: ImageOne,
                    //     name: 'Lenovo Thinkpad',
                    //     category: 'Product',
                    //     subCategory: 'Laptop',
                    //     description: 'Everyone please give your full name and email address',
                    //     rating: 5,
                    //     price: 234,
                    //     stock: 29
                    //   }),
                    //   createProductComponent({
                    //     _id: 1,
                    //     imgUrl: ImageOne,
                    //     name: 'Lenovo Thinkpad',
                    //     category: 'Product',
                    //     subCategory: 'Laptop',
                    //     description: 'Everyone please give your full name and email address',
                    //     rating: 5,
                    //     price: 234,
                    //     stock: 29
                    //   })
                    // ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

const script = function () {
  /* Set rates + misc */
  var taxRate = 0.05;
  var shippingRate = 15.0;
  var fadeTime = 300;

  /* Assign actions */
  window.$('.product-quantity input').change(function () {
    updateQuantity(this);
  });

  window.$('.product-removal button').click(function () {
    removeItem(this);
  });

  /* Recalculate cart */
  function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    window.$('.product').each(function () {
      subtotal += parseFloat(window.$(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = subtotal > 0 ? shippingRate : 0;
    var total = subtotal + tax + shipping;

    /* Update totals display */
    window.$('.totals-value').fadeOut(fadeTime, function () {
      window.$('#cart-subtotal').html(subtotal.toFixed(2));
      window.$('#cart-tax').html(tax.toFixed(2));
      window.$('#cart-shipping').html(shipping.toFixed(2));
      window.$('#cart-total').html(total.toFixed(2));
      if (total === 0) {
        window.$('.checkout').fadeOut(fadeTime);
      } else {
        window.$('.checkout').fadeIn(fadeTime);
      }
      window.$('.totals-value').fadeIn(fadeTime);
    });
  }

  /* Update quantity */
  function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = window.$(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = window.$(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
      window.$(this).fadeOut(fadeTime, function () {
        window.$(this).text(linePrice.toFixed(2));
        recalculateCart();
        window.$(this).fadeIn(fadeTime);
      });
    });
  }

  /* Remove item from cart */
  function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = window.$(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
      productRow.remove();
      recalculateCart();
    });
  }
};

const defaultShopConfig = {
  category: {
    products: true,
    memberships: true,
    courses: false
  },
  list: [
    {
      _id: 1,
      imgUrl: ImageOne,
      name: 'Next Level MA',
      category: 'Product',
      subCategory: 'Laptop',
      description: 'Everyone please give your full name and email address',
      rating: 5,
      price: 1000,
      stock: 5
    },
    {
      _id: 2,
      imgUrl: ImageOne,
      name: 'Lenovo Thinkpad',
      category: 'Product',
      subCategory: 'Laptop',
      description: 'Everyone please give your full name and email address',
      rating: 3,
      price: 999.99,
      stock: 31
    },
    {
      _id: 3,
      imgUrl: ImageOne,
      name: 'Next Level MA',
      category: 'Goods',
      subCategory: 'Laptop',
      description: 'Everyone please give your full name and email address',
      rating: 4,
      price: 234,
      stock: 29
    },
    {
      _id: 4,
      imgUrl: ImageOne,
      name: 'My manager',
      category: 'Product',
      subCategory: 'Laptop',
      description: 'Everyone please give your full name and email address',
      rating: 4,
      price: 4899,
      stock: 4
    }
  ]
};

const shopType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child',
      droppable: false,
      attributes: { class: 'shop-card element' },
      content: defaultShopConfig,
      components: [
        createShopComponent(defaultShopConfig),
        {
          tagName: 'div',
          components: [
            {
              tagName: 'i',
              components: '',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'fa fa-plus' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'bottom add-more-element' }
        }
      ],
      styles: `
          .shop-card {
            padding: 5px;
          }
          img{
            width: 100%;
          }
          .favrote{
            background: #c0b8b8 !important;
          }
          .primary{
            background: blue !important;
            color: #fff !important;
          }
          .product-price {
            font-size: 18px;
            font-weight: 600;
            color: #212529;
          }
          .product-title {
            font-size: 20px;
            font-weight: 600;
            color: #212529;
          }
          .product-description {
            color: #6c757d;
          }
        `,
      script
    }
  }
};

export default shopType;
