const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';
import formsnfunnelsTourStep1 from '@src/assets/images/onboarding/businesstools/formsnfunnels-tour-step-1.jpg';
import formsnfunnelsTourStep2 from '@src/assets/images/onboarding/businesstools/formsnfunnels-tour-step-2.png';
import qrnbarcodeTourStep1 from '@src/assets/images/onboarding/businesstools/qrnbarcode-tour-step-1.jpg';
import chatTourStep1 from '@src/assets/images/onboarding/businesstools/contact-chat.png';
import congraturationStep from '@src/assets/images/onboarding/businesstools/congraturation.png';

// ** Businness Tools [Forms & Funnels] tour steps
export const formsnfunnelsSteps = [
  {
    classes: 'formsnfunnels-tour-step-1',
    title: 'Simplifying Your Forms & Funnels Management Experience',
    text: [`<div>Step 1: Click on Forms and Funnels</div><img src=${formsnfunnelsTourStep1} />`],
    attachTo: {
      element: '.formsnfunnels-tour-start-point',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Now that you are ready',
    text: [`<div>Step 2: </div><img src=${formsnfunnelsTourStep2} />`],
    attachTo: {
      element: '.formsnfunnels-tour-2',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-2',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Check all of your forms and funnels',
    text: [
      'Step 3: This is where you find all your forms and funnels. Just click on a formsnfunnels to see the details'
    ],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div > div > div.d-flex.flex-row.flex-1.bg-white',
      on: 'left'
    },
    classes: 'formsnfunnels-tour-step-3',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'How do you like it?',
    text: [
      `
      <div style="display: flex">
        <div style="margin-right: 1rem; margin-top: 0.8rem">
          <p>Great!</p>
          <p>You completed the <b>Forms and Funnels</b> tour.</p>
        </div>
        <img src=${congraturationStep} style="
          width: 10rem;
          height: 7rem;
        "/>
      </div>`
    ],
    attachTo: {
      element: '.tour-step-5',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-5',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: finishBtnClass,
        text: 'Done',
        type: 'complete'
      }
    ]
  }
];

