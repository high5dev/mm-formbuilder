import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Eye, Edit,Save, X, ChevronDown, MoreHorizontal, Plus, Trash, Delete } from 'react-feather';
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

export default function Index({page, setPage, id, store, editor, setEditor, setPageTab }) {
  const form=store.form;
  const {formData}=form;
  const [isOpen, setIsOpen]=useState(false);
  const [selectedPage, setSelectedPage]=useState();
  const dispatch=useDispatch();
  const addNewPage = () => {
      const pageNum=parseInt(localStorage.getItem('pageNum'));
      const name=`Page ${pageNum}`;
      const path=`Page ${pageNum}`;
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
                  {page?._id !== item?._id && (
                    <div className='d-flex'>
                     <div className="px-1" onClick={() => rename(item)}>
                      <Edit size={18} />
                    </div>
                     <div onClick={() => removePage(item)}>
                        <CiTrash size={20} color={'#174ae7'} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </PerfectScrollbar>
      <EditMoal store={store} isOpen={isOpen} selectedPage={selectedPage} toggle={toggle}/>
    </div>
  );
}
