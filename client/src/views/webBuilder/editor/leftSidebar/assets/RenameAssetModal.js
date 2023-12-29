import React, { useEffect, useState } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import * as htmlToImage from 'html-to-image';
import {createWebElementAction, updateWebElementAction} from '../../../store/action';
export default function Index({store, webElement, editor, isOpen, toggle}) {
  const dispatch=useDispatch();
  const [name, setName]=useState('');
  const _toggle = () => {
    toggle(!isOpen);
  };

  const onChange=(e)=>{
    setName(e.target.value);
  }


  const updateAsset=()=>{
    if(editor){
      const id=webElement.get('index');
      const ccid=webElement.getId();
      const payload={
        name:name
      }
      dispatch(updateWebElementAction(id, payload)).then((res)=>{
        if(res){
          const block = editor.BlockManager.get(ccid);
          block.set({
              label: name
          });
          _toggle(!isOpen);
        }
      })
    }
  }

  useEffect(()=>{
    if(webElement){
      const name=webElement.get('label');
      setName(name);
    }
  }, [webElement])

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="md">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
          Create Assets
        </ModalHeader>
        <ModalBody>
            <Label>Category:</Label>
            <Input type='text' value={name} onChange={onChange}/>
        </ModalBody>
        <ModalFooter className="d-flex">
          <div>
            <Button color="btn btn-primary" className="add-todo-item me-1" onClick={(e)=>updateAsset()}>
              Save
            </Button>
          </div>
          <div>
            <Button color="btn btn-outline-danger" onClick={(e)=>_toggle()}>
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
