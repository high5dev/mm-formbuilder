const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';
import congraturationStep from '@src/assets/images/onboarding/businesstools/congraturation.png';

// ** Contact [Create new contact] tour steps
export const newContactSteps = [
  {
    classes: 'newContact-tour-step-1',
    title: 'Add new contact',
    text: [
      `<div>Step 1: Hi! 👋 <br />Welcome to the contact onboarding. <br />Click this button to go to the drawer and create a new contact.</div>`
    ],
    attachTo: {
      element: '.newContact-tour-start-point',
      on: 'left'
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
    }
  },
  {
    title: 'Select contact type',
    text: [`<div>Step 2: Please select contact type.</div>`],
    attachTo: {
      element: '.newContact-tour-2',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 1300);
      });
    },
    classes: 'newContact-tour-step-2',
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
    title: 'Full Name',
    text: [`<div>Step 3: Please enter full name.</div>`],
    attachTo: {
      element: '.newContact-tour-3',
      on: 'left'
    },
    classes: 'newContact-tour-step-3',
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
    title: 'Email',
    text: [`<div>Step 4: And then please enter email address.</div>`],
    attachTo: {
      element: '.newContact-tour-4',
      on: 'left'
    },
    classes: 'newContact-tour-step-4',
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
    title: 'Phone',
    text: [`<div>Step 5: And then please enter phone number.</div>`],
    attachTo: {
      element: '.newContact-tour-5',
      on: 'left'
    },
    classes: 'newContact-tour-step-5',
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
    title: 'Submit',
    text: [
      `<div>Step 6: Good work! You have entered the required information. Click this button to create a new contact with this information.</div>`
    ],
    attachTo: {
      element: '.newContact-tour-6',
      on: 'left'
    },
    classes: 'newContact-tour-step-6',
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
              <p>You completed the <b>Add New Contact</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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

