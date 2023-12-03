import moment from 'moment';
let archiveMenu = {
    isComponent: (el) => el.tagName === 'div',
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'category-container' },
        components: (props) => {
          const postList = props.attributes.postList;
          return (
            <div class="post-category-menu">
                {postList && postList.map((post) =>{
                    return(
                        `<div class="post-item">
                        ${post.date}
                        <span>(${post.amount})</span>
                    </div>`
                    )

                })}

            </div>
          );
        },
        postList: [
            {
              date:moment().format('MM/YYYY'),
              amount:13
            }
        ],
        traits: [
          {
            type: '',
            name: 'postList',
            changeProp: true,
            min: 1
          }
        ],
  
        styles: `
            .category-container{padding:10px; border: 1px solid lightgray; width:300px}
            .post-item{color: black}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
      init() {
        this.listenTo(this.model, 'change:postList', this.handleChangePostList);
      },
      handleChangePostList(e) {
        let comps = this.model.get('components');
        let postList = this.model.get('postList');
        while (comps.length > 0) {
          comps.pop();
        }
        const cmp=
            <div class="post-category-menu">
                {postList && postList.map((post) =>{
                    return(
                        `<div class="post-item">
                        ${post.date}
                        <span>(${post.amount})</span>
                    </div>`
                    )

                })}
            </div>
          ;
       comps.push(cmp);
        this.render();
      }
    }
  };
  
  export default archiveMenu;
  