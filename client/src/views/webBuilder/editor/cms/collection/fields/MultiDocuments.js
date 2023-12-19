import React, { useEffect, useState, useRef } from 'react';
import { Link, MoreHorizontal, Plus } from 'react-feather';
import ChooseImageModal from '../addItemFields/ChooseMediaModal';
import ImageURLModal from '../addItemFields/ImageURLModal';

const MultiDocuments = ({field, value, onChange, isDefault, rowId}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [openURLModal, setOpenURLModal] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(value || []);
  }, [value]);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const toggleURLModal = () => {
    setOpenURLModal(!openURLModal);
  }

  const onChangeFiles = (url) => {
    setFiles([...files, url]);
    onChange(field, files, rowId);
  }

  return <div>
    {
      files.length === 0 &&
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
      files.length > 0 && <div className='d-flex justify-content-between' style={{minWidth: 100, height: 35, borderRadius: 5, backgroundColor: '#f4f7ff'}}>
        <div>{files.length + 'files'}</div>
        <div
          className='h-100 rounded d-flex align-items-center justify-content-center' 
          style={{width: 30, backgroundColor: '#d6e6fe', padding: 5}}
          onClick={toggleURLModal}>
          <Link size={17} color='#2c7dff' />
        </div>
      </div>
    }
    <ChooseImageModal open={openChooseModal} type={'file'} value={value} toggle={toggleChooseModal} field={field} onChange={onChangeFiles} />
    <ImageURLModal open={openURLModal} value={value} type={'file'} toggle={toggleURLModal} field={field} onChange={onChangeFiles} />
  </div>;
}

export default MultiDocuments;