const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';
import congraturationStep from '@src/assets/images/onboarding/businesstools/congraturation.png';

// ** Marketing [Email] tour steps
export const emailSteps = [
  {
    classes: 'email-tour-step-1',
    title: 'Email',
    text: [
      `<div>Step 1: Send email to the contact user in here. You can also use email templates using the form builder.</div>`
    ],
    attachTo: {
      element: '.email-tour-start-point',
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
    title: 'Create new category',
    text: [
      `<div>Step 2: Click this button to create new Category. <br/> A template can be identified by its category and template name.</div>`
    ],
    attachTo: {
      element: '.email-tour-2',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.email-tour-2');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'email-tour-step-2',
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
    title: 'Create new category',
    text: [`<div>Step 3: Please input the category name and label color</div>`],
    attachTo: {
      element: '.email-tour-3',
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
    classes: 'email-tour-step-3',
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
    title: 'Create new template',
    text: [
      `<div>Step 4: You can create email templates that you can use to send emails. After creation, you can use it to compose emails.</div>`
    ],
    attachTo: {
      element: '.email-tour-4',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.email-tour-4');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'email-tour-step-4',
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
    title: 'Create new template',
    text: [
      `<div>Step 5: Enter a template name and select a category. This information identifies this template being created.</div>`
    ],
    attachTo: {
      element: '.email-tour-5',
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
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Save template',
    text: [
      `<div>Step 6: When you finish designing the template, save it. <br />You can use this template for composing emails.</div>`
    ],
    attachTo: {
      element: '.email-tour-6',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 1000);
      });
    },
    classes: 'email-tour-step-6',
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
    title: 'Compose email',
    text: [
      `<div>Step 7: This is a compose email. You can use the template you just created in this area.</div>`
    ],
    attachTo: {
      element: '.email-tour-7',
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
    classes: 'email-tour-step-7',
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
    title: 'Select from email address',
    text: [
      `<div>Step 8: Please select email address to send email. This is a sender's email address.</div>`
    ],
    attachTo: {
      element: '.email-tour-8',
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
    classes: 'email-tour-step-8',
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
    title: 'Receiver address type',
    text: [
      `<div>Step 9: Choose your receiver type. <b>Email</b> is for identifying recipients by email address. <b>Smartlist</b> is for identifying receivers by smartlist group. <br /> For now please select email address.</div>`
    ],
    attachTo: {
      element: '.email-tour-9',
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
    classes: 'email-tour-step-9',
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
    title: 'Select to email address',
    text: [`<div>Step 10: Please select receiver's email address.</div>`],
    attachTo: {
      element: '.email-tour-10',
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
    classes: 'email-tour-step-10',
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
    title: 'Subject',
    text: [
      `<div>Step 11: The email subject. As you know, recipients see this subject line for the first time when they receive this email. <br/> Keep the title clear and short.</div>`
    ],
    attachTo: {
      element: '.email-tour-11',
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
    classes: 'email-tour-step-11',
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
    title: 'Scheduling',
    text: [`<div>Step 12: You can toggle this to reserve the date and time you want.</div>`],
    attachTo: {
      element: '.email-tour-12',
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
    classes: 'email-tour-step-12',
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
    title: 'Message',
    text: [
      `<div>Step 13: Enter the message you want to send here and style it using the tools at the bottom of the dialog box.</div>`
    ],
    attachTo: {
      element: '.email-tour-13',
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
    classes: 'email-tour-step-13',
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
    title: 'Send email',
    text: [`<div>Step 14: Send your email by clicking this button.</div>`],
    attachTo: {
      element: '.email-tour-14',
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
    classes: 'email-tour-step-14',
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
    title: 'Email type',
    text: [`<div>Step 15: Select the email type.</div>`],
    attachTo: {
      element: '.email-tour-15',
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
    classes: 'email-tour-step-15',
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
    title: 'Email list',
    text: [`<div>Step 16: This is an email list. Please select one to view them.</div>`],
    attachTo: {
      element: '.email-tour-16',
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
    classes: 'email-tour-step-16',
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

// ** Marketing [Ticket] tour steps
export const textSteps = [
  {
    id: 'intro-text',
    classes: 'text-tour-step-1',
    title: 'Chat room',
    text: [
      `<div>Step 1: This is part of the text communication with the Contacts user. <br/>Click the Text tab to continue.</div>`
    ],
    attachTo: {
      element: '.text-tour-start-point',
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
    title: 'Select a Contact',
    text: [
      `<div>Step 2: Contact list. <br /> Select a contact user to send a text message to.</div>`
    ],
    attachTo: {
      element: '.text-tour-2',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.text-tour-2');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'text-tour-step-2',
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
    title: 'Type message here',
    text: [`<div>Step 3: Enter your message here.</div>`],
    attachTo: {
      element: '.text-tour-3',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.text-tour-3');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'text-tour-step-3',
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
    title: 'Emoticons',
    text: [`<div>Step 4: Click here to add emoticons to your message.</div>`],
    attachTo: {
      element: '.text-tour-4',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.text-tour-4');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'text-tour-step-4',
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
    title: 'Emoticons',
    text: [`<div>Step 5: Choose one.</div>`],
    attachTo: {
      element: '.text-tour-5',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.text-tour-5');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'text-tour-step-5',
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
    classes: 'text-tour-step-6',
    title: 'Send message',
    text: [`<div>Step 6: Click this send button to send message to selected contact user.</div>`],
    attachTo: {
      element: '.text-tour-6',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.text-tour-6');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
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
    classes: 'text-tour-step-7',
    title: 'Send message',
    text: [`<div>Step 7: Click this button to manage SMS templates.</div>`],
    attachTo: {
      element: '.text-tour-7',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.text-tour-7');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
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
    title: 'Congratulation!',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Text</b> onboarding.</p>
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
    buttons: [
      {
        classes: finishBtnClass,
        text: 'Done',
        type: 'complete'
      }
    ]
  }
];

// ** Marketing [Automation] tour steps
export const automationSteps = [
  {
    id: 'intro-automation',
    title: 'Automation',
    text: [
      `<div>Step 1: Target customers effectively with automated marketing messages across channels, including emails, notifications and text messages.</div>`
    ],
    attachTo: {
      element: '.automation-tour-start-point',
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
    title: 'Create a new automated course',
    text: [`<div>Step 2: Click this button to create new automation</div>`],
    attachTo: {
      element: '.automation-tour-2',
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
    classes: 'automation-tour-step-2',
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
    title: 'Create a new automated course',
    text: [
      `<div>Step 3: Here you can create automated processes to manage emails, texts and notifications for your customers and employees.</div>`
    ],
    attachTo: {
      element: '.automation-tour-3',
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
    classes: 'automation-tour-step-3',
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
    title: 'Send From',
    text: [`<div>Step 4: Select email address for your automation.</div>`],
    attachTo: {
      element: '.automation-tour-4',
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
    classes: 'automation-tour-step-4',
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
    text: [`<div>Step 5: Select phone for your automation.</div>`],
    attachTo: {
      element: '.automation-tour-5',
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
    classes: 'automation-tour-step-5',
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
    title: 'Automation name',
    text: [`<div>Step 6: Enter automation name.</div>`],
    attachTo: {
      element: '.automation-tour-6',
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
    classes: 'automation-tour-step-6',
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
    title: 'Zoom In/Out',
    text: [
      `<div>Step 7: You can zoom in or out the workspace by clicking these + and - buttons.</div>`
    ],
    attachTo: {
      element: '.automation-tour-7',
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
    classes: 'automation-tour-step-7',
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
    title: 'Zoom In/Out',
    text: [
      `<div>Step 8: You can also use the mouse scroll to zoom in or out of the workspace.</div>`
    ],
    attachTo: {
      element: '.automation-tour-8',
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
    classes: 'automation-tour-step-8',
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
    title: 'Start',
    text: [`<div>Step 9: Click here to edit contact.</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1.col-xl-12 > div > div.tab-pane.active > div > div.content-area-wrapper.animate__animated.animate__fadeIn > div > div:nth-child(3) > div > div.react-flow__renderer.react-flow__container > div.react-flow__viewport.react-flow__container > div > div > div > div:nth-child(2)',
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
    classes: 'automation-tour-step-9',
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
    title: 'Add new action',
    text: [`<div>Step 10: Click here to add new action</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1.col-xl-12 > div > div.tab-pane.active > div > div.content-area-wrapper.animate__animated.animate__fadeIn > div > div:nth-child(3) > div > div.react-flow__renderer.react-flow__container > div.react-flow__viewport.react-flow__container > div > div > div > div:nth-child(4)',
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
    classes: 'automation-tour-step-10',
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
    title: 'Add new action',
    text: [`<div>Step 11: Select action type. For now, please select new notication.</div>`],
    attachTo: {
      element: '.automation-tour-11',
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
    classes: 'automation-tour-step-11',
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
    title: 'New Notification',
    text: [
      `<div>Step 12: Please input infomation for new notification and click insert button.</div>`
    ],
    attachTo: {
      element: '.automation-tour-12',
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
    classes: 'automation-tour-step-12',
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
    title: 'New notification action created',
    text: [`<div>Step 13: Great!. <br/> New action created.</div>`],
    attachTo: {
      element: '.automation-tour-13',
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
    classes: 'automation-tour-step-13',
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
    title: 'Save automation',
    text: [`<div>Step 14: Click the Save button to save this automation you just created.</div>`],
    attachTo: {
      element: '.automation-tour-14',
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
    classes: 'automation-tour-step-14',
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
    title: 'Automation list',
    text: [
      `<div>Step 15: Ok.. I created a new automation. You can manage them from this list and also delete them using the delete button in the action field.</div>`
    ],
    attachTo: {
      element: '.automation-tour-15',
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
    classes: 'automation-tour-step-15',
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
    title: 'Congratulation',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Automation</b> onboarding.</p>
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
