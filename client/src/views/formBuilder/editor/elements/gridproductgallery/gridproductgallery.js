let gridproductgallery = {
  isComponent: el => el.tagName === 'gridproductgallery',
  model: {
    defaults: {
      // script,
      tagName: 'gridproductgallery',
      draggable: '*',
      droppable: true,
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
      datasetConnect: [],
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
      styles: `.gridproductgallery {
        display: grid; 
        column-gap: 15px; 
        row-gap: 15px;
        width:80%;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 240 * 1px), 1fr));
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

export default gridproductgallery;
