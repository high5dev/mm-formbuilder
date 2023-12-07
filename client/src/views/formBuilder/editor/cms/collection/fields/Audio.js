import React, { useEffect, useState, useRef } from 'react';
import { Link, MoreHorizontal, Plus } from 'react-feather';
import ChooseMediaModal from '../addItemFields/ChooseMediaModal';

const Audio = ({field, value, onChange, rowId}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setAudio(value);
  }, [value]);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const onChangeAudio = (url) => {
    setAudio(url);
    onChange(field, url, rowId);
  }

  return <div>
    {
      !audio &&
        <div className='d-flex justify-content-between' style={{minWidth: 100, height: 35, borderRadius: 5, backgroundColor: '#f4f7ff'}}>
          <div
            className='h-100 rounded d-flex align-items-center justify-content-center' 
            style={{width: 40, backgroundColor: '#d6e6fe', padding: 5}}
            onClick={toggleChooseModal}>
            <Plus size={17} color='#2c7dff' />
          </div>
        </div>
    }
    {
      audio && <div className='d-flex justify-content-between' style={{minWidth: 100, height: 35, borderRadius: 5, backgroundColor: '#f4f7ff'}}>
        <div>audio name</div>
        <div
          className='h-100 rounded d-flex align-items-center justify-content-center' 
          style={{width: 30, backgroundColor: '#d6e6fe', padding: 5}}
          onClick={() => {}}>
          <MoreHorizontal size={17} color='#2c7dff' />
        </div>
      </div>
    }
    <ChooseMediaModal open={openChooseModal} type={'audio'} value={value} toggle={toggleChooseModal} field={field} onChange={onChangeAudio} />
  </div>;
}

export default Audio;