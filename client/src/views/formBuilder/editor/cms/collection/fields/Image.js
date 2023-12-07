import React, { useEffect, useState, useRef } from 'react';
import { Link, MoreHorizontal, Plus } from 'react-feather';
import ChooseImageModal from '../addItemFields/ChooseMediaModal';
import ImageURLModal from '../addItemFields/ImageURLModal';

const Image = ({field, value, onChange, isDefault, rowId}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [openURLModal, setOpenURLModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(value || '');
  }, [value]);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const toggleURLModal = () => {
    setOpenURLModal(!openURLModal);
  }

  const onChangeImage = (url) => {
    setImageUrl(url);
    onChange(field, url, rowId);
  }

  return <div>
    {
      !imageUrl &&
        <div className='d-flex justify-content-between' style={{minWidth: 100, height: 35, borderRadius: 5, backgroundColor: '#f4f7ff'}}>
          <div
            className='h-100 rounded d-flex align-items-center justify-content-center' 
            style={{width: 40, backgroundColor: '#d6e6fe', padding: 5}}
            onClick={toggleChooseModal}>
            <Plus size={17} color='#2c7dff' />
          </div>
          <div
            className='h-100 rounded d-flex align-items-center justify-content-center' 
            style={{width: 30, backgroundColor: '#d6e6fe', padding: 5}}
            onClick={toggleURLModal}>
            <Link size={17} color='#2c7dff' />
          </div>
        </div>
    }
    {
      imageUrl && <div className='d-flex justify-content-between' style={{minWidth: 100, height: 35, borderRadius: 5, backgroundColor: '#f4f7ff'}}>
        <img src={imageUrl} style={{width: 40, height: 35, borderRadius: 5}}/>
        <div
          className='h-100 rounded d-flex align-items-center justify-content-center' 
          style={{width: 30, backgroundColor: '#d6e6fe', padding: 5}}
          onClick={toggleURLModal}>
          <Link size={17} color='#2c7dff' />
        </div>
      </div>
    }
    <ChooseImageModal open={openChooseModal} type={'image'} value={value} toggle={toggleChooseModal} field={field} onChange={onChangeImage} />
    <ImageURLModal open={openURLModal} value={value} toggle={toggleURLModal} field={field} onChange={onChangeImage} />
  </div>;
}

export default Image;