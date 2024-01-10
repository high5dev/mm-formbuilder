import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { MoreVertical, Send, Image } from 'react-feather';
import { RequiredPluginOptions } from 'grapesjs-preset-webpage';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import MediaUploaderMultiple from './MediaUploaderMultiple';
import { setFontAndSize } from 'pdf-lib';
import { isObjEmpty, selectThemeColors } from '@utils';
import { menu } from '../../util';
import Select, { components } from 'react-select';
import { createWebElementAction } from '../../../store/action';
import { useDispatch } from 'react-redux';
import * as htmlToImage from 'html-to-image';

const UploadMediaModal = ({ editor, setEditor, openUploadModal, setOpenUploadModal }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [files, setFiles] = useState([]);
  const [mainMenus, setMainMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [subMenus, setSubMenus] = useState([]);
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [category, setCategory] = useState('');

  const fileTypes = ['video/mp4', 'audio/mpeg'];
  useEffect(() => {
    if (files.length === 1) {
      const reader = new FileReader();
      if (files[0].type.startsWith('video')) {
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
          const fileContents = e?.target?.result;
          setCode(fileContents);
        };
      } else if (files[0].type == 'image/svg+xml') {
        reader.readAsText(files[0]);
        reader.onload = function (e) {
          const fileContents = e?.target?.result;
          setCode(fileContents);
        };
      } else if (files[0].type == 'image/png') {
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
          const fileContents = e?.target?.result;
          setCode(fileContents);
        };
      } else if (files[0].type.startsWith('audio')) {
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
          const fileContents = e?.target?.result;
          setCode(fileContents);
        };
      }
    }
  }, [files]);

  useEffect(() => {
    const tempMenu = [];
    menu.forEach((e) => {
      tempMenu.push({ value: e.id, label: e.name });
    });
    setMainMenus(tempMenu);
  }, []);

  useEffect(() => {
    if (selectedMenu) {
      const submenus = menu.find((e) => e.id === selectedMenu.value).subMenu;
      const tempSubMenus = [];
      submenus.forEach((e) => {
        tempSubMenus.push({ value: e.id, label: e.name });
      });
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

  const saveNewElement = (myfile) => {
    const editorBody = editor.Canvas.getBody();
    const newElement = document.createElement('div');
    const currentTime = new Date().getTime();
    newElement.className = `created-new-element-${currentTime}`;
    if (myfile.type.startsWith('video')) {
      const videoElement = document.createElement('video');
      videoElement.src = code;
      newElement.innerHTML = videoElement;
      editorBody.appendChild(newElement);
      const lastChild = editorBody.lastChild;
      dispatch(
        createWebElementAction({
          mainMenu: selectedMenu?.value || '',
          subMenu: selectedSubMenu?.value || '',
          category,
          html: lastChild.innerHTML,
          imageUrl: code
        })
      ).then((res) => {
        lastChild.remove();
        setEditor(editor);
        setOpenUploadModal(false);
      });
    } else if (myfile.type == 'image/svg+xml') {
      const editorBody = editor.Canvas.getBody();
      const newElement = document.createElement('div');
      const currentTime = new Date().getTime();
      newElement.className = `created-new-element-${currentTime}`;
      newElement.innerHTML = code;
      if (selectedMenu?.value === 'decorative') {
        newElement.style.width = 'fit-content';
        newElement.style.height = 'fit-content';
      }
      editorBody.appendChild(newElement);
      const lastChild = editorBody.lastChild;
      setTimeout(() => {
        htmlToImage.toPng(lastChild).then((dataUrl) => {
          dispatch(
            createWebElementAction({
              mainMenu: selectedMenu?.value || '',
              subMenu: selectedSubMenu?.value || '',
              category,
              html: code,
              imageUrl: dataUrl
            })
          ).then((res) => {
            lastChild.remove();
            setEditor(editor);
            setOpenUploadModal(false);
            false;
          });
        });
      }, 500);
    } else if (myfile.type == 'image/png') {
      console.log('here')
      const imageElement = document.createElement('audio');
      imageElement.src = code;
      newElement.innerHTML = imageElement;
      editorBody.appendChild(newElement);
      const lastChild = editorBody.lastChild;
      dispatch(
        createWebElementAction({
          mainMenu: selectedMenu?.value || '',
          subMenu: selectedSubMenu?.value || '',
          category,
          html: lastChild.innerHTML,
          imageUrl: code
        })
      ).then((res) => {
        lastChild.remove();
        setEditor(editor);
        setOpenUploadModal(false);
      });
    } else if (myfile.type.startsWith('audio')) {
      const audioElement = document.createElement('audio');
      audioElement.src = code;
      newElement.innerHTML = audioElement;
      editorBody.appendChild(newElement);
      const lastChild = editorBody.lastChild;
      dispatch(
        createWebElementAction({
          mainMenu: selectedMenu?.value || '',
          subMenu: selectedSubMenu?.value || '',
          category,
          html: lastChild.innerHTML,
          imageUrl: code
        })
      ).then((res) => {
        lastChild.remove();
        setEditor(editor);
        setOpenUploadModal(false);
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={openUploadModal}
        toggle={() => setOpenUploadModal(!openUploadModal)}
        centered
        size="lg"
      >
        <ModalHeader
          toggle={() => setOpenUploadModal(!openUploadModal)}
          className="font-medium-5 px-2 py-1 modal-title text-primary"
        >
          Upload Media
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between">
          <div className="d-flex flex-column flex-1 ps-1">
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
              className="mb-1"
              placeholder="Element category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Label className="mdl-select-file-label" for="select-file">
              Select element Media (Video/Image/Audio)
            </Label>
            <MediaUploaderMultiple
              files={files}
              setFiles={setFiles}
              setCode={setCode}
              id="select-file"
            />
          </div>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button
            color="primary"
            className="add-todo-item me-1 align-self-end"
            onClick={() => {
              saveNewElement(files[0]);
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UploadMediaModal;
