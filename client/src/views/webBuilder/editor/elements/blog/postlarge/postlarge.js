import moment from 'moment';
let postLarge = {
    isComponent: el => el.tagName === 'div',
    model: {
      defaults: {
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'post-container'},
        components: (props) => {
           return(
            <div>
              {
                props.attributes.blogs.map((blog) =>{
                  return(<div class="post-large-container">
                  <div class="post-large-container-left">
                      <img src={blog.imageUrl} width="350px" />
                  </div>
                <div class="post-large-container-right">
                  <span class="post-large-header">
                    <img src={blog.avatar} class="image-avatar" width="100px"/>
                    <div class="post-large-name">
                      {blog.name}
                    </div>
                  </span>
                  <div class="post-large-body">
                      <div class="post-large-title">
                          <h2>{blog.title}</h2>
                      </div>
                      <div class="post-large-description">
                          {blog.description}
                      </div>
                  </div>
                  </div>
               </div>);
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
          .post-large-container{display:flex; align-items:center;border:1px solid lightgray;margin:10px}
          .post-large-container-left {width:50%}
          .post-large-container-right {width:50%; padding-left:20px}
          .image-avatar{border-radius:50%; margin-right:10px;}
          .post-large-header{display:flex; align-items:center}
          .post-container{padding:5px; width:700px}
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
              const result=weeks.toString()+' '+'weeks';
              return result
            } 
          else{
            if(days>0)
            {
                const result=days.toString()+' '+'days';
                return result
            }
            else{
              if(hours>0){
                  const result=hours.toString()+' '+'hours';
                  return result; 
                }
              else{
                if(minutes>0){
                  const result=minutes.toString()+' '+'minutes';
                  return result;
                }
                else{
                  if(seconds>10){
                    const result=seconds.toString()+' '+'seconds';
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
        const item=<div>
        {
          blogs && blogs.map((blog) =>{
            const post_time=this.postMoment(blog.createdAt);
            return(<div class="post-large-container">
            <div class="post-large-container-left">
                <img src={blog.imageUrl} width="100%" />
            </div>
          <div class="post-large-container-right">
            <span class="post-large-header">
              <img src={blog.avatar} class="image-avatar" width="20%"/>
              <div class="post-large-name">
                {blog.name}
                <div style="margin-top:10px;font-size:14px;">{post_time}</div>
              </div>
 
            </span>
            <div class="post-large-body">
                  <div class="post-large-title">
                      <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`} target='_blank'>
                       <h2>{blog.title}</h2>
                      </a>
                  </div>
                  <div class="post-large-description">
                    <a href={`/${blog.websiteId}/${blog.pageName}/${blog._id}`} target='_blank'>
                      {blog.description}
                      </a>
                  </div>
            </div>
        </div>
      </div>);
          })
        }
      </div>
       comps.push(item);
        this.render();
      }

  }
}
  export default postLarge;
  