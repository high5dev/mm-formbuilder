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
          attributes: { class: 'slides', 'data-gjs-selectable': false },
          components: [
            {
              type: 'product-item',
            },
            {
              type: 'product-item',
            },
            {
              type: 'product-item',
            },
            // Add more product-item components as needed
          ],
        },
        {
          type: 'button',
          draggable: false,
          droppable: false,
          attributes: { class: 'prev', 'data-gjs-selectable': false },
          content: '&#10094;'
        },
        {
          type: 'button',
          draggable: false,
          droppable: false,
          attributes: { class: 'next', 'data-gjs-selectable': false },
          content: '&#10095;'
        },
      ],
      // components: [],
      numPerRow: 3,
      numOfItems: 3,
      datasetConnect: [],
      selectedDataset: {},
      cloning: false,
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
          var imagesToShow = 3;
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
                width: 1010px;
                /* Adjust this width based on your layout */
                overflow: hidden;
                display: block;
                padding: 0px 40px;
                /* Ensures only the part of .slides within the container is visible */
              }

              .slides {
                width: 100%;
                display: flex;
                /* Lays out the images in a horizontal row */
                transition: transform 0.5s ease;
                /* Smooth transition for sliding effect */
              }

              .slides img {
                width: 25%;
                /* Each image takes up 25% of the carousel width */
                flex-shrink: 0;
                /* Prevents images from shrinking */
                object-fit: cover;
                /* Adjusts the image size to cover the area */
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
      var slidesComponent = this.model.components().find(comp => comp.getAttributes().class === 'slides');

      if (slidesComponent) {
        // Remove all existing 'product-item' components
        while (slidesComponent.components().length > 1) {
          slidesComponent.components().pop();
        };

        // Add new 'product-item' components based on numOfItems
        for (let i = 1; i < numOfItems; i++) {
          var item = slidesComponent.components().models[0].clone();
          function setChildIds(originalComponent, clonedComponent) {
            var originalChildren = originalComponent.get('components');
            var clonedChildren = clonedComponent.get('components');

            originalChildren.each(function (originalChild, index) {
              var clonedChild = clonedChildren.at(index);
              console.log(originalChild.ccid);
              console.log(numOfItems);
              clonedChild.ccid = originalChild.ccid + "-" + (i + 1);

              // Recursive call for any nested children
              if (originalChild.get('components').length > 0) {
                setChildIds(originalChild, clonedChild);
              }
            });
          }
          setChildIds(slidesComponent.components().models[0], item);
          slidesComponent.components().add(item);
        }
      }

      this.render();
      this.model.set('cloning', false);
    },
  }
};

export default sliderproductgallery;
