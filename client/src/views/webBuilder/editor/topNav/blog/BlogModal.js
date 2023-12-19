import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MoreVertical, Send, Image, Trash2, Archive} from 'react-feather';
import DataTable from 'react-data-table-component';
import PostModal from "./PostModal";
import { useDispatch, useSelector } from 'react-redux';
import {createBlogAction, deleteBlogAction} from '../../../store/action';
import {setWebBlogsReducer} from '../../../store/reducer'
import moment from 'moment';

export default function Index({store, isOpen, toggle }) {
  const dispatch=useDispatch();
  const _toggle = () => {
    toggle(!open);
  };

  const [blogs, setBlogs]=useState([]);
  const [postMdl, setPostMdl]=useState(false);
  const [selectedBlog, setSelectedBlog]=useState(null);
  const _togglePostMdl= (_open) =>{
    setSelectedBlog(null);
    setPostMdl(_open)
  };

  const handleDeletePost =(row) =>{
    dispatch((deleteBlogAction(row._id))).then((res) =>{
      if(res){
        const _webBlogs=store.webBlogs.filter((blog) =>blog._id!=res);
        dispatch(setWebBlogsReducer(_webBlogs));
      }
    })


  }

  const handleEditPost =(row) =>{
    setSelectedBlog(row);
    setPostMdl(true);
  }

  const columns = [
    {
      name: 'Image',
      sortable: true,
      maxWidth: '100px',
      maxHeight:'100px',
      sortField: 'imageUrl',
      selector: row => row.imageUrl,
      cell: row => <img src={row.imageUrl} width="100px" style={{maxHeight:'50px'}}/>
    },
    {
      name: 'Title',
      sortable: true,
      minWidth: '100px',
      sortField: 'title',
      selector: row => row.title,
      cell: row => <span className='text-capitalize'>{row.title}</span>
    },
    {
      name: 'Description',
      sortable: true,
      minWidth: '600px',
      sortField: 'description',
      selector: row => row.title,
      cell: row => <span className='text-capitalize' style={{overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{row.description}</span>
    },
    {
      name: 'Publish Date',
      minWidth: '100px',
      sortable: true,
      sortField: 'currentPlan',
      selector: row => row.currentPlan,
      cell: row => <span className='text-capitalize'>{moment(row.updatedAt).format("MM/DD/yyyy")}</span>
    },
    {
      name: 'Actions',
      minWidth: '100px',
      allowOverflow: true,
      cell: row => (
        !row.isTemplate && 
        <div className='column-action'>
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag='h6' className='w-100' onClick={e =>{
                  e.preventDefault();
                  handleEditPost(row);
              }  
             }>
                <Archive size={14} className='me-50' />
                <span className='align-middle'>Edit</span>
              </DropdownItem>
              <DropdownItem
                tag='h6'
                className='w-100'
                onClick={e => {
                  e.preventDefault();
                  handleDeletePost(row)
                }}
              >
                <Trash2 size={14} className='me-50' />
                <span className='align-middle'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  useEffect(() =>{
    setBlogs([...store.webBlogs]);

  }, [store.webBlogs])

  return (
    <>
      <Modal isOpen={isOpen} toggle={_toggle} size="xl" centered>
        <ModalHeader toggle={_toggle} className="font-medium-5 p-2 modal-title text-primary">
            Manage Posts
        </ModalHeader>
        <ModalBody className="mb-5">
            <div className='d-flex justify-content-end mb-1'>
                <Button color="primary" onClick={(e)=>setPostMdl(true)}>Add Post</Button>
            </div>
            <div className="react-dataTable">
              <DataTable
                    pagination
                    responsive
                    data={blogs}
                    columns={columns}
                    pointerOnHover="cursor"
              
                  />

            </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
        </ModalFooter>
      </Modal>
      <PostModal blog={selectedBlog} store={store} isOpen={postMdl} toggle={_togglePostMdl}/>
    </>
  );
}
