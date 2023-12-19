const onClick = function () {};
const onChangeOrderTab = function () {};


let default2TabPlaceOrderType = {
  tagName: 'div',
  hoverable: false,
  badgable: false,
  draggable: false,
  droppable: false,
  selectable: false,
  attributes:{class:"tab-place-order"},
  components: [
    {
      tagName: 'div',
      hoverable: false,
      badgable: false,
      draggable: false,
      droppable: false,
      selectable: false,
      components: [
        {
          tagName: 'div',
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'w-100' },
          components: [
            {
              tagName: 'div',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'd-flex w-100 order-tabs' },
              components: [
                {
                  tagName: 'div',
                  hoverable: false,
                  badgable: false,
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  attributes: { class: 'w-50 me-1' },
                  components: [
                    {
                      tagName: 'button',
                      hoverable: false,
                      badgable: false,
                      draggable: false,
                      droppable: false,
                      selectable: false,
                      attributes: {
                        class: 'w-100 order-tab-link active-tab-order',
                        id: 'order-btn-tab1'
                      },
                      content: 'Your Info'
                    }
                  ]
                },
                {
                  tagName: 'div',
                  hoverable: false,
                  badgable: false,
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  attributes: { class: 'w-50' },
                  components: [
                    {
                      tagName: 'button',
                      hoverable: false,
                      badgable: false,
                      draggable: false,
                      droppable: false,
                      selectable: false,
                      attributes: { class: 'w-100 order-tab-link', id: 'order-btn-tab2' },
                      content: 'Order Info'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          tagName: 'div',
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'order-tab-content' },
          components: [
            {
              tagName: 'div',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'order-content-tab', id: 'order-content-tab1' },
              components: [
                {
                  tagName: 'div',
                  //type: 'text',
                  editable: false,
                  removable: false,
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  attributes: { class: 'order-place-billing-container' }
                },
                {
                  tagName: 'div',
                  //type: 'text',
                  editable: false,
                  removable: false,
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  attributes: { class: 'order-place-address-container' }
                },
                
              
              ]
            },
            {
              tagName: 'div',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'order-content-tab', id: 'order-content-tab2' },
              components: [
                {
                  tagName: 'div',
                  //type: 'text',
                  editable: false,
                  removable: false,
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  attributes: { class: 'order-place-qty-membership' }
                },
                {
                  tagName: 'div',
                  //type: 'text',
                  editable: false,
                  removable: false,
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  attributes: { class: 'order-place-info-container' }
                },
                {
                  tagName: 'div',
                  attributes: { class: 'py-3' },
                  draggable: false,
                  droppable: false,
                  selectable: false,
                  hoverable: false,
                  components: [
                    {
                      tagName: 'h4',
                      type: 'text',
                      editable: true,
                      content: 'Your Order',
                      draggable: false,
                      droppable: false,
                      selectable: false,
                      hoverable: false,
                      attributes: { class: 'order-place-title' }
                    },
                    {
                      tagName: 'table',
                      attributes: { class: 'w-100 table-products-container' },
                      hoverable: false,
                      badgable: false,
                      draggable: false,
                      droppable: false,
                      selectable: false,
                      components: [
                        {
                          tagName: 'tr',
                          hoverable: false,
                          badgable: false,
                          draggable: false,
                          droppable: false,
                          selectable: false,
                          components: [
                            {
                              tagName: 'td',
                              type: 'text',
                              content: 'Product ',
                              hoverable: false,
                              badgable: false,
                              draggable: false,
                              droppable: false,
                              selectable: false,
                              attributes: { class: 'order-place-text' }
                            },
                            {
                              tagName: 'td',
                              type: 'text',
                              content: 'x 1',
                              hoverable: false,
                              badgable: false,
                              draggable: false,
                              droppable: false,
                              selectable: false,
                              attributes: { class: 'order-place-text order-place-qty' }
                            },
                            {
                              tagName: 'td',
                              type: 'text',
                              content: '$20',
                              hoverable: false,
                              badgable: false,
                              draggable: false,
                              droppable: false,
                              selectable: false,
                              attributes: { class: 'order-place-text' }
                            }
                          ]
                        },
                        {
                          tagName: 'tr',
                          attributes: { class: 'border-top' },
                          hoverable: false,
                          badgable: false,
                          draggable: false,
                          droppable: false,
                          selectable: false,
                          components: [
                            {
                              tagName: 'td',
                              hoverable: false,
                              badgable: false,
                              draggable: false,
                              droppable: false,
                              selectable: false,
                              attributes: { class: 'order-place-text' },
                              components: [
                                {
                                  tagName: 'h6',
                                  type: 'text',
                                  content: 'Total',
                                  hoverable: false,
                                  badgable: false,
                                  draggable: false,
                                  droppable: false,
                                  selectable: false,
                                
                                }
                              ]
                            },
                            {
                              tagName: 'td',
                              //type: 'text',
                              hoverable: false,
                              badgable: false,
                              draggable: false,
                              droppable: false,
                              selectable: false,
                              attributes: { class: 'order-place-text' }
                            },
                            {
                              tagName: 'td',
                              hoverable: false,
                              badgable: false,
                              draggable: false,
                              droppable: false,
                              selectable: false,
                              attributes: { class: 'order-place-text' },
                              components: [
                                {
                                  tagName: 'h6',
                                  type: 'text',
                                  content: '$20',
                                  hoverable: false,
                                  badgable: false,
                                  draggable: false,
                                  droppable: false,
                                  selectable: false,
                                  attributes: { class: 'order-place-total' }
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      tagName: 'button',
                      attributes: {
                        class: 'order-place-button btn-submit mt-1 ',
                        type: 'submit',
                        selectedOption: 'product-buy'
                      },
         
                      components: [
                        {
                          tagName: 'span',
                          type: 'text',
                          content: 'Place Order',
                          hoverable: false,
                          badgable: false,
                          draggable: false,
                          droppable: false,
                          selectable: false,
                          attributes: { class: 'button-text ' }
                        }
                      ],
                      draggable: false,
                      droppable: false,
                      selectable: false,
                      hoverable: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  styles: `
        .place-order { justify-content: center; padding: 10px; }
        .button-text { font-weight: bold; }
        .button-subtext { font-size: 0.8em; }
        .order-tab-link{display: flex; justify-content: center; padding: 10px;}
        .active-tab-order{background-color:red}
      `,
  script: onClick,
  onChangeOrderTab
};
// let default2TabPlaceOrderType = {
//   model: {
//     defaults: {
//       tagName: 'div',
//       draggable: '.section-column-child', // Can be dropped only inside `form` elements
//       droppable: false, // Can't drop other elements inside
//       //resizable:true,
//       attributes: { class: 'place-order element' },
//       components: [
//         {
//           tagName: 'div',
//           hoverable: false,
//           badgable: false,
//           draggable: false,
//           droppable: false,
//           selectable: false,
//           components: [
//             {
//               tagName: 'div',
//               hoverable: false,
//               badgable: false,
//               draggable: false,
//               droppable: false,
//               selectable: false,
//               attributes: { class: 'w-100' },
//               components: [
//                 {
//                   tagName: 'div',
//                   hoverable: false,
//                   badgable: false,
//                   draggable: false,
//                   droppable: false,
//                   selectable: false,
//                   attributes: { class: 'd-flex w-100 order-tabs' },
//                   components: [
//                     {
//                       tagName: 'div',
//                       hoverable: false,
//                       badgable: false,
//                       draggable: false,
//                       droppable: false,
//                       selectable: false,
//                       attributes: { class: 'w-50 me-1' },
//                       components: [
//                         {
//                           tagName: 'button',
//                           hoverable: false,
//                           badgable: false,
//                           draggable: false,
//                           droppable: false,
//                           selectable: false,
//                           attributes: { class: 'w-100 order-tab-link active-tab-order', id: 'order-btn-tab1' },
//                           content: 'Your Info'
//                         }
//                       ]
//                     },
//                     {
//                       tagName: 'div',
//                       hoverable: false,
//                       badgable: false,
//                       draggable: false,
//                       droppable: false,
//                       selectable: false,
//                       attributes: { class: 'w-50' },
//                       components: [
//                         {
//                           tagName: 'button',
//                           hoverable: false,
//                           badgable: false,
//                           draggable: false,
//                           droppable: false,
//                           selectable: false,
//                           attributes: { class: 'w-100 order-tab-link', id: 'order-btn-tab2' },
//                           content: 'Order Info'
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               tagName: 'div',
//               hoverable: false,
//               badgable: false,
//               draggable: false,
//               droppable: false,
//               selectable: false,
//               attributes: { class: 'order-tab-content' },
//               components: [
//                 {
//                   tagName: 'div',
//                   hoverable: false,
//                   badgable: false,
//                   draggable: false,
//                   droppable: false,
//                   selectable: false,
//                   attributes: { class: 'order-content-tab', id: 'order-content-tab1' },
//                   components: tab1
//                 },
//                 {
//                   tagName: 'div',
//                   hoverable: false,
//                   badgable: false,
//                   draggable: false,
//                   droppable: false,
//                   selectable: false,
//                   attributes: { class: 'order-content-tab', id: 'order-content-tab2' },
//                   components: tab2
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           tagName: 'div',
//           components: [
//             {
//               tagName: 'i',
//               components: '',
//               hoverable: false,
//               badgable: false,
//               draggable: false,
//               droppable: false,
//               selectable: false,
//               attributes: { class: 'fa fa-plus' }
//             }
//           ],
//           hoverable: false,
//           badgable: false,
//           draggable: false,
//           droppable: false,
//           selectable: false,
//           attributes: { class: 'bottom add-more-element' }
//         }
//       ],
//       styles: `
//         .place-order { justify-content: center; padding: 10px; }
//         .button-text { font-weight: bold; }
//         .button-subtext { font-size: 0.8em; }
//         .order-tab-link{display: flex; justify-content: center; padding: 10px;}
//         .active-tab-order{background-color:red}
//       `,
//       script: onClick,onChangeOrderTab
//     }
//   }
// };

export default default2TabPlaceOrderType;
