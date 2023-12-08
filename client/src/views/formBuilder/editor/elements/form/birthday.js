const script = function(props) {
    alert('Hi');
    // `this` is bound to the component element
    console.log('the element', props.repeaterWidth, props.myprop2);
    return 111;
  };
  
  let birthdayEl = {
    isComponent: el => el.tagName === 'div',
    model: {
      defaults: {
        // script,
        tagName: 'div',
        draggable: '*',
        droppable: false,
        attributes: { class: 'birthday-element' },
        components: (props) => {
            const elProp = props.attributes.elProps[0];
            const months=['Month','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return(
                    <div class="birthday-wrapper">
                        <div class="birthday-label">
                          <label for={elProp.id}>{elProp.label}</label>
                        </div>
                        <div class="birthday-container">
                          <select required class="select-month-element">
                              {
                                months && months.map((month, i)=>{
                                  if(i===0){
                                    return (<option value="">{month}</option>)
                                  }
                                  else{
                                    return(<option value={month}>{month}</option>)
                                  }
                                  
                                })
                              }
                          </select>
                          <input type='text' class="birthday-input-element" placeholder="Day"/>
                          <input type='text' class="birthday-input-element" placeholder="Year"/>

                        </div>   
                    </div>         
            )
          },
        elProps:[
            {   
                id: 'birthday'+ Math.random().toString(36).substring(2,7),
                label:'Birthday',
                type:'placeholder',
                name:'birthday',
            }
        ],
        styles: `
        .birthday-element {padding:10px; display:flex; justify-content:space-around}
        .birthday-label {margin-bottom:10px}
        .birthday-wrapper {width:480px}
        .birthday-container {display:flex; justify-content:space-around}
        .select-month-element {min-width:150px; padding:10px; font-size:14px}
        .birthday-input-element {width:150px}
      `,
        stylable: ['width', 'background-color', 'margin', 'padding', 'border', 'border-radius'],
      },
    },
    view: {
      init() {
        this.listenTo(this.model, 'change:elProps', this.handleChangeProps);
      },
      handleChangeProps(e) {
        const comps=this.model.get('components');
        const elProp=this.model.get('elProps')[0];
        const type=elProp.type;
        while (comps.length > 0) {
          comps.pop();
        };
        let item;
        if(type==='placeholder'){
          let months=['Month','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          item=  
            <div class="birthday-wrapper">
                <div class="birthday-label">
                  <label for={elProp.id}>{elProp.label}</label>
                </div>
                <div style="display:flex; justify-content:space-around">
                  <select required style="min-width:150px; padding:10px; font-size:14px">
                      {
                        months && months.map((month, i)=>{
                          if(i===0){
                            return (<option value="">{month}</option>)
                          }
                          else{
                            return(<option value={month}>{month}</option>)
                          }
                          
                        })
                      }
                  </select>
                  <input type='text' placeholder="Day" style="width:150px"/>
                  <input type='text' placeholder="Year" style="width:150px"/>

                </div>   
            </div>;
  
        }
        if(type==='current'){
          const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const today=new Date();
          const month_index=today.getMonth();
          const year=today.getFullYear();
          const date=today.getDate();
          item=  
          <div class="birthday-wrapper">
              <div style="margin-bottom:10px">
                <label for={elProp.id}>{elProp.label}</label>
              </div>
              <div style="display:flex; justify-content:space-around">
                <select required style="min-width:150px; padding:10px; font-size:14px">
                    {
                      months && months.map((month, i)=>{
                        if(i===month_index){
                          return (<option selected={month} value={month}>{month}</option>)
                        }
                        else{
                          return(<option value={month}>{month}</option>)
                        }
                        
                      })
                    }
                </select>
                <input type='text' placeholder="Day" style="width:150px" value={date}/>
                <input type='text' placeholder="Year" style="width:150px" value={year}/>

              </div>   
          </div>;
        }
        if(type==='blank'){
          const months=[' ','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          item=  
          <div class="birthday-wrapper ">
              <div style="margin-bottom:10px">
                <label for={elProp.id}>{elProp.label}</label>
              </div>
              <div style="display:flex; justify-content:space-around">
                <select required style="min-width:150px; padding:10px; font-size:14px">
                    {
                      months && months.map((month, i)=>{
                        if(i===0){
                          return (<option value="">{month}</option>)
                        }
                        else{
                          return(<option value={month}>{month}</option>)
                        }
                        
                      })
                    }
                </select>
                <input type='text' style="width:150px"/>
                <input type='text' style="width:150px"/>

              </div>   
          </div>;
        }
        comps.push(item);
        this.render();
      },
    }
  };
  
  export default birthdayEl;
  