// ** Businness Tools [QR & Barcode] tour steps
export const qrcodenbarcodeSteps = [
  {
    id: 'intro-qrcode',
    classes: 'formsnfunnels-tour-step-1',
    title: 'Generate various QRCodes and Barcodes for business operations',
    text: [`<div>Step 1: Click on QR & Barcode</div><img src=${qrnbarcodeTourStep1} />`],
    attachTo: {
      element: '.qrcode-tour-start-point',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  // ** QRCode Tour
  {
    title: "Let's start QRCode!",
    text: ['<div>Step 2: Please select QRCode Tab to generate QRCode</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-right-side.col-sm-12.col-md-2 > ul > li:nth-child(1)',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-2',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'QRCode Name and Content',
    text: [
      '<div>Step 3: Enter an identifiable QRCode name, select content, and enter content information.</div>'
    ],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.qrcode-leftside.col-sm-12.col-md-12.col-lg-8 > div > div:nth-child(1)',
      on: 'left'
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Set Color',
    text: [
      'Step 4: You can change background color and foreground color of qrcode using color picker.'
    ],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.qrcode-leftside.col-sm-12.col-md-12.col-lg-8 > div > div:nth-child(2)',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector(
            '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.qrcode-leftside.col-sm-12.col-md-12.col-lg-8 > div > div:nth-child(2)'
          );
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Add Logo for QRCode',
    text: ['Step 5: Please select logo image for qrcode.'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.qrcode-leftside.col-sm-12.col-md-12.col-lg-8 > div > div:nth-child(3)',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector(
            '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.qrcode-leftside.col-sm-12.col-md-12.col-lg-8 > div > div:nth-child(3)'
          );
          field.scrollIntoView({ behavior: 'smooth' });
          resolve();
        }, 0);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Generate QR code',
    text: ['Step 6: You can generate and download qr code, should save to use it.'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.qrcode-leftside.col-sm-12.col-md-12.col-lg-8 > div > div:nth-child(4)',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector(
            '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.qrcode-leftside.col-sm-12.col-md-12.col-lg-8 > div > div:nth-child(4)'
          );
          field.scrollIntoView({ behavior: 'smooth' });
          resolve();
        }, 0);
      });
    },
    classes: 'formsnfunnels-tour-step-6',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Preview',
    text: ['Step 7: Preview for generated code as smart phone'],
    attachTo: {
      element: '#smartphonearea',
      on: 'left'
    },
    classes: 'formsnfunnels-tour-step-7',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  // ** Barcode Tour
  {
    title: 'Select the Barcode tab',
    text: ['Step 8: You can now start browsing the barcode by clicking this button'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-right-side.col-sm-12.col-md-2 > ul > li:nth-child(2)',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    classes: 'formsnfunnels-tour-step-8',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Barcode name and content',
    text: ['Step 9: First, please input barcode name and content infomation'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.barcode-leftside.col-sm-12.col-md-12.col-lg-12 > div > div:nth-child(1)',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-9',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Barcode color',
    text: ['Step 10: And then, select the color you want'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.barcode-leftside.col-sm-12.col-md-12.col-lg-12 > div > div:nth-child(2)',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-10',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Save barcode',
    text: ['Step 11: Now, you can see that generated barcode. Please save it!'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.barcode-leftside.col-sm-12.col-md-12.col-lg-12 > div > div:nth-child(3)',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector(
            '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.barcode-leftside.col-sm-12.col-md-12.col-lg-12 > div > div:nth-child(3)'
          );
          field.scrollIntoView({ behavior: 'smooth' });
          resolve();
        }, 0);
      });
    },
    classes: 'formsnfunnels-tour-step-11',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  // ** Library Tour
  {
    title: 'Choose library',
    text: ['Step 12: In here, you can see the all generated QR & barcodes'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-right-side.col-sm-12.col-md-2 > ul > li:nth-child(3)',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-8',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'QR code and barcode list',
    text: ['Step 13: These are all generated QR code</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.code-list.row',
      on: 'left'
    },

    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next',
        next: function () {
          this.options.tour.onTourToggle();
          instance.hide();
        }
      }
    ]
  },
  {
    title: 'Search list',
    text: ['Step 14: You can search lists. Please type your keyword</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.d-flex.justify-content-between > div.d-flex.align-items-center > div.input-group-merge.input-group',
      on: 'left'
    },

    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next',
        next: function () {
          this.options.tour.onTourToggle();
          instance.hide();
        }
      }
    ]
  },
  {
    title: 'Switch Toggle',
    text: ['Step 15: Toggle between QR code and barcode'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.setting-left-side.col-sm-12.col-md-10 > div > div.tab-pane.active > div > div.d-flex.justify-content-between > div.d-flex.align-items-center > div.toggle-switch-code',
      on: 'left'
    },

    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next',
        next: function () {
          this.options.tour.onTourToggle();
          instance.hide();
        }
      }
    ]
  },
  {
    title: 'Congratulation!',
    text: [
      `
    <div style="display: flex">
      <div style="margin-right: 1rem; margin-top: 0.8rem">
        <p>Great!</p>
        <p>You completed the <b>Forms and Funnels</b> tour.</p>
      </div>
      <img src=${congraturationStep} style="
        width: 10rem;
        height: 7rem;
      "/>
    </div>`
    ],
    attachTo: {
      element: '.tour-step-5',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-5',
    buttons: [
      {
        classes: finishBtnClass,
        text: 'Done',
        type: 'complete'
      }
    ]
  }
];