// ** Contact [Progression] tour steps
export const progressionSteps = [
  {
    classes: 'progression-tour-step-1',
    title: 'Progression',
    text: [`<div>Step 1: Please select contacts to proceed and promote.</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.app-user-list > div > div > div.sc-fznJRM.dVgdrY',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 1000);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    classes: 'progression-tour-step-2',
    title: 'Progression',
    text: [`<div>Step 2: Click this button to progression and promote.</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.app-user-list > div > div > header > div > div.d-flex.flex-column.flex-md-row > div.d-flex.justify-content-center.justify-content-md-around.align-items-center.mb-2.mb-md-0 > div:nth-child(2) > button',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 200);
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
    classes: 'progression-tour-step-3',
    title: 'Select Progression',
    text: [`<div>Step 3: Please select progression card.</div>`],
    attachTo: {
      element: '#action > div.d-flex.mt-0.bg-transparent > div:nth-child(1) > div',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 1000);
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
    classes: 'progression-tour-step-4',
    title: 'Goto Next Step',
    text: [`<div>Step 4: Click Next button to go next step.</div>`],
    attachTo: {
      element: '.progression-tour-4',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 200);
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
    classes: 'progression-tour-step-5',
    title: 'Promote Step',
    text: [
      `<div>Step 5: Select Progress for each contact to see the current rank and next rank for each contact. And click the Next button.</div>`
    ],
    attachTo: {
      element: '.progression-tour-5',
      on: 'top'
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
    classes: 'progression-tour-step-6',
    title: 'Promote',
    text: [
      `<div>Step 6: Now please click Yes to promote all possible contacts. If you click No, then you can't promote them.</div>`
    ],
    attachTo: {
      element: '.progression-tour-6',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
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
    classes: 'progression-tour-step-7',
    title: 'Status',
    text: [
      `<div>Step 7: Good work! <br />A list of promoted contacts can be found here. Click the Close button to finish the process.</div>`
    ],
    attachTo: {
      element: '.progression-tour-7',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
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
    title: 'How do you like it?',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Progression</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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

// ** Contact [Print] tour steps
export const printSteps = [
  {
    classes: 'print-tour-step-1',
    title: 'Print',
    text: [`<div>Step 1: Please select contacts to print.</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.app-user-list > div > div > div.sc-fznJRM.dVgdrY',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 1000);
      });
    },
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    classes: 'progression-tour-step-2',
    title: 'Progression',
    text: [`<div>Step 2: Click this button to go next step.</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.app-user-list > div > div > header > div > div.d-flex.flex-column.flex-md-row > div.d-flex.justify-content-center.justify-content-md-around.align-items-center.mb-2.mb-md-0 > div:nth-child(3) > button',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 200);
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
    classes: 'progression-tour-step-3',
    title: 'Select Form file to print',
    text: [
      `<div>Step 3: This is your GCP file manager. Please click form to merge with your selected contacts</div>`
    ],
    attachTo: {
      element: '.progression-tour-3',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 200);
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
    title: 'How do you like it?',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Print Contacts</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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

// ** Contact [Shift & Schedule] tour steps
export const shiftnscheduleSteps = [
  {
    classes: 'shiftnschedule-tour-step-1',
    title: 'Email',
    text: [
      `<div>Step 1: Send email to the contact user in here. You can also use email templates using the form builder.</div>`
    ],
    attachTo: {
      element: '.shiftnschedule-tour-start-point',
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
    title: 'How do you like it?',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Marketing/Email</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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

// ** Contact/Employee [Roles & Permissions] tour steps
export const rolesnpermissionsSteps = [
  {
    classes: 'rolesnpermissions-tour-step-1',
    title: 'Roles and Permissions',
    text: [`<div>Step 1: Click this tab to go roles and permission setting.</div>`],
    attachTo: {
      element: '.rolesnpermissions-tour-start-point',
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
    classes: 'rolesnpermissions-tour-step-2',
    title: 'Roles and Permissions',
    text: [`<div>Step 2: Click this tab to go roles and permission setting.</div>`],
    attachTo: {
      element: '.rolesnpermissions-tour-2',
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
    classes: 'rolesnpermissions-tour-step-3',
    title: 'Roles and Permissions',
    text: [`<div>Step 3: Click this button to add role.</div>`],
    attachTo: {
      element: '.rolesnpermissions-tour-3',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 1000);
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
    classes: 'rolesnpermissions-tour-step-4',
    title: 'Roles and Permissions',
    text: [
      `<div>Step 4: Enter a role name and tick to grant role permissions. And after all click <b>Save New Role</b> button.</div>`
    ],
    attachTo: {
      element: '.rolesnpermissions-tour-4',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 1000);
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
    classes: 'rolesnpermissions-tour-step-5',
    title: 'Great!',
    text: [
      `<div>Step 5: You have successfully created new roles and privileges. <br />Click Next to add a new task.</div>`
    ],
    attachTo: {
      element: '.rolesnpermissions-tour-5',
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
    classes: 'rolesnpermissions-tour-step-6',
    title: 'Add Task',
    text: [
      `<div>Step 6: Create new task for employee. After enter all infomation through 3 steps, click Submit button to add task for your employees.</div>`
    ],
    attachTo: {
      element: '.rolesnpermissions-tour-6',
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
    classes: 'rolesnpermissions-tour-step-7',
    title: 'Task Created',
    text: [`<div>Step 7: Good work! <br />You can check out what you've created here.</div>`],
    attachTo: {
      element: '.rolesnpermissions-tour-7',
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
    title: 'How do you like it?',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Roles and Permissions</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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

// ** Contact [Work History] tour steps
export const workHistorySteps = [
  {
    classes: 'workhistory-tour-step-1',
    title: 'Work History',
    text: [`<div>Step 1: Clicking on this tab takes you to your work history.</div>`],
    attachTo: {
      element: '.workhistory-tour-start-point',
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
    classes: 'workhistory-tour-step-2',
    title: 'Work History',
    text: [`<div>Step 2: Click Clock In button to start track your work.</div>`],
    attachTo: {
      element: '.workhistory-tour-2',
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
    classes: 'workhistory-tour-step-3',
    title: 'Question',
    text: [`<div>Step 3: To start clock in, please click <b>Start</b> button.</div>`],
    attachTo: {
      element: '.swal2-confirm',
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
    title: 'Choose Screen',
    text: [`<div>Step 4: Select a tab or window to take a snapshot with Proof of Work.</div>`],
    attachTo: {
      element: '.workhistory-tour-4',
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
    classes: 'workhistory-tour-step-4',
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
    title: 'Now tracking',
    text: [`<div>Step 5: To see your tracked result please click this button.</div>`],
    attachTo: {
      element: '.workhistory-tour-5',
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
    classes: 'workhistory-tour-step-5',
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
    title: 'Work History Chart',
    text: [
      `<div>Step 6: This is work history chart. You can see your and employee's work history by time</div>`
    ],
    attachTo: {
      element: '.workhistory-tour-6',
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
    classes: 'workhistory-tour-step-6',
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
    title: 'Total time you worked',
    text: [`<div>Step 7: This is total time you tracked using this tracker.</div>`],
    attachTo: {
      element: '.workhistory-tour-7',
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
    classes: 'workhistory-tour-step-7',
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
    title: 'Toggle between activity and proof',
    text: [
      `<div>Step 8: Using this switch you can toggle between activity and proof. <br />
      Activity is for time line when you worked and had a rest and Proof is for screenshots of your work.</div>`
    ],
    attachTo: {
      element: '.workhistory-tour-8',
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
    classes: 'workhistory-tour-step-8',
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
    title: "Check your employee's work history",
    text: [`<div>Step 9: Choose a employee and you can check his/her work history.</div>`],
    attachTo: {
      element: '.workhistory-tour-9',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    classes: 'workhistory-tour-step-9',
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
    title: 'Select date or range',
    text: [
      `<div>Step 10: Select one option to see what you want. <br />You can see yesterday's work history, and you can also see work history by week, month, or custom range.</div>`
    ],
    attachTo: {
      element: '.workhistory-tour-10',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    classes: 'workhistory-tour-step-10',
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
    title: 'Clock out',
    text: [`<div>Step 11: Click here to clock out and the tracking will be canceled.</div>`],
    attachTo: {
      element: '.workhistory-tour-2',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    classes: 'workhistory-tour-step-11',
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
              <p>You completed the <b>Work History</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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

// ** Contact [Reporting] tour steps
export const reportingSteps = [
  {
    classes: 'reporting-tour-step-1',
    title: 'Task Reporting',
    text: [`<div>Step 1: Click here to go to the task reporting.</div>`],
    attachTo: {
      element: '.reporting-tour-start-point',
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
    classes: 'reporting-tour-step-2',
    title: 'Manage Task',
    text: [`<div>Step 2: Here you can manage the tasks for your employees.</div>`],
    attachTo: {
      element: '.reporting-tour-2',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 100);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-3',
    title: 'Create new task',
    text: [`<div>Step 3: Click this button to create new task.</div>`],
    attachTo: {
      element: '.reporting-tour-3',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-4',
    title: 'Create new task',
    text: [`<div>Step 4: Enter infomation to create new task.</div>`],
    attachTo: {
      element: '.reporting-tour-4',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-5',
    title: 'Task list',
    text: [
      `<div>Step 5: A list of tasks can be found here. Click on a task to manage subtasks.</div>`
    ],
    attachTo: {
      element: '.reporting-tour-5',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-6',
    title: 'Todo list',
    text: [
      `<div>Step 6: This is todo list for selected task. You can edit the title, time, and proof type</div>`
    ],
    attachTo: {
      element: '.reporting-tour-6',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-7',
    title: 'Create new todo subtask.',
    text: [`<div>Step 7: Click this button to create new to-do.</div>`],
    attachTo: {
      element: '.reporting-tour-7',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-8',
    title: 'Create new todo subtask.',
    text: [`<div>Step 8: Please enter infomation for to-do task.</div>`],
    attachTo: {
      element: '.reporting-tour-8',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-9',
    title: 'Select Proof Type',
    text: [`<div>Step 9: Click here to select proof type.</div>`],
    attachTo: {
      element: '.reporting-tour-9',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-10',
    title: 'Select Proof Type',
    text: [
      `<div>Step 10: There are 9 proof types here. Please select proof type for the to-do and click Select button to submit.</div>`
    ],
    attachTo: {
      element: '.reporting-tour-10',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-11',
    title: 'Save to-do list',
    text: [
      `<div>Step 11: Good work! And then click this button to save to-do list you created.</div>`
    ],
    attachTo: {
      element: '.reporting-tour-11',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-12',
    title: 'Go back to the main reporting page',
    text: [`<div>Step 12: Click this button to go to the main page.</div>`],
    attachTo: {
      element: '.reporting-tour-12',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 800);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-13',
    title: 'Select date',
    text: [`<div>Step 13: Select date to browse the task checklist.</div>`],
    attachTo: {
      element: '.reporting-tour-13',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 100);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-14',
    title: 'Task list',
    text: [
      `<div>Step 14: This is the list of task list for the selected date. Choose a task to check the status.</div>`
    ],
    attachTo: {
      element: '.reporting-tour-14',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 100);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-15',
    title: 'Task list',
    text: [
      `<div>Step 15: Here is the to-do list. You can check the to-do list one by one by confirming the status label like pending, incompleted, completed</div>`
    ],
    attachTo: {
      element: '.reporting-tour-15',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 100);
      });
    },
    cancelIcon: {
      enabled: true
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
    classes: 'reporting-tour-step-16',
    title: 'Task Status Chart',
    text: [
      `<div>Step 16: Here you can see a chart showing total tasks and selected task in percentage.</div>`
    ],
    attachTo: {
      element: '.reporting-tour-16',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 100);
      });
    },
    cancelIcon: {
      enabled: true
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
              <p>You completed the <b>Task Reporting</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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

// ** Contact [Lead] tour steps
export const leadSteps = [
  {
    classes: 'lead-tour-step-1',
    title: 'Lead Onboarding',
    text: [`<div>Step 1: Welcome to lead onboarding.</div>`],
    attachTo: {
      element: '.lead-tour-start-point',
      on: 'left'
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
      enabled: true
    },
    buttons: [
      {
        classes: nextBtnClass,
        text: 'Start',
        type: 'next'
      }
    ]
  },
  {
    classes: 'lead-tour-step-2',
    title: 'Filter by date',
    text: [`<div>Step 2: You can filter lead contacts by the created date.</div>`],
    attachTo: {
      element: '.lead-tour-2',
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
      enabled: true
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
    classes: 'lead-tour-step-3',
    title: 'Filter by date',
    text: [`<div>Step 3: You can filter lead contacts by lead source.</div>`],
    attachTo: {
      element: '.lead-tour-3',
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
      enabled: true
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
    classes: 'lead-tour-step-4',
    title: 'Filter by date',
    text: [`<div>Step 4: You can filter lead contacts by stage.</div>`],
    attachTo: {
      element: '.lead-tour-4',
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
      enabled: true
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
    classes: 'lead-tour-step-5',
    title: 'Filter by date',
    text: [`<div>Step 5: Using this gear button, you can manage lead stages.</div>`],
    attachTo: {
      element: '.lead-tour-5',
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
      enabled: true
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
    classes: 'lead-tour-step-6',
    title: 'Filter by date',
    text: [`<div>Step 6: Using this gear button, you can manage lead stages.</div>`],
    attachTo: {
      element: '#cell-stage-undefined > div',
      on: 'left'
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
      enabled: true
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
    classes: 'lead-tour-step-7',
    title: 'Filter by date',
    text: [
      `<div>Step 7: This is toggle to switch between List and Board. Switch to the Board.</div>`
    ],
    attachTo: {
      element: '.lead-tour-7',
      on: 'left'
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
      enabled: true
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
    classes: 'lead-tour-step-8',
    title: 'Lead Board',
    text: [
      `<div>Step 8: A board to manage lead contacts with a user-friendly UI. You can update a lead contact step by dragging from one step to other step.</div>`
    ],
    attachTo: {
      element: '.lead-tour-8',
      on: 'left'
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
      enabled: true
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
    classes: 'lead-tour-step-9',
    title: 'Lead Board',
    text: [
      `<div>Step 9: Depending on the contribution , you can also drag the contact item to the win/lost result.</div>`
    ],
    attachTo: {
      element: '.lead-tour-8',
      on: 'left'
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
      enabled: true
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
    classes: 'lead-tour-step-10',
    title: 'Lead Board',
    text: [`<div>Step 10: You can also rearrange steps using drag and drop.</div>`],
    attachTo: {
      element: '.lead-tour-10',
      on: 'left'
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
    title: 'How do you like it?',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Marketing/Email</b> onboarding.</p>
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
    classes: 'email-tour-step-5',
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
