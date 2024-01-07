let relatedproducts = {
  isComponent: (el) => el.tagName === 'relatedproducts',
  model: {
    defaults: {
      // script,
      tagName: 'relatedproducts',
      draggable: '*',
      droppable: true,
      attributes: {
        class: 'relatedproducts',
        'data-num-of-items': 3,
        categoryid: '',
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
      },
      components: [
        {
          type: 'div',
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          attributes: { class: 'slider' },
          components: [
            {
              type: 'div',
              draggable: false,
              droppable: false,
              selectable: false,
              hoverable: false,
              attributes: { class: 'slides' },
              components: [
                {
                  type: 'product-item'
                },
                {
                  type: 'product-item'
                },
                {
                  type: 'product-item'
                }
              ]
            }

            // Add more product-item components as needed
          ]
        },
        {
          type: 'button',
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          attributes: { class: 'prev' },
          content: '&#10094;'
        },
        {
          type: 'button',
          draggable: false,
          droppable: false,
          selectable: false,
          hoverable: false,
          attributes: { class: 'next' },
          content: '&#10095;'
        }
      ],
      // components: [],
      numPerRow: 3,
      numOfItems: 3,
      datasetConnect: [],
      selectedDataset: {},
      cloning: false,
      products: {},
      category: {},
      fieldnames: 'name,price',
      hovereffect: 'Swap',
      datasetConnect: [],
      selectedDataset: {},
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
      buttoncornerradius: 0,
      traits: [
        {
          type: 'gallery-show-items',
          name: 'galleryShowItems',
          label: 'What do you want to show?',
          changeProp: true,
        },
        {
          type: 'gallery-image-hover-effect',
          name: 'galleryImageHoverEffect',
          label: 'What happens when customers hover over the image on desktop?',
          changeProp: true,
        },
        {
          type: 'gallery-show-cart-button',
          name: 'galleryShowCartButton',
          label: '',
          changeProp: true,
        },
        {
          type: 'gallery-product-display-style',
          name: 'galleryProductDisplayStyle',
          label: 'Product display style',
          changeProp: true,
        },
        {
          type: 'text',
          name: 'sidepadding',
          label: 'Image side padding',
          changeProp: true,
        },
        {
          type: 'text',
          name: 'tppadding',
          label: 'Image top and bottom padding',
          changeProp: true,
        },
        {
          type: 'text',
          name: 'cornerradius',
          label: 'Image Corner Radius',
          changeProp: true,
        },
        {
          type: 'text',
          name: 'buttontext',
          label: 'Button Text',
          changeProp: true,
        },
        {
          type: 'gallery-button-style',
          name: 'galleryButtonStyle',
          label: 'Button Design',
          changeProp: true,
        },
        {
          type: 'text',
          name: 'fillopacity',
          label: 'Fill opacity',
          changeProp: true,
        },
        {
          type: 'text',
          name: 'borderwidth',
          label: 'Border Width',
          changeProp: true,
        },
        {
          type: 'text',
          name: 'buttoncornerradius',
          label: 'Corner Radius',
          changeProp: true,
        },
      ],
      script: function () {
        function getNumOfItems() {
          //console.log(props);
          var element = document.querySelector('.relatedproducts');
          var numOfItems = parseInt(element.getAttribute('data-num-of-items'), 10);
          return numOfItems;
        }
        var slideIndex = 0;
        document.getElementsByClassName('prev')[0].addEventListener('click', function () {
          moveSlide(-1);
        });
        document.getElementsByClassName('next')[0].addEventListener('click', function () {
          moveSlide(1);
        });
        //var numOfItems = this.model.get('numOfItems');
        function moveSlide(step) {
          var totalImages = getNumOfItems() - 2;
          if (totalImages <= 0) return;
          const slidesWidth = document.querySelector('.slides').clientWidth;
          var imagesToShow = slidesWidth % 265 == 0 ? slidesWidth / 265 : slidesWidth / 265 + 1;
          slideIndex = (slideIndex + step + totalImages) % totalImages; // ensures the index loops around
          console.log(slideIndex);
          var offset = -(slideIndex * 100) / imagesToShow; // calculates the percentage to move
          document.querySelector('.slides').style.transform = 'translateX(' + offset + '%)';
        }

        // Initialize the first view
        moveSlide(0);
      },
      styles: `.relatedproducts {
                position: relative;
                width: 100%;
                /* Adjust this width based on your layout */
                overflow: hidden;
                display: block;
                padding: 0px 40px;
                /* Ensures only the part of .slides within the container is visible */
              }

              .slider {
                width: 100%;
                overflow: hidden;
              }

              .slides {
                width: 100%;
                display: flex;
                /* Lays out the images in a horizontal row */
                transition: transform 0.5s ease;
                /* Smooth transition for sliding effect */
              }

              .slides > div {
                margin-right: 25px;
              }

              /* Styling for 'Previous' and 'Next' buttons */
              .prev {
                cursor: pointer;
                position: absolute;
                top: 50%;
                width: auto;
                padding: 16px;
                margin-top: -22px;
                color: white;
                font-weight: bold;
                font-size: 18px;
                transition: 0.6s ease;
                border-radius: 0 3px 3px 0;
                user-select: none;
                background-color: rgba(0, 0, 0, 0.8);
                left: 0px;
                border-radius: 3px 0 0 3px;
              }
              .next {
                cursor: pointer;
                position: absolute;
                top: 50%;
                width: auto;
                padding: 16px;
                margin-top: -22px;
                color: white;
                font-weight: bold;
                font-size: 18px;
                transition: 0.6s ease;
                border-radius: 0 3px 3px 0;
                user-select: none;
                background-color: rgba(0, 0, 0, 0.8);
                right: 0px;
                border-radius: 3px 0 0 3px;
              }

              /* Position the 'Previous' button to the left */
              .prev {
                  
              }

              /* Position the 'Next' button to the right */
              .next {
                  
              }

              /* Hover effect for buttons */
              .prev:hover,
              .next:hover {
                  background-color: rgba(0, 0, 0, 1);
              }`
    }
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:numPerRow', this.handleChangeNumPerRow);
      this.listenTo(this.model, 'change:numOfItems', this.handleChangeNumOfItems);
      this.listenTo(this.model, 'change:products', this.handleChangeProducts);
      this.listenTo(this.model, 'change:category', this.handleChangeCategory);
      this.listenTo(this.model, 'change:fieldnames', this.handleChangeFieldNames);
      this.listenTo(this.model, 'change:hovereffect', this.handleChangeHoverEffect);
      this.listenTo(this.model, 'change:showcartbutton', this.handleChangeShowCartButton);
      this.listenTo(this.model, 'change:displaystyle', this.handleChangeDisplayStyle);
      this.listenTo(this.model, 'change:alignstyle', this.handleChangeAlignStyle);
      this.listenTo(this.model, 'change:sidepadding', this.handleChangeSidePadding);
      this.listenTo(this.model, 'change:tppadding', this.handleChangeTPPadding);
      this.listenTo(this.model, 'change:cornerradius', this.handleChangeCornerRadius);
      this.listenTo(this.model, 'change:buttontext', this.handleChangeButtonText);
      this.listenTo(this.model, 'change:buttonstyle', this.handleChangeButtonStyle);
      this.listenTo(this.model, 'change:fillopacity', this.handleChangeFillOpacity);
      this.listenTo(this.model, 'change:borderwidth', this.handleChangeBorderWidth);
      this.listenTo(this.model, 'change:buttoncornerradius', this.handleChangeButtonCornerRadius);
    },

    handleChangeButtonCornerRadius(e) {
      this.model.addAttributes({ buttoncornerradius: this.model.get('buttoncornerradius') });
      this.handleChangeNumOfItems();
    },

    handleChangeBorderWidth(e) {
      this.model.addAttributes({ borderwidth: this.model.get('borderwidth') });
      this.handleChangeNumOfItems();
    },

    handleChangeFillOpacity(e) {
      this.model.addAttributes({ fillopacity: this.model.get('fillopacity') });
      this.handleChangeNumOfItems();
    },

    handleChangeButtonStyle(e) {
      this.model.addAttributes({ buttonstyle: this.model.get('buttonstyle') });
      this.handleChangeNumOfItems();
    },

    handleChangeButtonText(e) {
      this.model.addAttributes({ buttontext: this.model.get('buttontext') });
      this.handleChangeNumOfItems();
    },

    handleChangeCornerRadius(e) {
      this.model.addAttributes({ cornerradius: this.model.get('cornerradius') });
      this.handleChangeNumOfItems();
    },

    handleChangeTPPadding(e) {
      this.model.addAttributes({ tppadding: this.model.get('tppadding') });
      this.handleChangeNumOfItems();
    },

    handleChangeSidePadding(e) {
      this.model.addAttributes({ sidepadding: this.model.get('sidepadding') });
      this.handleChangeNumOfItems();
    },

    handleChangeAlignStyle(e) {
      this.model.addAttributes({ alignstyle: this.model.get('alignstyle') });
      this.handleChangeNumOfItems();
    },

    handleChangeShowCartButton(e) {
      this.model.addAttributes({ showcartbutton: this.model.get('showcartbutton') });
      this.handleChangeNumOfItems();
    },

    handleChangeDisplayStyle(e) {
      this.model.addAttributes({ displaystyle: this.model.get('displaystyle') });
      this.handleChangeNumOfItems();
    },

    handleChangeFieldNames(e) {
      this.model.addAttributes({ fieldnames: this.model.get('fieldnames') });
      this.handleChangeNumOfItems();
    },

    handleChangeHoverEffect(e) {
      this.model.addAttributes({ hovereffect: this.model.get('hovereffect') });
      this.handleChangeNumOfItems();
    },

    handleChangeProducts(e) {
      this.model.set('numOfItems', this.model.get('products').values.length);
    },

    handleChangeNumPerRow(e) {
      const comps = this.model.get('components');
      const numPerRow = this.model.get('numPerRow');
      comps.parent.addStyle({ 'grid-template-columns': `repeat(${numPerRow}, 1fr)` });
      this.render();
    },

    handleChangeNumOfItems(e) {
      this.model.set('cloning', true);
      const numOfItems = this.model.get('numOfItems');
      this.model.addAttributes({ 'data-num-of-items': numOfItems });
      var slidesComponent = this.model
        .components()
        .models[0].components()
        .find((comp) => comp.getAttributes().class === 'slides');

      if (slidesComponent) {
        // Remove all existing 'product-item' components
        while (slidesComponent.components().length > 0) {
          slidesComponent.components().pop();
        }

        // Add new 'product-item' components based on numOfItems
        const item = {
          type: 'product-item'
        };

        for (let i = 0; i < numOfItems; i++) {
          slidesComponent.components().push(item);
        }
        const productSetting = {
          fieldnames: this.model.get('fieldnames'),
          hovereffect: this.model.get('hovereffect'),
          showcartbutton: this.model.get('showcartbutton'),
          displaystyle: this.model.get('displaystyle'),
          alignstyle: this.model.get('alignstyle'),
          sidepadding: this.model.get('sidepadding'),
          tppadding: this.model.get('tppadding'),
          cornerradius: this.model.get('cornerradius'),
          buttontext: this.model.get('buttontext'),
          buttonstyle: this.model.get('buttonstyle'),
          fillopacity: this.model.get('fillopacity'),
          borderwidth: this.model.get('borderwidth'),
          buttoncornerradius: this.model.get('buttoncornerradius')
        };
        slidesComponent.components().models.map((m, index) => {
          m.set('product', this.model.get('products').values[index]);
          m.set('productsetting', productSetting);
        });
      }
      this.render();
      this.model.set('cloning', false);
    }
  }
};

export default relatedproducts;
