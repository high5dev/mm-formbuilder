/* eslint-disable no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import Sidebar from './Sidebar';
import { Col, Nav, NavItem, Row, TabContent, TabPane, NavLink, Button } from 'reactstrap';
import { FiSettings } from 'react-icons/fi';
import { GiRank2 } from 'react-icons/gi';
import { BsListCheck, BsUiChecks } from 'react-icons/bs';
import { MdOutlineNotifications } from 'react-icons/md';
import Breadcrumbs from '@components/breadcrumbs';
import { PiListChecks } from "react-icons/pi";
// ** CUSTOME Components
import FormStep from './tabs/step';
import Contact from './tabs/contact';
import Sales from './tabs/sales';
// import Automation from './tabs/automation';
import Settings from './tabs/settings';

// ** STYLES
import '@src/assets/styles/tasks.scss';
import '@src/assets/styles/dark-layout.scss';

// ** DATA ACTIONS
import { getFormDataAction, getFormsEntryAction } from '../store/action';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserData } from '../../../auth/utils';
import OverviewStep from './tabs/overview';
import { Pages } from './tabs/pages/pages';

const FunnelSettings = () => {
  // ** STATES
  const { id } = useParams();
  //const [data, setData] = useState(null);
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Step');
  const contactTypes = useSelector((state) => state.totalContacts.contactTypeList);
  const [contactTypeOptions, setContactTypeOptions] = useState([]);

  const history = useHistory();

  const user = getUserData();

  // ** DATA VARIABLES
  const store = useSelector((state) => {
    return {
      ...state.websiteEditor
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormDataAction(id));
    // dispatch(getFormsEntryAction(id));
  }, []);
  useEffect(() => {
    if (contactTypes && contactTypes.length > 0) {
      let temp = [];
      for (const c of contactTypes) {
        temp.push({ ...c, value: c._id, label: c.name });
      }
      setContactTypeOptions(temp.filter((x) => x.type !== 'employee'));
    }
  }, [contactTypes]);

  const handleBackButtonClick = () => {
    history.goBack();
    // window.location.href = '/business/tools';
  };

  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);

  //Mobile View
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth <= 767;
      const isTablet = windowWidth >= 768 && windowWidth <= 1023;
      const isDesktop = windowWidth >= 1024;

      setIsMobileView(isMobile);
      setIsTabletView(isTablet);
      setIsDesktopView(isDesktop);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px', height: 0 }}>
        <Col md={11} className="invoice-child-header-wrapper">
          <Breadcrumbs
            breadCrumbTitle="Business Tools"
            breadCrumbParent="Forms & Funnels"
            breadCrumbActive={title}
            isMobileView={isMobileView}
            isTabletView={isTabletView}
          />
        </Col>
        <Col md={1} style={{ paddingRight: 0, textAlign: 'end' }}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className='d-flex justify-content-between align-items-center'>
            <Nav pills className="mb-2">
              <>
                <NavItem style={{ width: isMobileView ? '50%' : '' }}>
                  <NavLink
                    active={active === '1'}
                    onClick={() => {
                      setActive('1');
                      setTitle('Overview');
                    }}
                  >
                    <PiListChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Overview</span>
                  </NavLink>
                </NavItem>

                <NavItem style={{ width: isMobileView ? '50%' : '' }}>
                  <NavLink
                    active={active === '2'}
                    onClick={() => {
                      setActive('2');
                      setTitle('Pages');
                    }}
                  >
                    <PiListChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Pages</span>
                  </NavLink>
                </NavItem>

                {/* <NavItem style={{ width: isMobileView ? '50%' : '' }}>
                  <NavLink
                    active={active === '3'}
                    onClick={() => {
                      setActive('3');
                      setTitle('Contacts');
                    }}
                  >
                    <PiListChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Contacts</span>
                  </NavLink>
                </NavItem> */}

                <NavItem style={{ width: isMobileView ? '50%' : '' }}>
                  <NavLink
                    active={active === '5'}
                    onClick={() => {
                      setActive('5');
                      setTitle('Forms');
                    }}
                  >
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">Forms</span>
                  </NavLink>
                </NavItem>

                <NavItem style={{ width: isMobileView ? '50%' : '' }}>
                  <NavLink
                    active={active === '6'}
                    onClick={() => {
                      setActive('6');
                      setTitle('Sales');
                    }}
                  >
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Sales</span>
                  </NavLink>
                </NavItem>

                <NavItem style={{ width: isMobileView ? '50%' : '' }}>
                  <NavLink
                    active={active === '4'}
                    onClick={() => {
                      setActive('4');
                      setTitle('Automation');
                    }}
                  >
                    <PiListChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Automation</span>
                  </NavLink>
                </NavItem>

                
                {/* <NavItem style={{ width: isMobileView ? '50%' : '' }}>
                  <NavLink
                    active={active === '7'}
                    onClick={() => {
                      setActive('7');
                      setTitle('Settings');
                    }}
                  >
                    <MdOutlineNotifications className="font-medium-1 me-50" />
                    <span className="fs-6">Settings</span>
                  </NavLink>
                </NavItem> */}
              </>
            </Nav>
          </div>

          {store?.form?.id !== '' && (
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <OverviewStep
                    dispatch={dispatch}
                    store={store}
                    isMobileView={isMobileView}
                    isTabletView={isTabletView}
                  />
              </TabPane>
              <TabPane tabId="2">
                <Pages />
              </TabPane>
              {/* <TabPane tabId="3">
                <div>Contacts</div>
              </TabPane> */}
              <TabPane tabId="5">
                <FormStep
                  dispatch={dispatch}
                  store={store}
                  isMobileView={isMobileView}
                  isTabletView={isTabletView}
                />
              </TabPane>
              <TabPane tabId="6">
                <Sales
                  dispatch={dispatch}
                  store={store}
                  isMobileView={isMobileView}
                  isTabletView={isTabletView}
                  isDesktopView={isDesktopView}
                />
              </TabPane>
              <TabPane tabId="4">
                <div>Automation</div>
              </TabPane>
              {/* <TabPane tabId="7">
                <Settings
                  store={store}
                  dispatch={dispatch}
                  isMobileView={isMobileView}
                  isTabletView={isTabletView}
                  isDesktopView={isDesktopView}
                  contactTypeOptions={contactTypeOptions}
                />
              </TabPane> */}
            </TabContent>
          )}
        </Col>
      </Row>
    </>
  );
};
export default FunnelSettings;
