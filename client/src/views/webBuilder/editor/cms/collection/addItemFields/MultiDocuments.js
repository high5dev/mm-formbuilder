import React, { useEffect, useState, useRef } from 'react';
import { Plus } from 'react-feather';
import ChooseMediaModal from './ChooseMediaModal';
import ImageURLModal from './ImageURLModal';

const MultiDocuments = ({field, onChange, isDefault}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [openURLModal, setOpenURLModal] = useState(false);
  const [files, setFiles] = useState([]);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const toggleURLModal = () => {
    setOpenURLModal(!openURLModal);
  }

  const onSelectFile = (url) => {
    setFiles([...files, url]);
    onChange({[field.name]: files});
  }

  return <div>
    {
      files && files.map(file => <div>{file.url}</div>)
    }
    <div style={{height: 50, borderRadius: 5, padding: 10, backgroundColor: '#f4f7ff', borderStyle: 'dashed', border: '1px dashed #2c7dff'}} onClick={toggleChooseModal}>
      <Plus size={20} color='#2c7dff' /> Add file
    </div>
    <a style={{color: '#2c7dff', borderBottom: '1px solid #2c7dff'}} onClick={toggleURLModal}>Add file link (URL)</a>
    <ChooseMediaModal open={openChooseModal} type={'file'} toggle={toggleChooseModal} field={field} onChange={onSelectFile} />
    <ImageURLModal open={openURLModal} type={'file'} toggle={toggleURLModal} field={field} onChange={onSelectFile} />
  </div>;
}

export default MultiDocuments;