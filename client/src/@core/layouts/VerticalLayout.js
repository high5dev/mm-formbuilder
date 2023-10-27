// ** React Imports
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { handleMenuCollapsed, handleContentWidth, handleMenuHidden } from '@store/layout';

// ** Third Party Components
import classnames from 'classnames';
import { ArrowUp } from 'react-feather';

// ** Reactstrap Imports
import { Navbar, Button } from 'reactstrap';

// ** Configs
import themeConfig from '@configs/themeConfig';

// ** Custom Components
import Customizer from '@components/customizer';
import ScrollToTop from '@components/scrolltop';
import FooterComponent from './components/footer';
// import MobileFooterComponent from './components/footer/MobileFooter';
import NavbarComponent from './components/navbar';
import SidebarComponent from './components/menu/vertical-menu';

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL';
import { useSkin } from '@hooks/useSkin';
import { useNavbarType } from '@hooks/useNavbarType';
import { useFooterType } from '@hooks/useFooterType';
import { useNavbarColor } from '@hooks/useNavbarColor';

// ** Styles
import '@styles/base/core/menu/menu-types/vertical-menu.scss';
import '@styles/base/core/menu/menu-types/vertical-overlay-menu.scss';

// Import library
import * as API from '../../lib/useActions';

const VerticalLayout = (props) => {
  // ** Props
  const {
    menu,
    navbar,
    footer,
    menuData,
    children,
    routerProps,
    setLastLayout,
    currentActiveItem
  } = props;

  // Validate Authentication

  // auth token validate
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userData?.accessToken) {
      // if token available then validate token
      dispatch(API.validateToken({ token: userData?.accessToken }));
    }
    return () => {
      //
    };
  }, [userData, dispatch]);
  // validate token

  // ************************************

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL();
  const { skin, setSkin } = useSkin();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();
  const { navbarColor, setNavbarColor } = useNavbarColor();

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  // ** Store Vars
  // const dispatch = useDispatch()
  const layoutStore = useSelector((state) => state.layout);

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // ** Vars
  const location = useLocation();
  const contentWidth = layoutStore.contentWidth;
  const menuCollapsed = layoutStore.menuCollapsed;
  const isHidden = layoutStore.menuHidden;

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth <= 767;
      const isTablet = windowWidth >= 768 && windowWidth <= 1023;

      setIsMobileView(isMobile);
      setIsTabletView(isTablet);
    };

    handleResize(); // Initial call to set the initial values
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup function to remove the event listener
    };
  }, []);

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val) => dispatch(handleMenuCollapsed(val));

  // ** Handles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val) => dispatch(handleMenuHidden(val));

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false);
    }
  }, [location]);

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth);
    }
  }, [windowWidth]);

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // ** Vars
  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden'
  };

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
    hidden: 'navbar-hidden'
  };

  const navbarClasses = {
    floating: contentWidth === 'boxed' ? 'floating-nav container-xxl' : 'floating-nav',
    sticky: 'fixed-top',
    static: 'navbar-static-top',
    hidden: 'd-none'
  };

  const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white';

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${
          footerClasses[footerType] || 'footer-static'
        }`,
        {
          // Modern Menu
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': menuCollapsed && windowWidth >= 1200,
          'menu-expanded': !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': !menuVisibility && windowWidth < 1200,
          'menu-open': menuVisibility && windowWidth < 1200
        }
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      {!isHidden ? (
        <SidebarComponent
          skin={skin}
          menu={menu}
          menuData={menuData}
          routerProps={routerProps}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
          currentActiveItem={currentActiveItem}
        />
      ) : null}

      <Navbar
        expand="lg"
        container={false}
        light={skin !== 'dark'}
        dark={skin === 'dark' || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${
            navbarClasses[navbarType] || 'floating-nav'
          } navbar-shadow`
        )}
      >
        <div className="navbar-container d-flex content mobile-view-navbar-responsive">
          {navbar ? (
            navbar({ skin, setSkin, setMenuVisibility })
          ) : (
            <NavbarComponent setMenuVisibility={setMenuVisibility} skin={skin} setSkin={setSkin} />
          )}
        </div>
      </Navbar>
      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames('sidenav-overlay', {
          show: menuVisibility
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          setSkin={setSkin}
          footerType={footerType}
          setFooterType={setFooterType}
          navbarType={navbarType}
          setNavbarType={setNavbarType}
          navbarColor={navbarColor}
          setNavbarColor={setNavbarColor}
          isRtl={isRtl}
          setIsRtl={setIsRtl}
          layout={props.layout}
          setLayout={props.setLayout}
          setLastLayout={setLastLayout}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          contentWidth={contentWidth}
          setContentWidth={setContentWidth}
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
          transition={props.transition}
          setTransition={props.setTransition}
          themeConfig={themeConfig}
        />
      ) : null}
      {/* {isMobileView ? (
        <>
          <MobileFooterComponent />
        </>
      ) : ( */}
        <>
          <footer
            className={classnames(
              `footer footer-light ${footerClasses[footerType] || 'footer-static'}`,
              {
                'd-none': footerType === 'hidden'
              }
            )}
          >
            {footer ? (
              footer
            ) : (
              <FooterComponent
                footerType={footerType}
                footerClasses={footerClasses}
                isMobileView={isMobileView}
                isTabletView={isTabletView}
              />
            )}
          </footer>

          {themeConfig.layout.scrollTop === true ? (
            <div className={`${isMobileView ? 'd-none' : 'scroll-to-top'}`}>
              <ScrollToTop showOffset={300} className="scroll-top d-block">
                <Button className="btn-icon" color="primary">
                  <ArrowUp size={14} />
                </Button>
              </ScrollToTop>
            </div>
          ) : null}
        </>
      {/* )} */}
    </div>
  );
};

export default VerticalLayout;
