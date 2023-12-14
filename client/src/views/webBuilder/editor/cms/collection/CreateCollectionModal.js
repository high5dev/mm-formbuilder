import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { createWebCollectionAction } from '../../../store/action';

const defaultFields = [
  {
    name: 'id',
    type: 'Text',
    default: true,
  },
  {
    name: 'title',
    type: 'Text',
  },
  {
    name: 'createdAt',
    type: 'Date',
    default: true,
  },
  {
    name: 'updatedAt',
    type: 'Date',
    default: true,
  },
];

const CreateCollectionModal = ({ store, editor, setEditor, open, toggle, editCollectionToggle }) =>{
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState('multiple');
  const dispatch = useDispatch();

  useEffect(() => {
    setName('');
    setSelectedValue('multiple');
  }, [open]);

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size='md'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <div>
            <b><h3>Create a Collection</h3></b>
            <h5>store and manage content to use anywhere on your site.</h5>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='p-1'>
            <Label className="fs-6" for="create-collection-name">
              What's the name of your collection?
            </Label>
            <Input
              id='create-collection-name'
              placeholder="e.g., My Products"
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <hr/>
          <div className='p-1'>
            <Label className="fs-6" for="create-collection-name">
              How many items do you want in your collection?
            </Label>
            <div className='d-flex align-items-center my-1'>
              <input type="radio" id="choice1" value="multiple" checked={selectedValue === 'multiple'} onClick={e => {setSelectedValue(e.target.value);}} onChange={() => {}}/>
              <div className='ms-1'>
                <b><h5 className="mb-0" for="choice1">Multiple items (Default)</h5></b>
                <label for="choice1">Manage multiple pages or lists of items which the same layout like projects or services</label>
              </div>
            </div>
            <div className='d-flex align-items-center my-1'>
              <input type="radio" id="choice2" value="single" checked={selectedValue === 'single'} onClick={e => {setSelectedValue(e.target.value);}} onChange={() => {}}/>
              <div className='ms-1'>
                <b><h5 className="mb-0" for="choice2">A single item</h5></b>
                <label for="choice2">Manage content for static pages and sections like a homepage or a promotional banner</label>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color='primary' outline className="add-todo-item me-1 align-self-end" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" className="add-todo-item me-1 align-self-end" disabled={!name} onClick={() => {
            if (store?.form?._id)
              dispatch(createWebCollectionAction({websiteId: store.form._id, name, fields: defaultFields, values: [], type: selectedValue})).then((res) => {
                if (res.success) {
                  editCollectionToggle(res.data);
                }
              });
            toggle();
          }}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateCollectionModal;
