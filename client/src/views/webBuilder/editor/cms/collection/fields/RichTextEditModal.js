import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const RichTextEditModal = ({ open, toggle, value, onChange, rowId }) =>{

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [html, setHtml] = useState('');

  const htmlToDraftBlocks = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  }

  useEffect(() => {
    setEditorState(htmlToDraftBlocks(value));
    setHtml(value);
  }, [value]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const htmlString = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtml(htmlString);
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} centered size='md'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Edit rich text</h4>
        </ModalHeader>
        <ModalBody>
          <div className='border border-light-secondary rounded'>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              toolbar={{
                options: [
                  'inline',
                  'blockType',
                  'fontSize',
                  'list',
                  'textAlign',
                  'colorPicker',
                  'emoji',
                  'link',
                  'embedded',
                  'image',
                  'remove',
                  'history'
                ],
                inline: {
                  options: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'monospace',
                    'superscript',
                    'subscript'
                  ]
                },
                blockType: {
                  options: [
                    'Normal',
                    'H1',
                    'H2',
                    'H3',
                    'H4',
                    'H5',
                    'H6',
                    'Blockquote',
                    'Code'
                  ]
                },
                fontSize: {
                  options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96]
                },
                list: {
                  options: ['unordered', 'ordered', 'indent', 'outdent']
                },
                textAlign: {
                  options: ['left', 'center', 'right', 'justify']
                },
                colorPicker: {
                  colors: [
                    'black',
                    'red',
                    'orange',
                    'yellow',
                    'green',
                    'blue',
                    'indigo',
                    'violet'
                  ]
                },
                emoji: {
                  options: ['smile', 'wink', 'laugh', 'thumbsup']
                },
                link: {
                  showOpenOptionOnHover: true,
                  defaultTargetOption: '_blank',
                  options: ['link', 'unlink']
                },
                embedded: {
                  defaultSize: {
                    height: 'auto',
                    width: 'auto'
                  }
                },
                image: {
                  defaultSize: {
                    height: 'auto',
                    width: 'auto'
                  }
                },
                remove: {
                  options: ['remove']
                },
                history: {
                  options: ['undo', 'redo']
                }
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color='primary' outline className="add-todo-item me-1 align-self-start" onClick={() => {
            toggle();
          }}>
            Cancel
          </Button>
          <Button color="primary" className="add-todo-item me-1 align-self-end" onClick={() => {
              onChange(field, html, rowId);
              toggle();
            }}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RichTextEditModal;
