const onClick = function () {};


let defaultPlaceOrderType = {
    
        tagName:"form",
        hoverable: false,
        badgable: false,
        draggable: false,
        droppable: false,
        selectable: false,
        attributes:{class:"default-place-order"},
        components:[
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
                        attributes:{class:"order-place-text"}
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
                        attributes:{class:"order-place-text order-place-qty"}
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
                        attributes:{class:"order-place-text"}
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
                        //type: 'text',
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
                        //type: 'text',
                        //content: '$20',
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
                            attributes:{class:"order-place-total"}
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
              // {
              //     tagName:"br",
              // }
            ]
          },
          {
            tagName: 'button',
            attributes: { class: 'order-place-button btn-submit mt-1 ',  type: 'submit', selectedOption: 'product-buy' },
            content: 'Place Order',
            // components: [
            //   {
            //     tagName: 'span',
            //     type: 'text',
            //     content: 'Place Order',
            //     hoverable: false,
            //     badgable: false,
            //     draggable: false,
            //     droppable: false,
            //     selectable: false,
            //     attributes: { class: 'button-text ' }
            //   }
            // ],
            draggable: false,
            droppable: false,
            selectable: false,
            hoverable: false
          },
        ]
       ,
    
      styles: `
        .place-order { justify-content: center; padding: 10px; }
        .button-text { font-weight: bold; }
        .button-subtext { font-size: 0.8em; }
      `,
      script: onClick
    }
  


export default defaultPlaceOrderType;
