import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const ImageURLModal = ({ open, type, value, toggle, onChange }) =>{

  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(value || '');
  }, [value]);

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size='md'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Add {type || 'image'} link (URL)</h4>
        </ModalHeader>
        <ModalBody>
          <Input
            className='w-100'
            type='url'
            value={url}
            onChange={(e) => {setUrl(e.target.value)}}
            placeholder={`Paste ${type || 'image'} URL`}
          />
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color='primary' outline className="add-todo-item me-1 align-self-start" onClick={() => {
            toggle();
          }}>
            Cancel
          </Button>
          <Button color="primary" className="add-todo-item me-1 align-self-end" disabled={!url} onClick={() => {
            onChange(url);
            toggle();
          }}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ImageURLModal;
