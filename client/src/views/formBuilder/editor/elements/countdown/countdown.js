import { components } from "react-select";

const script = function(props) {
  const now1 = new Date().getTime();
  const start1 = new Date(props.startDate).getTime();
  const end1 = new Date(props.endDate).getTime();
  const rules = props.rules;
  const viewItems = props.viewItems;
  let distance1 = 0;

  if (start1 <= now1) {
    distance1 = end1 - now1;
  } else {
    distance1 = end1 - start1;
  }

  if (viewItems.days) {
    this.querySelector('.days').style.display = 'block';
    if (this.querySelector('.days-dots')) {
      if (viewItems.hours || viewItems.mins || viewItems.secs)
        this.querySelector('.days-dots').style.display = 'block';
      else
        this.querySelector('.days-dots').style.display = 'none';
    }
  } else {
    this.querySelector('.days').style.display = 'none';
    if (this.querySelector('.days-dots')) {
      if (viewItems.hours || viewItems.mins || viewItems.secs)
        this.querySelector('.days-dots').style.display = 'none';
    }
  }

  if (viewItems.hours) {
    this.querySelector('.hours').style.display = 'block';
    if (this.querySelector('.hours-dots')) {
      if (viewItems.mins || viewItems.secs)
        this.querySelector('.hours-dots').style.display = 'block';
      else
        this.querySelector('.hours-dots').style.display = 'none';
    }
  } else {
    this.querySelector('.hours').style.display = 'none';
    if (this.querySelector('.hours-dots')) {
      if (viewItems.mins || viewItems.secs)
        this.querySelector('.hours-dots').style.display = 'none';
    }
  }

  if (viewItems.mins) {
    this.querySelector('.mins').style.display = 'block';
    if (this.querySelector('.mins-dots')) {
      if (viewItems.secs)
        this.querySelector('.mins-dots').style.display = 'block';
      else
        this.querySelector('.mins-dots').style.display = 'none';
    }
  } else {
    this.querySelector('.mins').style.display = 'none';
    if (this.querySelector('.mins-dots')) {
      if (viewItems.secs)
        this.querySelector('.mins-dots').style.display = 'none';
    }
  }

  if (viewItems.secs) {
    this.querySelector('.secs').style.display = 'block';
  } else {
    this.querySelector('.secs').style.display = 'none';
  }

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const start = new Date(props.startDate).getTime();
    const end = new Date(props.endDate).getTime();
    let distance = 0;
  
    if (start <= now) {
      distance = end - now;
    } else {
      distance = end - start;
    }

    if (distance > 0) {
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.querySelector('.days-item').innerHTML = ('00' + days.toString()).slice(-2);
      this.querySelector('.hours-item').innerHTML = ('00' + hours.toString()).slice(-2);
      this.querySelector('.mins-item').innerHTML = ('00' + minutes.toString()).slice(-2);
      this.querySelector('.secs-item').innerHTML = ('00' + seconds.toString()).slice(-2);
    } else {
      if (rules.hideCountDown) {
        this.style.display = 'none';
      }
      if (rules.closeForm) {
  
      }
      if (rules.hidePage) {
  
      }
      if (rules.showOtherPage) {
  
      }
      if (rules.showOtherElement) {
  
      } 
    }
  }, 1000);
  
  if (distance1 <= 0) {
    clearInterval(interval);
    if (rules.hideCountDown) {
      this.style.display = 'none';
    }
    if (rules.closeForm) {

    }
    if (rules.hidePage) {

    }
    if (rules.showOtherPage) {

    }
    if (rules.showOtherElement) {

    } 
  }
  return;
};

