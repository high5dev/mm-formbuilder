import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MoreVertical, Send, Image } from 'react-feather';
import { RequiredPluginOptions } from 'grapesjs-preset-webpage';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import FileUploaderrMultiple from './FileUploaderMultiple';
import { setFontAndSize } from 'pdf-lib';
export default function Index({ editor, setEditor, open, toggle }) {
  const [code, setCode] = useState('');
  const [files, setFiles] = useState([]);
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

  return (
    <>
      <Modal isOpen={open} toggle={_toggle} centered size="lg">
        <ModalHeader toggle={toggle} className="font-medium-5 p-2 modal-title text-primary">
          Import template
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between">
          <FileUploaderrMultiple files={files} setFiles={setFiles} />
          <div className="code-viewer">
            <CodeMirror
              value={code}
              width="400px"
              height="500px"
              theme={vscodeDark}
              onChange={handleHtml}
            />
            ;
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
          <Button color="primary" className="add-todo-item me-1" onClick={mergeHtml}>
            Merge
          </Button>
          <Button color="success" onClick={importHtml} outline>
            Import
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
