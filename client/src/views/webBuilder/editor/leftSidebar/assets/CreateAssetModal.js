import React, { useState } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import * as htmlToImage from 'html-to-image';
import {createWebElementAction} from '../../../store/action';
export default function Index({store, editor, isOpen, toggle}) {
  const dispatch=useDispatch();
  const [category, setCategory]=useState('');
  const _toggle = () => {
    toggle(!isOpen);
  };

  const onChange=(e)=>{
    setCategory(e.target.value);
  }


  const createAsset=()=>{
    if(editor){
      const selectedCmp = editor.getSelected();
      htmlToImage.toPng(selectedCmp.getEl()).then((dataUrl) => {
        const html = selectedCmp.toHTML();
        const css = editor.CodeManager.getCode(selectedCmp, 'css', {
          cssc: editor.CssComposer
        });
        const mainMenu = 'assets';
        const subMenu = 'assets';
        dispatch(
          createWebElementAction({
            mainMenu,
            subMenu,
            category,
            html: `${html}<style>${css}</style>`,
            imageUrl: dataUrl
          })
        ).then((res) => {
          editor.Modal.close();
          _toggle(!isOpen);
        });
      });
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="md">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
          Create Assets
        </ModalHeader>
        <ModalBody>
            <Label>Category:</Label>
            <Input type='text' onChange={onChange}/>
        </ModalBody>
        <ModalFooter className="d-flex">
          <div>
            <Button color="btn btn-primary" className="add-todo-item me-1" onClick={(e)=>createAsset()}>
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
