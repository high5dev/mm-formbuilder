import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function Index({open, dispatch, entry, toggle, saveEntry}) {
  const [selectedEntry, setSelectedEntry]=useState();
  const _toggle = () => {
    toggle(!open);
  };

  const handleEntry = () => {
    saveEntry(selectedEntry);
    toggle(!open);
  }

  const changeEntry = (_key, value) => {
    let obj={};
    obj[_key]=value;
    setSelectedEntry((prevEntry)=>({...prevEntry, ...obj}));
  }

  useEffect(()=>{
    if(entry){
        setSelectedEntry({...entry})
    }
  }, [entry])
  return (
    <>
      <Modal isOpen={open} toggle={_toggle} centered size="md">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
          Edit Form Entry
        </ModalHeader>
        <ModalBody className="">
            {
              selectedEntry && Object.keys(selectedEntry).length && Object.keys(selectedEntry).map((_key)=>{
                if(_key!='id'){
                    return(
                        <div>
                        <div>
                            <Label>{_key}</Label>
                        </div>
                        <div>
                            <Input type='text' value={selectedEntry[_key]} onChange={(e)=>{changeEntry(_key, e.target.value)}}/>
                        </div>
                    </div>
                    )
                }
              })  
            }
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="primary" className="add-todo-item me-1" onClick={(e)=>handleEntry()}>
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
