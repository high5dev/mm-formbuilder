let currencyconverter = {
  isComponent: el => el.tagName === 'div',
  model: {
    defaults: {
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'currencyconverter' },
      components: (props) => {
        return `
        <select style="background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; padding: 10px; font-size: 16px; width: 300px; cursor: pointer;">
          <option value="usd">USD</option>
        </select>
      `;
      },
      // viewSplit: 'true',
      // viewLabel: 'true',
      traits: [
        // {
        //   type: 'checkbox',
        //   name: 'viewSplit',
        //   changeProp: true,
        //   valueTrue: 'YES',
        //   valueFalse: 'NO',
        // },
        // {
        //   type: 'checkbox',
        //   name: 'viewLabel',
        //   changeProp: true,
        //   valueTrue: 'YES',
        //   valueFalse: 'NO',
        // },
      ],
      styles: `
      `,
      script: function () {

      }
    },
  },
};

export default currencyconverter;
