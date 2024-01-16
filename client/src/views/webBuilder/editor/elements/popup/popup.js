// This is our custom script (avoid using arrow functions)
const script = function() {
  var modal = this.querySelector(".modal-wrapper");
  var btn = this.querySelector(".modal-open-button");
  var span = this.querySelector(".close");

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }
};

let popup = {
  isComponent: el => (el.tagName === 'DIV' && el.classList.contains('popup')),
  model: {
    defaults: {
      script,
      tagName: 'div',
      draggable: '*',
      droppable: true,
      attributes: { class: 'popup' },
      components: () => {
        const time = new Date().getTime();
        const id = `popup-wrapper-${time}`;
        const trigerId = `popup-trigger-${time}`;
        return `
          <button class="btn btn-primary modal-open-button" id=${trigerId}>Open Modal</button>
          <div class="modal-wrapper" id=${id}>
            <div class="modal-content">
              <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Modal Header</h2>
              </div>
              <div class="modal-body">
                <p>Some text in the Modal Body</p>
                <p>Some other text...</p>
              </div>
              <div class="modal-footer">
                <h3>Modal Footer</h3>
              </div>
            </div>
          </div>
        `;
      },
      styles: `
        .modal-wrapper {
          display: none;
          position: fixed;
          z-index: 100;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }

        .modal-content {
          position: relative;
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
          -webkit-animation-name: animatetop;
          -webkit-animation-duration: 0.4s;
          animation-name: animatetop;
          animation-duration: 0.4s
        }

        @-webkit-keyframes animatetop {
          from {top:-300px; opacity:0} 
          to {top:0; opacity:1}
        }

        @keyframes animatetop {
          from {top:-300px; opacity:0}
          to {top:0; opacity:1}
        }

        .close {
          color: black;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        .modal-header {
          padding: 2px 10px;
          color: black;
        }

        .modal-body {padding: 2px 10px;}

        .modal-footer {
          padding: 2px 10px;
          color: black;
        }

        .modal-open-button {
          width: 200px;
          height: 50px;
          border-radius: 5px;
        }

        .popup {
          width: fit-content;
          padding: 10px;
        }
      `,
      startTime: '',
      endTime: '',
      cycle: 'click_btn',
      cycleDetails: {},
      traits: [
        {
          id: 'start-time',
          type: 'date',
          label: 'Start Time',
          name: 'startTime',
          changeProp: true,
        },
        {
          id: 'end-time',
          type: 'date',
          label: 'End Time',
          name: 'endTime',
          changeProp: true,
        },
        {
          id: 'select-cycle',
          type: 'select',
          name: 'cycle',
          label: 'Cycle',
          options: [
            { id: 'click_btn', name: 'Click Button'},
            { id: 'start_page', name: 'Start Page'},
            { id: 'daily', name: 'Daily'},
            { id: 'weekly', name: 'Weekly'},
            { id: 'monthly', name: 'Monthly'},
          ],
          changeProp: true,
        },
        {
          id: 'cycle-detail',
          type: 'popup-cycle',
          name: 'cycleDetails',
          label: 'Setting',
          changeProp: true,
        }
      ],
    }
  },
  view: {
    init() {
      this.listenTo(this.model, 'change:cycle', this.handleChangeCycle);
    },
    handleChangeCycle(e) {
      const cycle = this.model.get('cycle');
      let cycleDetails;
      if (cycle === 'start_page') {
        cycleDetails = {
          afterSeconds: 1,
        };
      }
      if (cycle === 'daily') {
        cycleDetails = {
          time: '09:00',
        };
      }
      if (cycle === 'weekly') {
        cycleDetails = {
          days: ['Mon'],
          time: '09:00',
        };
      }
      if (cycle === 'monthly') {
        cycleDetails = {
          dates: 1,
          time: '09:00',
        };
      }
      if (cycle === 'click_btn') {
        cycleDetails = {};
      }
      this.model.set('cycleDetails', cycleDetails);
      this.render();
    },
  }
};

export default popup;
