const backBtnClass = 'btn btn-secondary',
  nextBtnClass = 'btn btn-primary btn-next',
  finishBtnClass = 'btn btn-success btn-next';

// ** Task & Goals [Journal] tour steps
export const journalSteps = [
  {
    id: 'intro',
    classes: 'journal-tour-step-1',
    title: 'Simplifying Your Journal Management Experience',
    text: [
      '<div>Step 1: Click on Journal</div><img src="./assets/images/onboarding/taskngoals/journal1.png" />'
    ],
    attachTo: {
      element: '.journal-tour-start-point',
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
    title: 'Now that you are ready',
    text: ['<div>Step 2: </div><img src="./assets/images/onboarding/taskngoals/journal2.png" />'],
    attachTo: {
      element: '.tour-step-2',
      on: 'right-start'
    },
    classes: 'journal-tour-step-2',
    cancelIcon: {
      enabled: true,
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
    title: 'Let&apos;s get started!',
    text: ['<div>Step 3: </div><img src="./assets/images/onboarding/taskngoals/journal3.png" />'],
    attachTo: {
      element: '.tour-step-3',
      on: 'left-start'
    },
    classes: 'journal-tour-step-3',
    cancelIcon: {
      enabled: true,
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
    title: 'Check all of your journals',
    text: [
      'Step 4: This is where you find all your journals. Just click on a journal to see the details'
    ],
    attachTo: {
      element: '.tour-step-4',
      on: 'right'
    },
    classes: 'journal-tour-step-4',
    cancelIcon: {
      enabled: true,
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
    text: ['<div>Step 5: </div><img src="./assets/images/onboarding/taskngoals/journal5.png" />'],
    attachTo: {
      element: '.tour-step-5',
      on: 'right-start'
    },
    classes: 'journal-tour-step-5',
    cancelIcon: {
      enabled: true,
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

// ** Task & Goals [Tasks] tour steps
export const taskSteps = [
  {
    id: '1',
    classes: 'task-tour-step-1',
    title: 'Simplifying Your Task Management Experience',
    text: [
      '<div>Step 1: Click on Tasks</div><img src="./assets/images/onboarding/taskngoals/task1.png" />'
    ],
    attachTo: {
      element: '.task-tour-start-point',
      on: 'right-start'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          const button = document.querySelector('#task');
          if (button) {
            button.click();
          }
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
    id: '2',
    classes: 'task-tour-step-2',
    title: 'Task Management',
    text: ['<div>Step 2:</div><img src="./assets/images/onboarding/taskngoals/task2.png" />'],
    attachTo: {
      element: '.task-tour-element-2',
      on: 'right-start'
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
    id: '3',
    classes: 'task-tour-step-3',
    title: 'Task Management',
    text: [
      '<div>Step 3: Click on + button to create a new Task</div><img src="./assets/images/onboarding/taskngoals/task3.png" />'
    ],
    attachTo: {
      element: '.task-tour-element-3',
      on: 'left-start'
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
    id: '4',
    classes: 'task-tour-step-4',
    title: 'Task Management',
    text: [
      '<div>Step 4: Keep track of your tasks in different styles</div><img src="./assets/images/onboarding/taskngoals/task4.png" />'
    ],
    attachTo: {
      element: '.task-tour-element-4',
      on: 'left-start'
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
    id: '5',
    classes: 'task-tour-step-5',
    title: 'Task Management',
    text: ['Step 5: Click here to add new Task Status'],
    attachTo: {
      element: '.task-tour-element-5',
      on: 'right-start'
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
    id: '6',
    classes: 'task-tour-step-6',
    title: 'Task Management',
    text: ['Step 6: Share task to anyone from your contact list'],
    attachTo: {
      element: '.task-tour-element-6',
      on: 'left-start'
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
    id: '7',
    classes: 'task-tour-step-7',
    title: 'Task Management',
    text: ['Step 7: Check the task activity here'],
    attachTo: {
      element: '.task-tour-element-7',
      on: 'right-start'
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
    id: '8',
    classes: 'task-tour-step-8',
    title: 'Task Management',
    text: ['Thats it. You are all set. Lets create a Task'],
    attachTo: {
      element: '.task-tour-element',
      on: 'right-start'
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
        classes: finishBtnClass,
        text: 'Done',
        type: 'complete'
      }
    ]
  }
];

// ** Task & Goals [Journal] tour steps
export const goalSteps = [
  {
    id: '1',
    classes: 'goal-tour-step-1',
    title: 'Simplifying Your Goal Management Experience',
    text: [
      '<div>The Ultimate Goal Achievement and Habit Building Companion - Empowering You to Reach New Heights and Create Lasting Change</div><img src="./assets/images/onboarding/taskngoals/goal1.png" />'
    ],
    attachTo: {
      element: '.goal-tour-start-point',
      on: 'right-start'
    },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          const button = document.querySelector('#goals');
          if (button) {
            button.click();
          }
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
    id: '2',
    classes: 'goal-tour-step-2',
    title: 'Goal Management',
    text: ['<div>Step 2: </div><img src="./assets/images/onboarding/taskngoals/goal2.png" />'],
    attachTo: {
      element: '.goal-tour-element-2',
      on: 'right-start'
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
    id: '3',
    classes: 'goal-tour-step-3',
    title: 'Goal Management',
    text: [
      '<div>Step 3: Want to build a habit?</div><img src="./assets/images/onboarding/taskngoals/goal3.png" />'
    ],
    attachTo: {
      element: '.goal-tour-element-3',
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
    id: '4',
    classes: 'goal-tour-step-4',
    title: 'Goal Management',
    text: [
      '<div>Step 4: Click on an item from the list to update records</div><img src="./assets/images/onboarding/taskngoals/goal4.png" />'
    ],
    // attachTo: {
    //   element: '.goal-tour-element-4',
    //   on: 'right-start'
    // },
    cancelIcon: {
      enabled: true,
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
    classes: 'goal-tour-step-5',
    title: 'Goal Management',
    text: [
      '<div>Step 5: Record in the Calendar</div><img src="./assets/images/onboarding/taskngoals/goal5.png" />'
    ],
    // attachTo: {
    //   element: '.goal-tour-element-5',
    //   on: 'right-start'
    // },
    cancelIcon: {
      enabled: true,
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
    id: '6',
    classes: 'goal-tour-step-6',
    title: 'Goal Management',
    text: [
      '<div>Step 6: To reach a goal, break it down into manageable parts</div><img src="./assets/images/onboarding/taskngoals/goal6.png" />'
    ],
    attachTo: {
      element: '.goal-tour-element-6',
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
    id: '7',
    classes: 'goal-tour-step-7',
    title: 'Goal Management',
    text: [
      '<div>Step 7: Select a goal from the list</div><img src="./assets/images/onboarding/taskngoals/goal7.png" />'
    ],
    // attachTo: {
    //   element: '.goal-tour-element-7',
    //   on: 'right-start'
    // },
    cancelIcon: {
      enabled: true,
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
    id: '8',
    classes: 'goal-tour-step-8',
    title: 'Goal Management',
    text: [
      '<div>Step 8: Then create Sub-goals & Keep record of your progress</div><img src="./assets/images/onboarding/taskngoals/goal8.png" />'
    ],
    // attachTo: {
    //   element: '.goal-tour-element-8',
    //   on: 'right-start'
    // },
    cancelIcon: {
      enabled: true,
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
