import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import {updatePageNameAction} from "../../../store/action";
import {setFormReducer} from "../../../store/reducer";
export default function Index({ store, isOpen, selectedPage, toggle}) {
  const form=store.form;
  const {formData}=form;
  const dispatch=useDispatch();
  const [pageName,setPageName]=useState();
  const _toggle = () => {
    toggle(!isOpen);
  };

  const onChange =(e) =>{
    setPageName(e.target.value);
  }

  const updateName =() =>{
    const pageNames=formData.map((item) =>{return item.name});
    if(pageNames.includes(pageName)){
      toast.error('Page name already exists.');
      return
    }
    else{
      const payload={name: pageName};
      dispatch(updatePageNameAction(selectedPage._id, payload)).then((res)=>{
          if(res){
              let temp_data=JSON.parse(JSON.stringify(formData));
              if(temp_data){
                  for(let i=0; i<temp_data.length; i++){
                      if(temp_data[i]._id===selectedPage._id){
                          temp_data[i].name=pageName
                      }
                  }
                  const _form={
                    ...form,
                    formData:temp_data
                  };
                  dispatch(setFormReducer(_form));
                  _toggle();
              }
  
          }
      })
    }
    }
  useEffect(()=>{
    if(selectedPage){
        setPageName(selectedPage.name)
    }

  }, [selectedPage])

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="md">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
          Edit Page Name
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between">
            <Input type='text' value={pageName} onChange={onChange}/>
        </ModalBody>
        <ModalFooter className="d-flex">
          <div>
            <Button color="btn btn-primary" className="add-todo-item me-1" onClick={(e)=>updateName(selectedPage)} style={{width:'90px'}}>
              Save
            </Button>
          </div>
          <div>
            <Button color="btn btn-outline-danger" onClick={(e)=>_toggle()} style={{width:'90px'}}>
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
