import React, { useEffect, useState, useRef } from 'react';
import { Link, MoreHorizontal, Plus } from 'react-feather';
import ChooseMediaModal from '../addItemFields/ChooseMediaModal';

const Video = ({field, value, onChange, isDefault, rowId}) => {
  const [openChooseModal, setOpenChooseModal] = useState(false);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    setVideo(value);
  }, [value]);

  const toggleChooseModal = () => {
    setOpenChooseModal(!openChooseModal);
  }

  const onChangeVideo = (url) => {
    setVideo(url);
    onChange(field.name, url, rowId);
  }

  return <div>
    {
      !video &&
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
      video && <div className='d-flex justify-content-between' style={{minWidth: 100, height: 35, borderRadius: 5, backgroundColor: '#f4f7ff'}}>
        <div>video name</div>
        <div
          className='h-100 rounded d-flex align-items-center justify-content-center' 
          style={{width: 30, backgroundColor: '#d6e6fe', padding: 5}}
          onClick={() => {}}>
          <MoreHorizontal size={17} color='#2c7dff' />
        </div>
      </div>
    }
    <ChooseMediaModal open={openChooseModal} type={'video'} value={value} toggle={toggleChooseModal} field={field} onChange={onChangeVideo} />
  </div>;
}

export default Video;