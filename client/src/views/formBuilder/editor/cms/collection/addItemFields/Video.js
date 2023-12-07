import React, { useEffect, useState, useRef } from 'react';
import { Plus } from 'react-feather';
import ChooseMediaModal from './ChooseMediaModal';

const Video = ({field, onChange, isDefault}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [video, setVideo] = useState(null);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const onChangeVideo = (url) => {
    setVideo(url);
    onChange({[field.name]: url});
  }

  return <div>
    {
      !video &&
        <div style={{width: 350, height: 180, borderRadius: 5, padding: 10, backgroundColor: '#f4f7ff'}}>
          <div
            className='w-100 h-100 rounded d-flex align-items-center justify-content-center' 
            style={{borderStyle: 'dashed', border: '1px dashed #2c7dff', color: '#2c7dff'}}
            onClick={toggleChooseModal}>
            <Plus size={20} color='#2c7dff' /> Add video
          </div>
        </div>
    }
    {
      video && <video width="350" height="180" controls>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    }
    <ChooseMediaModal open={openChooseModal} type={'video'} toggle={toggleChooseModal} field={field} onChange={onChangeVideo} />
  </div>;
}

export default Video;