// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Col, Nav, NavItem, Row, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Custom
import Sidebar from './Sidebar';

// ** Styles

import Overview from './tabs/overview';
import Seo from './tabs/seo';
import Facebook from './tabs/facebook';
import ConnectDomainTab from './tabs/connectDomain/ConnectDomainTab';
import { useSelector } from 'react-redux';

const Settings = ({ store, dispatch, isMobileView, isTabletView, isDesktopView,contactTypeOptions }) => {
  const organization = JSON.parse(localStorage.getItem('organization'));

  // ** States
  const [activeTab, setActiveTab] = useState('1');


  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className={`${isMobileView ? '' : 'tasks-border'}`}>
            <Sidebar
              active={activeTab}
              setActive={setActiveTab}
              store={store}
              isMobileView={isMobileView}
              isTabletView={isTabletView}
            />
            <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Overview store={store} dispatch={dispatch} contactTypeOptions ={contactTypeOptions}/>
                </TabPane>
                <TabPane tabId="2">
                  <Seo
                    store={store}
                    dispatch={dispatch}
                    isMobileView={isMobileView}
                    isTabletView={isTabletView}
                  />
                </TabPane>
                <TabPane tabId="3">
                  <ConnectDomainTab store={store} dispatch={dispatch} />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
