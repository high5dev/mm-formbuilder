const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';

import congraturationStep from '@src/assets/images/onboarding/businesstools/congraturation.png';

export const invoiceSteps = [
  {
    classes: 'invoice-tour-step-1',
    title: 'Invoice Management',
    text: [`<div>Step 1: Click on Invoice</div>`],
    attachTo: {
      element: '.invoice-tour-start-point',
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
    text: [`<div>Step 2: Create new invoice by clicking this button</div>`],
    attachTo: {
      element: '.invoice-tour-2',
      on: 'right'
    },
    classes: 'invoice-tour-step-2',
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
    title: 'Invoice To',
    text: ['Step 3: Select client to send invoice request'],
    attachTo: {
      element: '.invoice-tour-step-3',
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
    classes: '.invoice-tour-step-3',
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
    title: 'Item',
    text: ['Step 4: Add item infomation'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.invoice-add.row > div.col-sm-12.col-md-8.col-xl-9 > div > form > div.invoice-padding.invoice-product-details.card-body > div.mb-1.row > div',
      on: 'top'
    },
    classes: '.invoice-tour-step-4',
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
    title: 'Discount and Tax',
    text: ['Step 5: Add your discount and tax infomation'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.invoice-add.row > div.col-sm-12.col-md-8.col-xl-9 > div > form > div:nth-child(5) > div > div.mt-md-0.mt-3.col-12.order-2.col-md-6.order-md-1',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector(
            '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.invoice-add.row > div.col-sm-12.col-md-8.col-xl-9 > div > form > div:nth-child(5) > div > div.mt-md-0.mt-3.col-12.order-2.col-md-6.order-md-1'
          );
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    classes: '.invoice-tour-step-5',
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
    title: 'Note',
    text: [
      'Step 6: Input some description for your invoice request. Your client will see this note.'
    ],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.invoice-add.row > div.col-sm-12.col-md-8.col-xl-9 > div > form > div.invoice-padding.py-0.card-body > div > div > div',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector(
            '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.invoice-add.row > div.col-sm-12.col-md-8.col-xl-9 > div > form > div.invoice-padding.py-0.card-body > div > div > div'
          );
          if (field) {
            field.scrollIntoView({ behavior: 'smooth' });
            resolve();
          }
        }, 0);
      });
    },
    classes: '.invoice-tour-step-6',
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
    text: ['Step 7: Save your invoice. You can see this in the invoice list and can manage it.'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.invoice-add.row > div.col-sm-12.col-md-4.col-xl-3 > div.invoice-action-wrapper.card > div > button',
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
    classes: '.invoice-tour-step-7',
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
    title: 'Goto the list',
    text: ['Step 8: Click on Back button'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div:nth-child(1) > div.col-md-1 > button',
      on: 'left'
    },

    classes: '.invoice-tour-step-8',
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
    title: 'Select item',
    text: ['Step 9: Filter the list by date and status'],
    attachTo: {
      element: '.invoice-tour-9',
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
    classes: '.invoice-tour-step-9',
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
    title: 'Search by keyword',
    text: ['Step 10: Please input keyword to find invoice easily you want'],
    attachTo: {
      element: '.invoice-tour-10',
      on: 'left'
    },
    classes: '.invoice-tour-step-10',
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
    title: 'Invoice List',
    text: ['Step 11: Here are the filtered invoice list'],
    attachTo: {
      element: '.invoice-tour-11',
      on: 'left'
    },
    classes: '.invoice-tour-step-11',
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
            <p>You completed the <b>Finance Invoice</b> tour.</p>
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

export const incomeSteps = [
  {
    classes: 'income-tour-step-1',
    title: 'Income Registration and Total Summary',
    text: [`<div>Step 1: Click on Income</div>`],
    attachTo: {
      element: '.income-tour-start-point',
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
    title: 'Income this month',
    text: [`<div>Step 2: You can see your total earnings for this month here</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(1) > div.col-12.col-md-6.col-xl-4',
      on: 'right'
    },
    classes: 'invoice-tour-step-2',
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
    title: 'Statistics',
    text: ["Step 3: Check out this month's statistical data."],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(1) > div.col-12.col-md-6.col-xl-8',
      on: 'left'
    },
    classes: 'invoice-tour-step-3',
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
    title: 'Add new income',
    text: ['Step 4: Click this Add Income button to register new income'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(2) > div.col-12.col-md-6.col-lg-4 > div > div.card-header > div.d-flex > button',
      on: 'top'
    },
    classes: 'invoice-tour-step-4',
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
    ]
  },
  {
    title: 'Input income infomation',
    text: ['Step 5: Please input new income infomation and then click Save button'],
    attachTo: {
      element: '.income-tour-element-5',
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
      }
    ]
  },
  {
    title: 'Total Income',
    text: ['Step 6: You can check income by category'],
    attachTo: {
      element: '.income-tour-element-6',
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
    classes: 'invoice-tour-step-6',
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
    title: 'Income Report',
    text: ['Step 7: Here you can see Income infomation in detail'],
    attachTo: {
      element: '.income-tour-element-7',
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
    classes: 'invoice-tour-step-7',
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
              <p>You completed the <b>Finance Income</b> tour.</p>
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

export const expenseSteps = [
  {
    classes: 'expense-tour-step-1',
    title: 'Expense Registration and Total Summary',
    text: [`<div>Step 1: Click on Expense</div>`],
    attachTo: {
      element: '.expense-tour-start-point',
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
    title: 'Expense this month',
    text: [`<div>Step 2: You can see your total earnings for this month here</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(1) > div.col-12.col-md-6.col-xl-4',
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
    title: 'Statistics',
    text: ["Step 3: Check out this month's statistical data."],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(1) > div.col-12.col-md-6.col-xl-8',
      on: 'left'
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
    title: 'Add new expense',
    text: ['Step 4: Click this Add Expense button to register new expense'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(2) > div.col-12.col-md-6.col-lg-4 > div > div.card-header > div.d-flex > button',
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
      }
    ]
  },
  {
    title: 'Input expense infomation',
    text: ['Step 5: Please input new income infomation and then click Save button'],
    attachTo: {
      element: '.income-tour-element-5',
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
      }
    ]
  },
  {
    title: 'Total Expense',
    text: ['Step 6: You can check income by category'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(2) > div.col-12.col-md-6.col-lg-4 > div > div.income-tour-element-6.card-body',
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
    title: 'Expense Report',
    text: ['Step 7: Here you can see Expense infomation in detail'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(2) > div.col-12.col-md-6.col-lg-8 > div > div',
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
    title: 'How do you like it?',
    text: [
      `
          <div style="display: flex">
            <div style="margin-right: 1rem; margin-top: 0.8rem">
              <p>Great!</p>
              <p>You completed the <b>Finance Expense</b> tour.</p>
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

export const profitnlossSteps = [
  {
    classes: 'profitnloss-tour-step-1',
    title: 'Confirm your Profit and Loss',
    text: [`<div>Step 1: Click on Profit & Loss</div>`],
    attachTo: {
      element: '.profitnloss-tour-start-point',
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
    title: 'Profit & Loss',
    text: [`<div>Step 2: Please check your profit & loss this month</div>`],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(1) > div.col-md-3',
      on: 'right'
    },
    classes: 'invoice-tour-step-2',
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
    title: 'Statistics',
    text: ['Step 3: This is your finance statistics data'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(1) > div.col-md-9',
      on: 'left'
    },
    classes: 'invoice-tour-step-3',
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
    title: 'Chart',
    text: ['Step 4: Check Profit & Loss by year and month'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(2) > div.col-md-3',
      on: 'right'
    },
    classes: 'invoice-tour-step-4',
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
    title: 'Statements',
    text: ['Step 5: Profit & Loss by Period'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden > div.content-wrapper.animate__animated.animate__fadeIn > div > div.order-0.col-md-12.order-md-1 > div > div.tab-pane.active > div > div:nth-child(2) > div.col-md-9',
      on: 'left'
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
            <p>You completed the <b>Finance > Profit and Loss</b> tour.</p>
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
