export function createOrderComponent(order) {
  return {
    tagName: 'div',
    selectable: false,
    hoverable: false,
    attributes: { class: 'order' },
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
            attributes: { class: ' html-container' },
            content: `
            <div class='mainDiv card p-2'> 
              <div class="row mainTabDiv px-2 nav">
                <div class="nav-link ${
                  order?.activeStep === 1 ? 'activeStep' : ''
                } col-sm-6 col-md-6 col-lg-6 pt-4">
                  <div class='row'>
                    <div class="col-sm-2 d-flex justify-content-end " >
                      <h1>1</h1>
                    </div>
                    <div class="col-sm-10"  >
                      <h4 class='mb-0'>${order?.step1Headline || 'Shipping'}</h4>
                      <p class='mt-0'>${order?.step1SubHeadline || 'Where To Ship Books?'}</p>
                    </div>
                  </div>
                </div>
                <div class="nav-link ${
                  order?.activeStep === 1 ? '' : 'activeStep'
                } col-sm-6 col-md-6 col-lg-6  pt-4">
                  <div class='row mt-1'>
                      <div class="col-sm-2 d-flex justify-content-end" >
                        <h1>2</h1>
                      </div>
                      <div class="col-sm-10"  >
                        <h4 class='mb-0'>${order?.step2Headline || 'Your Info'}</h4>
                        <p class='mt-0'> ${order?.step2SubHeadline || 'Your Billing Info'}</p>
                      </div>
                  </div>
                </div>
              <div>
              ${
                order?.activeStep === 1
                  ? `<div >
                  <form>
                    <div class="row">
                      <div class="form-group col-sm-12 my-2">
                        <input type="text" class="form-control" value="${
                          order?.fullName || ''
                        }" id="fullName" placeholder="Enter Full Name">
                      </div>
                      <div class="form-group col-sm-12 my-2">
                        <input type="email" class="form-control" id="email" value="${
                          order?.email || ''
                        }" placeholder="Email">
                      </div>
                      <div class="form-group col-sm-12 my-2">
                        <input type="number" class="form-control" id="phoneNumber" value="${
                          order?.phoneNumber || ''
                        }" placeholder="Phone Number">
                      </div>
                      <div class="form-group col-sm-12 my-2">
                        <input type="text" class="form-control"  value="${
                          order?.address || ''
                        }"id="address" placeholder="Full Address">
                      </div>
                      <div class="form-group col-sm-12 my-2">
                        <input type="text" class="form-control" value="${
                          order?.city || ''
                        }" id="city" placeholder="City Name">
                      </div>
                      <div class="form-group col-md-9">
                        <input type="text" class="form-control" value="${
                          order?.stateOrProvince || ''
                        }" id="stateOrProvince" placeholder="State/Province">
                      </div>
                      <div class="form-group col-sm-3">
                        <input type="text" class="form-control" value="${
                          order?.zipCode || ''
                        }" id="zipCode" placeholder="Zip Code">
                      </div>
                      <div class="form-group col-sm-12 my-2">
                      <input type="text" class="form-control" value="${
                        order?.country || ''
                      }" id="country" placeholder="Country">
                      </div>
                    </div>
                  </form>
                </div>`
                  : `<div class='tab-pane' id="step2" role="tabpanel" aria-labelledby="nav-step2-tab">
                  <div class='mt-3'>
                    <div class='d-flex justify-content-between px-3 mb-0'>
                      <p>Item</p>
                      <p>Price</p>
                    </div>
                    <hr/ class='my-0'>
                    <div class='d-flex justify-content-between px-3 mt-0'>
                      <div class='d-flex'>
                        <input class="form-check-input" type="checkbox" checked id="gridCheck">
                        <p class='ms-2'>${order?.item || 'Dynamically Update'}</p>
                      </div>
                      <p>${order?.price || '$0.00'}</p>
                    </div>
                  </div>
                  <div class='card p-2'>
                    <form>
                      <div class="row">
                        <div class="form-group col-sm-8 ">
                          <label>Credit Card Number</label>
                          <input type="number" class="form-control" id="creditCardNumber" value="${
                            order?.creditCardNumber || 'XXXX XXXX XXXX'
                          }" placeholder="Card Number">
                        </div>
                        <div class="form-group col-sm-4">
                          <label>CVC</label>
                          <input type="number" class="form-control" id="cvc" value="${
                            order?.cvc || 'XXXX XXXX XXXX'
                          }" placeholder="CVC">
                        </div>
                        <div class="form-group col-sm-4 my-2">
                          <label>Expiry Month</label>
                          <input type="number" class="form-control" id="expiryMonth" value="${
                            order?.cvc || 'XXXX XXXX XXXX'
                          }" placeholder="Expiry Month">
                        </div>
                        <div class="form-group col-sm-4 my-2">
                          <label>Expiry Year</label>
                          <input type="number" class="form-control" id="expiryYear" value="${
                            order?.cvc || 'XXXX XXXX XXXX'
                          }" placeholder="Expiry Year">
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class='mt-3'>
                    <div class='d-flex justify-content-between px-3 mb-0'>
                      <p>Item</p>
                      <p>Amount</p>
                    </div>
                    <hr/ class='my-0'>
                    <div class='d-flex justify-content-between px-3 mt-0'>
                      <p>${order.summaryItemText || 'Dynamically Update'}</p>
                      <p>${order.summaryPriceText || '$XX.00'}</p>
                    </div>
                  </div>
                  <div class='dottedDiv p-2'>
                    <div class='yellowDiv d-flex justify-content-center pt-2'>
                      <input class="form-check-input me-2" type="checkbox" checked id="gridCheck">
                      <h4>${order.bumpHeadline || 'Yes! I Want This!'}</h4>
                    </div>
                    <div class='mt-3'>
                      <h5><strong class='redText'>${
                        order.OTOHeadline || 'ONE TIME OFFER - ONLY $$$'
                      } </strong> : ${
                      order.OTOText ||
                      'Put info about your awsome bunp offer here, and why they should pay now!!!!'
                    }</h5>
                    </div>
                  </div>
                </div>`
              }
              </div>
            </div>
            `
          }
        ],
        styles: `
        .order {
          padding: 20px
        }
        .mainDiv {
          width: 500px;
        }
        .mainTabDiv {
      
        }
        .nav-link{
          background-color: #fff ; 
          color: #003;
        }
       
       .nav-link.activeStep {
          background-color: #0000ff; 
          color: #fff ;
       }
       
        .heading {
          padding: 10px;
        }
        .redText {
          color: #ff0000!important;
        }
        .yellowDiv{
          background-color: #feff99 !important;
          Color: #099501 !important;
        }
        .dottedDiv{
          border: 2px dotted #003 !important;
        }
        
        `
      },
      {
        tagName: 'div',
        selectable: false,
        hoverable: false,
        attributes: { class: 'btn primary' },
        content: `${
          order.activeStep === 1
            ? `${order.step1BtnText || 'Get FREE Book Now !'}`
            : `${order.step2BtnText || 'Shop My Book Now !'}`
        }`,
        styles: `
        .primary {
          width: 487px;
          background-color: #0000ff; 
          color: #fff;
        }
        `
      }
    ]
  };
}

