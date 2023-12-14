import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {renameWebsiteAction, duplicateWebsiteAction, getChildFormPageAction} from '../../../store/action';
import { setFormReducer } from '../../../store/reducer';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
export default function Index({open, store, toggle, saveFormBlock}) {
  const dispatch=useDispatch();
  const [selectedForm, setSelectedForm]=useState();
  const [forms, setForms]=useState();
  const _toggle = () => {
    toggle(!open);
  };

  const onChangeForm = (e) =>{
    setSelectedForm({...e});
  }

  const selectForm=()=>{
    const id=selectedForm.value;
    const pages=store.childForms.filter((_childform)=>_childform._id===id)[0].pageInfo;
    let currentPage='';
    if(pages.length>0){
        currentPage=pages[0]._id;
    };
    const payload={currentPage:currentPage};
    dispatch(getChildFormPageAction(id, payload)).then((res)=>{
        if(res){
            toggle(!open);
            saveFormBlock(res);
        }
    })
  } 
  useEffect(()=>{
    if(store.childForms){
        let _forms=[];
        store.childForms.map((_childForm)=>{
            const _form={
                label:_childForm.name,
                value:_childForm._id
            };
            _forms.push(_form);
        });
        setForms([..._forms]);
        setSelectedForm(_forms[0]);
    }
  }, [store.childForms])


  return (
    <>
      <Modal isOpen={open} toggle={_toggle} centered size="md">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
          Select Form
        </ModalHeader>
        <ModalBody className="d-flex justify-content-around">
       
             <div className="mb-1" style={{ width: '300px', minWidth:'300px' }}>
             <Label className='fs-5 mb-1'>Select Form</Label>
                <Select
                    value={selectedForm}
                    className=""
                    classNamePrefix="select"
                    options={forms}
                    style={{marginLeft:'0px'}}
                    onChange={(e)=>onChangeForm(e)}
                    />
                </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="primary" className="add-todo-item me-1" onClick={(e)=>selectForm()}>
             Ok
          </Button>
          <Button color="success" onClick={(e)=>_toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
