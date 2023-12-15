let sliderproductgallery = {
  isComponent: el => el.tagName === 'sliderproductgallery',
  model: {
    defaults: {
      // script,
      tagName: 'sliderproductgallery',
      draggable: '*',
      droppable: true,
      attributes: { class: 'sliderproductgallery', 'data-num-of-items': 3 },
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
                  type: 'product-item',
                },
                {
                  type: 'product-item',
                },
                {
                  type: 'product-item',
                }
              ]
            }

            // Add more product-item components as needed
          ],
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
        },
      ],
      // components: [],
      numPerRow: 3,
      numOfItems: 3,
      datasetConnect: [],
      selectedDataset: {},
      cloning: false,
      products: {},
      traits: [
        {
          type: 'number',
          name: 'numPerRow',
          changeProp: true,
          min: 1,
        },
        {
          type: 'number',
          name: 'numOfItems',
          changeProp: true,
          min: 1,
        }
      ],
      script: function () {
        function getNumOfItems() {
          //console.log(props);
          var element = document.querySelector('.sliderproductgallery');
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
          var imagesToShow = slidesWidth % 265 == 0 ? slidesWidth / 265 : (slidesWidth / 265 + 1);
          slideIndex = (slideIndex + step + totalImages) % totalImages; // ensures the index loops around
          console.log(slideIndex);
          var offset = -(slideIndex * 100) / imagesToShow; // calculates the percentage to move
          document.querySelector(".slides").style.transform = 'translateX(' + offset + '%)';
        }

        // Initialize the first view
        moveSlide(0);
      },
      styles: `.sliderproductgallery {
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
              }`,
    },
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:numPerRow', this.handleChangeNumPerRow);
      this.listenTo(this.model, 'change:numOfItems', this.handleChangeNumOfItems);
      this.listenTo(this.model, 'change:products', this.handleChangeProducts);
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
      this.model.setAttributes({ class: 'sliderproductgallery', 'data-num-of-items': numOfItems });
      var slidesComponent = this.model.components().models[0].components().find(comp => comp.getAttributes().class === 'slides');

      if (slidesComponent) {
        // Remove all existing 'product-item' components
        while (slidesComponent.components().length > 0) {
          slidesComponent.components().pop();
        };

        // Add new 'product-item' components based on numOfItems
        const item = {
          type: 'product-item',
        };

        for (let i = 0; i < numOfItems; i++) {
          slidesComponent.components().push(item);
        }

        slidesComponent.components().models.map((m, index) => {
          m.set('product', this.model.get('products').values[index]);
        });
      }
      this.render();
      this.model.set('cloning', false);
    },
  }
};

export default sliderproductgallery;