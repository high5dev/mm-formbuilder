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
// import '@src/assets/styles/web-builder.scss';
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
  styleTab,
  layerTab,
  traitTab,
  pageTab,
  setStyleTab,
  setLayerTab,
  setTraitTab,
  setPageTab,
  open,
  setOpen,
  rsidebarOpen,
  setRSidebarOpen,
  device,
  sidebarOpen,
  setSidebarOpen
}) {
  
  const [editor, setEditor] = useState(null);
  const [selectedCmp, setSelectedCmp] = useState(null);
  const [isOpen, setIsOpen]=useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const handleSidebarOpen = (e) => {
    e.preventDefault();
    setSidebarOpen(false);
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
      pageManager:{

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
    
    setEditor(gjsEditor)
  }, []);

  editor?.on('component:selected', (cmp) => {
    console.log('selected component ------------', cmp);
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
      <div className="property-sidebar">
           <Collapse isOpen={styleTab} horizontal={true} delay={{ show: 10, hide: 20 }}>
             <StyleSidebar editor={editor} setEditor={setEditor} setStyleTab={setStyleTab}/>
           </Collapse>
           <Collapse isOpen={layerTab} horizontal={true} delay={{ show: 10, hide: 20 }}>
             <LayerSidebar editor={editor} setEditor={setEditor} setLayerTab={setLayerTab}/>
          </Collapse>
           <Collapse isOpen={traitTab} horizontal={true} delay={{ show: 10, hide: 20 }}>
             <TraitSidebar editor={editor} selectedCmp={selectedCmp} setEditor={setEditor} setTraitTab={setTraitTab}/>
          </Collapse>
           <Collapse isOpen={pageTab} horizontal={true} delay={{ show: 10, hide: 20 }}>
             <PageSidebar editor={editor} setEditor={setEditor} setPageTab={setPageTab}/>
          </Collapse>
      </div>
      <ImportModal editor={editor} setEditor={setEditor} open={open} toggle={toggle} />
    </div>
  );
}