import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Label, Card } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import FileItem from './FileItem';
import { UploadCloud } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getUserData } from '../../../../../../utility/Utils';
import { toast } from 'react-toastify';

const ChooseMediaModal = ({ open, type, value, toggle, onChange }) =>{
  const dispatch = useDispatch();

  // const files = useSelector((state) => state.filemanager.files);
  const files = [];

  const renderFiles = () => {
    const fileUploadRef = useRef();

    const handleChangeFile = async ({ file, id }) => {
      // const form = new FormData();
      // form.append('file', file);
      // form.append('userId', getUserData().id);
      // form.append('parentFolderId', null);
      // const response = await dispatch(uploadFile(form));
      // if (response) {
      //   toast.success('File uploaded successfully');
      // }
    };

    const handleFileUpload = () => {
      fileUploadRef?.current?.click();
    };

    return (
      <div className="p-2 row m-0">
        <input
          type="file"
          onChange={(e) => {
            handleChangeFile({ file: e.target.files[0], id: 1 });
          }}
          hidden
          ref={fileUploadRef}
        />
        <Col md={11} className="mb-1">
          My Files
        </Col>
        {files?.length > 0 ? (
          files?.map((item, i) => {
            return (
              <Col md="6" lg="4" xl="3" sm="12" key={i}>
                <FileItem item={item} />
              </Col>
            );
          })
        ) : (
          <div className="d-flex justify-content-center">No file.</div>
        )}

        <Col md="6" lg="4" xl="3" sm="12">
          <Card
            className="h-70 shadow-none text-center border cursor-pointer d-flex justify-content-center align-items-center"
            onClick={() => handleFileUpload()}
          >
            <UploadCloud className="me-75 mt-3" size={30} />
            <Label className="mb-3">Upload File</Label>
          </Card>
        </Col>
      </div>
    );
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size='lg'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Choose an {type || 'media'}</h4>
        </ModalHeader>
        <ModalBody>
          <PerfectScrollbar
            className="todo-task-list-wrapper"
            options={{ wheelPropagation: false }}
            style={{ minHeight: 'calc(100vh - 15rem)' }}
          >
            {renderFiles()}
          </PerfectScrollbar>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="primary" className="add-todo-item me-1 align-self-end" onClick={() => {
            toggle();
          }}>
            Add to item
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ChooseMediaModal;
