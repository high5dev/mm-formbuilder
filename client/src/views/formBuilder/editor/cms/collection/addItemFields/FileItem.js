// ** React
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button
} from 'reactstrap';

// ** React Icon
import {
  MoreVertical,
  Eye,
  Info,
  Trash,
  UserPlus,
  Edit,
  Copy,
  Lock,
  X,
  Check,
  Download
} from 'react-feather';

// ** Third Party Components
import Swal from 'sweetalert2';

// ** Utils
import { humanFileSize } from '../../../../../../utility/Utils';
import { getUserData } from '../../../../../../auth/utils';
import { toast } from 'react-toastify';
// import { PreviewFile } from './PreviewFile';
// import ShareFile from './ShareFile';

const FileItem = ({ item, disableProperty }) => {
  // ** Dom
  const dispatch = useDispatch();
  // ** UseState
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIshover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState(false);
  const [isRenameFileModalOpen, setIsRenameFileModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [newFileName, setNewFileName] = useState('');

  // ** Store
  const selectTasks = useSelector((state) => state.filemanager.selectTasks);
  // ** User Data
  const user = getUserData();
  // ** HandleRenameFile

  // ** Handle
  const toggle = () => setModal(!modal);
  const onSetIsChecked = (status) => {
    setIsChecked(status);
    if (status) {
      dispatch(addSelectedTask(item));
    } else if (selectTasks.findIndex((index) => index._id == item._id) != -1) {
      dispatch(deleteSelectedTask(selectTasks.findIndex((index) => index._id == item._id)));
    }
  };

  useEffect(() => {
    if (selectTasks?.length > 0 && selectTasks.findIndex((index) => index._id == item._id) > -1)
      setIsChecked(true);
    else setIsChecked(false);
  }, [selectTasks, item._id]);

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this document?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        // if (selectTasks.findIndex((index) => index == item._id) != -1) {
        const response = dispatch(deleteFile(item._id));
        if (response) {
          toast.success('File Deleted Successfully');
        }
        // }
        // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const handleShareFolder = async () => {
    setIsOpen(!isOpen);
  };

  const handleRenameFile = async () => {
    const response = await dispatch(
      renameFile({
        filename: `${fileName}.${
          String(item.url).split('.')[String(item.url).split('.').length - 1]
        }`,
        fileId: item._id
      })
    );
    if (response) {
      toast.success('File renamed successfully');
    }
    setIsRenameFileModalOpen(false);
    setFileName('');
  };

  const handlePreview = (item) => {
    setPreviewModal(!previewModal);
    setPreviewData(item);
  };
  const currentPath = useSelector((state) => state.filemanager.currentPath);

  const handleCopyFile = async () => {
    if (item?.filename.search('(copy)') > -1) {
      toast.error('This file is already copied');
    } else {
      const result = await Swal.fire({
        title: 'Copy File?',
        text: 'Are you sure you want to make a copy of  this file?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      });

      const response = await fetch(item.url);
      const blob = await response.blob();
      const fileNameParts = item.filename.split('.');
      if (Array.isArray(fileNameParts) && fileNameParts.length === 2) {
        // If both conditions are met, insert (copy) before the dot
        setNewFileName(`${fileNameParts[0]}(copy).${fileNameParts[1]}`);
      } else {
        // If the conditions are not met, display an error message
        console.error('Invalid fileName format');
      }
      if (result.isConfirmed) {
        const form = new FormData();
        form.append('file', blob, newFileName);
        form.append('userId', user.id);
        form.append('parentFolderId', currentPath?.parentFolderId);
        const response = await dispatch(uploadFile(form));
        if (response) {
          toast.success('File uploaded successfully');
        }
      }
    }
  };

  const fileExtension = item?.url?.split('.')?.pop()?.toLowerCase();


  return (
    <Card
      className={
        !isChecked
          ? 'shadow-none border cursor-pointer'
          : 'shadow-none border border-primary cursor-pointer'
      }
    >
      <CardHeader
        onMouseEnter={() => setIshover(true)}
        onMouseLeave={() => setIshover(false)}
        className="d-flex justify-content-between align-items-start pt-1 pb-0 pe-0 bg-light h-70 ps-0"
      >
        <div
          className={
            isChecked || isHover
              ? 'form-check form-check-inline ms-1'
              : 'invisible form-check form-check-inline ms-1'
          }
        >
          {user.id === item?.userId ? (
            <Input
              type="checkbox"
              id="basic-cb-unchecked"
              checked={isChecked}
              onChange={() => onSetIsChecked(!isChecked)}
            />
          ) : (
            <Lock className="text-muted" size={14} />
          )}
        </div>
        <div className="bg-light text-center pb-2 pt-2">
          {/* TODO: Image update */}
          {fileExtension === 'docx' && (
            <img src={require('@src/assets/images/icons/doc.png').default} height={40} width={40} />
          )}
          {fileExtension === 'doc' && (
            <img src={require('@src/assets/images/icons/doc.png').default} height={40} width={40} />
          )}
          {fileExtension === 'pdf' && (
            <img src={require('@src/assets/images/icons/pdf.png').default} height={40} width={40} />
          )}
          {fileExtension === 'jpg' && (
            <img src={require('@src/assets/images/icons/jpg.png').default} height={40} width={40} />
          )}
          {fileExtension === 'png' && (
            <img src={require('@src/assets/images/icons/png.png').default} height={40} width={40} />
          )}
          {/* <img
            src={require('@src/assets/images/icons/doc.png').default}
            height={30}
            width={30}
          ></img> */}
        </div>
        {disableProperty ? (
          <Eye
            size={15}
            className={`me-1 ${isChecked || isHover ? 'chart-dropdown' : 'invisible'}`}
          />
        ) : (
          <UncontrolledDropdown className={isChecked || isHover ? 'chart-dropdown' : 'invisible'}>
            <DropdownToggle color="" className="bg-transparent btn-sm border-0 pt-0">
              <MoreVertical size={15} className="cursor-pointer pe-0" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className="w-100" onClick={() => handlePreview(item)}>
                <Eye size={15} className="me-1" />
                Preview
              </DropdownItem>
              <DropdownItem className="w-100" onClick={() => handleShareFolder()}>
                <UserPlus size={15} className="me-1" />
                Share
              </DropdownItem>
              <DropdownItem className="w-100" onClick={() => handleCopyFile()}>
                <Copy size={15} className="me-1" />
                Make a copy
              </DropdownItem>
              <DropdownItem divider />
              {/* {user.id === item?.userId ? ( */}
              <DropdownItem className="w-100" onClick={() => setIsRenameFileModalOpen(true)}>
                <Edit size={15} className="me-1" />
                Rename
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={(e) => {
                  window.open(item.url);
                }}
              >
                <Download size={15} className="me-1" />
                Download
              </DropdownItem>
              {/* ) : null} */}
              {/* <DropdownItem className="w-100">
                <Info size={15} className="me-1" />
                Info
              </DropdownItem> */}
              <DropdownItem divider />
              {/* {user.id === item?.userId ? (
                
              ) : null} */}

              <DropdownItem className="w-100" onClick={handleDelete}>
                <Trash size={15} className="me-1" />
                Delete
              </DropdownItem>
              {/* {user.id === item?.userId ? (
                <DropdownItem className="w-100">
                  <Info size={15} className="me-1" />
                  Report
                </DropdownItem>
              ) : null} */}
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </CardHeader>

      <CardBody className="pt-1 pb-0">
        <div className="d-flex justify-content-between mb-50">
          <span className="text-truncate ts-2">{item.filename}</span>
          <small className="text-muted">{humanFileSize(item.size)}</small>
        </div>
        <small className="text-muted">{item.description}</small>
      </CardBody>
      {/* <ShareFile isOpen={isOpen} setIsOpen={setIsOpen} fileId={item._id} />
      <PreviewFile
        previewModal={previewModal}
        previewData={previewData}
        setPreviewModal={setPreviewModal}
      /> */}
      <Modal isOpen={isRenameFileModalOpen} className="modal-dialog-centered">
        <ModalHeader toggle={() => setIsRenameFileModalOpen(!isRenameFileModalOpen)}>
          Rename File
        </ModalHeader>
        <ModalBody>
          <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
          <div className="d-flex justify-content-between mt-2">
            <Button
              color="primary"
              className="btn-prev"
              onClick={() => setIsRenameFileModalOpen(false)}
            >
              <X size={14} className="align-middle me-sm-25 me-0"></X>
              <span className="align-middle d-sm-inline-block d-none">Cancel</span>
            </Button>
            <Button color="primary" className="btn-next" onClick={() => handleRenameFile()}>
              <span className="align-middle d-sm-inline-block d-none">Ok</span>
              <Check size={14} className="align-middle ms-sm-25 ms-0"></Check>
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Card>
  );
};
export default FileItem;
