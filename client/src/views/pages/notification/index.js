import React, { Fragment } from 'react';
import Notifications from './component/Notifications';
import Breadcrumbs from '@components/breadcrumbs';

function index() {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Notification"
        breadCrumbParent="Pages"
        breadCrumbActive="Notification"
      />
      <Notifications />
    </Fragment>
  );
}

export default index;
