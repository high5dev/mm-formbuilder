let gridproductgallery = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('gridproductgallery')),
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'gridproductgallery' },
      components: (props) => {
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
      numPerRow: 3,
      numOfItems: 3,
      products: {},
      datasetConnect: [],
      selectedDataset: {},
      cloning: false,
      traits: [
        // {
        //   type: 'number',
        //   name: 'numPerRow',
        //   changeProp: true,
        //   min: 1,
        // },
        // {
        //   type: 'number',
        //   name: 'numOfItems',
        //   changeProp: true,
        //   min: 1,
        // }
      ],
      styles: `.gridproductgallery {
        display: grid; 
        column-gap: 15px; 
        row-gap: 15px;
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 240 * 1px), 1fr));
        justify-items: center;
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
      let comps = this.model.get('components');
      while (comps.length > 0) {
        comps.pop();
      };
      
      const numOfItems = this.model.get('numOfItems');
      const numPerRow = this.model.get('numPerRow');
      // for (let i = 1; i < numOfItems; i++) {
      //   const item = this.model.get('components').models[0].clone();
      //   function setChildIds(originalComponent, clonedComponent) {
      //     var originalChildren = originalComponent.get('components');
      //     var clonedChildren = clonedComponent.get('components');

      //     originalChildren.each(function (originalChild, index) {
      //       var clonedChild = clonedChildren.at(index);
      //       console.log(originalChild.ccid);
      //       console.log(numOfItems);
      //       clonedChild.ccid = originalChild.ccid + "-" + (i + 1);

      //       // Recursive call for any nested children
      //       if (originalChild.get('components').length > 0) {
      //         setChildIds(originalChild, clonedChild);
      //       }
      //     });
      //   }
      //   setChildIds(this.model.get('components').models[0], item);
      //   comps.push(item);
      // }

      const item = {
        type: 'product-item',
      };

      for (let i = 0; i < numOfItems; i++) {
        comps.push(item);
      }
      
      let data = this.model.get('datasetConnect');
      this.model.get('components').models.map((m, index) => {
        // m.components().models.map((element) => {
        //   const existingItemIndex = data.findIndex(item => (item.id + (index != 0 ? ("-" + (index + 1)) : "")) === element.ccid);
  
        //   if (existingItemIndex !== -1) {
        //     // Update the name if the ID exists
        //     if (element.get('type') == 'text') {
        //       element.set('content', this.model.get('products').values[index][data[existingItemIndex].name]);
        //     }
        //   } else {
        //     // Add a new item if the ID doesn't exist
        //     //dataConnect.push(newData);
        //   }
        // });
        m.set('product', this.model.get('products').values[index]);
      });
      // comps.parent.addStyle({ 'grid-template-columns': `repeat(${numPerRow}, 1fr)` });
      this.render();
      this.model.set('cloning', false);
    }
  }
};

export default gridproductgallery;
