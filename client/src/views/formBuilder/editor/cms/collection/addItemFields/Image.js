import React, { useEffect, useState, useRef } from 'react';
import { Plus } from 'react-feather';
import ChooseMediaModal from './ChooseMediaModal';
import ImageURLModal from './ImageURLModal';

const Image = ({field, onChange}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [openURLModal, setOpenURLModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(field.defaultValue);
    onChange({[field.name]: field.defaultValue});
  }, [field.defaultValue]);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const toggleURLModal = () => {
    setOpenURLModal(!openURLModal);
  }

  const onChangeImage = (url) => {
    setImageUrl(url);
    onChange({[field.name]: url});
  }

  return <div>
    {
      !imageUrl &&
        <div style={{width: 150, height: 150, borderRadius: 5, padding: 10, backgroundColor: '#f4f7ff'}}>
          <div
            className='w-100 h-100 rounded d-flex align-items-center justify-content-center' 
            style={{borderStyle: 'dashed', border: '1px dashed #2c7dff', color: '#2c7dff'}}
            onClick={toggleChooseModal}>
            <Plus size={20} color='#2c7dff' /> Add image
          </div>
        </div>
    }
    {
      imageUrl && <><img src={imageUrl} style={{width: 150, height: 150, borderRadius: 5}}/><br/></>
    }
    Upload an image or <a style={{color: '#2c7dff', borderBottom: '1px solid #2c7dff'}} onClick={toggleURLModal}>add an image URL</a>
    <ChooseMediaModal open={openChooseModal} type={'image'} toggle={toggleChooseModal} field={field} onChange={onChangeImage} />
    <ImageURLModal open={openURLModal} toggle={toggleURLModal} field={field} onChange={onChangeImage} />
  </div>;
}

export default Image;