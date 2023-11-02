import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Plus } from 'react-feather';
import { BiMobile,BiRectangle } from 'react-icons/bi';
import { LuRectangleHorizontal } from 'react-icons/lu';
import {GoHorizontalRule} from 'react-icons/go';
import {RxDividerVertical, RxVideo} from 'react-icons/rx';
import {GrGallery,GrMultiple} from 'react-icons/gr';
import {TbSocial} from 'react-icons/tb';
import {BsMenuApp} from 'react-icons/bs';
import {PiFrameCorners} from 'react-icons/pi';
import {RiQuestionMark} from 'react-icons/ri';
import {
  FaPlus,
  FaRegSquare,
  FaSearch,
  FaYoutubeSquare,
  FaBlog,
  FaRegCalendarAlt,
  FaQuestion,
  FaRegImage,
  FaOutdent
} from 'react-icons/fa';
import {
  MdOutlineDesktopMac,
  MdOutlineTablet,
  MdOutlineLayers,
  MdWorkspacesOutline,
  MdOutlineLibraryBooks,
  MdOutlineGridView,
  MdOutlineNewspaper,
  MdOutlineFormatColorReset,
  MdZoomIn,
  MdOutlineDownloading,
  MdOutlineInsertComment,
  MdOutlineLensBlur,
  MdOutlineBrokenImage,
  MdOutlineGroupWork,
  MdGrid3X3,
  MdTextFormat,
  MdOutlinePermMedia,
  MdOutlineContactPage,
  MdTexture,
  MdStorefront,
  MdBackupTable,
  MdOutlineGroupAdd,
  MdLanguage,
  MdTitle,
  MdOutlineSlowMotionVideo,
  MdOutlineShapeLine
} from 'react-icons/md';
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
var previewTimerId;

export default function Index({sidebarOpen, setSidebarOpen}) {
  const sidebar_menu_items = [
    { icon: <Plus size={24} color={'#585858'} />, name: ' Quick Add' },
    { icon: <MdOutlineBrokenImage size={24} color={'#585858'} />, name: ' Assets' },
    { icon: <MdOutlineGroupWork size={24} color={'#585858'} />, name: ' Compositions' },
    { icon: <MdGrid3X3 size={24} color={'#585858'} />, name: ' Wireframes' },
    { icon: <MdOutlineLayers size={24} color={'#585858'} />, name: ' Layout Tools' },
    { icon: <MdTextFormat size={24} color={'#585858'} />, name: ' Text' },
    { icon: <FaRegSquare size={24} color={'#585858'} />, name: ' Buttons' },
    { icon: <FaSearch size={24} color={'#585858'} />, name: ' Menus & Search' },
    { icon: <MdOutlinePermMedia size={24} color={'#585858'} />, name: 'Media' },
    { icon: <MdTexture size={24} color={'#585858'} />, name: 'Decorative' },
    { icon: <MdOutlineContactPage size={24} color={'#585858'} />, name: 'Contact & Forms' },
    { icon: <FaYoutubeSquare size={24} color={'#585858'} />, name: 'Embed & Social' },
    { icon: <FaBlog size={24} color={'#585858'} />, name: 'Blog' },
    { icon: <MdStorefront size={24} color={'#585858'} />, name: 'Store' },
    { icon: <MdBackupTable size={24} color={'#585858'} />, name: 'Bookings' },
    { icon: <FaRegCalendarAlt size={24} color={'#585858'} />, name: 'Events' },
    { icon: <MdOutlineGroupAdd size={24} color={'#585858'} />, name: 'Members' },
    { icon: <MdOutlineNewspaper size={24} color={'#585858'} />, name: 'CMS' },
    { icon: <MdLanguage size={24} color={'#585858'} />, name: 'Multilingual' }
  ];

  const handleSidebarOpen = (e) => {
    e.preventDefault();
    const isOpen=!sidebarOpen;
    setSidebarOpen(isOpen);
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <PerfectScrollbar
          className="scrollable-content"
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          <div>
            {sidebar_menu_items &&
              sidebar_menu_items.map((item) => {
                return (
                  <div className="menu-item" onClick={handleSidebarOpen}>
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
