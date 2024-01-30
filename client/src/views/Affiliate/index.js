// ** React Imports
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

import BreadCrumbs from '../../@core/components/breadcrumbs';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Alert, Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap'

// ** Styles
// import '@styles/react/apps/app-users.scss';
// import '@src/assets/styles/Affiliate.scss';

// ** Tabs
import AffiliateDashboard from './Tabs/AffiliateDashboard';

const index = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999
  };
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Dashboard');
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Affiliate"
        breadCrumbParent="Affiliate"
        breadCrumbActive={title}
        isMobileView={isMobileView}
        isTabletView={isTabletView}
      />
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1' ? true : false}
            onClick={() => {
              setActive('1');
              setTitle('Dashboard');
            }}
          >
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2' ? true : false}
            onClick={() => {
              setActive('2');
              setTitle('Details');
            }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3' ? true : false}
            onClick={() => {
              setActive('3');
              setTitle('Referrals');
            }}
          >
            Referrals
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '4' ? true : false}
            onClick={() => {
              setActive('4');
              setTitle('Rewards');
            }}
          >
            Rewards
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <AffiliateDashboard />
        </TabPane>
        <TabPane tabId="2">
          <>{'hello Details'}</>
        </TabPane>
        <TabPane tabId="3">
          <>{'hello Referrals'}</>
        </TabPane>
        <TabPane tabId="4">
          <>{'hello Rewards'}</>
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default index;
