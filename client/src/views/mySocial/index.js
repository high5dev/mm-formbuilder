import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';
import BreadCrumbs from '../../@core/components/breadcrumbs';

import SocialConnectMain from '../marketing/SocialConnect';
import SocialProof from '../socialproof';
import Reputation from './../apps/reputation';
import { AbilityContext } from '../../utility/context/Can';

export default function index() {
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Social Connect');

  const ability = useContext(AbilityContext);

  useEffect(() => {
    if (ability.can('read', 'mysocial/socialContact')) {
      setActive('1');
      setTitle('Social Connect');
    } else if (ability.can('read', 'mysocial/socialProof')) {
      setActive('2');
      setTitle('Social Proof');
    } else if (ability.can('read', 'mysocial/reputation')) {
      setActive('3');
      setTitle('Reputation');
    }
  }, []);

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
      <div
        className="social"
        style={{ display: 'inline', width: '100%', padding: '0px 20px 0px 0px' }}
      >
        <BreadCrumbs
          breadCrumbTitle="My Social"
          breadCrumbParent="My Social"
          breadCrumbActive={title}
          isMobileView={isMobileView}
          isTabletView={isTabletView}
          isDesktopView={isDesktopView}
        />
        <Nav pills>
          {ability.can('read', 'mysocial/socialContact') && (
            <NavItem style={{ width: isMobileView ? '100%' : '' }}>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  setActive('1');
                  setTitle('Social Connect');
                }}
              >
                Social Connect
              </NavLink>
            </NavItem>
          )}
          {ability.can('read', 'mysocial/socialProof') && (
            <NavItem style={{ width: isMobileView ? '100%' : '' }}>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  setActive('2');
                  setTitle('Social Proof');
                }}
              >
                Social Proof
              </NavLink>
            </NavItem>
          )}
          {ability.can('read', 'mysocial/reputation') && (
            <NavItem style={{ width: isMobileView ? '100%' : '' }}>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  setActive('3');
                  setTitle('Reputation');
                }}
              >
                Reputation
              </NavLink>
            </NavItem>
          )}
        </Nav>

        <TabContent activeTab={active}>
          {ability.can('read', 'mysocial/socialContact') && (
            <TabPane tabId="1">
              <SocialConnectMain
                isMobileView={isMobileView}
                isTabletView={isTabletView}
                isDesktopView={isDesktopView}
              />
            </TabPane>
          )}
          {ability.can('read', 'mysocial/socialProof') && (
            <TabPane tabId="2">
              <SocialProof
                isMobileView={isMobileView}
                isTabletView={isTabletView}
                isDesktopView={isDesktopView}
              />
            </TabPane>
          )}
          {ability.can('read', 'mysocial/reputation') && (
            <TabPane tabId="3">
              <Reputation
                isMobileView={isMobileView}
                isTabletView={isTabletView}
                isDesktopView={isDesktopView}
              />
            </TabPane>
          )}
        </TabContent>
      </div>
    </Fragment>
  );
}