// ** Businness Tools [Chat] tour steps
export const chatSteps = [
  {
    id: 'intro-chat',
    title: 'User friendly chat room',
    text: [
      `<div>Step 1: Click on Chat</div>
      <div style="display: flex; margin-top: 1rem;">
        <p style="margin-right: 1rem">Here, you can communicate with your friends </p>
        <img src=${chatTourStep1} style="width: 6rem; height: 4rem;"/>
      </div>
      `
    ],
    attachTo: {
      element: '.chat-tour-start-point',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Chat history',
    text: [
      `<div>Step 2: You can check your chat history by your friend's name here.</div><img src="./assets/images/onboarding/businesstools/chat-2.png" />`
    ],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.content-area-wrapper.animate__animated.animate__fadeIn > div.sidebar-left.chat-sidebar-left > div > div.sidebar-content > div.scrollbar-container.chat-user-list-wrapper.list-group.ps.ps--active-y > ul.chat-users-list.chat-list.media-list',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-2',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Browse your Contacts',
    text: ['<div>Step 3: Select a contact/>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.content-area-wrapper.animate__animated.animate__fadeIn > div.sidebar-left.chat-sidebar-left > div > div.sidebar-content > div.scrollbar-container.chat-user-list-wrapper.list-group.ps.ps--active-y > ul.chat-users-list.contact-list.media-list',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Type here to send message',
    text: ['Step 4: This is a chat box to send your message to your friend'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.content-area-wrapper.animate__animated.animate__fadeIn > div.content-right > div > div > div.chat-app-window > div.active-chat > form',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-4',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'How do you like it?',
    text: [
      `
    <div style="display: flex">
      <div style="margin-right: 1rem; margin-top: 0.8rem">
        <p>Great!</p>
        <p>You completed the <b>Forms and Funnels</b> tour.</p>
      </div>
      <img src=${congraturationStep} style="
        width: 10rem;
        height: 7rem;
      "/>
    </div>`
    ],
    attachTo: {
      element: '.tour-step-5',
      on: 'right'
    },
    classes: 'formsnfunnels-tour-step-5',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: finishBtnClass,
        text: 'Done',
        type: 'complete'
      }
    ]
  }
];

// ** Businness Tools [Ticket] tour steps
export const ticketSteps = [
  {
    id: 'intro-ticket',
    classes: 'formsnfunnels-tour-step-1',
    title: 'Ticket management',
    text: ['<div>Step 1: Click on Ticket</div>'],
    attachTo: {
      element: '.ticket-tour-start-point',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  }
  // {
  //   title: 'Now that you are ready',
  //   text: ['<div>Step 2: </div>'],
  //   attachTo: {
  //     element: '.tour-step-2',
  //     on: 'right'
  //   },
  //   classes: 'formsnfunnels-tour-step-2',
  //   cancelIcon: {
  //     enabled: true,
  // label: 'cancel'
  //   },
  //   buttons: [
  //     {
  //       classes: backBtnClass,
  //       text: 'Back',
  //       type: 'back'
  //     },
  //     {
  //       classes: nextBtnClass,
  //       text: 'Next',
  //       type: 'next'
  //     }
  //   ]
  // },
  // {
  //   title: 'Let&apos;s get started!',
  //   text: ['<div>Step 3: </div>'],
  //   attachTo: {
  //     element: '.tour-step-3',
  //     on: 'left'
  //   },
  //   classes: 'formsnfunnels-tour-step-3',
  //   cancelIcon: {
  //     enabled: true,
  // label: 'cancel'
  //   },
  //   buttons: [
  //     {
  //       classes: backBtnClass,
  //       text: 'Back',
  //       type: 'back'
  //     },
  //     {
  //       classes: nextBtnClass,
  //       text: 'Next',
  //       type: 'next'
  //     }
  //   ]
  // },
  // {
  //   title: 'Check all of your formsnfunnelss',
  //   text: [
  //     'Step 4: This is where you find all your formsnfunnelss. Just click on a formsnfunnels to see the details'
  //   ],
  //   attachTo: {
  //     element: '.tour-step-4',
  //     on: 'right'
  //   },
  //   classes: 'formsnfunnels-tour-step-4',
  //   cancelIcon: {
  //     enabled: true,
  // label: 'cancel'
  //   },
  //   buttons: [
  //     {
  //       classes: backBtnClass,
  //       text: 'Back',
  //       type: 'back'
  //     },
  //     {
  //       classes: nextBtnClass,
  //       text: 'Next',
  //       type: 'next'
  //     }
  //   ]
  // },
  // {
  //   title: 'How do you like it?',
  //   text: [`
  //   <div style="display: flex">
  //   <div style="margin-right: 1rem; margin-top: 0.8rem">
  //     <p>Great!</p>
  //     <p>You completed the <b>Forms and Funnels</b> tour.</p>
  //   </div>
  //   <img src=${congraturationStep} style="
  //     width: 10rem;
  //     height: 7rem;
  //   "/>
  // </div>`],
  //   attachTo: {
  //     element: '.tour-step-5',
  //     on: 'right'
  //   },
  //   classes: 'formsnfunnels-tour-step-5',
  //   cancelIcon: {
  //     enabled: true,
  // label: 'cancel'
  //   },
  //   buttons: [
  //     {
  //       classes: backBtnClass,
  //       text: 'Back',
  //       type: 'back'
  //     },
  //     {
  //       classes: finishBtnClass,
  //       text: 'Done',
  //       type: 'complete'
  //     }
  //   ]
  // }
];
