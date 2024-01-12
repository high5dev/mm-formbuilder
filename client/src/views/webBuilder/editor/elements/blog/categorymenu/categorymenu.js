let categoryMenu = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('category-container')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'category-container' },
        components: (props) => {
          const num = props.attributes.num;
          return (
            `<div class="post-category-menu">
                <span class="category-item theme-text-default">All Posts (${num})</span>
            </div>`
          );
        },
        num: 0,
        traits: [
          {
            type: 'num',
            name: 'num',
            changeProp: true,
            min: 1
          }
        ],
  
        styles: `
            .category-container{padding:10px; border: 1px solid lightgray; width:300px}
            .category-item{color: black}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
      init() {
        this.listenTo(this.model, 'change:num', this.handleChangeNum);
      },
      handleChangeNum(e) {
        let comps = this.model.get('components');
        let num = this.model.get('num');
        while (comps.length > 0) {
          comps.pop();
        }
        const cmp =`<div class="post-category-menu">
            <span class="category-item theme-text-default">All Posts (${num})</span>
        </div>`
        comps.push(cmp);
        this.render();
      }
    }
  };
  
  export default categoryMenu;
  