import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, UncontrolledTooltip, ModalFooter } from 'reactstrap';
import './CollectCustomerForm.scss';
import { useDispatch } from 'react-redux';
import { getWebsiteImagesAction, updateWebCollectionAction } from '../../../store/action';
import { CiCircleCheck } from 'react-icons/ci';
import { Check } from 'react-feather';

const FileSelectUploadModal = ({ store, open, toggle, images, multiple, onSelect }) =>{
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('site_image');
  const [websiteId, setWebsiteId] = useState('');
  const [siteImages, setSiteImages] = useState([]);
  const [selectedImgs, setSelectedImgs] = useState([]);

  useEffect(() => {
    if (store?.form?._id) {
      setWebsiteId(store.form._id);
    }
  }, [store?.form?._id])

  useEffect(() => {
    if (open && store?.form?._id) {
      dispatch(getWebsiteImagesAction(store.form._id));
    }
  }, [open, store?.form?._id])

  useEffect(() => {
    if (store?.siteImages?.length > 0) {
      setSiteImages(store.siteImages);
    }
  }, [store?.siteImages]);

  useEffect(() => {
    setSelectedImgs(images);
  }, [images]);

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size='lg'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Business Logo</h4>
        </ModalHeader>
        <ModalBody>
          <div className='d-flex' style={{width: '100%', height: '45vh', overflow: 'scroll'}}>
            <div className='h-100 border-end' style={{width: 200}}>
              <Button color='primary'>Upload Image</Button>
              <div
                className={`w-100 mt-1 cursor-pointer ${selectedCategory === 'site_image' ? 'selected-connected-data' : ''}`}
                style={{padding: 10}}
                onClick={() => {setSelectedCategory('site_image')}}
              >
                Site Images
              </div>
              <div
                className={`w-100 cursor-pointer ${selectedCategory === 'library' ? 'selected-connected-data' : ''}`}
                style={{padding: 10}}
                onClick={() => {setSelectedCategory('library')}}
              >
                Library
              </div>
            </div>
            <div className='h-100' style={{flex: 1}}>
              {
                selectedCategory === 'site_image' && (
                  <div className='d-flex flex-wrap'>
                    {
                      siteImages.map((image, idx) => {
                        return (
                          <div key={'image-content-' + idx} style={{width: 100, height: 100, margin: 5, position: 'relative'}}>
                            <img className='border w-100 h-100'src={image}></img>
                            <div
                              className='w-100 h-100 d-flex align-items-center justify-content-center cursor-pointer'
                              style={{position: 'absolute', top: 0}}
                              onClick={() => {
                                if (multiple) {
                                  if (!selectedImgs.includes(image)) {
                                    setSelectedImgs([...selectedImgs, image]);
                                  } else {
                                    const tempIndex = selectedImgs.indexOf(image);
                                    const tempImages = [...selectedImgs];
                                    tempImages.splice(tempIndex, 1);
                                    setSelectedImgs(tempImages);
                                  }
                                } else {
                                  setSelectedImgs([image]);
                                }
                              }}
                            >
                              {
                                selectedImgs.includes(image) && <Check className='bg-primary round' color='white' size={40}/>
                              }
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                )
              }
              {
                selectedCategory === 'library' && (
                  <div>
                    
                  </div>
                )
              }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button outline color='primary' onClick={toggle}>Cancel</Button>
          <Button
            color='primary'
            onClick={() => {
              onSelect(selectedImgs);
              toggle();
            }}
          >Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default FileSelectUploadModal;
