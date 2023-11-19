import React, { useEffect, useRef, useState } from 'react';
import {useDispatch} from 'react-redux';
import { Bold, X, Trash2} from 'react-feather';
import { RiQuestionMark } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Spinner
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import websitePlugin from 'grapesjs-preset-webpage';
import basicBlockPlugin from 'grapesjs-blocks-basic';
import formPlugin from 'grapesjs-plugin-forms';
import 'grapesjs/dist/css/grapes.min.css';
import '../../../assets/scss/form-builder/style.scss';
import '../../../assets/scss/form-builder/main.scss';
import '@src/assets/styles/web-builder.scss';
import grapesjs from 'grapesjs';
import ImportModal from './topNav/import/ImportModal';
import StyleSidebar from './topNav/styles';
import LayerSidebar from './topNav/layers';
import PageSidebar from './topNav/pages';
import TraitSidebar from './topNav/traits';
import {getWebsiteAction, getPageAction, updatePageAction, publishWebsiteAction} from '../store/action'
import { setFormReducer } from '../store/reducer';
import OffCanvas from '../../components/offcanvas';
import { employeeUpdateIdError } from '../../contacts/store/reducer';
import '@src/assets/styles/web-builder.scss';
import { webBuilderPlugin } from './elements/webBuilderPlugin';
import PublishModal from './topNav/publish/publishModal'
export default function Editor({
  page,
  setPage,
  isclear,
  setIsClear,
  ispreview,
  ispublish,
  setIsPreview,
  setIsPublish,
  tab,
  setTab,
  open,
  setOpen,
  rsidebarOpen,
  setRSidebarOpen,
  device,
  store,
  sidebarOpen,
  setSidebarOpen
}) {
  const {id}=useParams();
  const dispatch=useDispatch();
  const [editor, setEditor] = useState(null);
  const [isLoading, setIsLoading]=useState(false);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [isPublishModal, setIsPublishModal]=useState(false);
  const [publishUrl, setPublishUrl]=useState();
  const toggle = () => {
    setOpen(!open);
  };

  const togglePublish=(_open)=>{
    setIsPublishModal(_open);
    setIsPublish(false);
  }

  const handleSidebarOpen = (e) => {
    setSidebarOpen(false);
  };
  
  const handleRSideBarOpen = (e) => {
    setRSidebarOpen(false);
  };
  useEffect(() => {
    const gjsEditor = grapesjs.init({
      container: '#editor',
      height: window. innerHeight-117,
      plugins: [basicBlockPlugin,(editor) => webBuilderPlugin(editor), websitePlugin],

      richTextEditor: {
        actions: []
      },
      blockManager: {
        custom: true,
        appendTo: '#blocks'
      },
      styleManager:{
        appendTo: document.querySelector('#style-manager-container'),
      },
      selectorManager:{
        appendTo:document.querySelector('#selector-manager-container'),
      },
      layerManager:{
        appendTo: document.querySelector('#layer-manager-container'),
      },
      traitManager:{
        appendTo: document.querySelector('#trait-manager-container'),
      },
      pageManager: true,
      pageManager:{
        appendTo: document.querySelector('#page-manager-container'),
      },
      storageManager: {
        type: 'local',
        autoload: true,
        autosave: true,
        stepsBeforeSave: 1,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        autorender: false
    },
      deviceManager: {
        default: 'desktop',
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '1280px',
            widthMedia: '1920px'
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '770px',
            widthMedia: '992px'
          },
          {
            id: 'mobileLandscape',
            name: 'Mobile landscape',
            width: '568px',
            widthMedia: '768px'
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '480px'
          }
        ]
      },
      panels: {
        defaults: []
      },
      commands: {
        defaults: [{}]
      },
    });
    gjsEditor.on('block:drag:start', function (model) {
      setSidebarOpen(false);
    });
    gjsEditor.Commands.add('set-device-desktop', (editor) => {
      editor.setDevice('desktop');
    });
    gjsEditor.Commands.add('set-device-tablet', (editor) => {
      editor.setDevice('tablet');
    });
    gjsEditor.Commands.add('set-device-mobile', (editor) => {
      editor.setDevice('mobilePortrait');
    });
    setEditor(gjsEditor);
    dispatch(getWebsiteAction(id)).then(res=>{
      if(res){
        setPage(res[0]);
      }
    })
  }, []);


  useEffect(() =>{
    if(isclear){
      if(editor){
        editor.Components.clear();
      }
      
      setIsClear(false);
    }
  }, [isclear])

  editor?.on('component:selected', (cmp) => {
    setSelectedCmp(cmp);
  });
  useEffect(() => {
    if (editor !== null) {
      switch (device) {
        case 'desktop':
          editor.runCommand('set-device-desktop');
          break;
        case 'tablet':
          editor.runCommand('set-device-tablet');
          break;
        case 'mobile':
          editor.runCommand('set-device-mobile');
          break;
        default:
          editor.runCommand('set-device-desktop');
          break;
      }
    }
  }, [device]);

  useEffect(()=>{
    if(editor){
      const current_page=editor.Pages.getSelected();
      const html = editor.getHtml({ current_page });
      const css = editor.getCss({ current_page });
      const payload={
        page:page?._id,
        html:html,
        css:css,
      };

      if(ispreview){
        dispatch(updatePageAction(id, payload)).then((res)=>{
          if(res){
            toast.success('Current page saved successfully');
          }
        });
        setIsPreview(false);
      }
      if(ispublish){
        dispatch(publishWebsiteAction(id, payload)).then((res)=>{
          if(res){
            setIsPublishModal(true);
            setPublishUrl(`/website/${id}`);
            toast.success('Website published successfully');
            setIsPublish(false);
          } 
        });
      }
    };
  }, [ispreview, ispublish]);

  useEffect(()=>{
    if(page){
      setIsLoading(true);
      dispatch(getPageAction(page._id)).then((res)=>{
        if(res){
          setIsLoading(false);
          if(editor){
            editor.setComponents(res);
          };
        }  
      })
    }
  }, [page?._id])

  return (
    <div className="d-flex">
      <div className="expanded-sidebar">
        <PerfectScrollbar
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)` }}
        >
          <Collapse isOpen={sidebarOpen} horizontal={true} delay={{ show: 10, hide: 20 }}>
            <div>
              <div className="expanded-header">
                <span>Quick Add</span>
                <div>
                  <span className="header-icon">
                    <RiQuestionMark size={16} />
                  </span>
                  <span className="header-icon" onClick={handleSidebarOpen}>
                    <X size={16} />
                  </span>
                </div>
              </div>
              <div className="expanded-content px-1">
                <div id="blocks"></div>
              </div>
            </div>
          </Collapse>
        </PerfectScrollbar>
      </div>
      <div className="w-100 border">
        {isLoading ?      <div className="d-flex  justify-content-center mb-2 mt-2" style={{position:'absolute', top:"50%", left:"50%", zIndex:10}}>
            <Spinner color="secondary">Loading...</Spinner>
          </div>:<></>}

        <div id="editor"></div>
      </div>
      <div className="property-sidebar" style={{display:rsidebarOpen?'block':'none'}}>
      <PerfectScrollbar
        className="scrollable-content"
        options={{ suppressScrollX: true }}
        style={{ height: `calc(100vh - 120px)` }}
      >
            <div className="sidebar-header px-1">
            <span className="px-1 fs-5 fw-bolder text-black">{tab}</span>
            <span>
              <X
                size={20}
                onClick={(e) => {
                  handleRSideBarOpen(e);
                }}
              />
            </span>
          </div>
              <div style={{display:tab==='Styles'?'block':'none'}}>
                  <div id="selector-manager-container" />
                  <div id="style-manager-container" />
                </div>
              <div style={{display:tab==='Layers'?'block':'none'}}>
                <div id="layer-manager-container" />  
              </div>
              <div style={{display:tab==='Traits'?'block':'none'}}>
                <div id="trait-manager-container" />
              </div>
              <div style={{display:tab==='Pages'?'block':'none'}}>
                <PageSidebar id={id} store={store} editor={editor} setEditor={setEditor} page={page} setPage={setPage}/>
              </div>
        </PerfectScrollbar>
      </div>
      <ImportModal editor={editor} setEditor={setEditor} open={open} toggle={toggle} />
      <PublishModal publishUrl={publishUrl} isOpen={isPublishModal} toggle={togglePublish}/>
    </div>
  );
}
