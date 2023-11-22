import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const PagesRoutes = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/editor/:id',
    component: lazy(() => import('../../views/formBuilder/editor')),
    layout: 'BlankLayout',
    exact: true
  },
  {
    path: '/website/:id',
    component: lazy(() => import('../../views/website')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/website/:id/:pageName',
    component: lazy(() => import('../../views/website')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/preview/:id',
    component: lazy(() => import('../../views/website')),
    layout: 'BlankLayout',
  },
  {
    path: '/preview/:id/:pageName',
    component: lazy(() => import('../../views/website')),
    layout: 'BlankLayout',
  },
  {
    path: '/login/:contactTypeId/:assignerId',
    exact: true,
    component: lazy(() => import('../../views/pages/authentication/LoginContact')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/login-basic',
    component: lazy(() => import('../../views/pages/authentication/LoginBasic')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/login-cover',
    component: lazy(() => import('../../views/pages/authentication/LoginCover')),
    layout: 'BlankLayout'
  },
  {
    path: '/register',
    component: lazy(() =>
      ['me', 'localhost:3000'].includes(/:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0])
        ? import('../../views/pages/authentication/Register')
        : import('../../views/organizations/authentication/Register')
    ),
    layout: 'BlankLayout',
    exact: true,
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register/:contactTypeId/:assignerId/:contactId',
    exact: true,
    component: lazy(() => import('../../views/pages/authentication/RegisterContact')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/pages/register-basic',
    component: lazy(() => import('../../views/pages/authentication/RegisterBasic')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/register-cover',
    component: lazy(() => import('../../views/pages/authentication/RegisterCover')),
    layout: 'BlankLayout'
  },

  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/forgot-password-basic',
    component: lazy(() => import('../../views/pages/authentication/ForgotPasswordBasic')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/forgot-password-cover',
    component: lazy(() => import('../../views/pages/authentication/ForgotPasswordCover.js')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/reset-password-basic',
    component: lazy(() => import('../../views/pages/authentication/ResetPasswordBasic')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/reset-password-cover',
    component: lazy(() => import('../../views/pages/authentication/ResetPasswordCover')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/verify-email-basic',
    component: lazy(() => import('../../views/pages/authentication/VerifyEmailBasic')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/verify-email-cover',
    component: lazy(() => import('../../views/pages/authentication/VerifyEmailCover')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/two-steps-basic',
    component: lazy(() => import('../../views/pages/authentication/TwoStepsBasic')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/two-steps-cover',
    component: lazy(() => import('../../views/pages/authentication/TwoStepsCover')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/profile',
    component: lazy(() => import('../../views/pages/profile'))
  },
  {
    path: '/pages/faq',
    component: lazy(() => import('../../views/pages/faq'))
  },
  {
    path: '/pages/notification',
    component: lazy(() => import('../../views/pages/notification'))
  },
  {
    path: '/pages/knowledge-base',
    exact: true,
    component: lazy(() => import('../../views/pages/knowledge-base/KnowledgeBase'))
  },
  {
    path: '/pages/knowledge-base/:category',
    exact: true,
    component: lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategory')),
    meta: {
      navLink: '/pages/knowledge-base'
    }
  },
  {
    path: '/pages/knowledge-base/:category/:question',
    component: lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion')),
    meta: {
      navLink: '/pages/knowledge-base'
    }
  },
  {
    path: '/pages/account-settings',
    component: lazy(() => import('../../views/pages/account-settings'))
  },
  {
    path: '/pages/license',
    component: lazy(() => import('../../views/pages/license'))
  },
  {
    path: '/pages/api-key',
    component: lazy(() => import('../../views/pages/api-key'))
  },
  {
    path: '/pages/modal-examples',
    component: lazy(() => import('../../views/pages/modal-examples'))
  },
  {
    path: '/pages/blog/list',
    exact: true,
    component: lazy(() => import('../../views/pages/blog/list'))
  },
  {
    path: '/pages/blog/detail/:id',
    exact: true,
    component: lazy(() => import('../../views/pages/blog/details')),
    meta: {
      navLink: '/pages/blog/detail'
    }
  },
  {
    path: '/pages/blog/detail',
    exact: true,
    component: () => <Redirect to="/pages/blog/detail/1" />
  },
  {
    path: '/pages/blog/edit/:id',
    exact: true,
    component: lazy(() => import('../../views/pages/blog/edit')),
    meta: {
      navLink: '/pages/blog/edit'
    }
  },
  {
    path: '/pages/blog/edit',
    exact: true,
    component: () => <Redirect to="/pages/blog/edit/1" />
  },
  {
    path: '/pages/pricing',
    component: lazy(() => import('../../views/pages/pricing'))
  },
  {
    path: '/misc/coming-soon',
    component: lazy(() => import('../../views/pages/misc/ComingSoon')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/pricing',
    component: lazy(() => import('../../views/pages/pricing/priceAndPlans/Pricing')),
    // layout: 'BlankLayout',
    // meta: {
    //   publicRoute: true
    // }
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/pages/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('../../views/pages/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/pages/misc/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  // {
  //   path: '/wallet',
  //   component: lazy(() => import('../../views/depositfunds/index'))
  // },
  {
    path: '/payment/:status',
    component: lazy(() => import('../../views/pages/payment/index'))
  },
  {
    path: '/payment/p/:status',
    component: lazy(() => import('../../views/pages/payment/PublicPayment')),
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
];

export default PagesRoutes;
