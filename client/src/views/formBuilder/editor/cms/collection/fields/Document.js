import React, { useEffect, useState, useRef } from 'react';
import { Link, MoreHorizontal, Plus } from 'react-feather';
import ChooseImageModal from '../addItemFields/ChooseMediaModal';
import ImageURLModal from '../addItemFields/ImageURLModal';

const Document = ({field, value, onChange, isDefault, rowId}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [openURLModal, setOpenURLModal] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setFile(value);
  }, [value]);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const toggleURLModal = () => {
    setOpenURLModal(!openURLModal);
  }

  const onChangeFile = (url) => {
    setFile(url);
    onChange(field, url, rowId);
  }

  return <div>
    {
      !file &&
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
      file && <div className='d-flex justify-content-between' style={{minWidth: 100, height: 35, borderRadius: 5, backgroundColor: '#f4f7ff'}}>
        <div>{file.url}</div>
        <div
          className='h-100 rounded d-flex align-items-center justify-content-center' 
          style={{width: 30, backgroundColor: '#d6e6fe', padding: 5}}
          onClick={toggleURLModal}>
          <Link size={17} color='#2c7dff' />
        </div>
      </div>
    }
    <ChooseImageModal open={openChooseModal} type={'file'} value={value} toggle={toggleChooseModal} field={field} onChange={onChangeFile} />
    <ImageURLModal open={openURLModal} value={value} type={'file'} toggle={toggleURLModal} field={field} onChange={onChangeFile} />
  </div>;
}

export default Document;