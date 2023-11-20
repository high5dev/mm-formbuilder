import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Trash2 } from 'react-feather';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Trash2, PlusSquare } from 'react-feather';
import { BiMobile } from 'react-icons/bi';
import { FaBox, FaPaintBrush } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
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
import { BsPlusSquare } from 'react-icons/bs';
var previewTimerId;

export default function MainNav({
  customwidth,
  setCustomWidth,
  page,
  setPage,
  setIsClear,
  setIsPreview,
  setIsPublish,
  setTab,
  open,
  setOpen,
  rsidebarOpen,
  setRSidebarOpen,
  store,
  device,
  setDevice,
  openAddElementMdl,
  setOpenAddElementMdl
}) {
  const [width, setWidth]=useState(1280);
  const [devicetype, setDeviceType]=useState('desktop');
  const form=store.form;
  const {formData}=form;
  const handleImport = (e) => {
    setOpen(!open);
  };

  const onChange=(e) =>{
    setWidth(e.target.value);
  }

  const handleKeyDown =(e) =>{
    if(e.key==='Enter'){
      if(width>1280){
        setDeviceType('desktop');
      }
      if(width<=1280 && width>768){
        setDeviceType('tablet');
      }
      if(width >=320 && width<768){
        setDeviceType('mobile');
      }
      setCustomWidth(width)
    }
  }
  const handleClear=()=>{
    setIsClear(true);
  }

  const handlePage =(item)=>{
    setPage(item);
  }

  const handleAddElement = () => {
    setOpenAddElementMdl(true);
  };
  
  useEffect(()=>{
    setPage(formData[0]);
  }, [])
  
  return (
    <div className="navbar">
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
          <span className="menu-item text-primary text-white" onClick={(e)=>setIsPreview(true)}>Preview</span>
          <Button className="btn btn-primary" color="primary" onClick={(e)=>setIsPublish(true)}>
            Publish
          </Button>
        </div>
      </div>
      <div className="down-navbar d-flex align-items-center">
        <div className="feature-icons d-flex align-items-center">
          <span className="px-2">
            <MdOutlineLensBlur size={26} color={'#0275d8'} id="inspector" />
            <UncontrolledTooltip placement="bottom" target="inspector">
              Inspector
            </UncontrolledTooltip>
          </span>
          <span className="px-2">
            <MdOutlineInsertComment size={26} color={'black'} id="comments" />
            <UncontrolledTooltip placement="bottom" target="comments">
              Comments
            </UncontrolledTooltip>
          </span>
          <span className="hover-bg px-2">
            <MdOutlineDownloading
              size={26}
              color={'black'}
              id="import"
              onClick={(e) => handleImport(e)}
            />
            <UncontrolledTooltip placement="bottom" target="import">
              Import
            </UncontrolledTooltip>
          </span>
          <span className="hover-bg px-2">
            <MdZoomIn size={30} color={'black'} id="zoom" />
            <UncontrolledTooltip placement="bottom" target="zoom">
              Zoom
            </UncontrolledTooltip>
          </span>
           <span className="hover-bg px-2">
            <Trash2 size={24} color={'black'} id="trash2" onClick={handleClear}/>
            <UncontrolledTooltip placement="bottom" target="trash2">
              Clear
            </UncontrolledTooltip>
          </span>
          <span className="hover-bg px-2" onClick={() => {handleAddElement()}}>
            <PlusSquare size={26} color={'black'} id="add-element" />
            <UncontrolledTooltip placement="bottom" target="add-element">
              Add Element
            </UncontrolledTooltip>
          </span>
        </div>
        <div className="home-pages d-flex align-items-center">
          <UncontrolledDropdown style={{ cursor: 'pointer' }}>
            <DropdownToggle tag="div" className="btn btn-sm hover-effect">
              <div className="d-flex">
                {page?.name}
                <div className="px-2">
                  <ChevronDown size={15} />
                </div>
              </div>
            </DropdownToggle>
            <DropdownMenu container="body">
              {formData && formData.map((item)=>{
                return(            
                <DropdownItem tag="span" className="w-100">
                  <span className="" onClick={(e)=>handlePage(item)}>{item.name}</span>
              </DropdownItem>);
              })}
              {/* <DropdownItem tag="span" className="w-100">
                <span className="">Home</span>
              </DropdownItem>
              <DropdownItem tag="span" className="w-100">
                <span className="">Plans & Pricing</span>
              </DropdownItem>
              <DropdownItem tag="span" className="w-100">
                <span className="">Menu</span>
              </DropdownItem> */}
              {/* <DropdownItem tag="span" className="w-100 text-primary">
                <span className="">Manage Pages</span>
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="devices-icons d-flex justify-content-around align-items-center">
          <MdOutlineDesktopMac size={22} color={devicetype ==='desktop' ? '#174ae7':'black'} onClick={() => {
            setWidth(1280);
            setCustomWidth(1280);
            setDeviceType('desktop');
            }} />
          <MdOutlineTablet size={22} color={devicetype ==='tablet' ? '#174ae7':'black'} onClick={() => {         
            setWidth(768);
            setCustomWidth(768);
            setDeviceType('tablet');
          }
            } />
          <BiMobile size={22} color={devicetype ==='mobile' ? '#174ae7':'black'} onClick={() => {
            setWidth(320);
            setCustomWidth(320);
            setDeviceType('mobile');
          }} />
          <UncontrolledDropdown style={{ cursor: 'pointer' }}>
            <DropdownToggle tag="div" className="btn btn-sm hover-effect">
              <MoreHorizontal size={24} color={'black'} />
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
        <div className="devices-size d-flex align-items-center">
          <span className="px-1 text-dark">w</span>
          <span>
            <Input type="text" name="name" required value={width} onChange={onChange} onKeyDown={handleKeyDown}/>
          </span>
          <span className="px-1 text-dark">px</span>
        </div>
        <div className="zoom-size d-flex justify-content-around align-items-center">
          <div className='d-flex'>
            <span className="menu-icon">
              <MdWorkspacesOutline size={24} color={'black'} id="global" />
              <UncontrolledTooltip placement="bottom" target="global">
                Global Sections
              </UncontrolledTooltip>
            </span>
            <span className="menu-icon">
              <MdOutlineFormatColorReset size={24} color={'black'} id="menu"/>
              <UncontrolledTooltip placement="bottom" target="menu">
                Format
              </UncontrolledTooltip>
            </span>
            <span className="menu-icon">
              <MdOutlineGridView size={24} color={'black'} id="market" />
              <UncontrolledTooltip placement="bottom" target="market">
                App Market
              </UncontrolledTooltip>
            </span>
            <span className="menu-icon">
              <MdOutlineNewspaper size={24} color={'black'} id="cms" />
              <UncontrolledTooltip placement="bottom" target="cms">
                CMS
              </UncontrolledTooltip>
            </span>
          </div>
          <div className='d-flex'>
            <span className="menu-icon">
              <FaPaintBrush size={24} color={'black'} id="styles" onClick={(e)=>{
                setTab('Styles');
                setRSidebarOpen(true);
                
              }}/>
              <UncontrolledTooltip placement="bottom" target="styles">
                Styles
              </UncontrolledTooltip>
            </span>
            <span className="menu-icon">
              <MdOutlineLayers size={26} color={'black'} id="layers" onClick={(e)=>{
                  setTab('Layers');
                  setRSidebarOpen(true);
                }}/>
              <UncontrolledTooltip placement="bottom" target="layers">
                Layers
              </UncontrolledTooltip>
            </span>
            <span className="menu-icon">
              <FiSettings size={24} color={'black'} id="traits" onClick={(e)=>{
                  setTab('Traits');
                  setRSidebarOpen(true);
                }}/>
              <UncontrolledTooltip placement="bottom" target="traits">
                Traits
              </UncontrolledTooltip>
            </span>
            <span className="menu-icon">
              <MdOutlineLibraryBooks size={24} color={'black'} id="pages" onClick={(e)=>{
                setTab('Pages');
                setRSidebarOpen(true);
             }}/>
              <UncontrolledTooltip placement="bottom" target="pages">
                Pages
              </UncontrolledTooltip>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
