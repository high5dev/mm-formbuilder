let gallery = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('gallery')),
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: true,
        attributes: { class: 'gallery' },
        components: (props) => {
          const numOfItems = props.attributes.numOfItems;
          const components = [];
          const item = {
            type: 'gallery-item',
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
        styles: `.gallery {display: grid; grid-template-columns: repeat(4, 2fr); column-gap: 0px; row-gap: 0px;width:40%; padding:3px}`,
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

      handleChangeNumOfItems(e){
        let comps=this.model.get('components');
        // while (comps.length > 0) {
        //   comps.pop();
        // };
        // const item = {
        //   type: 'gallery-item',
        // };
        const numOfItems = this.model.get('numOfItems');
        const numPerRow = this.model.get('numPerRow');
        // for(let i=0; i<numOfItems;i++){
        //   comps.push(item)
        // }
        comps.parent.addStyle({ 'grid-template-columns': `repeat(${numPerRow}, 1fr)` });
        this.render();
      }
    }
  };
  
  export default gallery;
  