let countDown = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('count-down')),
  model: {
    defaults: {
      script,
      tagName: 'div',
      draggable: '*',
      droppable: false,
      attributes: { class: 'count-down' },
      components:[
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item days-item' }
            },
            {
              tagName: 'div',
              components: 'days',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'days' }
        },
        {
          tagName: 'div',
          components: ':',
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'split-dots days-dots' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item hours-item' }
            },
            {
              tagName: 'div',
              components: 'hours',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'hours' }
        },
        {
          tagName: 'div',
          components: ':',
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'split-dots hours-dots' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item mins-item' }
            },
            {
              tagName: 'div',
              components: 'mins',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'mins' }
        },
        {
          tagName: 'div',
          components: ':',
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'split-dots mins-dots' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item secs-item' }
            },
            {
              tagName: 'div',
              components: 'secs',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'secs' }
        },
        {
          tagName: 'style',
          components: `
          .days, .hours, .mins, .secs {padding-right: 10px; padding-left: 10px; padding-bottom: 5px; border: none; background-image: none; color: #000;}
          .count-down {padding: 10px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold;}
          .count-item {text-align: center; font-size: 50px;}
          .item-label {text-align: center; font-size: 20px;}
          .split-dots {align-self: start; font-size: 50px; padding-right: 10px; padding-left: 10px;}
          `,
        }
      ],
      startDate: '2023-01-01 00:00',
      endDate: '2023-01-01 00:00',
      rules: {
        hideCountDown: false,
        closeForm: true,
        hidePage: false,
        showOtherPage: false,
        showOtherElement: false,
      },
      viewItems: {
        days: true,
        hours: true,
        mins: true,
        secs: true,
      },
      template: 'template1',
      traits: [
        {
          type: 'date',
          name: 'startDate',
          label: 'Start time',
          changeProp: true,
        },
        {
          type: 'date',
          name: 'endDate',
          label: 'End time',
          changeProp: true,
        },
        {
          type: 'count-down-rules',
          name: 'rules',
          label: 'Rules when time is over',
          changeProp: true,
        },
        {
          type: 'count-down-view-items',
          name: 'viewItems',
          label: 'Select items to show',
          changeProp: true,
        },
        {
          type: 'select',
          name: 'template',
          options: [
            { id: 'template1', name: 'Countdown 1'},
            { id: 'template2', name: 'Countdown 2'},
            { id: 'template3', name: 'Countdown 3'},
          ],
          changeProp: true,
        }
      ],
      'script-props': ['startDate', 'endDate', 'rules', 'viewItems', 'template'],
    },
  },
  view: {
    init(){
      this.listenTo(this.model, 'change:template', this.changeTemplate);
    },
    changeTemplate() {
      const comps = this.model.get('components');
      comps.reset();
      const template = this.model.get('template');
      if (template === 'template1') {
        comps.push([
          {
            tagName: 'div',
            components: [
              {
                tagName: 'div',
                components: '00',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'count-item days-item' }
              },
              {
                tagName: 'div',
                components: 'days',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'item-label' }
              }
            ],
            hoverable: false,
            badgable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'days' }
          },
          {
            tagName: 'div',
            components: ':',
            hoverable: false,
            badgable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'split-dots days-dots' }
          },
          {
            tagName: 'div',
            components: [
              {
                tagName: 'div',
                components: '00',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'count-item hours-item' }
              },
              {
                tagName: 'div',
                components: 'hours',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'item-label' }
              }
            ],
            hoverable: false,
            badgable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'hours' }
          },
          {
            tagName: 'div',
            components: ':',
            hoverable: false,
            badgable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'split-dots hours-dots' }
          },
          {
            tagName: 'div',
            components: [
              {
                tagName: 'div',
                components: '00',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'count-item mins-item' }
              },
              {
                tagName: 'div',
                components: 'mins',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'item-label' }
              }
            ],
            hoverable: false,
            badgable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'mins' }
          },
          {
            tagName: 'div',
            components: ':',
            hoverable: false,
            badgable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'split-dots mins-dots' }
          },
          {
            tagName: 'div',
            components: [
              {
                tagName: 'div',
                components: '00',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'count-item secs-item' }
              },
              {
                tagName: 'div',
                components: 'secs',
                hoverable: false,
                badgable: false,
                draggable: false,
                droppable: false,
                selectable: false,
                attributes: { class: 'item-label' }
              }
            ],
            hoverable: false,
            badgable: false,
            draggable: false,
            droppable: false,
            selectable: false,
            attributes: { class: 'secs' }
          },
          {
            tagName: 'style',
            components: `
            .days, .hours, .mins, .secs {padding-right: 10px; padding-left: 10px; padding-bottom: 5px; border: none; background-image: none; color: #000;}
            .count-down {padding: 10px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold;}
            .count-item {text-align: center; font-size: 50px;}
            .item-label {text-align: center; font-size: 20px;}
            .split-dots {align-self: start; font-size: 50px; padding-right: 10px; padding-left: 10px;}
            `,
          }
        ]);
      }
      if (template === 'template2') {
        comps.push([{
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item days-item' }
            },
            {
              tagName: 'div',
              components: 'days',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'days' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item hours-item' }
            },
            {
              tagName: 'div',
              components: 'hours',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'hours' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item mins-item' }
            },
            {
              tagName: 'div',
              components: 'mins',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'mins' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item secs-item' }
            },
            {
              tagName: 'div',
              components: 'secs',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'secs' }
        },
        {
          tagName: 'style',
          components: `
            .days, .hours, .mins, .secs {padding-right: 10px; padding-left: 10px; padding-bottom: 5px; border: none; color: #000; background-image: linear-gradient(45deg, blue, red); align-items: center; justify-content: center; color: #fff; width: 100px; height: 100px; border-radius: 50%; margin-right: 10px; margin-left: 10px}
            .count-down {padding: 10px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold;}
            .count-item {text-align: center; font-size: 50px;}
            .item-label {text-align: center; font-size: 20px;}
            .split-dots {align-self: start; font-size: 50px; padding-right: 10px; padding-left: 10px;}
          `,
        }]);
      }
      if (template === 'template3') {
        comps.push([{
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item days-item' }
            },
            {
              tagName: 'div',
              components: 'days',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'days' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item hours-item' }
            },
            {
              tagName: 'div',
              components: 'hours',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'hours' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item mins-item' }
            },
            {
              tagName: 'div',
              components: 'mins',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'mins' }
        },
        {
          tagName: 'div',
          components: [
            {
              tagName: 'div',
              components: '00',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'count-item secs-item' }
            },
            {
              tagName: 'div',
              components: 'secs',
              hoverable: false,
              badgable: false,
              draggable: false,
              droppable: false,
              selectable: false,
              attributes: { class: 'item-label' }
            }
          ],
          hoverable: false,
          badgable: false,
          draggable: false,
          droppable: false,
          selectable: false,
          attributes: { class: 'secs' }
        },
        {
          tagName: 'style',
          components: `
            .days, .hours, .mins, .secs {padding-right: 15px; padding-left: 15px; padding-bottom: 5px; border-radius: 5px; margin-right: 10px; margin-left: 10px; background-image: linear-gradient(in hsl longer #12a689, black); color: #fff;}
            .count-down {padding: 10px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold;}
            .count-item {text-align: center; font-size: 50px;}
            .item-label {text-align: center; font-size: 20px;}
          `,
        }]);
      }
      this.render();
    }
  }
};

export default countDown;
