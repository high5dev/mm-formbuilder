import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FieldSetting from './addFieldSettings';
import { useDispatch } from 'react-redux';
import { updateWebCollectionAction } from '../../../store/action';

const AddFieldModal = ({ open, toggle, fieldType, fieldTypeToggle, collection, openCollection, setOpenEditCollection }) =>{
  const dispatch = useDispatch();
  const [fieldData, setFieldData] = useState({});

  const onChange = (newData) => {
    setFieldData({...fieldData, ...newData});
  };

  const addField = () => {
    if (collection) {
      dispatch(updateWebCollectionAction(collection._id, {fields: [...collection.fields, {...fieldData, type: fieldType?.name}]})).then((res) => {
        if (res.success) {
          setOpenEditCollection({...openCollection, data: res.data});
        } else {

        }
      });
    }
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size='lg'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Add a field</h4>
        </ModalHeader>
        <ModalBody>
          <FieldSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color='primary' outline className="add-todo-item me-1 align-self-start" onClick={() => {
            toggle();
            fieldTypeToggle();
            setFieldData({});
          }}>
            Back
          </Button>
          <Button color="primary" className="add-todo-item me-1 align-self-end" onClick={() => {
            addField();
            toggle();
            setFieldData({});
            }}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddFieldModal;
