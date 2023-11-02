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

  const toggleFormProperties = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSidebarOpen(false);
  };

  const checkAddElement = (element) => {
    if (element.classList.contains('add-new-column')) {
      return true;
    } else if (element.classList.contains('add-new-section')) {
      return true;
    } else if (element.classList.contains('add-new-element')) {
      return true;
    } else if (element.classList.contains('add-more-element')) {
      return true;
    }
    if (!element.parentElement) {
      return false;
    }
    if (element.tagName.toLowerCase() == 'body') {
      return false;
    }
    return checkAddElement(element.parentElement);
  };

  function checkEditElement(element) {
    let gjsType = element.getAttribute('data-gjs-type');
    if (gjsType) {
      let editTypeList = [
        'heading',
        'paragraph',
        'bullet',
        'short-text',
        'long-text',
        'address',
        'mym_text_box',
        'signature',
        'checkbox'
      ];
      if (editTypeList.includes(gjsType)) {
        return true;
      }
    }
    if (element.tagName.toLowerCase() == 'textarea' || element.tagName.toLowerCase() == 'input') {
      return true;
    }

    if (!element.parentElement) {
      return false;
    }
    if (element.tagName.toLowerCase() == 'body') {
      return false;
    }
    return checkEditElement(element.parentElement);
  }

  const toggleButtonAction = (event, value) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    toggleFormProperties({}, false);
    //setOpenButtonAction(value);
    if (value == true) {
      let attributes = editor.getSelected().getChildAt(0).getAttributes();
      if (!attributes.selectedOption) {
        setButtonAction(4);
      }
    }
  };
  const filteredBlocks = blocksJson.filter((block) => {
    return block;
  });
  useEffect(() => {
    const gjsEditor = grapesjs.init({
      container: '#editor',
      plugins: [(editor) => formBuilderPlugin(editor)],
      richTextEditor: {
        actions: []
      },
      //   pluginsOpts: {
      //     gjsBlocksBasic: {},
      //     gjsForms: {}
      //   },
      canvas: {
        styles: [
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
          //'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
          //'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" ',
          'https://unpkg.com/dropzone@5/dist/min/dropzone.min.css',
          '/assets/form-builder/grapes-form.css',
          '/assets/form-builder/themes.css'
        ],
        scripts: [
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
          'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
          //'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.5/umd/popper.min.js',
          //'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/js/mdb.min.js',
          'https://unpkg.com/dropzone@5/dist/min/dropzone.min.js',
          'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js',
          'https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js',
          'https://js.stripe.com/v3/'
        ]
      },

      blockManager: {
        custom: true,
        blocks: filteredBlocks,
        appendTo: '#blocks'
      },

      // styleManager: {
      //   appendTo: '#styles'
      // },
      // layerManager: {
      //   appendTo: '#layers'
      // },
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

    const placeHolders = [
      '-ms-input-placeholder',
      'placeholder',
      '-moz-placeholder',
      '-webkit-input-placeholder'
    ];
    let styles = FontFamily.families
      .map((fontFam) => {
        return placeHolders.map((placeHolder) => {
          return `.${fontFam.split(' ').join('-')}::${placeHolder} { font-family: ${fontFam}; }`;
        });
      })
      .reduce((prev, fonts) => prev.concat(fonts), [])
      .join('\n');

    gjsEditor.addStyle(styles);

    let wrapper = gjsEditor.DomComponents.getWrapper();
    wrapper.setClass('section-body');

    gjsEditor.setComponents({
      type: 'column-1'
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
    gjsEditor.Commands.add('set-data', (editor) => {
      const formData = store.form.formData.map((x) => {
        if (x.id === stepId) {
          return {
            ...x,
            html: editor.getHtml(),
            css: editor.getCss(),
            components: editor.getComponents()
          };
        }
        return x;
      });
      dispatch(
        setFormReducer({
          ...store.form,
          formData: formData
        })
      );
    });
    var dragCategory = '';
    var dragLastX = 0;
    var dragLastY = 0;
    var dragName = '';
    var dragPosition = 0;
    gjsEditor.on('block:drag:start', function (model) {
      dragCategory = model.attributes.category;
      dragName = model.attributes.label;
      const componentType = model.attributes.id;
      let category = 'Form';
      filteredBlocks.forEach((block) => {
        if (block.id == componentType) {
          if (block.category == 'Layout' || block.category == 'Column') {
            category = block.category;
          }
        }
      });

      const container = gjsEditor.getContainer();
      container.classList.remove('Form-Drag');
      container.classList.remove('Column-Drag');
      container.classList.remove('Layout-Drag');
      container.classList.add(category + '-Drag');
    });

    const mergeSpanStr = '<span style="color: green; font-size: ' + '32px' + '"> I </span>';
    gjsEditor.on('canvas:dragend', function (model) {
      if (model.target.classList.contains('fillable') && dragCategory === 'Merge Block') {
        let id = model.target.id;
        let rect = model.target.getBoundingClientRect();
        let element = editor.DomComponents.getWrapper().find('#' + id)[0];
        let content = model.target.innerHTML;
        dragLastX = model.pageX - rect.x;
        dragLastY = model.pageY - rect.y;
        dragPosition = getPosition(dragLastX, dragLastY, model.target, content);
        content = content.replace(mergeSpanStr, '');
        let newContent =
          content.slice(0, dragPosition) + ` {${dragName}} ` + content.slice(dragPosition);
        model.target.innerHTML = newContent;
        element.components(newContent);
        document.body.removeChild(
          document.getElementById('input-textarea-caret-position-mirror-div')
        );
      }
    });

    gjsEditor.on('canvas:dragover', function (model) {
      if (model.target.classList.contains('fillable') && dragCategory === 'Merge Block') {
        let rect = model.target.getBoundingClientRect();
        let content = model.target.innerHTML;
        let x = model.pageX - rect.x;
        let y = model.pageY - rect.y;

        content = content.replace(mergeSpanStr, '');

        dragPosition = getPosition(x, y, model.target, content);
        let newContent =
          content.slice(0, dragPosition) + mergeSpanStr + content.slice(dragPosition);
        model.target.innerHTML = newContent;
        //element.set({content: newContent})
      }
    });

    gjsEditor.on('component:hovered', (model) => {
      if (gjsEditor && model && model.getEl()) {
        if (!gjsEditor.getSelected()) {
          gjsEditor.select(model);
        } else if (gjsEditor.getSelected().getId() !== model.getId()) {
          gjsEditor.select(model);
        }
      }
    });

    const settingId = 'setting';
    const htmlLabel = `<svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"> <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" fill="white"></path> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" fill="white"></path> </svg> `;
    gjsEditor.on('component:selected', () => {
      //   setStylesTitle(gjsEditor?.getSelected()?.attributes?.name);
      const selectedComponent = gjsEditor.getSelected();
      const componentType = selectedComponent.attributes.type;
      let isValidType = true;
      if (componentType == 'text' || componentType == 'div') {
        isValidType = false;
      }
      const originToolbar = selectedComponent.get('toolbar');
      const defaultToolbar = originToolbar.filter((item) => {
        if (item.id == settingId) {
          return true;
        }
        if (typeof item.command === 'function') {
          return false;
        }
        return true;
      });

      const container = gjsEditor.getContainer();

      if (isValidType) {
        let category = 'Form';
        filteredBlocks.forEach((block) => {
          if (block.id == componentType) {
            if (block.category == 'Layout' || block.category == 'Column') {
              category = block.category;
            }
          }
        });
        if (category === 'Member') {
          category = 'Form';
        }
        if (selectedComponent.attributes.tagName === 'body') {
          category = 'Body';
        }
        container.className = 'gjs-editor-cont ' + category + ' ' + category + '-selected';

        // check if this command already exists on this component toolbar
        const commandExists = defaultToolbar.some((item) => item.id === settingId);

        // if it doesn't already exist, add it
        if (!commandExists) {
          selectedComponent.set({
            toolbar: [
              ...defaultToolbar,
              {
                id: settingId,
                command: function () {
                  toggleStyles(true);
                },
                label: htmlLabel
              }
            ]
          });
        }
      } else {
        container.className = 'gjs-editor-cont invalid-selected';
        selectedComponent.addClass('invalid');
        selectedComponent.set({
          toolbar: [],
          layerable: false
        });
      }
    });

    gjsEditor.on('component:add', (model) => {
      if (!model.parent() || !model.parent().view) {
        return;
      }
      const element = model.parent().view.el;
      if (element && element.classList) {
        if (element.classList.contains('section-row-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }

        if (element.classList.contains('section-column-child')) {
          if (element.children.length > 1) {
            element.classList.add('non-empty');
          }
        }
      }
    });
    gjsEditor.on('component:create', (model) => {
      let components = localStorage.getItem('gjs-components');
      if (originContent && components !== originContent) {
        setContentChange(true);
      }
    });

    gjsEditor.on('component:update', (model) => {
      let components = localStorage.getItem('gjs-components');
      if (originContent && components != originContent) {
        setContentChange(true);
      }
    });
    gjsEditor.on('component:remove', (model) => {
      let components = localStorage.getItem('gjs-components');
      if (originContent && components != originContent) {
        setContentChange(true);
      }
      if (model.parent()?.view?.el) {
        const element = model.parent().view.el;
        if (element && element.classList) {
          if (element.classList.contains('section-row-child')) {
            if (element.children.length <= 2) {
              element.classList.remove('non-empty');
            }
          }

          if (element.classList.contains('section-column-child')) {
            console.log(element.children.length);
            if (element.children.length <= 2) {
              element.classList.remove('non-empty');
            }
          }
        }
      }
    });
    gjsEditor.on(`component:mount`, (model) => {
    });
    gjsEditor.on('storage:load', (obj) => {
    });
    const rte = gjsEditor.RichTextEditor;
    rte.remove('bold');
    rte.remove('italic');
    rte.remove('underline');
    rte.remove('strikethrough');
    rte.remove('link');
    rte.remove('wrap');

    rte.add('bold', {
      icon: '<b>B</b>',
      attributes: { title: 'Bold' },
      result: (rte) => {
        if (rte.selection().toString().length == 0) {
          const selection = rte.selection();
          const range = document.createRange();
          range.selectNodeContents(rte.el);
          selection.removeAllRanges();
          selection.addRange(range);
          rte.exec('bold');
          selection.removeAllRanges();
        } else {
          rte.exec('bold');
        }
      }
    });

    rte.add('italic', {
      icon: '<i>I</i>',
      attributes: { title: 'Italic' },
      result: (rte) => {
        if (rte.selection().toString().length == 0) {
          const selection = rte.selection();
          const range = document.createRange();
          range.selectNodeContents(rte.el);
          selection.removeAllRanges();
          selection.addRange(range);
          rte.exec('italic');
          selection.removeAllRanges();
        } else {
          rte.exec('italic');
        }
      }
    });

    rte.add('underline', {
      icon: '<u>U</u>',
      attributes: { title: 'Underline' },
      result: (rte) => {
        if (rte.selection().toString().length == 0) {
          const selection = rte.selection();
          const range = document.createRange();
          range.selectNodeContents(rte.el);
          selection.removeAllRanges();
          selection.addRange(range);
          rte.exec('underline');
          selection.removeAllRanges();
        } else {
          rte.exec('underline');
        }
      }
    });

    rte.add('strikethrough', {
      icon: '<s>S</s>',
      attributes: { title: 'Strike-through' },
      result: (rte) => {
        if (rte.selection().toString().length == 0) {
          const selection = rte.selection();
          const range = document.createRange();
          range.selectNodeContents(rte.el);
          selection.removeAllRanges();
          selection.addRange(range);
          rte.exec('strikethrough');
          selection.removeAllRanges();
        } else {
          rte.exec('strikethrough');
        }
      }
    });

    rte.add('justifyLeft', {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
      attributes: { title: 'Align Left' },
      result: (rte) => {
        //rte.exec('justifyLeft', false, null)
        const element = gjsEditor.getSelected().getChildAt(0);
        if (element) {
          element.addStyle({ 'text-align': 'left', 'align-items': 'start' });
        }
      }
    });

    rte.add('justifyCenter', {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-center"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>',
      attributes: { title: 'Align Center' },
      result: (rte) => {
        // rte.exec('justifyCenter', false, null)
        const element = gjsEditor.getSelected().getChildAt(0);
        if (element) {
          element.addStyle({ 'text-align': 'center', 'align-items': 'center' });
        }
      }
    });
    rte.add('justifyRight', {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-right"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>',
      attributes: { title: 'Align Right' },
      result: (rte) => {
        const element = gjsEditor.getSelected().getChildAt(0);
        if (element) {
          element.addStyle({ 'text-align': 'right', 'align-items': 'end' });
        }
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (blockRef.current && !blockRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('drop', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('drop', handleClickOutside);
    };
  }, [blockRef]);

  return (
    <div className="d-flex">
      <Collapse isOpen={sidebarOpen} horizontal={true} delay={{ show: 10, hide: 20 }}>
        <div className="expanded-sidebar" ref={blockRef}>
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
      <div className="w-100 border">
        <div id="editor"></div>
      </div>
    </div>
  );
}
