import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown,MoreHorizontal } from 'react-feather';

import { BiMobile } from 'react-icons/bi';
import { FaBox, FaPaintBrush } from 'react-icons/fa';
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
  MdOutlineLensBlur
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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

export default function MainNav({open, setOpen, store, impStatus, setImpStatus, device, setDevice}) {
  const handleImport=(e)=>{
    setOpen(!open);
  }

  return (
    <div className='navbar'>
      <div className="up-navbar d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content align-items-center">
          <div className="logo">
            <span className="title brand-text text-white">My Manager</span>
          </div>
          <div className="menu-bar d-flex justify-content-between align-items-center">
            <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle tag="div" className="btn btn-sm hover-effect text-white">
                Site
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag="span" className="w-100">
                  <div className="d-flex align-items-center">
                    <span className="">Preview</span>
                    <span className="ms-3 font-small-2">Ctrl+Alt+P</span>
                  </div>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <div className="d-flex align-items-center">
                    <span className="align-middle">Publish</span>
                    <span className="ms-3 font-small-2">Ctrl+Shift+P</span>
                  </div>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Create New Site</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Rename Site</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Duplicate Site</span>
                </DropdownItem>
              </DropdownMenu>
              {/* <div className="menu-item">
                <span>Site</span>
              </div> */}
            </UncontrolledDropdown>
            <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle tag="div" className="btn btn-sm hover-effect text-white">
                View
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <div className="d-flex align-items-center">
                    <span className="">Zoom In</span>
                    <span className="ms-3 font-small-2">Ctrl++</span>
                  </div>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <div className="d-flex align-items-center">
                    <span className="align-middle">Zoom Out</span>
                    <span className="ms-3 font-small-2">Ctrl--</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
              {/* <div className="menu-item">
                <span>Site</span>
              </div> */}
            </UncontrolledDropdown>
            <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle tag="div" className="btn btn-sm hover-effect text-white">
                Tools
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag="span" className="w-100">
                  <span className="">Libraries</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <span className="">Media Manager</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <span className="">Multilingual</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <span className="">Site Checker</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="additional-bar d-flex align-items-center justify-content-around">
          <div className="menu-item hover-effect text-white">Invite</div>
          <span className="menu-item text-primary text-white">
            Preview
            </span>
          <Button className="btn btn-primary" color="primary">
            Publish
          </Button>
        </div>
      </div>
      <div className="down-navbar d-flex align-items-center">
        <div className="feature-icons d-flex align-items-center">
          <span className='menu-icon'>
            <MdOutlineLayers size={24} color={'black'} id='layers'/>
            <UncontrolledTooltip placement='bottom' target='layers'>
                Layers
            </UncontrolledTooltip>
          </span>
          <span className='menu-icon'>
            <MdWorkspacesOutline size={24} color={'black'} id='global'/>
            <UncontrolledTooltip placement='bottom' target='global'>
                Global Sections
            </UncontrolledTooltip>
          </span>
          <span className='menu-icon'>
            <MdOutlineLibraryBooks size={24} color={'black'} id='pages'/>
            <UncontrolledTooltip placement='bottom' target='pages'>
              Pages
            </UncontrolledTooltip>
          </span>
          <span className='menu-icon'>
            <MdOutlineFormatColorReset size={24} color={'black'} id='styles'/>
            <UncontrolledTooltip placement='bottom' target='styles'>
              Site Styles
            </UncontrolledTooltip>
          </span>
          <span className='menu-icon'>
            <MdOutlineGridView size={24} color={'black'} id='market'/>
            <UncontrolledTooltip placement='bottom' target='market'>
              App Market
            </UncontrolledTooltip>
          </span>
          <span className='menu-icon'>
            <MdOutlineNewspaper size={24} color={'black'} id='cms'/>
            <UncontrolledTooltip placement='bottom' target='cms'>
             CMS
            </UncontrolledTooltip>
          </span>
        </div>
        <div className='home-pages d-flex align-items-center'>
        <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle tag="div" className="btn btn-sm hover-effect">
                <div className='d-flex'>
                    Home
                <div className='px-2'>
                <ChevronDown size={15} />
                </div>         
                </div>
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag="span" className="w-100">
                  <span className="">Home</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <span className="">Plans & Pricing</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  <span className="">Menu</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100 text-primary">
                  <span className="">Manage Pages</span>
                </DropdownItem>
              </DropdownMenu>
        </UncontrolledDropdown>
        </div>
        <div className="devices-icons d-flex justify-content-around align-items-center">
          <MdOutlineDesktopMac size={22} color={'black'} onClick={()=>setDevice('desktop')}/>
          <MdOutlineTablet size={22} color={'black'} onClick={()=>setDevice('tablet')}/>
          <BiMobile size={22} color={'black'} onClick={()=>setDevice('mobile')}/>
          <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle tag="div" className="btn btn-sm hover-effect">
              <MoreHorizontal size={24} color={'black'}/>
              </DropdownToggle>
        </UncontrolledDropdown>
     
        </div>
        <div className="devices-size d-flex align-items-center">
          <span className="px-1 text-dark">w</span>
          <span>
            <Input type="text" name="name" required />
          </span>
          <span className="px-1 text-dark">px</span>
        </div>
        <div className="zoom-size d-flex justify-content-around align-items-center">
            <span className='hover-bg'>
                <MdOutlineDownloading size={26} color={'black'} id='import' onClick={(e)=>handleImport(e)}/>
                <UncontrolledTooltip placement='bottom' target='import'>
              Import
            </UncontrolledTooltip>
            </span>
            <span className='hover-bg'>
            <MdZoomIn size={30} color={'black'} id='zoom'/>
            <UncontrolledTooltip placement='bottom' target='zoom'>
              Zoom
            </UncontrolledTooltip>
            </span>
        </div>
        <div className="comments d-flex justify-content-around align-items-center">
          <span>
          <MdOutlineInsertComment size={26} color={'black'} id='comments'/>
          <UncontrolledTooltip placement='bottom' target='comments'>
              Comments
            </UncontrolledTooltip>
          </span>
          <span>
          <MdOutlineLensBlur size={26} color={'#0275d8'} id='inspector'/>
          <UncontrolledTooltip placement='bottom' target='inspector'>
              Inspector
            </UncontrolledTooltip>
          </span>
  
        </div>
      </div>
    </div>
  );
}
