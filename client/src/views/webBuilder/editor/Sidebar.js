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

export default function Index({
  sidebarData,
  setSidebarData,
  selectedCategory,
  setSelectedCategory,
  handleClick,
  editor
}) {
  const [selectedMenu, setselectedMenu] = useState([]);

  const handleSidebarOpen = (e, item, index) => {
    e.preventDefault();
    const isOpen = !sidebarData.isOpen;
    setSidebarData({
      ...sidebarData,
      isOpen: true,
      menu: item
    });
    setSelectedCategory(``);
    setselectedMenu({
      ...!selectedMenu,
      [index]: true
    });

    handleClick(0);
    const Labels = [];
    editor?.BlockManager.blocks.map((block) => {
      if (item.subMenu.length > 0 ) {
        if (block.get('menu') === `${item.id}-${item.subMenu[0].id}`) {
          Labels.push(block.get('label'));
          setSelectedCategory(`${item.id}-${item.subMenu[0].id}-${Labels[0]}`);
        }
      }
    });
  };


  return (
    <div className="d-flex">
      <div className="sidebar" style={{ borderRight: '1px solid #aaa' }}>
        <PerfectScrollbar
          className="scrollable-content"
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          <div>
            {menu &&
              menu.map((item, index) => {
                return (
                  <div
                    className=" menu-item mb-0 align-items-center p-50"
                    onClick={(e) => handleSidebarOpen(e, item, index)}
                    style={
                      selectedMenu[index] && sidebarData.isOpen ? { background: '#e4e4e4' } : null
                    }
                  >
                    <div className="justify-content-between align-items-center menu-icon ">
                      {item.icon}
                    </div>
                    <span className="menu-content px-50">
                      {item.name === 'Compositions' ? 'Sections' : item.name}
                    </span>
                  </div>
                );
              })}
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
}
