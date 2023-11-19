import React, { useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
export default function Index({ publishUrl, isOpen, toggle}) {
 const _toggle=() =>{
    toggle(!isOpen);
 }
  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="lg">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
            Publish Website
        </ModalHeader>
        <ModalBody>
            <div className='text-center mb-1'>
                <h2>Congratulations</h2>
            </div>
            <div className='text-center mb-1'>
                <span>Your site is published and live online.</span>
            </div>
            <div className='d-flex justify-content-around align-items-center p-1' style={{border:"1px solid grey"}}>
                <div>
                    <span>
                        {"https://mymanager.com"+publishUrl}
                    </span>
                </div>
                <div>
                <Link to={{ pathname:publishUrl}} target="_blank">View Site</Link>
                </div>
            </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Button color="success" onClick={(e)=>_toggle()}>
             Done
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
