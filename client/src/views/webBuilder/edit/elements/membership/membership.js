import React, { useSelector } from 'react';

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

export function createMembershipComponent(membership) {
  return {
    tagName: 'div',
    selectable: false,
    hoverable: false,
    attributes: { class: 'product' },
    components: [
      {
        tagName: 'div',
        selectable: false,
        hoverable: false,
        attributes: { class: 'scale-rating element' },
        components: [
          {
            tagName: 'div',
            // draggable: '.section-column-child',
            droppable: false,
            selectable: false,
            hoverable: false,
            attributes: { class: 'html-container' },
            content: `<div class='main-membership-card card p-3'>
                  <div class='d-flex justify-content-end'>
                      <Button class='active btn'>
                      BBC
                      </Button>
                      <Button class='inactive btn'>
                      Public
                      </Button>
                  </div>
                  <h3 class='membership-title mb-0'>${membership?.name}</h3>
                  <p class='membership-type mt-0'>${membership?.membershipType?.type}</p>
                  <div class='mb-2'>
                    <div class='bodyContent d-flex justify-content-betreen'>
                    <span class='bodyContent'>Total Price: </span>
                    <span class='ms-2 bodyContent'>$${membership?.total || '9.99'}</span>
                  </div>
                  <div class='bodyContent d-flex justify-content-betreen'>
                    <span class='bodyContent'>Down Payment: </span>
                    <span class='ms-2 bodyContent'>$${membership?.downPayment || '9.99'}</span>
                  </div>
                  <div class='bodyContent d-flex justify-content-betreen'>
                    <span class='bodyContent'> Balance: </span>
                    <span class='ms-2 bodyContent'>$${membership?.balance || '9.99'}</span>
                  </div>
                  <div class='bodyContent d-flex justify-content-betreen'>
                    <span class='bodyContent'>Recuring time: </span>
                    <span class='ms-2 bodyContent'>for 28 months</span>
                  </div>
               </div>
            <div class='d-flex justify-content-center'>
            <h3> Pay Now $${membership?.total || '9.99'}</h3>
         </div>
        <div class='d-flex justify-content-between'>
            <Button class="favrote btn" name="product-favourite" data-content="${encodeURIComponent(
              JSON.stringify(membership)
            )}"><i class='fa fa-heart'></i> Favorite </Button>
           <Button class="primary btn" name="product-buy" data-content="${encodeURIComponent(
             JSON.stringify(membership)
           )}"><i class='fa fa-shopping-cart'></i> Buy Now</Button>
        </div>
            </div>
                  `
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

const membershipType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child',
      droppable: false,
      attributes: { class: 'membership-card element' },
      components: [
        createMembershipComponent({
          _id: 1,
          total_price: 1750,
          balance: 1000,
          down_payment: 750
        }),
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
       .main-membership-card{
        width:40vh;
       }   
       .membership-card {
            padding: 5px;
          }
          .bodyContent{
            font-size: 18px;
            color: #6c757d;
          }
          .active{
            background: #27c672 !important;
            color: #fff !important;
          }
          .inactive{
            margin-left: 10px;
            background: #e9f7f0 !important;
            color: #27c672 !important;
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
          .membership-title {
            font-size: 20px;
            font-weight: 600;
            color: #212529;
          }
          .membership-type {
            color: #6c757d;
          }
        `,
      script
    }
  }
};

export default membershipType;
