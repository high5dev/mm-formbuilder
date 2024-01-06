import React, { useEffect, useState, useRef } from 'react';
import {
  Eye,
  Save,
  X,
  ChevronDown,
  MoreHorizontal,
  Trash2,
  PlusSquare,
  Plus,
  Minimize2
} from 'react-feather';
import { BiListPlus, BiMobile, BiBlanket } from 'react-icons/bi';
import { FaBox, FaPaintBrush } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import Logo from '@src/assets/images/logo/lightlogo.png';
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
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setLinkUrlReducer } from '../store/reducer';
import { updateFormDataAction, createPageAction } from '../store/action';
import { setFormReducer } from '../store/reducer';
import { BsPlusSquare } from 'react-icons/bs';
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
import { menu } from './util';
import Settings from '../../../navigation/vertical/settings';
import { truncate } from 'fs';

export default function MainNav({
  setIsBlog,
  createMdl,
  setCreateMdl,
  renameMdl,
  setRenameMdl,
  duplicateMdl,
  setDuplicateMdl,
  customwidth,
  setCustomWidth,
  ispreview,
  setIsClear,
  setIsBack,
  setIsPreview,
  setIsPublish,
  setTab,
  tab,
  open,
  setOpen,
  rsidebarOpen,
  setRSidebarOpen,
  store,
  device,
  setDevice,
  openAddElementMdl,
  setOpenAddElementMdl,
  addSideBarOpen,
  setAddSideBarOpen,
  sidebarData,
  setSidebarData,
  selectedMainNav,
  setSelectedMainNav,
  setRoleMdl,
  viewCMSMenu,
  handelVisibleMenu,
  VisibleMenu
}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(1280);
  const [devicetype, setDeviceType] = useState('desktop');
  const [showFeatureIcons, setShowFeatureIcons] = useState(false);
  const [showZoomIcons, setShowZoomIcons] = useState(false);
  const form = store.form;
  const page = store.currentPage;
  const { formData } = form;
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const diffentTime = () => {
    let today = new Date();
    let diff = today - Date.parse(form.updatedAt);
    let days = Math.floor(diff / 86400000);
    let hours = Math.floor((diff % 86400000) / 3.6e6);
    let minutes = Math.floor((diff % 3.6e6) / 6e4);
    let seconds = Math.floor((diff % 6e4) / 1000);
    let duration =
      days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds ago Saved';
    return duration;
  };

  useEffect(() => {
    // Function to handle clicks outside of the SVG element
    const handleClickOutside = (e) => {
      if (svgRef.current && !svgRef.current.contains(e.target)) {
        // Click occurred outside of the SVG element
        setShowFeatureIcons(false);
      }
      if (zoomRef.current && !zoomRef.current.contains(e.target)) {
        // Click occurred outside of the SVG element
        setShowZoomIcons(false);
      }
    };

    // Add a click event listener to the entire document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleImport = (e) => {
    setOpen(!open);
  };

  const onChange = (e) => {
    setWidth(e.target.value);
  };

  const addPage = () => {
    const pageNum = form.formData.length;
    const name = `Page${pageNum}`;
    const path = '/' + form?._id + '/' + name;
    const payload = {
      id,
      pageData: {
        name,
        path,
        step: formData.length
      }
    };
    dispatch(createPageAction(payload)).then((res) => {
      const formData = [...form.formData, res];
      const _form = {
        ...form,
        formData: formData
      };
      dispatch(setFormReducer(_form));
      handlePage(res);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (width > 1280) {
        setDeviceType('desktop');
      }
      if (width <= 1280 && width > 768) {
        setDeviceType('tablet');
      }
      if (width >= 320 && width < 768) {
        setDeviceType('mobile');
      }
      setCustomWidth(width);
    }
  };
  const handleClear = () => {
    setIsClear(true);
  };

  const handlePage = (item) => {
    dispatch(setCurrentPage(item));
  };

  const handleAddElement = () => {
    setOpenAddElementMdl(true);
  };

  useEffect(() => {
    if (formData) {
      dispatch(setCurrentPage(formData[0]));
    }
  }, []);

  return (
    <div className="navbar">
      <div className="up-navbar d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content align-items-center">
          <div className="logo">
            <span className="title brand-text text-dark">
              <img src={Logo} height={20} />
            </span>
          </div>
          <div className="menu-bar d-flex justify-content-between align-items-center">
            <Button
              outline
              className="text-dark cursor-pointer"
              style={{ fontSize: '0.9rem', fontWeight: '500', marginLeft: '10px' }}
              onClick={(e) => setIsBack(true)}
            >
              Back
            </Button>
            <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle
                tag="div"
                className="btn-sm hover-effect text-dark mw-100"
                style={{ minWidth: 'max-content' }}
              >
                Advaced Settings
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag="span" className="w-100" onClick={(e) => setCreateMdl(true)}>
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle text-dark">Create New Site</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100" onClick={(e) => setRenameMdl(true)}>
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Rename Site</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100" onClick={(e) => setDuplicateMdl(true)}>
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Duplicate Site</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100" onClick={(e) => setRoleMdl(true)}>
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Role & Permissions</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Save as Template</span>
                </DropdownItem>
                <DropdownItem tag="span" className="w-100">
                  {/* <Edit2 className="mx-50 text-primary" size={18} style={{ cursor: 'pointer' }} /> */}
                  <span className="align-middle">Invite</span>
                </DropdownItem>
              </DropdownMenu>
              {/* <div className="menu-item">
                <span>Site</span>
              </div> */}
            </UncontrolledDropdown>
          </div>
        </div>
        {/* <div>{diffentTime()}</div> */}
        <div className="additional-bar d-flex align-items-center justify-content-around">
        <div className='px-2'>{diffentTime()}</div>
          <Button className="menu-item text-primary text-dark" color="success">
            Save
          </Button>
          <Button
            className="menu-item btn btn-primary"
            color="primary"
            onClick={(e) => {
              setIsPublish(true);
              dispatch('website');
              // localStorage.setItem('linkUrl', 'website');
            }}
          >
            Publish
          </Button>
          <Button
            className="menu-item text-primary text-dark"
            onClick={(e) => {
              setIsPreview(true);
              dispatch(setLinkUrlReducer('preview'));
              // localStorage.setItem("linkUrl", "preview");
            }}
            outline
          >
            Preview
          </Button>
        </div>
      </div>
      <div className="down-navbar d-flex align-items-center">
        <div className="feature-icons d-flex align-items-center">
          <span
            className=""
            onClick={(e) => {
              handelVisibleMenu();
            }}
          >
            <MdOutlineLensBlur size={26} color={VisibleMenu ? 'black' : '#0275d8'} id="inspector" />
          </span>
          <span className="hover-bg feature-show">
            <svg
              ref={svgRef}
              id="showFeatures"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={() => setShowFeatureIcons(!showFeatureIcons)}
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
            <UncontrolledTooltip placement="bottom" target="showFeatures">
              Show Features
            </UncontrolledTooltip>
            <div className={showFeatureIcons ? '' : 'd-none'}>
              {/* <span className="hover-bg" onClick={(e) => {
                setSelectedMainNav('elements');
                setAddSideBarOpen(false);
              }}>
                <Plus size={24} color={'black'} id="addElements" />
                <UncontrolledTooltip placement="bottom" target="addElements">
                  Add Elements
                </UncontrolledTooltip>
              </span> */}
              <span
                className="hover-bg"
                onClick={(e) => {
                  setSelectedMainNav('pages');
                  setAddSideBarOpen(true);
                }}
              >
                <MdOutlineLibraryBooks size={24} color={'black'} id="pages" />
                <UncontrolledTooltip placement="bottom" target="pages">
                  Pages
                </UncontrolledTooltip>
              </span>
              <span
                className="hover-bg"
                onClick={(e) => {
                  setSelectedMainNav('cms');
                  setAddSideBarOpen(true);
                }}
              >
                <MdOutlineNewspaper size={24} color={'black'} id="cms" />
                <UncontrolledTooltip placement="bottom" target="cms">
                  CMS
                </UncontrolledTooltip>
              </span>
              {store?.form?.addedCms && (
                <span className="hover-bg">
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
              )}
              <span className="hover-bg">
                <Trash2 size={24} color={'black'} id="trash2" onClick={handleClear} />
                <UncontrolledTooltip placement="bottom" target="trash2">
                  Clear
                </UncontrolledTooltip>
              </span>
              <span
                className="hover-bg"
                onClick={() => {
                  handleAddElement();
                }}
              >
                <PlusSquare size={26} color={'black'} id="add-element" />
                <UncontrolledTooltip placement="bottom" target="add-element">
                  Add Element
                </UncontrolledTooltip>
              </span>
            </div>
          </span>
          <span
            className="hover-bg feature-hide"
            onClick={(e) => {
              setSelectedMainNav('elements');
              setAddSideBarOpen(false);
            }}
          >
            {/* <MdOutlineInsertComment size={26} color={'black'} id="comments" />
            <UncontrolledTooltip placement="bottom" target="comments">
              Comments
            </UncontrolledTooltip> */}
            {/* <Plus size={24} color={'black'} id="addElements" />
            <UncontrolledTooltip placement="bottom" target="addElements">
              Add Elements
            </UncontrolledTooltip> */}
          </span>
          <span
            className="hover-bg feature-hide"
            onClick={(e) => {
              setSelectedMainNav('pages');
              setAddSideBarOpen(true);
            }}
          >
            {/* <MdOutlineInsertComment size={26} color={'black'} id="comments" />
            <UncontrolledTooltip placement="bottom" target="comments">
              Comments
            </UncontrolledTooltip> */}
            <MdOutlineLibraryBooks size={24} color={'black'} id="pages" />
            <UncontrolledTooltip placement="bottom" target="pages">
              Pages
            </UncontrolledTooltip>
          </span>
          {store?.form?.addedCms && (
            <span
              className="hover-bg"
              onClick={(e) => {
                setSelectedMainNav('cms');
                setAddSideBarOpen(true);
              }}
            >
              <MdOutlineNewspaper size={24} color={'black'} id="cms" />
              <UncontrolledTooltip placement="bottom" target="cms">
                CMS
              </UncontrolledTooltip>
            </span>
          )}
          <span className="hover-bg feature-hide">
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
          <span className="hover-bg feature-hide">
            <Trash2 size={24} color={'black'} id="trash2" onClick={handleClear} />
            <UncontrolledTooltip placement="bottom" target="trash2">
              Clear
            </UncontrolledTooltip>
          </span>
          <span
            className="hover-bg feature-hide"
            onClick={() => {
              handleAddElement();
            }}
          >
            <BiListPlus size={26} color={'black'} id="add-element" />
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
              <DropdownItem tag="span" className="w-100" onClick={(e) => addPage()}>
                <Plus size={20} color={'#174ae7'} id="add-element" />
                <span className="text-primary">Add Page</span>
              </DropdownItem>
              {formData &&
                formData.map((item) => {
                  return (
                    <DropdownItem
                      tag="span"
                      className="w-100 text-left"
                      onClick={(e) => handlePage(item)}
                    >
                      <span className="" style={{ color: page == item ? '#174ae7' : '#6e6b7b' }}>{item.name}</span>
                    </DropdownItem>
                  );
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
          <span>
            <MdOutlineDesktopMac
              size={22}
              color={devicetype === 'desktop' ? '#174ae7' : 'black'}
              onClick={() => {
                setWidth(1280);
                setCustomWidth(1280);
                setDeviceType('desktop');
              }}
            />
          </span>
          <span>
            <MdOutlineTablet
              size={22}
              color={devicetype === 'tablet' ? '#174ae7' : 'black'}
              onClick={() => {
                setWidth(768);
                setCustomWidth(768);
                setDeviceType('tablet');
              }}
            />
          </span>
          <span>
            <BiMobile
              size={22}
              color={devicetype === 'mobile' ? '#174ae7' : 'black'}
              onClick={() => {
                setWidth(320);
                setCustomWidth(320);
                setDeviceType('mobile');
              }}
            />
          </span>
        </div>
        <div className="devices-size d-flex align-items-center">
          <span className="px-1 text-dark">w</span>
          <span>
            <Input
              type="text"
              name="name"
              required
              value={width}
              onChange={onChange}
              onKeyDown={handleKeyDown}
            />
          </span>
          <span className="px-1 text-dark">px</span>
        </div>
        <div className="zoom-size d-flex justify-content-end align-items-center">
          <span className="hover-bg zoom-show">
            <svg
              ref={zoomRef}
              id="showSettings"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={() => setShowZoomIcons(!showZoomIcons)}
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
            <UncontrolledTooltip placement="bottom" target="showSettings">
              Show Settings
            </UncontrolledTooltip>
          </span>
          <div
            className={
              'd-flex justify-content-around align-items-center ' +
              (showZoomIcons ? 'zoom-hide' : '')
            }
          >
            <div className="d-flex px-2 ">
              <span className={`menu-icon ${tab=='Layers'&& rsidebarOpen==true?'text-primary':'text-dark'}`}>
                <MdOutlineLayers
                  size={26}
                  id="layers"
                  onClick={(e) => {
                    setTab('Layers');
                    setRSidebarOpen(!rsidebarOpen);
                  }}
                />
                <UncontrolledTooltip placement="bottom" target="layers">
                  Layers
                </UncontrolledTooltip>
              </span>
              <span className={`menu-icon ${tab=='Settings'&&rsidebarOpen==true ||tab=='Styles'&&rsidebarOpen==true ?'text-primary':'text-dark'}`} >
                <FiSettings
                  size={22}
                  id="CloseSettings"
                  onClick={(e) => {
                    setTab('Settings');
                    setRSidebarOpen(!rsidebarOpen);
                  }}
                />
                <UncontrolledTooltip placement="bottom" target="CloseSettings">
                  Close SideBar
                </UncontrolledTooltip>
              </span>
              {/* <span className="menu-icon" hidden={rsidebarOpen ? true : false}>
                <FiSettings
                  size={26}
                  color={'black'}
                  id="OpenSettings"
                  onClick={(e) => {
                    setRSidebarOpen(true);
                    console.log(document.querySelector('.gjs-toolbar').style.left);
                  }}
                />
                <UncontrolledTooltip placement="bottom" target="OpenSettings">
                  Open SideBar
                </UncontrolledTooltip>
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
