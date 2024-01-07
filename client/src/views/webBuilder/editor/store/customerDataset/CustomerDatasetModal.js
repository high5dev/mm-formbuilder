import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input } from 'reactstrap';

export const CustomerDatasetModal = ({
  showCustomerDatasetModal,
  setShowCustomerDatasetModal,
  customerCollectId
}) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/customercollect/" + customerCollectId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      isOpen={showCustomerDatasetModal}
      toggle={() => setShowCustomerDatasetModal(!showCustomerDatasetModal)}
      centered
      size="lg"
    >
      <ModalHeader
        toggle={() => setShowCustomerDatasetModal(!showCustomerDatasetModal)}
        className="font-medium-5 px-2 py-1 modal-title text-primary"
      >
        <h4>Collect Content</h4>
      </ModalHeader>
      <ModalBody>
        <div className='d-flex align-items-center flex-column'>
          <div className='font-medium-5 mt-1'>Collect content from customer</div>
          <div className='font-medium-6 mt-1 text-center'>Copy the link below and send it to your client, so they can upload content for their site. <br />The form will pre-include information that's already been added. </div>
          <div className='d-flex w-100 p-2 mb-2'>
            <Input type="text" value={window.location.origin + "/customercollect/" + customerCollectId} readOnly />
            <div className='round d-flex align-items-center justify-content-center ms-1' style={{ cursor: 'pointer', border: '1px solid', width: '150px' }} onClick={copyToClipboard}>Copy URL</div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
