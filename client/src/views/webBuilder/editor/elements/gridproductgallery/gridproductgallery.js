let gridproductgallery = {
  isComponent: (el) => el.tagName === 'DIV' && el.classList.contains('gridproductgallery'),
  model: {
    defaults: {
      // script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: {
        class: 'gridproductgallery',
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
      components: (props) => {
        const numOfItems = props.attributes.numOfItems;
        const components = [];
        const item = {
          type: 'product-item'
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
      cloning: false,
      traits: [],
      styles: `.gridproductgallery {
        display: grid; 
        column-gap: 15px; 
        row-gap: 15px;
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 240 * 1px), 1fr));
        justify-items: center;
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

    handleChangeCategory(e) {
      if (this.model.get('category')._id) {
        this.handleChangeNumOfItems();
      }
    },

    handleChangeProducts(e) {
      this.model.set('numOfItems', this.model.get('products')?.values?.length);
    },

    handleChangeNumPerRow(e) {
      const comps = this.model.get('components');
      const numPerRow = this.model.get('numPerRow');
      comps.parent.addStyle({ 'grid-template-columns': `repeat(${numPerRow}, 1fr)` });
      this.render();
    },

    handleChangeNumOfItems(e) {
      // this.model.setAttributes({
      //   class: 'gridproductgallery',
      //   categoryid: this.model.get('category')._id,
      //   fieldnames: this.model.get('fieldnames'),
      //   hovereffect: this.model.get('hovereffect'),
      //   showcartbutton: this.model.get('showcartbutton'),
      //   displaystyle: this.model.get('displaystyle'),
      //   alignstyle: this.model.get('alignstyle'),
      //   sidepadding: this.model.get('sidepadding'),
      //   tppadding: this.model.get('tppadding'),
      //   cornerradius: this.model.get('cornerradius'),
      //   buttontext: this.model.get('buttontext'),
      //   buttonstyle: this.model.get('buttonstyle'),
      //   fillopacity: this.model.get('fillopacity'),
      //   borderwidth: this.model.get('borderwidth'),
      //   buttoncornerradius: this.model.get('buttoncornerradius')
      // });

      this.model.set('cloning', true);
      let comps = this.model.get('components');
      while (comps.length > 0) {
        comps.pop();
      }
      const category = this.model.get('category');
      const filteredProducts = this.model
        .get('products')
        ?.values?.filter((item) => category?.products?.includes(item.id) || category?.isAll);
      const numOfItems = filteredProducts?.length;

      const item = {
        type: 'product-item'
      };

      for (let i = 0; i < numOfItems; i++) {
        comps.push(item);
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
      this.model.get('components').models.map((m, index) => {
        m.set('product', filteredProducts[index]);

        m.set('productsetting', productSetting);
      });
      // comps.parent.addStyle({ 'grid-template-columns': `repeat(${numPerRow}, 1fr)` });
      this.render();
      this.model.set('cloning', false);
    }
  }
};

export default gridproductgallery;
