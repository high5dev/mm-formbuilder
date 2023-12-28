const script = function(props) {
  alert('Hi');
  // `this` is bound to the component element
  console.log('the element', props.repeaterWidth, props.myprop2);
  return 111;
};

let repeater = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('repeater')),
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'repeater', id: `repeater-${new Date().getTime()}` },
      components: (props) => {
        const numOfItems = props.attributes.numOfItems;
        const components = [];
        const item = {
          type: 'repeater-item',
        };

        for (let i = 0; i < numOfItems; i++) {
          components.push(item);
        }
        return components;
      },
      // components: [],
      numPerRow: 3,
      numOfItems: 3,
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
      
      styles: `.repeater {display: grid; grid-template-columns: repeat(3, 1fr); column-gap: 10px; row-gap: 10px;}`,
      // stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius', 'column-gap', 'row-gap'],
      // // 'stylable-require': ['width', 'background-color', 'margin']
      // // 'script-props': ['repeaterWidth', 'myprop2'],
    },
    // init() {
    //   this.on('change:numPerRow', this.handleNumPerRowChange);
    //   this.on('change:numOfItems', this.handleNumOfItemsChange);
    // },

    // handleNumPerRowChange(e) {
    //   console.log('Input numPerRow changed to: ', e.attributes.numPerRow);
    // },

    // handleNumOfItemsChange(e) {
    //   console.log('Input numOfItems changed to: ', e.attributes.numOfItems);
    // },

    // // updated(property, value, prevValue) {
    // //   console.log('Local hook: model.updated------',
    // //     'property', property, 'value', value, 'prevValue', prevValue);
    // // },
  },
  view: {
    init() {
      // this.listenTo(this.model, 'change:numOfItems', this.handleChangeNumOfItems);
      this.listenTo(this.model, 'change:numPerRow', this.handleChangeNumPerRow);
    },
    // handleChangeNumOfItems(e) {
      // const comps = this.model.get('components');
      // const numOfItems = parseInt(this.model.get('numOfItems'), 10);
      // for (let i = 0; i < numOfItems; i++) {
        // comps.add(comps[comps.length - 1]);
      // }
      // this.render();
    // },
    handleChangeNumPerRow(e) {
      console.log('handleChangeNumOfItems--------------------------')
      const comps = this.model.get('components');
      const numPerRow = this.model.get('numPerRow');
      comps.parent.addStyle({ 'grid-template-columns': `repeat(${numPerRow}, 1fr)` })
      this.render();
    },
  }
};

export default repeater;
