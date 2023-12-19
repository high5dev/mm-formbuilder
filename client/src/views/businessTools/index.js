// ** THIS IS A CONNECTOR OF BUSSINESS & FORMS & FUNNELS

import React, { Fragment, useContext, useEffect, useState } from 'react';

import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';
import BreadCrumbs from '../../@core/components/breadcrumbs';

// import FormBuilder from '../formBuilder';
import FormBuilder from '../webBuilder';
//import QRBarcode from '../tasks/setting';
import { useLocation } from 'react-router-dom';

import '@src/assets/styles/business/business-tab.scss';
import '../../assets/styles/onboarding.scss';
import { AiFillProject, AiOutlineAudit, AiOutlineBarcode } from 'react-icons/ai';
import { AbilityContext } from '../../utility/context/Can';
import { MessageCircle, MessageSquare } from 'react-feather';


import { SelectTourAction, createOnboardingStatusAction } from '../onboarding/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'react-lottie';


import CelebrationAnim from '../../assets/animations/celebration.json';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// ** Tour Complettion Lottie Options
const animationOptions = {
  loop: false,
  autoplay: true,
  animationData: CelebrationAnim,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  },
  speed: 1.5
};

export default function index() {
  const [active, setActive] = useState('2');
  const [title, setTitle] = useState('My Builder');
  const [tourComplete, setTourComplete] = useState(false);
  const [isAnimationCompleted, setAnimationCompleted] = useState(false);

  const ability = useContext(AbilityContext);
  const onBoarding = useSelector((state) => state?.OnBoarding);
  const [selectedTour, setSelectedTour] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const isChatTab = queryParams.get('chat') === 'true';

  useEffect(() => {
    if (ability.can('read', 'business/formsFunnels')) {
      setActive(isChatTab ? '4' : '2');
      setTitle(isChatTab ? 'Chat' : 'My Builder');
    } else if (ability.can('read', 'business/qrBarcode')) {
      setActive('3');
      setTitle('QR & Barcode');
    } else if (ability.can('read', 'marketing/chat')) {
      setActive(isChatTab ? '4' : '5');
      setTitle(isChatTab ? 'Chat' : 'Ticket');
    } else if (ability.can('read', 'marketing/ticket')) {
      setActive('5');
      setTitle('Ticket');
    }
  }, [isChatTab, ability]);

  useEffect(() => {
    if (tourComplete) {
      // ** Send complete request to backend
      dispatch(
        createOnboardingStatusAction({
          tourStepId: selectedTour?.id,
          tourCompleted: tourComplete
        })
      );
    }
  }, [tourComplete]);

  useEffect(() => {
    setSelectedTour(onBoarding?.selectedTour);
    return () => {
      dispatch(SelectTourAction('none'));
    };
  }, [onBoarding]);

  const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999
  };

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
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
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Business Tools"
        breadCrumbParent="Business Tools"
        breadCrumbActive={title}
        isMobileView={isMobileView}
        isTabletView={isTabletView}
      />
      <Nav pills>
        {ability.can('read', 'business/formsFunnels') && (
          <NavItem style={{ width: isMobileView ? '100%' : '' }}>
            <NavLink
              className="formsnfunnels-tour-start-point"
              active={isMobileView ? isChatTab && active === '2' : active === '2'}
              onClick={() => {
                setActive('2');
                setTitle('My Builder');
              }}
            >
              <AiOutlineAudit size={20} className="mb-30" />
              <span className="fs-6">My Builder</span>
            </NavLink>
          </NavItem>
        )}
        {/* {selectedTour?.title === 'My Builder' && (
          <Shepherd steps={formsnfunnelsSteps} setTourComplete={setTourComplete} />
        )} */}
        {tourComplete && !isAnimationCompleted && (
          <div style={containerStyle}>
            <Lottie
              options={animationOptions}
              height={400}
              width={400}
              eventListeners={[
                {
                  eventName: 'complete',
                  callback: handleAnimationComplete
                }
              ]}
            />
          </div>
        )}
        {ability.can('read', 'business/qrBarcode') && (
          <NavItem style={{ width: isMobileView ? '100%' : '' }}>
            <NavLink
              className="qrcode-tour-start-point"
              active={isMobileView ? isChatTab && active === '3' : active === '3'}
              onClick={() => {
                setActive('3');
                setTitle('QR & Barcode');
              }}
            >
              <AiOutlineBarcode size={20} className="mb-30" />
              <span className="fs-6">QR & Barcode</span>
            </NavLink>
          </NavItem>
        )}
        {/* {selectedTour?.title === 'QR Code and Barcode' && (
          <Shepherd steps={qrcodenbarcodeSteps} setTourComplete={setTourComplete} />
        )} */}
        {ability.can('read', 'marketing/chat') && (
          <NavItem style={{ width: isMobileView ? '100%' : '' }}>
            <NavLink
              className="chat-tour-start-point"
              active={isMobileView ? isChatTab && active === '4' : active === '4'}
              onClick={() => {
                setActive('4');
                setTitle('Chat');
              }}
            >
              <MessageCircle className="font-medium-1 me-50" />
              <span className="fs-6">Chat</span>
            </NavLink>
          </NavItem>
        )}
        {/* {selectedTour?.title === 'Chat' && (
          <Shepherd steps={chatSteps} setTourComplete={setTourComplete} />
        )} */}
        {ability.can('read', 'marketing/ticket') && (
          <NavItem style={{ width: isMobileView ? '100%' : '' }}>
            <NavLink
              active={isMobileView ? isChatTab && active === '5' : active === '5'}
              className="ticket-tour-start-point"
              onClick={() => {
                setActive('5');
                setTitle('Tickets');
              }}
            >
              <MessageSquare className="font-medium-1 me-50" />
              <span className="fs-6">Ticket</span>
            </NavLink>
          </NavItem>
        )}
      </Nav>
      {/* {selectedTour?.title === 'Ticket' && (
        <Shepherd steps={ticketSteps} setTourComplete={setTourComplete} />
      )} */}
      <TabContent activeTab={active}>
        {ability.can('read', 'business/formsFunnels') && (
          <TabPane tabId="2">
            <FormBuilder
              active={active == '2'}
              isMobileView={isMobileView}
              isTabletView={isTabletView}
              isDesktopView={isDesktopView}
            />
          </TabPane>
        )}
        {/* {ability.can('read', 'business/qrBarcode') && (
          <TabPane tabId="3">
            <QRBarcode
              active={active == '3'}
              isMobileView={isMobileView}
              isTabletView={isTabletView}
              isDesktopView={isDesktopView}
            />
          </TabPane>
        )} */}
        {/* {ability.can('read', 'marketing/chat') && (
          <TabPane tabId="4">
            <div className=" overflow-hidden chat-application">
              <div className="content-overlay"></div>
              <div
                className="content-area-wrapper animate__animated animate__fadeIn"
                style={{ height: 'calc(100vh - 19rem)' }}
              >
                <Chat
                  active={active == '4'}
                  isMobileView={isMobileView}
                  isTabletView={isTabletView}
                  isDesktopView={isDesktopView}
                />
              </div>
            </div>
          </TabPane>
        )}
        {ability.can('read', 'marketing/ticket') && (
          <TabPane tabId="5">
            <div className="content-overlay"></div>
            <div
              className={`${
                isMobileView ? '' : 'content-area-wrapper animate__animated animate__fadeIn'
              }`}
              style={{ height: '77.5vh' }}
            >
              <Ticket
                active={active == '5'}
                isMobileView={isMobileView}
                isTabletView={isTabletView}
                isDesktopView={isDesktopView}
              />
            </div>
          </TabPane>
        )} */}
      </TabContent>
    </Fragment>
  );
}
