import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MoreVertical, Send, Image } from 'react-feather';
import { RequiredPluginOptions } from 'grapesjs-preset-webpage';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import FileUploaderrMultiple from './FileUploaderMultiple';
import { setFontAndSize } from 'pdf-lib';
import { isObjEmpty, selectThemeColors } from '@utils'
import { menu } from '../../util';
import Select, { components } from 'react-select';
import { createWebElementAction } from '../../../store/action';
import { useDispatch } from 'react-redux';
import * as htmlToImage from 'html-to-image';

const AddElementModal = ({ editor, setEditor, openAddElementMdl, setOpenAddElementMdl }) =>{
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [files, setFiles] = useState([]);
  const [mainMenus, setMainMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [subMenus, setSubMenus] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (files.length === 1) {
      const reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = function (e) {
        const fileContents = e?.target?.result;
        setCode(fileContents);
      };
    }
  }, [files]);

  useEffect(() => {
    const tempMenu = [];
    menu.forEach(e => {
      tempMenu.push({value: e.id, label: e.name});
    });
    setMainMenus(tempMenu);
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      const submenus = menu.find(e => e.id === selectedMenu.value).subMenu;
      const tempSubMenus = [];
      submenus.forEach(e => {
        tempSubMenus.push({value: e.id, label: e.name});
      })
      setSubMenus(tempSubMenus);
      setSelectedSubMenu(tempSubMenus[0]);
    }
  }, [selectedMenu]);

  const importHtml = () => {
    editor.setComponents(code);
    setEditor(editor);
    toggle(!open);
    setCode('');
    setFiles([]);
  };

  const _toggle = () => {
    toggle(!open);
  };

  const mergeHtml = () => {
    if (files && files.length) {
      let _code = '';
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsText(files[i]);
        reader.onload = function (e) {
          const fileContents = e?.target?.result;
          _code += fileContents;
          if (i === files.length - 1) {
            setCode(_code);
          }
        };
      }
    }
  };

  const handleHtml = (value) => {
    setCode(value);
  };

  const saveNewElement = () => {
    const editorBody = editor.Canvas.getBody();
    const newElement = document.createElement('div');
    const currentTime = new Date().getTime();
    newElement.className = `created-new-element-${currentTime}`
    newElement.innerHTML = code;
    editorBody.appendChild(newElement);
    const lastChild = editorBody.lastChild;
    console.log('newElement data-------', newElement);
    htmlToImage.toPng(lastChild).then((dataUrl) => {
      console.log('element data-------', selectedMenu, selectedSubMenu, category, code, dataUrl);
      dispatch(createWebElementAction({mainMenu: selectedMenu?.value || '', subMenu: selectedSubMenu?.value || '', category, html: code, imageUrl: dataUrl})).then((res) => {
        lastChild.remove();
        setEditor(editor);
        setOpenAddElementMdl(false);
      });
    });
  };

  return (
    <>
      <Modal isOpen={openAddElementMdl} toggle={() => setOpenAddElementMdl(!openAddElementMdl)} centered size='lg'>
        <ModalHeader toggle={() => setOpenAddElementMdl(!openAddElementMdl)} className="font-medium-5 px-2 py-1 modal-title text-primary">
          Add Element
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between">
          <div className="code-viewer">
            <CodeMirror
              value={code}
              width="400px"
              height="500px"
              theme={vscodeDark}
              onChange={handleHtml}
            />
          </div>
          <div className='d-flex flex-column flex-1 ps-1'>
            <Label className="mdl-select-main-menu-label" for="mdl-select-main-menu">
              Main Menu
            </Label>
            <Select
              id="mdl-select-main-menu"
              className="react-select mb-1"
              classNamePrefix="select"
              isClearable={false}
              options={mainMenus}
              theme={selectThemeColors}
              value={selectedMenu}
              onChange={(data) => setSelectedMenu(data)}
            />
            <Label className="mdl-select-sub-menu-label" for="mdl-select-sub-menu">
              Submenu
            </Label>
            <Select
              id="mdl-select-sub-menu"
              className="react-select mb-1"
              classNamePrefix="select"
              isClearable={false}
              options={subMenus}
              theme={selectThemeColors}
              value={selectedSubMenu}
              onChange={(data) => setSelectedSubMenu(data)}
            />
            <Label className="mdl-input-category-label" for="mdl-input-category">
              Category
            </Label>
            <Input
              id="mdl-input-category"
              className='mb-1'
              placeholder="Element category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Label className="mdl-select-file-label" for="select-file">
              Select element file (.html)
            </Label>
            <FileUploaderrMultiple files={files} setFiles={setFiles} setCode={setCode} id="select-file"/>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="primary" className="add-todo-item me-1 align-self-end" onClick={saveNewElement}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddElementModal;
