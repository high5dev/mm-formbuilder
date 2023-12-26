import moment from 'moment';
let postSidebar = {
    isComponent: el => (el.tagName === 'DIV' && el.classList.contains('post-sidebar')),
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'post-sidebar'},
        components: (props) => {
           const blogs=props.attributes.blogs; 
           return(
            <div class="post-sidebar-container">
                {
                  blogs && blogs.map((blog) =>{
                    return(
                        <div class="post-sidebar-item">
                            <div class="post-sidebar-header">
                            <img src={blog.avatar} class="sidebar-avatar" width="30px"/>
                            <div class="post-sidebar-name">
                                {blog.name}
                            </div>
                        </div>
                        <div class="post-sidebar-body">
                            <div class="post-sidebar-left">
                                <div class="post-sidebar-title">
                                <span>{blog.title}</span>
                            </div>
                            <div class="post-sidebar-description">
                                {blog.description}
                            </div>
                            </div>
                            <div class="post-sidebar-right">
                            <img src={blog.imageUrl} width="100%"/>
                            </div>
                        </div>
                    </div>
                    )
                  })
                }
            </div>
           )

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
            min: 1,
          },
        ],
        
        styles: `
        a{text-decoration:none; color:black}
        a:hover{color:blue}
        .post-sidebar-container{width:400px;}
        .post-sidebar-header{display:flex; align-items:center;justify-content:space-between}
        .post-avatar-image{display:flex; align-items:center}
        .post-sidebar-name{margin-left:10px;}
        .sidebar-avatar{border-radius:50%}
        .post-sidebar-item{border:1px solid lightgray; padding:5px; margin:10px}
        .post-sidebar-body{margin-top:10px; display:flex}
        .post-sidebar-left{width:70%;}
        .post-sidebar-title{font-size:18px; font-weight:bold;}
        .post-sidebar-description{margin-top:10px;}
        .post-sidebar-right{width:30%}
        .post-sidebar{padding:5px; width:450px}
        `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius'],
      },
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
              const result=weeks.toString()+' '+'weeks'+' '+'ago';
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
      handleChangeBlogs(e){
        let comps=this.model.get('components');
        let blogs=this.model.get('blogs');
        while (comps.length > 0) {
          comps.pop();
        };
        const cmp=
        <div class="post-sidebar-container">
        {
          blogs && blogs.map((blog) =>{
            const post_time=this.postMoment(blog.createdAt);
                return(
                    <div class="post-sidebar-item">
                        <div class="post-sidebar-header">
                          <div class="post-avatar-image">
                            <img src={blog.avatar} class="sidebar-avatar" width="30px"/>
                            <div class="post-sidebar-name">
                                {blog.name}
                            </div>
                          </div>
  
                          <div style="margin-left:5px;">{post_time}</div>
                        </div>
                    <div class="post-sidebar-body">
                        <div class="post-sidebar-left">
                            <div class="post-sidebar-title">
                            <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`}>
                              <span>{blog.title}</span>
                            </a>
                        </div>
                        <div class="post-sidebar-description">
                           <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`}>
                            {blog.description}
                            </a>
                        </div>
                        </div>
                        <div class="post-sidebar-right">
                        <img src={blog.imageUrl} width="100%"/>
                        </div>
                    </div>
                </div>
                )
            })
            }
        </div>
        comps.push(cmp);
        this.render();
      }
    }
  };
  
  export default postSidebar;
  