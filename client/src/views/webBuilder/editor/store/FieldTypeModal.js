import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { collectionFieldTypes } from '../util';

const FieldTypeModal = ({ open, toggle, setNewFieldType, addFieldToggle}) =>{
  const [selectedType, setSelectedType] = useState({});
  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size='lg'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Choose field type</h4>
          You can connect each field to a page element to display its content on your site.
        </ModalHeader>
        <ModalBody>
          {
            collectionFieldTypes.map((category, ci) => {
              return (
                <div key={ci} className='my-1'>
                  <h5>{category.category}</h5>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 10, rowGap: 10}}>
                    {
                      category.types.map((type, ti) => {
                        return (
                          <div key={ti} className='d-flex p-1 collection-sel-type' style={{borderRadius: 5, borderWidth: 1, borderStyle: 'solid', borderColor: selectedType?.name !== type.name ? '#e6f0ff' : '#116dff'}} onClick={() => {setSelectedType(type)}}>
                            {type.icon}
                            <div className='ms-1'>
                              <div style={{fontSize: 13}}>
                                <b>{type.name}</b>
                              </div>
                              <div style={{fontSize: 12}}>
                                {type.description}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              );
            })
          }
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color='primary' outline className="add-todo-item me-1 align-self-end" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" className="add-todo-item me-1 align-self-end" onClick={() => {setNewFieldType(selectedType); toggle(); addFieldToggle();}}>
            Choose File Type
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default FieldTypeModal;
