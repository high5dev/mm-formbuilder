import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MoreVertical, Send, Image } from 'react-feather';
import FileUploaderSingle from './FileUploaderSingle';
import { useDispatch, useSelector } from 'react-redux';
import {createBlogAction, updateBlogAction} from '../../../store/action';
import {setWebBlogsReducer} from '../../../store/reducer';
import { FileText, X, DownloadCloud } from 'react-feather';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
export default function Index({ blog, store, isOpen, toggle }) {
  const dispatch=useDispatch();
  const _toggle = () => {
    toggle(!open);
    setActionType('Create');
    setTitle('');
    setDescription('');
    setImageUrl('');
  };
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState();
  const [value, setValue] = useState(EditorState.createEmpty());
  const [actionType, setActionType]=useState('Create');
  const [imageUrl, setImageUrl]=useState();
  const [attachments, setAttachments]=useState(null);
  const onChangeValue=(e) =>{
    setValue(e);
    const description=e.getCurrentContent().getPlainText();
    setDescription(description);
  }

  const publishPost = () =>{
     const form=store.form;
     let formData=new FormData();
     formData.append('websiteId', form._id);
     formData.append('pageName','blog');
     formData.append('title', title);
     formData.append('description', description);
     if(attachments){
      formData.append('file', attachments[0]);
     };
     if(actionType === 'Create'){
      dispatch(createBlogAction(formData)).then((res) =>{
        if(res){
          let _webBlogs=store.webBlogs;
          _webBlogs=[res, ..._webBlogs];
          dispatch(setWebBlogsReducer(_webBlogs));
          setValue(EditorState.createEmpty());
            _toggle();
        }
       })
     }
     if(actionType === 'Edit'){
      if(imageUrl!=''){
        formData.append('imageUrl', imageUrl);
      };
      dispatch(updateBlogAction(blog._id, formData)).then((res) =>{
        if(res){
          let _webBlogs=store.webBlogs.map((_blog) =>{
            if(_blog._id===res._id){
              return res
            }
            else{
              return _blog
            }
          });
          dispatch(setWebBlogsReducer(_webBlogs));
          setValue(EditorState.createEmpty())
          _toggle();
        }
      })
     }
  }


  const handleRemove =() =>{
    setImageUrl('');
  }


  useEffect(() =>{
    if(blog){
      const initialContent = `
      <p>${blog.description}</p>
  `;
      const contentBlock = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setValue(editorState);
      setActionType('Edit');
      setTitle(blog.title);
      setDescription(blog.description);
      setImageUrl(blog.imageUrl);
    }
    else{
      setImageUrl('');
    }
  }, [isOpen, blog])

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} centered size="lg">
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
           {actionType==='Create'? "New Post":"Edit Post"}
        </ModalHeader>
        <ModalBody className="">
            <div className='post-body'>
               <div className='post-title mt-2'>
                  <Label>Title</Label>
                  <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
               </div>
               <div className='mt-2 mb-2'>
                  <Label>Description</Label>
                  <Editor
                      editorState={value}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={(e) =>{onChangeValue(e)}}
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
                  {/* <Input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)}/> */}
               </div>
            </div>
            {
              imageUrl==='' &&  <FileUploaderSingle attachments={attachments} setAttachments={setAttachments}/>
            }
            {
              imageUrl!='' && 
              <div class="d-flex justify-content-evenly">
                <img src={imageUrl}  width="500px"/>
                <Button
                  color="danger"
                  outline
                  size="sm"
                  className="ms-2 btn-icon"
                  onClick={() => handleRemove()}
                  style={{height:'30px'}}
                >
                  <X size={14} />
                </Button>
              </div>

            }
           
        </ModalBody>
        <ModalFooter className="d-flex mb-1">
            <div className='d-flex justify-content-end'>
                <Button color="primary" onClick={()=>publishPost()}>Publish</Button>
            </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
