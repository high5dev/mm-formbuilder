import React, { useEffect, useState, useRef } from 'react';
import { Plus } from 'react-feather';
import ChooseMediaModal from './ChooseMediaModal';
import ImageURLModal from './ImageURLModal';

const Document = ({field, onChange, isDefault}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [openURLModal, setOpenURLModal] = useState(false);
  const [file, setFile] = useState(null);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const toggleURLModal = () => {
    setOpenURLModal(!openURLModal);
  }

  const onChangeFile = (url) => {
    setFile(url);
    onChange({[field.name]: url});
  }

  return <div>
    {
      !file &&
        <div style={{height: 50, borderRadius: 5, padding: 10, backgroundColor: '#f4f7ff', borderStyle: 'dashed', border: '1px dashed #2c7dff'}} onClick={toggleChooseModal}>
          <Plus size={20} color='#2c7dff' /> Add file
        </div>
    }
    {
      file && <div>{file.url}</div>
    }
    <a style={{color: '#2c7dff', borderBottom: '1px solid #2c7dff'}} onClick={toggleURLModal}>Add file link (URL)</a>
    <ChooseMediaModal open={openChooseModal} type={'file'} toggle={toggleChooseModal} field={field} onChange={onChangeFile} />
    <ImageURLModal open={openURLModal} type={'file'} toggle={toggleURLModal} field={field} onChange={onChangeImage} />
  </div>;
}

export default Document;