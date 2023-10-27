const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';

import congraturationStep from '@src/assets/images/onboarding/businesstools/congraturation.png';

export const accountSteps = [
  {
    classes: 'account-tour-step-1',
    title: 'Account Management',
    text: [`<div>Step 1: Click on Account</div>`],
    attachTo: {
      element: '.account-tour-start-point',
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
    title: 'Upload Profile Image',
    text: [`<div>Step 2: Upload profile image by clicking Upload button</div>`],
    attachTo: {
      element: '.account-tour-step-2',
      on: 'right'
    },
    classes: 'account-tour-step-2',
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
    title: 'Input your name',
    text: ['Step 3: Please input your first name and second name'],
    attachTo: {
      element: '.account-tour-step-3',
      on: 'right'
    },
    classes: '.account-tour-step-3',
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
    title: 'Email & Phone',
    text: ['Step 4: Please input your email and phone number'],
    attachTo: {
      element: '.account-tour-step-4',
      on: 'right'
    },
    classes: '.account-tour-step-4',
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
    title: 'Address',
    text: ['Step 5: Input your Country, State, Address and Zipcode'],
    attachTo: {
      element: '.account-tour-step-5',
      on: 'right'
    },

    classes: '.account-tour-step-5',
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
    title: 'Language, Timezone & Currency',
    text: ['Step 6: Please select your Language, Timezone & Currency'],
    attachTo: {
      element: '.account-tour-step-6',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.account-tour-step-6');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    classes: '.account-tour-step-6',
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
    title: 'Company Name',
    text: ['Step 7: Please input your company name'],
    attachTo: {
      element: '.account-tour-step-7',
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
    classes: '.account-tour-step-7',
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
    title: 'Company Logo & Header Photo',
    text: ['Step 8: Please upload your company logo and header photo'],
    attachTo: {
      element: '.account-tour-step-8',
      on: 'left'
    },

    classes: '.account-tour-step-8',
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
    title: 'Company Address',
    text: ['Step 9: Please input your company Country, State, Address and Zipcode'],
    attachTo: {
      element: '.account-tour-step-9',
      on: 'left'
    },
    classes: '.account-tour-step-9',
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
    title: 'Company Phone',
    text: ['Step 10: Please input company phone number & alternative phone number'],
    attachTo: {
      element: '.account-tour-step-10',
      on: 'left'
    },
    classes: '.account-tour-step-10',
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
    title: 'Save',
    text: ['Step 11: Please save your updated account infomation'],
    attachTo: {
      element: '.account-tour-step-11',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.account-tour-step-11');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    classes: '.account-tour-step-11',
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
    title: 'Delete Account',
    text: [
      'Step 12: You can deactivate your account. Please check the confirmation and click Red button to delete your account'
    ],
    attachTo: {
      element: '.account-tour-step-12',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.account-tour-step-12');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    classes: '.account-tour-step-12',
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
    id: '12',
    title: 'How do you like it?',
    text: [
      `
        <div style="display: flex">
          <div style="margin-right: 1rem; margin-top: 0.8rem">
            <p>Great!</p>
            <p>You completed the <b>Account</b> tour.</p>
          </div>
          <img src=${congraturationStep} style="
            width: 10rem;
            height: 7rem;
          "/>
        </div>`
    ],
    attachTo: {
      element: '.account-tour-done',
      on: 'right'
    },
    classes: '.account-tour-done',
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

export const billingSteps = [
  {
    classes: 'billing-tour-step-1',
    title: 'Setting for billing infomation',
    text: [`<div>Step 1: Click on Billing</div>`],
    attachTo: {
      element: '.billing-tour-start-point',
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
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Current Plan',
    text: [`<div>Step 2: You can upgrade your plan here</div>`],
    attachTo: {
      element: '.billing-tour-step-2',
      on: 'left'
    },
    classes: '.billing-tour-step-2',
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
    title: 'Credit/Debit/ATM Card',
    text: ['Step 3: Submit your card information'],
    attachTo: {
      element: '.billing-tour-step-3',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.billing-tour-step-3');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    classes: 'billing-tour-step-3',
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
    title: 'My Cards',
    text: ['Step 4: Edit your card infomation'],
    attachTo: {
      element: '.billing-tour-step-4',
      on: 'left'
    },
    classes: 'billing-tour-step-4',
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
    title: 'Billing Address',
    text: ['Step 5: Input the billing address infomation and click submit.'],
    attachTo: {
      element: '.billing-tour-step-5',
      on: 'top'
    },
    classes: 'billing-tour-step-5',
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
    title: 'Billing History',
    text: ['Step 6: Check your billing history'],
    attachTo: {
      element: '.billing-tour-step-6',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.billing-tour-step-6');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    classes: 'billing-tour-step-6',
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
              <p>You completed the <b>Billing</b> tour.</p>
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
    classes: 'billing-tour-step-5',
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

export const progressionSteps = [
  {
    classes: 'progression-tour-step-1',
    title: 'Setting for Progression and Promotion',
    text: [`<div>Step 1: Click on Progression</div>`],
    attachTo: {
      element: '.progression-tour-start-point',
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
    title: 'New Progression',
    text: [`<div>Step 2: Create new progression by clicking this button</div>`],
    attachTo: {
      element: '.expense-tour-2',
      on: 'right'
    },
    classes: 'expense-tour-step-2',
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
    title: 'New prgression',
    text: ['Step 3: Add infomation for new prgression'],
    attachTo: {
      element: '.expense-tour-3',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.expense-tour-3');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'expense-tour-step-3',
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
    title: 'Select progression',
    text: ['Step 4: Click progression to edit progression and rank'],
    attachTo: {
      element: '.expense-tour-4',
      on: 'top'
    },
    classes: 'expense-tour-step-4',
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
    title: 'Category',
    text: [
      'Step 5: This is category list belongs to the progression you selected. Click Add Category button to add category'
    ],
    attachTo: {
      element: '.expense-tour-5',
      on: 'top'
    },
    classes: 'expense-tour-step-5',
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
    title: 'Add Category',
    text: ['Step 6: Please input category name'],
    attachTo: {
      element: '.expense-tour-6',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.expense-tour-6');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'expense-tour-step-6',
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
    title: 'Select a Category',
    text: ['Step 7: Please select a category to manage rank list of it'],
    attachTo: {
      element: '.expense-tour-5',
      on: 'top'
    },
    classes: 'expense-tour-step-7',
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
    title: 'Add Rank',
    text: ['Step 8: Click this button to add Rank'],
    attachTo: {
      element: '.expense-tour-8',
      on: 'top'
    },
    classes: 'expense-tour-step-8',
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
    title: 'Add Rank',
    text: ['Step 9: Please input rank name'],
    attachTo: {
      element: '.expense-tour-9',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.expense-tour-9');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'expense-tour-step-9',
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
    title: 'Rank',
    text: ['Step 10: This is rank list belongs to the category you selected'],
    attachTo: {
      element: '.expense-tour-10',
      on: 'top'
    },
    classes: 'expense-tour-step-10',
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
    classes: 'invoice-tour-step-5',
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

export const advancedSettingsSteps = [
  {
    classes: 'advance-tour-step-1',
    title: 'Confirm your Advanced Setting',
    text: [`<div>Step 1: Click on Advanced Setting</div>`],
    attachTo: {
      element: '.advance-tour-start-point',
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
    title: 'Retention',
    text: [`<div>Step 2: Please select Retension to manage to rating and attendance color</div>`],
    attachTo: {
      element: '.advance-tour-step-2',
      on: 'right'
    },
    classes: 'advance-tour-step-2',
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
    title: 'Add new rule',
    text: ['Step 3: Click this button to add new attendance rule'],
    attachTo: {
      element: '.advance-tour-step-3',
      on: 'left'
    },
    classes: 'advance-tour-step-3',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      }
      // {
      //   classes: nextBtnClass,
      //   text: 'Next',
      //   type: 'next'
      // }
    ]
  },
  {
    title: 'Add new rule',
    text: ['Step 4: Select color and range for new attendance rule'],
    attachTo: {
      element: '.advance-tour-step-4',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-4');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'advance-tour-step-4',
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
    title: 'Save',
    text: ['Step 5: Click save button to save your new attendance rule'],
    attachTo: {
      element: '.advance-tour-step-5',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-5');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'advance-tour-step-5',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      }
      // {
      //   classes: nextBtnClass,
      //   text: 'Next',
      //   type: 'next'
      // }
    ]
  },
  {
    title: 'Add new rule',
    text: ['Step 6: Click this button to add new last contacted rule'],
    attachTo: {
      element: '.advance-tour-step-6',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-6');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 1000);
      });
    },
    classes: 'advance-tour-step-6',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      }
      // {
      //   classes: nextBtnClass,
      //   text: 'Next',
      //   type: 'next'
      // }
    ]
  },
  {
    title: 'Add new rule',
    text: ['Step 7: Select color and range for new last contacted rule'],
    attachTo: {
      element: '.advance-tour-step-7',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-7');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'advance-tour-step-7',
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
    title: 'Save',
    text: ['Step 8: Click save button to save your new last contacted rule'],
    attachTo: {
      element: '.advance-tour-step-8',
      on: 'left'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-8');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'advance-tour-step-8',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      }
      // {
      //   classes: nextBtnClass,
      //   text: 'Next',
      //   type: 'next'
      // }
    ]
  },
  {
    title: 'Live Chat',
    text: ['Step 9: Click this Tab for live chat setting'],
    attachTo: {
      element: '.advance-tour-step-9',
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
    classes: 'advance-tour-step-9',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      // {
      //   classes: backBtnClass,
      //   text: 'Back',
      //   type: 'back'
      // },
      {
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Appearance',
    text: ['Step 10: Customize live chat UI for your custom style'],
    attachTo: {
      element: '.advance-tour-step-10',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-10');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 200);
      });
    },
    classes: 'advance-tour-step-10',
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
    title: 'Position',
    text: ['Step 11: Setting for chat message position in chat room'],
    attachTo: {
      element: '.advance-tour-step-11',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-11');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 200);
      });
    },
    classes: 'advance-tour-step-11',
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
    title: 'Chat with us Form',
    text: [
      'Step 12: Setting for chat information such as user name, phone number, email, website and policy'
    ],
    attachTo: {
      element: '.advance-tour-step-12',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-12');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 200);
      });
    },
    classes: 'advance-tour-step-12',
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
    title: 'Install live chat code manually',
    text: ['Step 13: Send the code to the developers'],
    attachTo: {
      element: '.advance-tour-step-13',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-13');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 200);
      });
    },
    classes: 'advance-tour-step-13',
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
    title: 'Save all settings',
    text: ['Step 14: Save all settings for live chat customiztion'],
    attachTo: {
      element: '.advance-tour-step-14',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-14');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 200);
      });
    },
    classes: 'advance-tour-step-14',
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
    title: 'Api',
    text: ['Step 15: You can check the connection status of your stripe account'],
    attachTo: {
      element: '.advance-tour-step-15',
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
    classes: 'advance-tour-step-15',
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
    title: 'Add Smart List',
    text: ['Step 16: Click this button to add new smart list group'],
    attachTo: {
      element: '.advance-tour-step-16',
      on: 'right'
    },
    classes: 'advance-tour-step-16',
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
    title: 'Add Smart List',
    text: ['Step 17: Please input the smart list group name'],
    attachTo: {
      element: '.advance-tour-step-17',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-17');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'advance-tour-step-17',
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
    title: 'Select Smart List',
    text: ['Step 18: Select a smart list to manage it'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1.col-xl-12 > div > div.tab-pane.active > div > div.p-0.col-md-2 > div > div.list-group-labels.list-group > a',
      on: 'right'
    },
    classes: 'advance-tour-step-18',
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
    title: 'Add new item',
    text: ['Step 19: Please new smart list using this button'],
    attachTo: {
      element: '.advance-tour-step-19',
      on: 'right'
    },
    classes: 'advance-tour-step-19',
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
    title: 'Create new smart list',
    text: [
      'Step 20: Please input the infomation for new smart list like title and contact options'
    ],
    attachTo: {
      element: '.advance-tour-step-20',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.advance-tour-step-20');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'advance-tour-step-20',
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
            <p>You completed the <b>Advanced Settings</b> tour.</p>
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
    classes: 'invoice-tour-step-5',
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

export const notificationsSteps = [
  {
    classes: 'notifications-tour-step-1',
    title: 'Notifications Management',
    text: [`<div>Step 1: Click on Notifications</div>`],
    attachTo: {
      element: '.notifications-tour-start-point',
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
    title: 'System notification',
    text: [`<div>Step 2: Click this tab to update system notification setting</div>`],
    attachTo: {
      element: '.notification-tour-step-2',
      on: 'right'
    },
    classes: 'notification-tour-step-2',
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
    title: 'System notification',
    text: [
      `<div>Step 3: You can enable or disable system notifications by toggling each switch.</div>`
    ],
    attachTo: {
      element: '.notification-tour-step-3',
      on: 'left'
    },
    classes: 'notification-tour-step-3',
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
    title: 'Retention notification',
    text: [`<div>Step 4: Click this tab to update retention notification setting</div>`],
    attachTo: {
      element: '.notification-tour-step-4',
      on: 'right'
    },
    classes: 'notification-tour-step-4',
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
    title: 'Retention notification',
    text: [
      `<div>Step 5: You can enable or disable retention notifications by toggling each switch.</div>`
    ],
    attachTo: {
      element: '.notification-tour-step-5',
      on: 'left'
    },
    classes: 'notification-tour-step-5',
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
    title: 'Birthday notification',
    text: [`<div>Step 6: Click this tab to update birthday notification setting</div>`],
    attachTo: {
      element: '.notification-tour-step-6',
      on: 'right'
    },
    classes: 'notification-tour-step-6',
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
    title: 'Birthday notification',
    text: [
      `<div>Step 7: You can enable or disable birthday notifications by toggling each switch.</div>`
    ],
    attachTo: {
      element: '.notification-tour-step-7',
      on: 'left'
    },
    classes: 'notification-tour-step-7',
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
    title: 'Renewal notification',
    text: [`<div>Step 8: Click this tab to update renewal notification setting</div>`],
    attachTo: {
      element: '.notification-tour-step-8',
      on: 'right'
    },
    classes: 'notification-tour-step-8',
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
    title: 'Renewal notification',
    text: [
      `<div>Step 9: You can enable or disable renewal notifications by toggling each switch.</div>`
    ],
    attachTo: {
      element: '.notification-tour-step-9',
      on: 'left'
    },
    classes: 'notification-tour-step-9',
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
    id: '10',
    title: 'Congratulations',
    text: [
      `
        <div style="display: flex">
          <div style="margin-right: 1rem; margin-top: 0.8rem">
            <p>Great!</p>
            <p>You completed the <b>Notification</b> onboarding.</p>
          </div>
          <img src=${congraturationStep} style="
            width: 10rem;
            height: 7rem;
          "/>
        </div>`
    ],
    attachTo: {
      element: '.invoice-tour-done',
      on: 'right'
    },
    classes: '.invoice-tour-done',
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

export const securitySteps = [
  {
    classes: 'security-tour-step-1',
    title: 'Security Setting',
    text: [`<div>Step 1: Click on Security for security setting</div>`],
    attachTo: {
      element: '.security-tour-start-point',
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
        classes: nextBtnClass,
        text: 'Next',
        type: 'next'
      }
    ]
  },
  {
    title: 'Change Password',
    text: [`<div>Step 2: Use a strong password to secure your account</div>`],
    attachTo: {
      element: '.security-tour-step-2',
      on: 'bottom'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.security-tour-step-2');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 200);
      });
    },
    classes: 'security-tour-step-2',
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
    title: 'Two-step verification',
    text: [`<div>Step 3: Click blue button to enable Two-step verification</div>`],
    attachTo: {
      element: '.security-tour-3',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.security-tour-3');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 200);
      });
    },
    classes: 'security-tour-step-3',
    cancelIcon: {
      enabled: true,
      label: 'cancel'
    },
    buttons: [
      {
        classes: backBtnClass,
        text: 'Back',
        type: 'back'
      }
      // {
      //   classes: nextBtnClass,
      //   text: 'Next',
      //   type: 'next'
      // }
    ]
  },
  {
    title: 'Select Authentication Method',
    text: [`<div>Step 4: Select authentication method and click <b>Continue</b> button</div>`],
    attachTo: {
      element: '.security-tour-4',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.security-tour-4');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 1000);
      });
    },
    classes: 'security-tour-step-4',
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
    title: 'Verification Code',
    text: [`<div>Step 5: Enter your verification code to verify</div>`],
    attachTo: {
      element: '.security-tour-5',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.security-tour-5');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'security-tour-step-5',
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
    title: 'Awesome',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Security</b> onboarding.</p>
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
    classes: 'invoice-tour-step-5',
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

export const depositSteps = [
  {
    classes: 'deposit-tour-step-1',
    title: 'Deposit Setting',
    text: [`<div>Step 1: Click this tab for deposit setting</div>`],
    attachTo: {
      element: '.deposit-tour-start-point',
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
    title: 'My Number',
    text: [`<div>Step 2: Click this button to buy phone number</div>`],
    attachTo: {
      element: '.deposit-tour-2',
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
    classes: 'deposit-tour-step-2',
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
    title: 'My Number',
    text: [`<div>Step 3: Buy phone number</div>`],
    attachTo: {
      element: '.deposit-tour-3',
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
    classes: 'deposit-tour-step-3',
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
    title: 'SMS',
    text: [`<div>Step 4: Click this button to buy credits</div>`],
    attachTo: {
      element: '.deposit-tour-4',
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
    classes: 'deposit-tour-step-4',
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
    title: 'SMS',
    text: [`<div>Step 5: Buy credits you want</div>`],
    attachTo: {
      element: '.deposit-tour-5',
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
    classes: 'deposit-tour-step-5',
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
    title: 'Voice Call',
    text: [`<div>Step 6: Click this button to purchase voice minutes.</div>`],
    attachTo: {
      element: '.deposit-tour-6',
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
    classes: 'deposit-tour-step-6',
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
    title: 'Voice',
    text: [`<div>Step 7: Purchase your voice minutes</div>`],
    attachTo: {
      element: '.deposit-tour-7',
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
    classes: 'deposit-tour-step-7',
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
    title: 'Wallet',
    text: [`<div>Step 8: Click this button to connect your wallet</div>`],
    attachTo: {
      element: '.deposit-tour-8',
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
    classes: 'deposit-tour-step-8',
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
    title: 'Wallet',
    text: [`<div>Step 9: Add your wallet to purchase text and voice minutes</div>`],
    attachTo: {
      element: '.deposit-tour-9',
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
    classes: 'deposit-tour-step-9',
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
    title: 'History',
    text: [`<div>Step 10: Click this button to browse deposit history</div>`],
    attachTo: {
      element: '.deposit-tour-10',
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
    classes: 'deposit-tour-step-10',
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
    title: 'History',
    text: [`<div>Step 11: Here you can see your history</div>`],
    attachTo: {
      element: '.deposit-tour-11',
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
    classes: 'deposit-tour-step-11',
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
    classes: 'invoice-tour-step-5',
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

export const contactsSteps = [
  {
    classes: 'contacts-tour-step-1',
    title: 'Contacts Setting',
    text: [`<div>Step 1: Confirm your Contact fields for each type</div>`],
    attachTo: {
      element: '.contacts-tour-start-point',
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
    title: 'Create new contact type',
    text: [`<div>Step 2: Click this button to create new contact type</div>`],
    attachTo: {
      element: '.contacts-tour-2',
      on: 'right'
    },

    classes: 'contacts-tour-step-2',
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
    title: 'Create new contact type',
    text: [`<div>Step 3: Please input new contact type infomation</div>`],
    attachTo: {
      element: '.contacts-tour-3',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.contacts-tour-3');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'contacts-tour-step-3',
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
    title: 'Select contact type',
    text: [`<div>Step 4: Manage columns by clicking this tabs for each type</div>`],
    attachTo: {
      element: '.contacts-tour-4',
      on: 'right'
    },
    classes: 'contacts-tour-step-4',
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
    title: 'Add new column',
    text: [`<div>Step 5: Click this button to add new column</div>`],
    attachTo: {
      element: '.contacts-tour-5',
      on: 'right'
    },
    classes: 'contacts-tour-step-5',
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
    title: 'Add new column',
    text: [`<div>Step 6: Please input information for new column</div>`],
    attachTo: {
      element: '.contacts-tour-6',
      on: 'right'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector('.contacts-tour-6');
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 500);
      });
    },
    classes: 'contacts-tour-step-6',
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
    classes: 'invoice-tour-step-5',
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
