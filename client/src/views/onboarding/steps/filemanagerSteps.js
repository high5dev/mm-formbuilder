const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';

import filemanagerTourStep1 from '@src/assets/images/onboarding/businesstools/filemanager-tour-step-1.png';
import congraturationStep from '@src/assets/images/onboarding/businesstools/congraturation.png';

export const filemanagerSteps = [
  {
    title: 'Now that you are ready',
    text: [`<div>Step 1: </div><img src=${filemanagerTourStep1} />`],
    attachTo: {
      element: '.filemanager-tour-step-1',
      on: 'right'
    },
    classes: 'filemanager-tour-step-1',
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
    title: 'Filter ',
    text: [`<div>Step 2: Filter files by label</div>`],
    attachTo: {
      element: '.filemanager-tour-step-2',
      on: 'right'
    },
    classes: 'filemanager-tour-step-2',
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
    title: 'Add new folder',
    text: ['Step 3: Click on this Add New Folder button to add a folder'],
    attachTo: {
      element: '.filemanager-tour-step-3',
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
    classes: '.filemanager-tour-step-3',
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
    title: 'Upload File',
    text: ['Step 4: Click this upload file button to add files'],
    attachTo: {
      element: '.filemanager-tour-step-4',
      on: 'top'
    },
    classes: '.filemanager-tour-step-4',
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
    id: '5',
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
      element: '.filemanager-tour-done',
      on: 'right'
    },
    classes: '.filemanager-tour-done',
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
