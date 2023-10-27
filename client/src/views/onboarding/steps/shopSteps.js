const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';

import congraturationStep from '@src/assets/images/onboarding/businesstools/congraturation.png';

// ** Shop [My Shop] tour steps
export const myShopSteps = [
  {
    classes: 'myShop-tour-step-1',
    title: 'Welcome to My Shop Tour',
    text: ['<div>Step 1: Click on My Shop</div>'],
    attachTo: {
      element: '.myShop-tour-start-point',
      on: 'right-start'
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
    classes: 'myShop-tour-step-2',
    title: 'Filter by Categories, Types and Prices',
    text: ['<div>Step 2: Browse your shop using this filter options</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.row > div.col-md-2 > div',
      on: 'right'
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
    classes: 'myShop-tour-step-3',
    title: 'Search your shop',
    text: ['<div>Step 3: Please input keyword to find you want</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.row > div.col-md-10 > div.mt-1.card > div',
      on: 'top'
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
    classes: 'myShop-tour-step-4',
    title: 'Filtered Result',
    text: ['<div>Step 4: Here you can browse filtered result</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.row > div.col-md-10 > div.ecommerce-application.row',
      on: 'top'
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
    classes: 'myShop-tour-step-5',
    title: 'Favorite',
    text: ['<div>Step 5: Click the Favorite button to add the product to your favorite list</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.row > div.col-md-10 > div.ecommerce-application.row > div:nth-child(1) > div > div.item-options.text-center > button.btn-wishlist.w-50.btn.btn-light',
      on: 'top'
    },
    beforeShowPromise: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          const field = document.querySelector(
            '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.row > div.col-md-10 > div.ecommerce-application.row > div:nth-child(1) > div > div.item-options.text-center > button.btn-wishlist.w-50.btn.btn-light'
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
    classes: 'myShop-tour-step-6',
    title: 'Move to Cart',
    text: [
      '<div>Step 6: Click the Go To This Cart button to add the product to your shopping cart</div>'
    ],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.row > div.col-md-10 > div.ecommerce-application.row > div:nth-child(1) > div > div.item-options.text-center > button.btn-cart.w-50.btn.btn-primary',
      on: 'top'
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
    title: 'Tour Completed',
    text: [
      `
      <div style="display: flex">
        <div style="margin-right: 1rem; margin-top: 0.8rem">
          <p>Great!</p>
          <p>You completed the <b>My Shop</b> tour.</p>
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

// ** Shop [Products] tour steps
export const ProductsSteps = [
  {
    classes: 'products-tour-step-1',
    title: 'Welcome to Products Tour',
    text: ['<div>Step 1: Click on Products</div>'],
    attachTo: {
      element: '.products-tour-start-point',
      on: 'right-start'
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
    classes: 'products-tour-step-2',
    title: 'Manage Products',
    text: ['<div>Step 2: Select this Products tab to manage products</div>'],
    attachTo: {
      element: '#user-profile > div.row > div > div > div > ul > li:nth-child(1)',
      on: 'bottom'
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
    classes: 'products-tour-step-3',
    title: 'Search by name',
    text: ['<div>Step 3: Please input keyword to find you want</div>'],
    attachTo: {
      element:
        '#user-profile > div.tab-content > div.tab-pane.active > div:nth-child(1) > div > div > div:nth-child(1)',
      on: 'top'
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
    classes: 'products-tour-step-4',
    title: 'Select Category',
    text: ['<div>Step 4: You can browse products by category.</div>'],
    attachTo: {
      element:
        '#user-profile > div.tab-content > div.tab-pane.active > div:nth-child(1) > div > div > div:nth-child(2)',
      on: 'top'
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
    classes: 'products-tour-step-5',
    title: 'Filtered Result',
    text: ['<div>Step 5: Here you can browse filtered result</div>'],
    attachTo: {
      element:
        '#user-profile > div.tab-content > div.tab-pane.active > div:nth-child(2) > div > div.sc-fznJRM.dVgdrY > div > div',
      on: 'top'
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
    classes: 'products-tour-step-6',
    title: 'Publish',
    text: ['<div>Step 6: Toggle this button to publish or unpublish the product</div>'],
    attachTo: {
      element: '#cell-6-undefined > div > input',
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
    title: 'Tour Completed',
    text: [
      `
      <div style="display: flex">
        <div style="margin-right: 1rem; margin-top: 0.8rem">
          <p>Great!</p>
          <p>You completed the <b>My Shop</b> tour.</p>
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

// ** Shop [Memberships] tour steps
export const MembershipsSteps = [
  {
    classes: 'memberships-tour-step-1',
    title: 'Welcome to Memberships Tour',
    text: ['<div>Step 1: Click on Memberships</div>'],
    attachTo: {
      element: '.memberships-tour-start-point',
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
    classes: 'memberships-tour-step-2',
    title: 'Manage memberships',
    text: ['<div>Step 2: Select this Memberships tab to manage memberships</div>'],
    attachTo: {
      element: '.memberships-tour-point-2',
      on: 'bottom'
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
    classes: 'memberships-tour-step-3',
    title: 'Search by name',
    text: ['<div>Step 3: Please input keyword to find you want</div>'],
    attachTo: {
      element: '.memberships-tour-point-3',
      on: 'top'
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
    classes: 'memberships-tour-step-4',
    title: 'Select Type',
    text: ['<div>Step 4: You can browse memberships by type.</div>'],
    attachTo: {
      element: '.memberships-tour-point-4',
      on: 'top'
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
    classes: 'memberships-tour-step-5',
    title: 'Filtered Result',
    text: ['<div>Step 5: Here you can browse filtered result</div>'],
    attachTo: {
      element: '.memberships-tour-point-5',
      on: 'top'
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
  // {
  //   classes: 'memberships-tour-step-6',
  //   title: 'Publish',
  //   text: ['<div>Step 6: Toggle this button to publish or unpublish the product</div>'],
  //   attachTo: {
  //     element: '#cell-8-undefined > div',
  //     on: 'left'
  //   },
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
  {
    title: 'Tour Completed',
    text: [
      `
      <div style="display: flex">
        <div style="margin-right: 1rem; margin-top: 0.8rem">
          <p>Great!</p>
          <p>You completed the <b>My Shop</b> tour.</p>
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

// ** Shop [Courses] tour steps
export const CoursesSteps = [
  {
    classes: 'courses-tour-step-1',
    title: 'Welcome to Courses Tour',
    text: ['<div>Step 1: Click on Courses</div>'],
    attachTo: {
      element: '.courses-tour-start-point',
      on: 'right-start'
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
    classes: 'courses-tour-step-2',
    title: 'Manage courses',
    text: ['<div>Step 2: Select this Courses tab to manage courses</div>'],
    attachTo: {
      element: '#user-profile > div.row > div > div > div > nav > div > div > ul > li:nth-child(1)',
      on: 'bottom'
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
    classes: 'courses-tour-step-3',
    title: 'Search by name',
    text: ['<div>Step 3: Please input keyword to find you want</div>'],
    attachTo: {
      element: '.courses-tour-point-3',
      on: 'top'
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
    classes: 'courses-tour-step-4',
    title: 'Select Category',
    text: ['<div>Step 4: You can browse courses by category.</div>'],
    attachTo: {
      element: '.courses-tour-point-4',
      on: 'top'
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
    classes: 'courses-tour-step-5',
    title: 'Filtered Result',
    text: ['<div>Step 5: Here you can browse filtered result</div>'],
    attachTo: {
      element: '.courses-tour-point-5',
      on: 'top'
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
  // {
  //   classes: 'courses-tour-step-6',
  //   title: 'Publish',
  //   text: ['<div>Step 6: Toggle this button to publish or unpublish the product</div>'],
  //   attachTo: {
  //     element: '#cell-6-undefined > div > input',
  //     on: 'left'
  //   },
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
  {
    title: 'Tour Completed',
    text: [
      `
      <div style="display: flex">
        <div style="margin-right: 1rem; margin-top: 0.8rem">
          <p>Great!</p>
          <p>You completed the <b>My Shop</b> tour.</p>
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

// ** Shop [Coupons] tour steps
export const CouponsSteps = [
  {
    classes: 'coupons-tour-step-1',
    title: 'Welcome to Coupons Tour',
    text: ['<div>Step 1: Click on Coupons</div>'],
    attachTo: {
      element: '.coupons-tour-start-point',
      on: 'right-start'
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
    classes: 'coupons-tour-step-2',
    title: 'Add Coupon',
    text: ['<div>Step 2: Add new coupon with detailed infomation</div>'],
    attachTo: {
      element: '.coupons-tour-point-2',
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
    classes: 'coupons-tour-step-3',
    title: 'Search by name',
    text: ['<div>Step 3: Please input keyword to find you want</div>'],
    attachTo: {
      element: '.coupons-tour-point-3',
      on: 'top'
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
    classes: 'coupons-tour-step-4',
    title: 'Filtered Result',
    text: ['<div>Step 4: Here you can browse filtered result</div>'],
    attachTo: {
      element: '.coupons-tour-point-4',
      on: 'top'
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
    title: 'Tour Completed',
    text: [
      `
      <div style="display: flex">
        <div style="margin-right: 1rem; margin-top: 0.8rem">
          <p>Great!</p>
          <p>You completed the <b>My Shop</b> tour.</p>
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

// ** Shop [Settings] tour steps
export const SettingsSteps = [
  {
    classes: 'settings-tour-step-1',
    title: 'Welcome to Settings Tour',
    text: ['<div>Step 1: Click on Settings</div>'],
    attachTo: {
      element: '.settings-tour-start-point',
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
    classes: 'settings-tour-step-2',
    title: 'Shop Logo',
    text: ['<div>Step 2: Upload your shop QRCode logo image</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.collapse.show > div > div:nth-child(1) > div > div:nth-child(1) > input',
      on: 'right'
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
    classes: 'settings-tour-step-3',
    title: 'Shop Name',
    text: ['<div>Step 3: Please input your shop name</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.collapse.show > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > input',
      on: 'right'
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
    classes: 'settings-tour-step-4',
    title: 'Your Shop Path',
    text: ['<div>Step 4: Your Shop URL</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.collapse.show > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(3) > div',
      on: 'right'
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
    classes: 'settings-tour-step-5',
    title: 'Shop Description',
    text: ['<div>Step 5: Please input your shop description briefly</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.collapse.show > div > div:nth-child(2)',
      on: 'top'
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
    classes: 'settings-tour-step-6',
    title: 'Banner',
    text: ['<div>Step 6: Select your shop banner image to show the first shop visit screen</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.collapse.show > div > div:nth-child(3)',
      on: 'top'
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
    classes: 'settings-tour-step-7',
    title: 'Features',
    text: ['<div>Step 7: Input 3 features of your shop</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div.tab-pane.active > div > div.collapse.show > div > div:nth-child(4)',
      on: 'top'
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
    classes: 'settings-tour-step-7',
    title: 'Save setting',
    text: ['<div>Step 8: Save your updated setting</div>'],
    attachTo: {
      element:
        '#root > div.wrapper.vertical-layout.navbar-floating.footer-static.vertical-menu-modern.menu-expanded > div.app-content.content.overflow-hidden.ecommerce-application > div.content-wrapper.animate__animated.animate__fadeIn > div.tab-content > div:nth-child(6) > div > div.collapse.show > div > button',
      on: 'top'
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
    title: 'Tour Completed',
    text: [
      `
      <div style="display: flex">
        <div style="margin-right: 1rem; margin-top: 0.8rem">
          <p>Great!</p>
          <p>You completed the <b>My Shop</b> tour.</p>
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
