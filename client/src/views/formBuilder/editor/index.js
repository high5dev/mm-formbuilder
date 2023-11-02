import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Modal } from 'reactstrap';
import MainNav from './MainNav';
import Sidebar from './Sidebar';
import Editor from './Editor'

export default function Index() {
  const [isBlock, setIsBlock] = useState(false);
  const [isStyle, setIsStyle] = useState(false);
  const [isLayers, setIsLayers] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [editor, setEditor] = useState(null);
  const [blockTitle, setBlockTitle] = useState('');
  const [stylesTitle, setStylesTitle] = useState('');
  const [sidebarOpen, setSidebarOpen]=useState(false);
  const {stepId}=useParams();
  const store = useSelector((state) => {
    return {
      ...state.formEditor
    };
  });

  const toggleBlocks = (val) => {
    setIsBlock(val);
  };
  const toggleStyles = (val) => {
    setIsStyle(val);
  };
  const toggleLayers = (val) => {
    setIsLayers(val);
  };

  return (
    <>
      <div className='editor-body'>
        <div>
          <MainNav
            device={device}
            setDevice={setDevice}
            store={store}
          />
        </div>
        <div className="land-body d-flex">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          <div className='editor-content'>
          <Editor stepId={stepId} store={store} device={device} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          </div>
        </div>
      </div>
    </>
  );
}
