import moment from 'moment';
let postCard = {
  isComponent: (el) => el.tagName === 'div',
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
                      <div class="post-large-item-name">{blog.name}</div>
                    </div>
                    <div class="post-large-item-image">
                      <img src={blog.imageUrl} width="100%" height="180px" />
                    </div>
                    <div class="post-large-item-body">
                      <div class="post-large-item-title">
                        <h2>{blog.title}</h2>
                      </div>
                      <div class="post-large-item-description">{blog.description}</div>
                      <div class="post-comment">
                        <div class="customer-visit-history">
                          <div class="customer-visit-comment">
                            <img src="https://i.ibb.co/9TptRDC/eye.png" width="16px" style="margin-right:5px"/>
                            <div>0</div>
                            <img src="https://i.ibb.co/YbVMJrd/message.png" width="16px" style="margin-left:20px; margin-right:5px"/>
                            <div>0</div>
                          </div>
                          <img src="https://i.ibb.co/Zx2T8G3/heart.png" width="16px"/>
                        </div>
                      </div>
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
        },
        {
          name: 'Maria Cole',
          title: 'Grow Your Blog Community',
          avatar: 'https://i.ibb.co/yWzNT3Q/2-3.png',
          description: 'We made it quick and convenient for you to manage blog',
          imageUrl: 'https://i.ibb.co/rGqqZtF/2.jpg'
        },
        {
          name: 'Maria Cole',
          title: 'Let us have more information',
          avatar: 'https://i.ibb.co/yWzNT3Q/2-3.png',
          description: 'We made it quick and convenient for you to manage blog',
          imageUrl: 'https://i.ibb.co/bgfqQWN/3.jpg'
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
        .post-large-item{border:1px solid lightgray; width:300px; margin:10px;min-width:300px}
        .post-large-item-header{display:flex; align-items:center; padding:10px}
        .post-large-item-body{padding:10px; padding-bottom:20px;}
        .item-image-avatar{border-radius:50%; margin-right:10px;}
        .post-card-container{padding:5px}
        .post-large-item-description{margin-bottom:10px;}
        .post-comment{padding:10px; border-top:1px solid lightgray}
        .customer-visit-history{display:flex; align-items:center; justify-content:space-between}
        .customer-visit-comment{display:flex; align-items:center}
        `,
      stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius']
    }
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:blogs', this.handleChangeBlogs);
    },
    postMoment(dt){
      if(dt){
        const a = moment(new Date());//now
        const b = moment(dt);
        let seconds=a.diff(b, 'seconds');
        let minutes=a.diff(b, 'minutes'); // 44700
        let hours=a.diff(b, 'hours'); // 745
        let days=a.diff(b, 'days'); // 31
        let weeks=a.diff(b, 'weeks');
        if(weeks>0){
            const result=weeks.toString()+' '+'weeks' +' '+'ago';
            return result
          } 
        else{
          if(days>0)
          {
              const result=days.toString()+' '+'days'+' '+'ago';
              return result
          }
          else{
            if(hours>0){
                const result=hours.toString()+' '+'hours'+' '+'ago';
                return result; 
              }
            else{
              if(minutes>0){
                const result=minutes.toString()+' '+'minutes'+' '+'ago';
                return result;
              }
              else{
                if(seconds>10){
                  const result=seconds.toString()+' '+'seconds'+' '+'ago';
                  return result;
                }
                else{
                  const result='a few seconds ago'
                  return result;
                }
              }  
              }
            }
          }
      }
      else{
        return;
      }
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
              const post_time=this.postMoment(blog.createdAt);
              return (
                <div class="post-large-item">
                  <div class="post-large-item-header">
                    <img src={blog.avatar} class="item-image-avatar" width="10%" />
                    <div>
                      <div class="post-large-item-name">{blog.name}</div>
                      <div style="margin-top:10px;font-size:14px;">{post_time}</div>
                    </div>

                  </div>
                  <div class="post-large-item-image">
                    <img src={blog.imageUrl} width="100%" height="180px" />
                  </div>
                  <div class="post-large-item-body">
                    <div class="post-large-item-title">
                      <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`}>
                       <h2>{blog.title}</h2>
                      </a>
                    </div>
                    <div class="post-large-item-description">
                     <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`}>
                      {blog.description}
                      </a>
                      </div>
                    <div class="post-comment">
                    <div class="customer-visit-history">
                          <div class="customer-visit-comment">
                            <img src="https://i.ibb.co/9TptRDC/eye.png" width="16px" style="margin-right:5px"/>
                            <div>0</div>
                            <img src="https://i.ibb.co/YbVMJrd/message.png" width="16px" style="margin-left:20px; margin-right:5px"/>
                            <div>0</div>
                          </div>
                          <img src="https://i.ibb.co/Zx2T8G3/heart.png" width="16px"/>
                        </div>
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

export default postCard;
