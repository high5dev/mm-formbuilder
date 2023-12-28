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
  const [isback, setIsBack]=useState(false);
  const [ispublish, setIsPublish]=useState(false);
  const [isclear, setIsClear] =useState(false);
  const [isblog, setIsBlog]=useState(false);
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
  const [addSideBarOpen, setAddSideBarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { stepId } = useParams();
  const [openAddElementMdl, setOpenAddElementMdl] = useState(false);
  const [selectedMainNav, setSelectedMainNav] = useState('elements');
  const [roleMdl, setRoleMdl] = useState(false);
  const [viewCMSMenu, setViewCMSMenu]=useState(false);
  const store = useSelector((state) => {
    return {
      ...state.websiteEditor
    };
  });

  return (
    <>
      <div className="editor-body">
        <div>
          <MainNav
            isblog={isblog}
            setIsBlog={setIsBlog}
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
            setIsBack={setIsBack}
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
            addSideBarOpen={addSideBarOpen}
            setAddSideBarOpen={setAddSideBarOpen}
            sidebarData={sidebarData}
            setSidebarData={setSidebarData}
            selectedMainNav={selectedMainNav}
            setSelectedMainNav={setSelectedMainNav}
            setRoleMdl={setRoleMdl}
          />
        </div>
        <div className="land-body d-flex">
          {/* <Sidebar
            sidebarData={sidebarData}
            setSidebarData={setSidebarData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />  */}
          <div className="editor-content">
            <Editor
              isblog={isblog}
              setIsBlog={setIsBlog}
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
              isback={isback}
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
              addSideBarOpen={addSideBarOpen}
              setAddSideBarOpen={setAddSideBarOpen}
              selectedMainNav={selectedMainNav}
              roleMdl={roleMdl}
              setRoleMdl={setRoleMdl}
              setSelectedMainNav={setSelectedMainNav}
            />
          </div>
        </div>
      </div>
    </>
  );
}
