import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from 'reactstrap';

export const CustomerDatasetModal = ({
  showCustomerDatasetModal,
  setShowCustomerDatasetModal,
  customerCollectId,
  store
}) => {
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/customercollect/" + store?.form?._id + "/" + customerCollectId);
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
            <Input type="text" value={window.location.origin + "/customercollect/" + store?.form?._id + "/" + customerCollectId} readOnly />
            <Button
              color="primary"
              outline
              className='ms-1'
              style={{width: 150}}
              onClick={copyToClipboard}
            >
              Copy URL
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
