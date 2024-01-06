import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, Badge } from 'reactstrap';
import { ChevronLeft } from 'react-feather';

const BackConfirmModal = ({ showBackConfirmModal, setShowBackConfirmModal, handleBackSave, handleBackDiscard }) => {


  return (
    <>
      <Modal isOpen={showBackConfirmModal} toggle={() => setShowBackConfirmModal(!showBackConfirmModal)} centered size='ms'>
        <ModalHeader toggle={() => setShowBackConfirmModal(!showBackConfirmModal)} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Confirm Save</h4>
        </ModalHeader>
        <ModalBody className="d-flex flex-column align-items-center p-0" style={{ minHeight: 200, maxHeight: 600 }}>
          <div className='font-medium-5 mt-3'>Do you want to save Changes?</div>
          <div className='mt-3'>
            <Button color='success' onClick={handleBackSave} className="me-2">Save</Button>
            <Button color='danger' onClick={handleBackDiscard}>Discard</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default BackConfirmModal;
