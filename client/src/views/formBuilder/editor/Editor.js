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
import formPlugin from 'grapesjs-plugin-forms'

import 'grapesjs/dist/css/grapes.min.css';
import '../../../assets/scss/form-builder/style.scss';
import '../../../assets/scss/form-builder/main.scss';

import grapesjs from 'grapesjs';
import blocksJson from './configuration/blocks';
import { formBuilderPlugin } from './elements/formBuilderPlugin';
import { setFormReducer } from '../store/reducer';
import OffCanvas from '../../components/offcanvas';
import FontFamily from './configuration/fontfamily';
import '@src/assets/styles/web-builder.scss';

export default function Editor({ stepId, store, device, sidebarOpen, setSidebarOpen }) {
  const [editor, setEditor] = useState(null);
  const blockRef = useRef();
  const [originContent, setOriginContent] = useState(undefined);
  const [blocks, setBlocks] = useState([]);
  const handleBlocks = (props) => {
    setBlocks(props.blocks);
    window.dragStart = props.dragStart;
    window.dragStop = props.dragStop;
  };

  const handleSidebarOpen = (e) => {
    e.preventDefault();
    setSidebarOpen(false);
  };

  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setSidebarOpen(false);
  // };

  // const checkAddElement = (element) => {
  //   if (element.classList.contains('add-new-column')) {
  //     return true;
  //   } else if (element.classList.contains('add-new-section')) {
  //     return true;
  //   } else if (element.classList.contains('add-new-element')) {
  //     return true;
  //   } else if (element.classList.contains('add-more-element')) {
  //     return true;
  //   }
  //   if (!element.parentElement) {
  //     return false;
  //   }
  //   if (element.tagName.toLowerCase() == 'body') {
  //     return false;
  //   }
  //   return checkAddElement(element.parentElement);
  // };

  // function checkEditElement(element) {
  //   let gjsType = element.getAttribute('data-gjs-type');
  //   if (gjsType) {
  //     let editTypeList = [
  //       'heading',
  //       'paragraph',
  //       'bullet',
  //       'short-text',
  //       'long-text',
  //       'address',
  //       'mym_text_box',
  //       'signature',
  //       'checkbox'
  //     ];
  //     if (editTypeList.includes(gjsType)) {
  //       return true;
  //     }
  //   }
  //   if (element.tagName.toLowerCase() == 'textarea' || element.tagName.toLowerCase() == 'input') {
  //     return true;
  //   }

  //   if (!element.parentElement) {
  //     return false;
  //   }
  //   if (element.tagName.toLowerCase() == 'body') {
  //     return false;
  //   }
  //   return checkEditElement(element.parentElement);
  // }

  // const toggleButtonAction = (event, value) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   toggleFormProperties({}, false);
  //   //setOpenButtonAction(value);
  //   if (value == true) {
  //     let attributes = editor.getSelected().getChildAt(0).getAttributes();
  //     if (!attributes.selectedOption) {
  //       setButtonAction(4);
  //     }
  //   }
  // };
  // const filteredBlocks = blocksJson.filter((block) => {
  //   return block;
  // });
  useEffect(() => {
    const gjsEditor = grapesjs.init({
      container: '#editor',
      plugins: [basicBlockPlugin,formPlugin],
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
      }
    });

    setEditor(gjsEditor);
    return () => {
      gjsEditor.off('block:custom', handleBlocks);
    };
  }, [store.form]);
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
    </div>
  );
}
