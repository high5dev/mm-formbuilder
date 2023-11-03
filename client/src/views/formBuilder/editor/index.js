import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Modal } from 'reactstrap';
import MainNav from './MainNav';
import Sidebar from './Sidebar';
import Editor from './Editor';

export default function Index() {
  const [impStatus, setImpStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { stepId } = useParams();
  const store = useSelector((state) => {
    return {
      ...state.formEditor
    };
  });

  return (
    <>
      <div className="editor-body">
        <div>
          <MainNav
            open={open}
            setOpen={setOpen}
            impStatus={impStatus}
            setImpStatus={setImpStatus}
            device={device}
            setDevice={setDevice}
            store={store}
          />
        </div>
        <div className="land-body d-flex">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="editor-content">
            <Editor
              open={open}
              setOpen={setOpen}
              impStatus={impStatus}
              stepId={stepId}
              store={store}
              device={device}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
}
