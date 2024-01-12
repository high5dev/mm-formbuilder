let recentPost = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('post-card-container')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'post-card-container' },
        components: (props) => {
          const blogs = props.attributes.blogs;
          return (
            <div class="post-large-second-container">
              {blogs &&
                blogs.map((blog) => {
                  return (
                    <div class="post-large-item">
                      <div class="post-large-item-header">
                        <img src={blog.avatar} class="item-image-avatar" width="10%" />
                        <div class="post-large-item-name theme-text-default theme-text-default">{blog.name}</div>
                      </div>
                      <div class="post-large-item-image">
                        <img src={blog.imageUrl} width="100%" height="180px" />
                      </div>
                      <div class="post-large-item-body">
                        <div class="post-large-item-title">
                          <h2 class="theme-text-h2">{blog.title}</h2>
                        </div>
                        <div class="post-large-item-description theme-text-default">{blog.description}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        },
        blogs: [
          {
            name: 'Maria Cole',
            title: 'Now you can blog from everywhere',
            avatar: 'https://i.ibb.co/yWzNT3Q/2-3.png',
            description: 'We made it quick and convenient for you to manage blog',
            imageUrl: 'https://i.ibb.co/kGBQfB3/images.jpg'
          }
        ],
        traits: [
          {
            type: 'blogs',
            name: 'blogs',
            changeProp: true,
            min: 1
          }
        ],
  
        styles: `
          a{text-decoration:none; color:black}
          a:hover{color:blue}
          .post-large-second-container{display:flex;}
          .post-large-item{border:1px solid lightgray; width:300px; margin:10px;}
          .post-large-item-header{display:flex; align-items:center; padding:10px}
          .post-large-item-body{padding:10px; padding-bottom:20px;}
          .item-image-avatar{border-radius:50%; margin-right:10px;}
          .post-card-container{padding:5px; width:400px}
          `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
      }
    },
    view: {
      init() {
        this.listenTo(this.model, 'change:blogs', this.handleChangeBlogs);
      },
      handleChangeBlogs(e) {
        let comps = this.model.get('components');
        let blogs = this.model.get('blogs');
        while (comps.length > 0) {
          comps.pop();
        }
        const cmp = (
          <div class="post-large-second-container">
            {blogs &&
              blogs.map((blog) => {
                return (
                  <div class="post-large-item">
                    <div class="post-large-item-header">
                      <img src={blog.avatar} class="item-image-avatar" width="10%" />
                      <div class="post-large-item-name theme-text-default">{blog.name}</div>
                    </div>
                    <div class="post-large-item-image">
                      <img src={blog.imageUrl} width="100%" height="180px" />
                    </div>
                    <div class="post-large-item-body">
                      <div class="post-large-item-title">
                       <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`}>
                        <h2 class="theme-text-h2">{blog.title}</h2>
                        </a>
                      </div>
                      <div class="post-large-item-description">
                       <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`}>
                        {blog.description}
                        </a>
                        </div>
                    </div>
                  </div>
                );
              })}
          </div>
        );
        comps.push(cmp);
        this.render();
      }
    }
  };
  
  export default recentPost;
  