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
        const id = `popup-${new Date().getTime()}`;
        const trigerId = `popup-triger-${new Date().getTime()}`;
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
      `,
      popup_rule: {
        isTimer: false,
        isRepeat: false,
        cycle: 'day',
        eventDetails: {
          isAllDay: true,
          startTime: '09:00:00',
          endTime: '17:00:00',
          timeZone: 'UTC',
        },
        endDate: null,
      },
      traits: [
        {
          type: 'popup',
          name: 'popup_rule',
          changeProp: true,
        },
      ],
    }
  },
};

export default popup;
