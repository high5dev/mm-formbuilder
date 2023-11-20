import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {renameWebsiteAction} from '../../../store/action';
import { setFormReducer } from '../../../store/reducer';
export default function Index({store, isOpen, toggle}) {
  const form=store.form;
  const dispatch=useDispatch();
  const [name, setName]=useState();
  const _toggle = () => {
    toggle(!isOpen);

  };

  const onChange =(e) =>{
    setName(e.target.value);
  };

  const renameWebsite =() =>{
    const id=form._id;
    const payload ={name:name};
    dispatch(renameWebsiteAction(id, payload)).then((res) =>{
        if(res){
            let _form=JSON.parse(JSON.stringify(form));
            _form.name=name;
            setName(name);
            dispatch(setFormReducer(_form));
            _toggle();
        }
    })
  }

  useEffect(() =>{
    if(form) {
        setName(form.name);
    }
  }, [store])

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="md">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
          Edit Website Name
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between">
            <Input type='text' value={name} onChange={onChange}/>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="primary" className="add-todo-item me-1" onClick={(e)=>renameWebsite()}>
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
