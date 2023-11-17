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
  const [tab, setTab]=useState('');
  const [customwidth, setCustomWidth]=useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    isOpen: false,
    menu: '',
  });
  const [rsidebarOpen, setRSidebarOpen]=useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { stepId } = useParams();
  const [openAddElementMdl, setOpenAddElementMdl] = useState(false);
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
            customwidth={customwidth}
            setCustomWidth={setCustomWidth}
            tab={tab}
            setTab={setTab}
            rsidebarOpen={rsidebarOpen}
            setRSidebarOpen={setRSidebarOpen}
            open={open}
            setOpen={setOpen}
            impStatus={impStatus}
            setImpStatus={setImpStatus}
            store={store}
            openAddElementMdl={openAddElementMdl}
            setOpenAddElementMdl={setOpenAddElementMdl}
          />
        </div>
        <div className="land-body d-flex">
          <Sidebar
            sidebarData={sidebarData}
            setSidebarData={setSidebarData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          /> 
          <div className="editor-content">
            <Editor
              customwidth={customwidth}
              tab={tab}
              setTab={setTab}
              rsidebarOpen={rsidebarOpen}
              setRSidebarOpen={setRSidebarOpen}
              open={open}
              setOpen={setOpen}
              impStatus={impStatus}
              stepId={stepId}
              store={store}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              device={device}
              sidebarData={sidebarData}
              setSidebarData={setSidebarData}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              openAddElementMdl={openAddElementMdl}
              setOpenAddElementMdl={setOpenAddElementMdl}
            />
          </div>
        </div>
      </div>
    </>
  );
}
