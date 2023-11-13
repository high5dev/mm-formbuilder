import React, { useEffect, useRef, useState } from 'react';
import { Bold, X } from 'react-feather';
import { RiQuestionMark } from 'react-icons/ri';
import {
  Button,
  ButtonGroup,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader
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
import { setFormReducer } from '../store/reducer';
import OffCanvas from '../../components/offcanvas';
import { employeeUpdateIdError } from '../../contacts/store/reducer';
import '@src/assets/styles/web-builder.scss';
import { webBuilderPlugin } from './elements/webBuilderPlugin';
export default function Editor({
  customwidth,
  tab,
  setTab,
  open,
  setOpen,
  rsidebarOpen,
  setRSidebarOpen,
  sidebarOpen,
  setSidebarOpen
}) {
  
  const [editor, setEditor] = useState(null);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const toggle = () => {
    setOpen(!open);
  };
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
            widthMedia: '1440px'
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px'
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
  }, []);

  useEffect(()=>{
    if(customwidth && customwidth!=320 && customwidth!=768 && customwidth!=1280){
      const device_name=(Math.random() + 1).toString();
      const command_name= (Math.random() + 2).toString();
      editor?.DeviceManager.add({
        id: device_name,
        name: device_name,
        width: customwidth.toString()+'px'
       });
       editor.Commands.add(command_name, (editor) => {
        editor?.setDevice(device_name);
      });
      editor?.runCommand(command_name);
    }
    else{
      if(customwidth===320){
        editor?.runCommand('set-device-mobile');
      }
      else if(customwidth===768){
        editor?.runCommand('set-device-tablet');
      }
      else{
        editor?.runCommand('set-device-desktop');
      }
    }
  }, [customwidth])

  editor?.on('component:selected', (cmp) => {
    setSelectedCmp(cmp);
  });

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
                <PageSidebar editor={editor} setEditor={setEditor}/>
              </div>
        </PerfectScrollbar>
      </div>
      <ImportModal editor={editor} setEditor={setEditor} open={open} toggle={toggle} />
    </div>
  );
}
