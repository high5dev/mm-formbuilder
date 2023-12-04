import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
import {
  Button,
  ButtonGroup,
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Spinner,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import { updateFormDataAction } from '../store/action';
import { menu } from './util';
var previewTimerId;

export default function Index({sidebarData, setSidebarData, selectedCategory, setSelectedCategory}) {

  const handleSidebarOpen = (e, item) => {
    e.preventDefault();
    const isOpen=!sidebarData.isOpen;
    setSidebarData({
      ...sidebarData,
      isOpen: true,
      menu: item,
    });
    setSelectedCategory('');
  };

  return (
    <div className="d-flex">
      <div className="sidebar" style={{borderRight: '1px solid #aaa'}}>
        <PerfectScrollbar
          className="scrollable-content"
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          <div>
            {menu &&
              menu.map((item) => {
                return (
                  <div className="menu-item" onClick={e => handleSidebarOpen(e, item)}>
                    <div className="justify-content-between align-items-center">{item.icon}</div>
                    <span className="menu-content">{item.name}</span>
                  </div>
                );
              })}
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
