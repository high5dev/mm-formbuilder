import { lazy } from 'react';

const FormBuilderRoutes = [
  // FromBuilder
  {
    path: '/form-funnel',
    component: lazy(() => import('../../views/webBuilder')),
    exact: true
  },
  {
    path: '/form-funnel/create/:type/:template/:id',
    component: lazy(() => import('../../views/webBuilder/createForm/SelectTemplate')),
    exact: true
  },
  {
    path: '/form-funnel/form-setting/:id',
    component: lazy(() => import('../../views/webBuilder/createDetail')),
    exact: true,
    appLayout: true,
    meta: {
      navLink: '/form-funnel/form-setting'
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

export default FormBuilderRoutes;