let OrderType = {
  model: {
    defaults: {
      tagName: 'div',
      draggable: '.section-column-child', // Can be dropped only inside `form` elements
      droppable: false, // Can't drop other elements inside
      attributes: { class: 'membership-card element' },
      components: [
        createOrderComponent({
          _id: 1,
          total_price: 1750,
          balance: 1000,
          down_payment: 750,
          activeStep: 1
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
      // styles: `
      // .order{
      //   padding: 20px
      // }
      // .mainDiv{
      //   width: 500px;
      // }
      // .nav-link.active {
      //   background-color: #0000ff !important;
      //   color: #fff !important;
      // }
      // .nav-link {
      //   color: #003 !important;
      // }
      // .heading {
      //   padding: 10px;
      // }
      // .redText {
      //   color: #ff0000!important;
      // }
      // .yellowDiv{
      //   background-color: #feff99 !important;
      //   Color: #099501 !important;
      // }
      // .primary {
      //   width: 97%;
      //   background-color: #0000ff!important;
      //   color: #fff!important;
      // }
      // .dottedDiv{
      //   border: 2px dotted #003 !important;
      // }

      // `,
      stylable: ['heading-1', 'heading-2', 'font-size', 'align-content']
    }
  }
};

export default OrderType;

// export function createOrderComponent(order) {
//   console.log(order);

//   return {
//     tagName: 'div',
//     selectable: false,
//     hoverable: false,
//     attributes: { class: 'order' },
//     components: [
//       {
//         tagName: 'div',
//         selectable: false,
//         hoverable: false,
//         attributes: { class: 'scale-rating element' },
//         components: [
//           {
//             tagName: 'div',
//             // draggable: '.section-column-child',
//             droppable: false,
//             selectable: false,
//             hoverable: false,
//             attributes: { class: ' html-container' },
//             content: `<div class="MuiPaper-root MuiCard-root makeStyles-cardStyle-30 MuiPaper-elevation1 MuiPaper-rounded">
//   <div class="MuiCardContent-root">
//     <div class="row">
//       <div class="col-sm-12 col-md-12 col-lg-12"><p class="MuiTypography-root mt-1 MuiTypography-body1"
//                                                     style="color: rgb(57, 57, 57); font-size: 1.6rem;">Card Details</p>
//       </div>
//       <div class="col-sm-12 col-md-6 col-lg-6">
//         <div class="row">
//           <div class="col-sm-12 col-md-12 col-lg-12">
//             <div class="form-label-group form-group">
//               <div><label htmlFor="CardHolder" class="">Card Holder Name</label></div>
//               <input required="" name="card_holder_name" id="CardHolder" placeholder="card holder name" type="text"
//                      class="form-control" value=""/></div>
//           </div>
//           <div class="col-sm-12 col-md-12 col-lg-12">
//             <div class="form-label-group form-group">
//               <div><label htmlFor="Pan" class="">Card Number</label></div>
//               <input required="" name="pan" id="Pan" placeholder="Card number" class="form-control" type="text"
//                      value="" inputMode="numeric"/></div>
//           </div>
//           <div class="col-sm-6 col-md-4 col-lg-4">
//             <div class="form-label-group form-group">
//               <div><label htmlFor="cvv" class="">CVV</label></div>
//               <input name="cvv" id="cvv" placeholder="cvv" class="form-control" type="number" value=""
//                      inputMode="numeric"/></div>
//           </div>
//           <div class="col-sm-6 col-md-4 col-lg-4">
//             <div class="form-group">
//               <div><label htmlFor="expiry_date" class="">Expiry Date</label></div>
//               <input required="" name="expiry_date" id="expiry_date" placeholder="MM YY" class="form-control"
//                      type="text" value="" inputMode="numeric"/></div>
//           </div>
//           <div class="col-sm-12 col-md-4 col-lg-4">
//             <div class="form-label-group form-group">
//               <div><label htmlFor="Amount" class="">Amount</label></div>
//               <input required="" name="amount" id="Amount" placeholder="Amount" type="number" class="form-control"
//                      value=""/></div>
//           </div>
//           <div class="col-sm-6 col-md-6 col-lg-6">
//             <div class="form-label-group form-group">
//               <div><label htmlFor="phone" class="">Phone</label></div>
//               <input required="" name="phone" id="phone" placeholder="phone" class="form-control" type="text"
//                      value="" inputMode="numeric"/></div>
//           </div>
//           <div class="col-sm-6 col-md-6 col-lg-6">
//             <div class="form-label-group form-group">
//               <div><label htmlFor="email" class="">Email</label></div>
//               <input required="" name="email" id="email" placeholder="email" type="email" class="form-control"
//                      value=""/></div>
//           </div>
//           <div class="col-sm-12 col-md-12 col-lg-12">
//             <div class="cardlogoWrapper"></div>
//           </div>
//         </div>
//       </div>
//       <div class="col-sm-12 col-md-6 col-lg-6">
//         <div style="background: rgb(246, 246, 246);">
//           <div class="p-1 card-form-details" style="background: rgb(246, 246, 246);">
//             <ul class="MuiList-root MuiList-dense MuiList-padding" style="width: 100%;">
//               <li class="MuiListItem-root MuiListItem-dense MuiListItem-gutters"><b>Cart Summary</b></li>
//               <li class="MuiListItem-root d-flex justify-content-between MuiListItem-dense MuiListItem-gutters"
//                   style="border-bottom: 1px solid rgb(212, 213, 217);">
//                 <div class="makeStyles-primaryTitle-42">Price</div>
//                 <div class="makeStyles-secondaryTitle-43" name="total_price">$ ${
//                   order.balance
//                 }</div>
//               </li>
//               <li class="MuiListItem-root MuiListItem-dense MuiListItem-gutters"><b>PAY NOW</b></li>
//               <li class="MuiListItem-root d-flex justify-content-between MuiListItem-dense MuiListItem-gutters">
//                 <div class="makeStyles-primaryTitle-42">Down Payment</div>
//                 <div class="makeStyles-secondaryTitle-43" name="down_payment">$ ${
//                   order.down_payment
//                 }</div>
//               </li>
//               <li class="MuiListItem-root d-flex justify-content-between MuiListItem-dense MuiListItem-gutters"
//                   style="border-bottom: 1px solid rgb(212, 213, 217);">
//                 <div class="makeStyles-primaryTitle-42">Registration Fee</div>
//                 <div class="makeStyles-secondaryTitle-43" name="registration_fee">$ 0</div>
//               </li>
//               <li
//                 class="MuiListItem-root mt-2 d-flex justify-content-between text-success MuiListItem-dense MuiListItem-gutters"
//                 style="font-size: 1.4rem;">
//                 <div class="makeStyles-primaryTitle-42"><b>Total</b></div>
//                 <div><b name="total_price_amount">$ ${order.total_price}</b></div>
//               </li>
//               <li class="MuiListItem-root d-flex justify-content-center MuiListItem-dense MuiListItem-gutters">
//                 <button class="MuiButtonBase-root MuiButton-root MuiButton-text" tabIndex="0"
//                         type="submit" name="pay_now" data-content="${encodeURIComponent(
//                           JSON.stringify(order)
//                         )}><span class="MuiButton-label">Pay Now</span><span
//                   class="MuiTouchRipple-root"></span></button>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//                 `
//           }
//         ]
//       }
//     ]
//   };
// }
