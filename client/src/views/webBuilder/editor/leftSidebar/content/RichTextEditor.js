import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const RichTextEditor = ({field, onChange, value}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    setEditorState
  }, [value]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const htmlString = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(editorState, typeof htmlString, convertFromHTML(htmlString));
    onChange({[field]: htmlString});
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
          'list',
          'colorPicker',
          'link',
        ],
        inline: {
          options: [
            'bold',
            'italic',
            'underline',
          ]
        },
        list: {
          options: ['unordered', 'ordered']
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
        link: {
          showOpenOptionOnHover: true,
          defaultTargetOption: '_blank',
          options: ['link', 'unlink']
        },
      }}
    />
  </div>;
}

export default RichTextEditor;