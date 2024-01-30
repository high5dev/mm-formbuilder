import { lazy } from 'react';

const AffiliateRoutes = [
  // My Business
  {
    path: '/Affiliate/dashbord',
    component: lazy(() => import('../../views/Affiliate'))
  },
  // {
  //   path: '/business/projectmanager',
  //   component: lazy(() => import('../../views/business/projects'))
  // },
  // {
  //   path: '/business/retention',
  //   component: lazy(() => import('../../views/business/retention')),
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application'
  // },
  // {
  //   path: '/business/birthday',
  //   component: lazy(() => import('../../views/business/birthday')),
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application'
  // },
  // {
  //   path: '/business/expired',
  //   component: lazy(() => import('../../views/business/expired')),
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application'
  // },
  // {
  //   path: '/business/statistics',
  //   component: lazy(() => import('../../views/business/index')),
  //   exact: true
  // },
  // {
  //   path: '/business/progression',
  //   component: lazy(() => import('../../views/business/progression')),
  //   exact: true
  // }
];

export default AffiliateRoutes;
