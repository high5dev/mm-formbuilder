const script = function(props) {
  setInterval(() => {
    const now = new Date().getTime();
    const distance = new Date(props.date).getTime() - now;

    if (distance >= 0) {
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const newEl=  document.createElement('div');

      this.querySelector('.days-item').innerHTML = ('00' + days.toString()).slice(-2);
      this.querySelector('.hours-item').innerHTML = ('00' + hours.toString()).slice(-2);
      this.querySelector('.mins-item').innerHTML = ('00' + minutes.toString()).slice(-2);
      this.querySelector('.secs-item').innerHTML = ('00' + seconds.toString()).slice(-2);
    }
  }, 1000);
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
      components: (props) => {
        return `
          <div>
            <div class="count-item days-item">00</div>
            <div class="item-label">days</div>
          </div>
          <div class="split-dots">:</div>
          <div>
            <div class="count-item hours-item">00</div>
            <div class="item-label">hours</div>
          </div>
          <div class="split-dots">:</div>
          <div>
            <div class="count-item mins-item">00</div>
            <div class="item-label">mins</div>
          </div>
          <div class="split-dots">:</div>
          <div>
            <div class="count-item secs-item">00</div>
            <div class="item-label">secs</div>
          </div>
        </div>
      `;
      },
      date: '2023-01-01T00:00:00',
      // viewSplit: 'true',
      // viewLabel: 'true',
      traits: [
        {
          type: 'date',
          name: 'date',
          label: 'Date and Time',
          changeProp: true,
        },
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
        .count-down {padding: 10px; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold;}
        .count-item {text-align: center; font-size: 50px;}
        .item-label {text-align: center; font-size: 20px;}
        .split-dots {align-self: start; font-size: 50px; padding-right: 10px; padding-left: 10px;}
      `,
      'script-props': ['date'],
    },
  },
};

export default countDown;
