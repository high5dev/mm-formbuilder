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
  const [page, setPage]=useState();
  const [device, setDevice] = useState('desktop');
  const [ispreview, setIsPreview]=useState(false);
  const [ispublish, setIsPublish]=useState(false);
  const [isinvite, setIsInvite]=useState(false);
  const [isclear, setIsClear] =useState(false);
  const [tab, setTab]=useState('');
  const [createMdl, setCreateMdl]=useState(false);
  const [renameMdl, setRenameMdl]=useState(false);
  const [duplicateMdl, setDuplicateMdl]=useState(false);
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
            isinvite ={isinvite}
            setIsInvite={setIsInvite}
            createMdl={createMdl}
            setCreateMdl={setCreateMdl}
            renameMdl ={renameMdl}
            setRenameMdl={setRenameMdl}
            duplicateMdl={duplicateMdl}
            setDuplicateMdl={setDuplicateMdl}
            customwidth={customwidth}
            setCustomWidth={setCustomWidth}
            setIsClear={setIsClear}
            page={page}
            setPage={setPage}
            ispreview={ispreview}
            setIsPreview={setIsPreview}
            setIsPublish={setIsPublish}
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
              isinvite={isinvite}
              setIsInvite={setIsInvite}
              createMdl={createMdl}
              setCreateMdl={setCreateMdl}
              renameMdl ={renameMdl}
              setRenameMdl={setRenameMdl}
              duplicateMdl={duplicateMdl}
              setDuplicateMdl={setDuplicateMdl}
              customwidth={customwidth}
              isclear={isclear}
              setIsClear={setIsClear}
              page={page}
              setPage={setPage}
              ispreview={ispreview}
              ispublish={ispublish}
              setIsPreview={setIsPreview}
              setIsPublish={setIsPublish}
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
