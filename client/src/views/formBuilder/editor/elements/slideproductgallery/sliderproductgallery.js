let sliderproductgallery = {
  isComponent: el => el.tagName === 'sliderproductgallery',
  model: {
    defaults: {
      // script,
      tagName: 'sliderproductgallery',
      draggable: '*',
      droppable: true,
      attributes: { class: 'sliderproductgallery' },
      components: (props) => {
        return `
        <div class="sliderproductgallery">
          <div class="slides">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
              <img src="http://placehold.it/150x150">
          </div>
          <button class="prev" data-gjs-selectable="false">&#10094;</button>
          <button class="next" data-gjs-selectable="false">&#10095;</button>
        </div>
        `;
        const numOfItems = props.attributes.numOfItems;
        const components = [];
        const item = {
          type: 'product-item',
        };

        for (let i = 0; i < numOfItems; i++) {
          components.push(item);
        }
        return components;
      },
      // components: [],
      numPerRow: 4,
      numOfItems: 8,
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
        var slideIndex = 0;
        document.getElementsByClassName('prev')[0].addEventListener('click', function() {
          moveSlide(-1);
        });
        document.getElementsByClassName('next')[0].addEventListener('click', function() {
          moveSlide(1);
        });
        function moveSlide(step) {
          var totalImages = 9;
          var imagesToShow = 4;
          slideIndex = (slideIndex + step + totalImages) % totalImages; // ensures the index loops around

          var offset = -(slideIndex * 100) / imagesToShow; // calculates the percentage to move
          document.querySelector(".slides").style.transform = 'translateX(' + offset + '%)';
        }

        // Initialize the first view
        moveSlide(0);
      },
      styles: `.sliderproductgallery {
                  position: relative;
                  width: 80%;
                  /* Adjust this width based on your layout */
                  overflow: hidden;
                  /* Ensures only the part of .slides within the container is visible */
              }

              .slides {
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
      let comps = this.model.get('components');
      while (comps.length > 0) {
        comps.pop();
      };
      const item = {
        type: 'product-item',
      };
      const numOfItems = this.model.get('numOfItems');
      const numPerRow = this.model.get('numPerRow');
      for (let i = 0; i < numOfItems; i++) {
        comps.push(item)
      }
      comps.parent.addStyle({ 'grid-template-columns': `repeat(${numPerRow}, 1fr)` });
      this.render();
    }
  }
};

export default sliderproductgallery;
