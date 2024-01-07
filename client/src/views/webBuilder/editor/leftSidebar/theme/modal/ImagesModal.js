import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { Plus } from 'react-feather';
import { useDispatch } from 'react-redux';
import {updateWebBuilderThemeAction} from '../../../../store/action'
import {setFormThemeReducer} from "../../../../store/reducer"
export default function Index({store, selectedImage, setSelectedImage, images, isOpen, toggle}) {
  const dispatch=useDispatch();
  const formTheme=store.formTheme;
  const _toggle = () => {
    toggle(!isOpen);
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="md" scrollable style={{ overflowX: 'hidden' }}>
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
           Image Library
        </ModalHeader>
        <ModalBody>
            <div className='background-image-element'>
              {
                selectedImage && 
                <>
                                <div>
                Selected Image
              </div>
              <div>
                  <img src={selectedImage?.image} width={120} height={120} className='m-1'/>:
              </div>
                </>

              }

            </div>
            <div class='gallery-image-element'>
              <div>Choose Background Image</div>
              <div className='d-flex align-items-center'>
                {
                  images && images.map((_item)=>{
                    return(
                      <div onClick={(e)=>setSelectedImage(_item)}>
                          <img src={_item.image} width={120} height={120} className='m-1' style={{border:selectedImage?._id===_item._id?'1px solid blue':'none'}}/>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </ModalBody>
        <ModalFooter className="d-flex flex-end">
          <Button color="success" onClick={(e)=>_toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
