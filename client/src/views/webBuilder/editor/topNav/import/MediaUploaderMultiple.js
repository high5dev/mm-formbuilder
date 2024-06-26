// ** React Imports
import { useState, Fragment, useContext, useEffect } from 'react';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud, Headphones} from 'react-feather';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { DocumentContext } from '../../../../../utility/context/Document';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import { translate } from 'pdf-lib';
import { render } from 'react-dom';

const MediaUploaderMultiple = ({ files, setFiles, setCode }) => {
  // ** State
  const { setDocumentFiles } = useContext(DocumentContext);
  const fileTypes = ['text/html','image/png', 'image/svg+xml', 'video/mp4', 'audio/mpeg'];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      let accept = [];
      for (const f of acceptedFiles) {
        if (!fileTypes.includes(f.type)) {
          toast.error('Invalid file type. Only accept Video, Audio, and Image');
        } else {
          accept.push(f);
        }
      }
      setFiles([...accept.map((file) => Object.assign(file))]);
    }
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith('image')) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="50"
          width="50"
        />
      );
    } else if (file.type.startsWith('video')) {
      return (
        <div className="text-center">
          <MdOutlineOndemandVideo size={50} />
        </div>
      );
    }
    else if (file.type.startsWith('audio')) {
      return (
        <div className="text-center">
          <Headphones size={50} />
        </div>
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
    setCode && setCode('');
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  // const fileList = files.map((file, index) => {
  //   if (file.type.startsWith('video')) {
  //     return (
  //       <ListGroupItem
  //         key={`${file.name}-${index}`}
  //         className="d-flex align-items-start justify-content-start"
  //       >
  //         <div className="file-details d-flex align-items-center">
  //           <div className="file-preview ">{renderFilePreview(file)}</div>
  //         </div>
  //         <div>
  //           <Button
  //             color="danger"
  //             outline
  //             size="sm"
  //             className="btn-icon"
  //             onClick={() => handleRemoveFile(file)}
  //           >
  //             <X size={14} />
  //           </Button>
  //         </div>
  //       </ListGroupItem>
  //     );
  //   } else if (file.type.startsWith('image')) {
  //     return (
  //       <ListGroupItem
  //         key={`${file.name}-${index}`}
  //         className="d-flex align-items-center justify-content-between"
  //       >
  //         <div className="file-details d-flex align-items-center">
  //           <div className="file-preview me-1">{renderFilePreview(file)}</div>
  //           <div>
  //             <p className="file-name mb-0">{file.name}</p>
  //             <p className="file-size mb-0">{renderFileSize(file.size)}</p>
  //           </div>
  //         </div>
  //         <Button
  //           color="danger"
  //           outline
  //           size="sm"
  //           className="btn-icon"
  //           onClick={() => handleRemoveFile(file)}
  //         >
  //           <X size={14} />
  //         </Button>
  //       </ListGroupItem>
  //     );
  //   }
  // });
  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ));

  useEffect(() => {
    setDocumentFiles(files);
  }, [files]);

  return (
    <div className="d-flex flex-column flex-1">
      <div {...getRootProps({ className: 'dropzone mb-1 pt-1' })}>
        <input {...getInputProps()} accept={[ 'image/gif', 'image/png','image/svg+xml', 'video/mp4', 'audio/mpeg']} />
        <div className="d-flex align-items-center justify-content-center flex-column">
          <DownloadCloud size={50} />
          <h5>Drop Files here or click to upload</h5>
          <p className="text-secondary">
            You can choose from{' '}
            <a href="/" onClick={(e) => e.preventDefault()}>
              Library
            </a>
          </p>
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <ListGroup>{fileList}</ListGroup>
        </Fragment>
      ) : null}
    </div>
  );
};

export default MediaUploaderMultiple;
