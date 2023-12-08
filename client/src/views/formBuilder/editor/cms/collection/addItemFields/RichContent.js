import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const RichContent = ({field, onChange, isDefault}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const htmlString = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onChange({[field.name]: htmlString});
  };

  return <div className='border border-light-secondary rounded'>
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
  </div>;
}

export default RichContent;