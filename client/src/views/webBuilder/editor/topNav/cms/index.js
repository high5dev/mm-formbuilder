import React, { useEffect, useState } from 'react';
import { Edit, Key, Link, List, MoreHorizontal, PlusCircle, Trash, X } from 'react-feather';
import { BiChevronRightSquare } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { deleteWebCollectionAction } from '../../../store/action';
import { menu } from '../../util';

const cmsMenus = [
  'Main',
  'Your Collections',
];

export default function CMS({ store, setAddSideBarOpen, openEditCollection, setOpenEditCollection, openCreateModalToggle, openAddPresetMdl, toggleAddPresetMdl, setSelectedMainNav, sidebarData, setSidebarData }) {
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState('Main');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (store?.webCollections?.length > 0) {
      setCollections(store.webCollections);
    }
  }, [store?.webCollections]);

  return <div className='d-flex h-100'>
    <div className='cms-sidebar h-100 border-end pt-1'>
      {
        cmsMenus.map((c, ci) => {
          return <div key={ci} className={`${selectedMenu === c ? 'selected-submenu-category' : 'submenu-category'}`} onClick={() => {setSelectedMenu(c)}}>
            {c}
          </div>
        })
      }
    </div>
    <div className='h-100' style={{width: 350}}>
      <div className="d-flex justify-content-between p-1 fw-bolder text-black border-bottom">
        <span>{selectedMenu}</span>
        <span>
          <X
            size={20}
            onClick={(e) => {
              setAddSideBarOpen(false);
            }}
          />
        </span>
      </div>
      {
        selectedMenu === 'Main' && <div className='p-2'>
          <div className='py-2 shadow rounded'>
            <div className='d-flex flex-column align-items-center text-center'>
              <div
                className='my-1'
                style={{width: 80, height: 80}}
                dangerouslySetInnerHTML={{ __html: `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 124 124" viewBox="0 0 124 124" id="multiple-browsers"><rect width="88.294" height="69.142" x="4" y="21.338" fill="#fff"></rect><rect width="88.294" height="19.338" x="4" y="2" fill="#dbebf8"></rect><path fill="#2176b1" d="M20.891 13.689h-7.294c-1.104 0-2-.896-2-2s.896-2 2-2h7.294c1.104 0 2 .896 2 2S21.996 13.689 20.891 13.689zM35.432 13.689h-7.294c-1.104 0-2-.896-2-2s.896-2 2-2h7.294c1.104 0 2 .896 2 2S36.536 13.689 35.432 13.689zM80.777 13.689H47.955c-1.104 0-2-.896-2-2s.896-2 2-2h32.823c1.104 0 2 .896 2 2S81.882 13.689 80.777 13.689z"></path><rect width="88.294" height="19.338" x="31.706" y="33.521" fill="#dbebf8"></rect><rect width="88.294" height="69.142" x="31.706" y="52.858" fill="#fff"></rect><path fill="#2176b1" d="M120,31.521H94.294l0-10.183V2c0-1.104-0.896-2-2-2H4C2.896,0,2,0.896,2,2v88.479
                c0,1.104,0.896,2,2,2h25.706V122c0,1.104,0.896,2,2,2H120c1.104,0,2-0.896,2-2V33.521C122,32.416,121.104,31.521,120,31.521z
                 M6,4h84.294v15.337H6V4z M29.706,33.521v54.959H6V23.337h84.294l0,8.183H31.706C30.602,31.521,29.706,32.416,29.706,33.521z
                 M118,120H33.706V54.858H118V120z M118,50.858H33.706V35.521H118V50.858z"></path><path fill="#2176b1" d="M48.597 45.21h-7.293c-1.104 0-2-.896-2-2s.896-2 2-2h7.293c1.104 0 2 .896 2 2S49.702 45.21 48.597 45.21zM63.138 45.21h-7.294c-1.104 0-2-.896-2-2s.896-2 2-2h7.294c1.104 0 2 .896 2 2S64.242 45.21 63.138 45.21zM108.483 45.21H75.661c-1.104 0-2-.896-2-2s.896-2 2-2h32.822c1.104 0 2 .896 2 2S109.588 45.21 108.483 45.21zM109.16 79.229H73.9c-1.104 0-2-.896-2-2s.896-2 2-2h35.26c1.104 0 2 .896 2 2S110.265 79.229 109.16 79.229z"></path><rect width="19.863" height="21.135" x="42.546" y="77.228" fill="#6cd4a3"></rect><path fill="#2176b1" d="M62.41 100.363H42.546c-1.104 0-2-.896-2-2V77.229c0-1.104.896-2 2-2H62.41c1.104 0 2 .896 2 2v21.135C64.41 99.468 63.514 100.363 62.41 100.363zM44.546 96.363H60.41V79.229H44.546V96.363zM109.16 89.827H73.9c-1.104 0-2-.896-2-2s.896-2 2-2h35.26c1.104 0 2 .896 2 2S110.265 89.827 109.16 89.827zM109.16 100.426H73.9c-1.104 0-2-.896-2-2s.896-2 2-2h35.26c1.104 0 2 .896 2 2S110.265 100.426 109.16 100.426z"></path></svg>` }}
              />
              <h4 className='fw-bolder m-0'>CMS</h4>
              Generate as many pages as you need based on a single layout.
            </div>
            <hr className='mx-2 mb-0'/>
            <div className='d-flex align-items-center justify-content-between cms-menu-item p-2'
              onClick={() => {toggleAddPresetMdl();}}  
            >
              <div className='d-flex align-items-center'>
                <PlusCircle size={17} />
                <h6 className='fs-bolder m-0 ms-1'>Add a Preset</h6>
              </div>
              <BiChevronRightSquare className='align-self-end' size={23} color='#116dff'/>
            </div>
            <hr className='mx-2 my-0'/>
            <div className='d-flex align-items-center justify-content-between cms-menu-item p-2'
              onClick={() => {openCreateModalToggle();}}
            >
              <div className='d-flex align-items-center'>
                <PlusCircle size={17} />
                <h6 className='fs-bolder m-0 ms-1'>Create Collection</h6>
              </div>
              <BiChevronRightSquare className='align-self-end' size={23} color='#116dff'/>
            </div>
          </div>
          <div className='shadow rounded mt-2'>
            <div className='d-flex align-items-center justify-content-between cms-menu-item p-2'
              onClick={() => {
                setSelectedMainNav('pages');
                setAddSideBarOpen(true);
              }}
            >
              <div className='d-flex align-items-center'>
                <PlusCircle size={17} />
                <h6 className='fs-bolder m-0 ms-1'>Manage Dynamic Pages</h6>
              </div>
              <BiChevronRightSquare className='align-self-end' size={23} color='#116dff'/>
            </div>
            <hr className='mx-2 my-0'/>
            <div className='d-flex align-items-center justify-content-between cms-menu-item p-2'
              onClick={() => {setSelectedMenu('Your Collections');}}
            >
              <div className='d-flex align-items-center'>
                <PlusCircle size={17} />
                <h6 className='fs-bolder m-0 ms-1'>Manage Content</h6>
              </div>
              <BiChevronRightSquare className='align-self-end' size={23} color='#116dff'/>
            </div>
            <hr className='mx-2 my-0'/>
            <div className='d-flex align-items-center justify-content-between cms-menu-item p-2'
              onClick={() => {
                setSelectedMainNav('elements');
                setAddSideBarOpen(false);
                const cmsMenu = menu.find(e => e.id === 'cms');
                setSidebarData({
                  ...sidebarData,
                  isOpen: true,
                  menu: cmsMenu,
                });
              }}
            >
              <div className='d-flex align-items-center'>
                <PlusCircle size={17} />
                <h6 className='fs-bolder m-0 ms-1'>Add Content Elements</h6>
              </div>
              <BiChevronRightSquare className='align-self-end' size={23} color='#116dff'/>
            </div>
          </div>
        </div>
      }
      {
        selectedMenu === 'Your Collections' && <div className='d-flex flex-column'>
          <div className='px-2 py-1 border-bottom'>collections created by a site collaborator</div>
          {
            collections.map((c, ci) => {
              return <div key={ci} className='d-flex align-items-center justify-content-between px-2 py-1 border-bottom collection-item'
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenEditCollection({isOpen: true, data: c});
                  }}
                >
                <div className='d-flex align-items-center'>
                  <List size={17} className='me-1' color='#66b1f0' />
                  <div className='fs-6'>
                    {c.name} <br/>
                    {c.values.length === 1 ? `${c.values.length} item` : c.values.length === 0 ? 'No item' : `${c.values.length} items`}
                  </div>
                </div>
                <UncontrolledDropdown className='more-dropdown'>
                  <DropdownToggle tag='span' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                    <MoreHorizontal size={17} className='more-icon'/>
                  </DropdownToggle>
                  <DropdownMenu end className='more-menu'>
                    <DropdownItem className='w-100' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                      <Edit size={15} className='me-1'/>
                      Edit settings
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                      <Key size={15} className='me-1'/>
                      Permissions & privacy
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                      <Link size={15} className='me-1'/>
                      Add dynamic page
                    </DropdownItem>
                    <DropdownItem className='w-100' onClick={(e) => {
                        e.stopPropagation(); e.preventDefault();
                        dispatch(deleteWebCollectionAction(c._id));
                      }}>
                      <Trash size={15} className='me-1'/>
                      Delete collection
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>;
            })
          }
          <Button
            color='primary'
            style={{width: 200}}
            className='my-1 align-self-center'
            onClick={() => {
              openCreateModalToggle();
            }}
          >
            Create Collection
          </Button>
          <Button
            outline
            color='primary'
            style={{width: 200}}
            className='align-self-center'
            onClick={() => {
              toggleAddPresetMdl();
            }}
          >
            Add Preset
          </Button>
        </div>
      }
    </div>
  </div>
}