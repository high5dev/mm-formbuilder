import React, { useEffect, useRef, useState } from 'react';
import {
    Badge,
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown
} from 'reactstrap';

import { DownloadCloud, Edit, FileText, MoreVertical, Trash, Trash2 } from 'react-feather';
import { useUploadSignature } from '../../../../../../requests/documents/recipient-doc';
import {
  createUserNotesAction,
  getUserNotesAction,
  updateUserNotesAction
} from '../../../../store/action';
import moment from 'moment';
import DataTable from 'react-data-table-component';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const statusColors = {
    RESOLVED:"light-success",
    INFO:"light-primary",
    ISSUE:"light-danger",
}

export default function NoteModal({ open, toggle, selectedUser, dispatch }) {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const uploadRef = useRef();
  const handleSave = async () => {
    if (form.file) {
      const formData = new FormData();
      formData.append('file', form.file);
      const img = await useUploadSignature(formData);
      if (img.success && img.success === true) {
        delete form.file;
        const payload = { ...form, imgUrl: img.url, belongsTo: selectedUser._id };
        dispatch(createUserNotesAction(payload)).then((res) => {
          setNotes(res);
        });
      }
    } else {
      dispatch(createUserNotesAction({...form,belongsTo: selectedUser._id})).then((res) => {
        setNotes(res);
      });
    }
  };
  const handleEdit = async () => {
    if (form.file) {
      const formData = new FormData();
      formData.append('file', form.file);
      const img = await useUploadSignature(formData);
      if (img.success && img.success === true) {
        delete form.file;
        const payload = { ...form, imgUrl: img.url, belongsTo: selectedUser._id };
        dispatch(updateUserNotesAction(form._id,payload)).then((res) => {
          setNotes(res);
        });
      }
    } else {
        let id = form._id
        delete form._id
      dispatch(updateUserNotesAction(id,form)).then((res) => {
        setNotes(res);
      });
    }
  };
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleOnRowClick = (data) => {
    setForm(data);
    setSelectedFile(data?.imgUrl);
    setIsEdit(true);
  };
  const MySwal = withReactContent(Swal)
  const handleDelete = async(row)=>{
    const res = await MySwal.fire({
        title: 'Delete?',
      text: `Are you sure you want to delete note?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    })
    if(res){
        dispatch(updateUserNotesAction(row._id,{isDeleted:true,belongsTo:row.belongsTo})).then(res=>{
            setNotes(res)
        })
    }
  }
  useEffect(() => {
    if (selectedUser) {
      dispatch(getUserNotesAction(selectedUser._id)).then((res) => {
        setNotes(res);
      });
    }
  }, [selectedUser]);
  const columns = [
    // {
    //   name: 'IMAGE',
    //   width: '20%',
    //   center: true,
    //   sortable: true,
    //   reorder: true,
    //   selector: (row) => row._id,
    //   cell: (row) => <img src={row?.imgUrl} className="w-100" />
    // },
    {
      name: 'DATE',
      width: '30%',
      center: true,
      sortable: true,
      reorder: true,
      selector: (row) => row.createdAt,
      cell: (row) => <span >{moment(row?.createdAt).format('MM/DD/yyyy HH:mm')}</span>
    },
    {
      name: 'NOTE',
      width: '40%',
      center: true,
      sortable: true,
      reorder: true,
      selector: (row) => row.note,
      cell: (row) => <span >{row?.note}</span>
    },
    {
      name: 'STATUS',
      width: '20%',
      center: true,
      sortable: true,
      reorder: true,
      selector: (row) => row.note,
      cell: (row) => <Badge color={statusColors[row?.status]} >{row?.status?.toLowerCase()}</Badge>
    },
    {
      name: '',
      minWidth: '40px',
      compact: true,
      cell: (row) => (
        // <div className="column-action">
        //   <UncontrolledDropdown>
        //     <DropdownToggle tag="div" className="btn btn-sm">
        //       <MoreVertical size={14} className="cursor-pointer" />
        //     </DropdownToggle>
        //     <DropdownMenu container="#modal">

        //       <DropdownItem
        //         className="w-100"
        //         onClick={(e) => {
        //           e.preventDefault();
        //           handleDelete(row)
        //         }}
        //       >
        //         <Trash2 size={14} className="me-50" />
        //         <span className="align-middle">Delete</span>
        //       </DropdownItem>
        //     </DropdownMenu>
        //   </UncontrolledDropdown>
        // </div>
        <Trash style={{cursor:"pointer"}} className='text-danger' size={14} onClick={()=>handleDelete(row)}/>
      )
    }
  ];
  return (
    <Modal isOpen={open} toggle={toggle} size="lg" centered id="modal">
      <ModalHeader toggle={toggle}>
        {selectedUser?.firstName} {selectedUser?.lastName} Notes
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="4" className="border-end">
            <div>
              {isEdit === true ? <h6>Edit Note</h6> : <h6>Add New Note</h6>}
              {selectedFile ? (
                <img
                  className="rounded "
                  src={selectedFile}
                  alt="Generic placeholder image"
                  height="100"
                  width="230"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    ref={uploadRef}
                    className="d-none"
                    onChange={(e) => {
                      setForm({ ...form, file: e.target.files[0] });
                      setSelectedFile(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <Card
                    className="shadow-none "
                    style={{ border: 'dotted 2px ', cursor: 'pointer' }}
                    onClick={() => uploadRef.current.click()}
                  >
                    <CardBody className="text-center">
                      <DownloadCloud />
                      <p className="my-0">Click to upload Image</p>
                    </CardBody>
                  </Card>
                </div>
              )}

              <Label>Note</Label>
              <Input type="textarea" name="note" onChange={handleChangeForm} value={form?.note} />
              <Label>Status</Label>
              <Input type="select" name="status" onChange={handleChangeForm} value={form?.status}>
                <option value="">Select...</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="INFO">INFO</option>
                <option value="ISSUE">ISSUE</option>
              </Input>
              {isEdit === true ? (
                <div className="d-flex justify-content-between">
                  <div>
                    <Button className="mt-1" color="primary" onClick={handleEdit}>
                      Update
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="mt-1"
                      color="link"
                      onClick={() => {
                        setForm({note:"",status:""});
                        setSelectedFile();
                        setIsEdit(false);
                      }}
                    >
                      Create New
                    </Button>
                  </div>
                </div>
              ) : (
                <Button className="mt-1" color="primary" onClick={handleSave}>
                  Save
                </Button>
              )}
            </div>
          </Col>
          <Col md="8">
            <div className="wrapper-table-contact">
              <div className="react-dataTable ">
                <DataTable
                  data={notes}
                  columns={columns}
                  className="react-dataTable"
                  pagination
                  responsive
                  pointerOnHover="cursor"
                  onRowClicked = {handleOnRowClick}
            
                />
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
