import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Eye, Edit,Save, X, ChevronDown, MoreHorizontal, Plus, Trash, Delete, MoreVertical, Trash2 } from 'react-feather';
import { CiTrash } from 'react-icons/ci';
import {createPageAction, deletePageAction} from "../../../store/action"
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
import EditMoal from './editModal';
import { setFormReducer } from '../../../store/reducer';
import { RiSeoLine } from 'react-icons/ri';
import SeoModal from './SeoModal';

export default function Index({ page, setPage, id, store, editor, setEditor, setPageTab }) {

  const form=store.form;
  const {formData}=form;
  const [isOpen, setIsOpen]=useState(false);
  const [selectedPage, setSelectedPage]=useState();
  const dispatch=useDispatch();
  const [seoModalData, setSeoModalData] = useState({isOpen: false, data: null});
  const addNewPage = () => {
      const pageNum=parseInt(localStorage.getItem('pageNum'));
      const name=`Page ${pageNum}`;
      const path='/'+form?._id+'/'+name;
      const payload={
        id,
        pageData:{
          name,
          path,
          step:formData.length
        }
      };
      dispatch(createPageAction(payload)).then((res)=>{
        const formData=[...form.formData, res];
        const _form={
          ...form,
          formData:formData
        };
        localStorage.setItem('pageNum', pageNum+1);
        dispatch(setFormReducer(_form));
      })
  };
  const removePage = (item) => {
    dispatch(deletePageAction(item._id)).then((res)=>{
      if(res){
        const formData=form.formData.filter((_page)=>_page._id!=item._id);
        const _form={
          ...form,
          formData:formData
        };
        dispatch(setFormReducer(_form));
      }
    })
  };

  const rename =(item) =>{
    setSelectedPage(item);
    setIsOpen(true);
  }

  const toggle=(_open) =>{
    setIsOpen(_open)
  }

  return (
    <div className="d-flex">
      <PerfectScrollbar
        className="scrollable-content"
        options={{ suppressScrollX: true }}
        style={{ height: `calc(100vh - 120px)` }}
      >
        <div className="page-sidebar">
          <div className="bg-white px-2">
            <div className="p-2 d-flex justify-content-around my-1  ">
              <button
                className="btn btn-primary"
                onClick={addNewPage}
                style={{ minWidth: '100px', fontSize:'12px' }}
              >
                <Plus size={15} />
                Add page
              </button>
            </div>
            {form.formData &&
              form.formData.map((item, index) => (
                <div
                  key={item?._id}
                  className="page-item d-flex my-1 justify-content-between"
                >
                  <div className="fs-6 fw-bolder text-black" onClick={(e) => setPage(item)}>
                    {item?.name || 'Home page'}
                  </div>
                  
                  <div>
                    <UncontrolledDropdown>
                      <DropdownToggle tag='span' onClick={() => {setSelectedPage(item)}}>
                        <MoreVertical size={20} color={"#333"} />
                      </DropdownToggle>
                      <DropdownMenu end>
                        <DropdownItem className='d-flex w-100 align-items-center' onClick={(e) => {
                          e.preventDefault();
                          setSeoModalData({
                            ...seoModalData,
                            isOpen: true,
                            data: item,
                          })
                        }}>
                          <RiSeoLine size={17} className='me-1' />
                          <span>SEO</span>
                        </DropdownItem>
                        
                        {page?._id !== item?._id && (
                          <>
                            <DropdownItem className='d-flex w-100 align-items-center' onClick={(e) => {
                              e.preventDefault();
                              rename(item);
                            }}>
                              <Edit size={18} className='me-1' />
                              <span>Edit</span>
                            </DropdownItem>
                            <DropdownItem className='d-flex w-100 align-items-center' onClick={(e) => {
                                e.preventDefault();
                                removePage(page)
                              }}>
                              <Trash2 size={17} className='me-1' />
                              <span>Delete</span>
                            </DropdownItem>
                          </>
                        )}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <SeoModal editor={editor} setEditor={setEditor} seoModalData={seoModalData} setSeoModalData={setSeoModalData} selectedPage={selectedPage} />
      </PerfectScrollbar>
      <EditMoal store={store} isOpen={isOpen} selectedPage={selectedPage} toggle={toggle}/>
    </div>
  );
}
