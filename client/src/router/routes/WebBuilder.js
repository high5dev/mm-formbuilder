import { lazy } from 'react';

const WebBuilderRoutes = [
  // FromBuilder
  {
    path: '/webbuilder-funnel',
    component: lazy(() => import('../../views/webBuilder')),
    exact: true
  },
  {
    path: '/webbuilder-funnel/create/:type/:template/:id',
    component: lazy(() => import('../../views/webBuilder/createForm/SelectTemplate')),
    exact: true
  },
  {
    path: '/webbuilder-funnel/form-setting/:id',
    component: lazy(() => import('../../views/webBuilder/createDetail')),
    exact: true,
    appLayout: true,
    meta: {
      navLink: '/webbuilder-funnel/form-setting'
    }
  },
  {
    path: '/web-preview/:id&path=:path',
    component: lazy(() => import('../../views/webBuilder/edit/Preview')),
    exact: true,
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/web-preview/submitted/:id',
    component: lazy(() => import('../../views/webBuilder/edit/SubmitForm')),
    exact: true,
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
];

export default WebBuilderRoutes;
