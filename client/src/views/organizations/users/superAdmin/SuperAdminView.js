import React, { Fragment, useEffect, useState } from 'react';

import { Nav, NavItem, NavLink, TabContent, TabPane, Col, Row } from 'reactstrap';
import { Calendar, File, Plus, Settings, Users } from 'react-feather';

// ** STYLES
import '@styles/react/apps/app-users.scss';
import Breadcrumbs from '@components/breadcrumbs';
import Organizations from '../../tabs/orgs/Organizations';
import { useDispatch, useSelector } from 'react-redux';
import Plans from '../../plans/Plans';
import { getOrgsAction, getPlansAction } from '../../store/action';
import Elements from '../../elements/Elements';

const SuperAdminView = () => {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Organizations');
  
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  //Mobile View
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth <= 767;
      const isTablet = windowWidth >= 768 && windowWidth <= 1023;

      setIsMobileView(isMobile);
      setIsTabletView(isTablet);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //STORE
  const store = useSelector((state) => state.organizations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrgsAction());
    dispatch(getPlansAction());
  }, [dispatch]);
  return (
    <Fragment>
      <Row className="w-100 invoice-child-header-wrapper m-0">
        <Col
          xl="12"
          xs={{ order: 0 }}
          md={{ order: 1, size: 12 }}
          className="w-100 invoice-child-header-wrapper"
        >
          <Breadcrumbs
            breadCrumbTitle={'Organizations'}
            breadCrumbParent="Super Admin View"
            breadCrumbActive={title}
            isMobileView={isMobileView}
            isTabletView={isTabletView}
          />
          <Nav pills className="mb-2 flex-column flex-md-row">
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  setActive('1');
                  setTitle('Organizations');
                }}
              >
                <Plus className="font-medium-1 me-50" />
                <span className="fs-6">Organizations</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  setActive('2');
                  setTitle('Plans');
                }}
              >
                <File className="font-medium-1 me-50" />
                <span className="fs-6">Plans</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  setActive('3');
                  setTitle('Manage Elements');
                }}
              >
                <File className="font-medium-1 me-50" />
                <span className="fs-6">Manage Elements</span>
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <Organizations store={store} dispatch={dispatch} isMobileView={isMobileView} isTabletView={isTabletView} />
            </TabPane>

            <TabPane tabId="2">
              <Plans dispatch={dispatch} store={store} isMobileView={isMobileView} isTabletView={isTabletView} />
            </TabPane>
            <TabPane tabId="3">
              <Elements dispatch={dispatch} store={store} isMobileView={isMobileView} isTabletView={isTabletView} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SuperAdminView;
