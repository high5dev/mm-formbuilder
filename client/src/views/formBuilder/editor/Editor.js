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

import grapesjs from 'grapesjs';
import ImportModal from './topNav/import/ImportModal';
import { setFormReducer } from '../store/reducer';
import OffCanvas from '../../components/offcanvas';
import '@src/assets/styles/web-builder.scss';
import { webBuilderPlugin } from './elements/webBuilderPlugin';

export default function Editor({
  open,
  setOpen,
  store,
  impStatus,
  device,
  sidebarOpen,
  setSidebarOpen
}) {
  const [originContent, setOriginContent] = useState(undefined);
  const [editor, setEditor] = useState(null);
  const [blocks, setBlocks] = useState([]);
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
      plugins: [basicBlockPlugin,formPlugin, (editor) => webBuilderPlugin(editor), websitePlugin],
      richTextEditor: {
        actions: []
      },
      blockManager: {
        custom: true,
        appendTo: '#blocks'
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
      panels: {
        defaults: []
      },
      storageManager: {},
      commands: {
        defaults: [{}]
      },
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
      <ImportModal editor={editor} setEditor={setEditor} open={open} toggle={toggle} />
    </div>
  );
}
