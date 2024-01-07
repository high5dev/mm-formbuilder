import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {updateWebBuilderThemeAction} from '../../../../store/action'
import {setFormThemeReducer} from "../../../../store/reducer"
export default function Index({store, color, isOpen, toggle}) {
  const dispatch=useDispatch();
  const formTheme=store.formTheme;
  const [name, setName]=useState();
  const _toggle = () => {
    toggle(!isOpen);
  };

  const onChange =(e) =>{
    setName(e.target.value);
  };

  const renameColor =() =>{
    let colors=formTheme.colors;
    let newColors=colors && colors.map((_color)=>{
      if(_color._id===color._id){
        let tempColor=JSON.parse(JSON.stringify(_color));
        tempColor.name=name;
        return tempColor
      }
      else{
        return _color;
      }
    });
    const payload={
      colors:newColors
    }
    const themeId=formTheme._id;
    dispatch(updateWebBuilderThemeAction(themeId, payload)).then((res)=>{
      if(res){
        toggle(!isOpen);
      }
    })
  }

  useEffect(() =>{
    if(color){
      setName(color.name);
    }
  
  }, [color])

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="md">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
           Rename Color
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between align-items-center">
            <Label>Name:</Label>
            <Input type='text' value={name} className="ms-1" onChange={onChange}/>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="primary" className="add-todo-item me-1" onClick={(e)=>renameColor()}>
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
