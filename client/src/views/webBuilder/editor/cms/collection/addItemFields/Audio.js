import React, { useEffect, useState, useRef } from 'react';
import { Plus } from 'react-feather';
import ChooseMediaModal from './ChooseMediaModal';

const Audio = ({field, onChange, isDefault}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [openURLModal, setOpenURLModal] = useState(false);
  const [audio, setAudio] = useState(null);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const onChangeAudio = (url) => {
    setAudio(url);
    onChange({[field.name]: url});
  }

  return <div>
    {
      !audio &&
        <div style={{width: 250, height: 130, borderRadius: 5, padding: 10, backgroundColor: '#f4f7ff'}}>
          <div
            className='w-100 h-100 rounded d-flex align-items-center justify-content-center' 
            style={{borderStyle: 'dashed', border: '1px dashed #2c7dff', color:'#2c7dff' }}
            onClick={toggleChooseModal}>
            <Plus size={20} color='#2c7dff' /> Add track
          </div>
        </div>
    }
    {
      audio && <audio controls>
        <source src={audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    }
    <ChooseMediaModal open={openChooseModal} type={'audio'} toggle={toggleChooseModal} field={field} onChange={onChangeAudio} />
  </div>;
}

export default Audio;