import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CollectCustomerForm.scss';
import { getContentCollectAction, getWebCollectionsAction, saveContentDataAction, uploadContentImageAction } from '../../../store/action';
import { Button, Input } from 'reactstrap';
import FileUploaderMultiple from '../../topNav/import/FileUploaderMultiple';
import { Check, DownloadCloud, UploadCloud, X } from 'react-feather';
import { toast } from 'react-toastify';

export default function CollectCustomerForm() {
    const { websiteId, collectionId } = useParams();
    const dispatch = useDispatch();
    const [contentCollect, setContentCollect] = useState({});
    const [editValues, setEditValues] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [imagesToUpload, setImagesToUpload] = useState([]);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [webCollection, setWebCollection] = useState({});

    const store = useSelector((state) => {
        return {
            ...state.websiteEditor
        };
    });

    useEffect(() => {
        if (collectionId) {
            dispatch(getContentCollectAction(collectionId));
            dispatch(getWebCollectionsAction(websiteId));
        }
    }, [collectionId]);

    useEffect(() => {
        if (store?.contentCollect) {
            setContentCollect(store?.contentCollect);
        }
    }, [store?.contentCollect]);

    useEffect(() => {
        if (store?.contentCollect && store?.webCollections?.length > 0) {
            setWebCollection(store.webCollections.find(e => e._id === store.contentCollect.collectionId));
        }
    }, [store?.contentCollect, store?.webCollections]);

    const handleChangeValue = (key, value) => {
        setEditValues({ ...editValues, [key]: value });
    }

    const handleClickSave = async () => {
        setIsSaving(true);
        await dispatch(saveContentDataAction(contentCollect._id, {values: [editValues], isApproved: 'pending'}));
        setIsSaving(false);
        setIsSaved(true);
    }

    const handleImageChange = (e) => {
        const files = e.target.files;
        const uploadedUrls = [];
        for (let i=0; i<files.length; i++) {
            const file = files[i];
            if (file && checkImageType(file)) {
                uploadedUrls.push(file);
                setImagesToUpload(uploadedUrls);
            }
        }
    };

    const uploadImages = () => {
        const uploadedImages = [];
        imagesToUpload.map(async(file) => {
            const formData = new FormData();
            formData.append("file", file);
            const data = await dispatch(uploadContentImageAction(formData, websiteId));
            if (data.success) {
                uploadedImages.push(file.name);
                if (imagesToUpload.length === uploadedImages.length) {
                    setImagesToUpload([]);
                    toast.success('Successfully uploaded images.');
                }
            }
        })
    };

    const handleFilesChange = (e) => {
        const files = e.target.files;
        const uploadedUrls = [];
        for (let i=0; i<files.length; i++) {
            const file = files[i];
            if (file && checkNotImageType(file)) {
                uploadedUrls.push(file);
                setFilesToUpload(uploadedUrls);
            }
        }
    };

    const uploadFiles = () => {
        const uploadedFiles = [];
        filesToUpload.map(async(file) => {
            const formData = new FormData();
            formData.append("file", file);
            const data = await dispatch(uploadContentImageAction(formData, websiteId));
            if (data.success) {
                uploadedFiles.push(file.name);
                if (filesToUpload.length === uploadedFiles.length) {
                    setFilesToUpload([]);
                    toast.success('Successful uploaded files.');
                }
            }
        })
    };

    const checkImageType = (file) => {
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            alert('File is not an image');
            return false;
        }
        return true;
    };

    const checkNotImageType = (file) => {
        let imageType = /image.*/;
        if (file.type.match(imageType)) {
            alert('File should not an image');
            return false;
        }
        return true;
    };

    return (
        <div>
            {
                isSaved ? (
                    <div className='customerContent w-100 d-flex flex-column align-items-center justify-content-center' style={{height: '100vh'}}>
                        <div className='bg-primary d-flex align-items-center justify-content-center' style={{width: 100, height: 100, borderRadius: '50%'}}>
                            <Check className='text-white' size={70} />
                        </div>
                        <h1 className='text-primary mt-1' style={{fontSize: 35}}>Successfully submitted</h1>
                        <h1 className='text-primary mb-1' style={{fontSize: 35}}>your form!</h1>
                        <Button color='primary' outline onClick={() => setIsSaved(false)}>Back to edit</Button>
                    </div>
                ):(
                        <div className='customerContent w-100 h-100 d-flex flex-column align-items-center pt-4'>
                            <h2>CONTENT COLLECTION FORM</h2>
                            <h4>Help us build your site by adding content with this form.</h4>
                            <div className='collectContent mt-2 pt-2 collectEditContent'>
                                <div className='editItemList mt-1'>
                                    <div className='editItem w-100'>
                                        <div className='font-medium-2'>Images and Logo</div>
                                        <div className="box">
                                            <div class="upload-options">
                                                <div className="d-flex align-items-center justify-content-center flex-column" style={{width: '100%', height: '100px'}}>
                                                    <UploadCloud size={50} />
                                                    <p className="text-secondary">
                                                        You can choose images from{' '}
                                                        <a href="/" onClick={(e) => e.preventDefault()}>
                                                        Library
                                                        </a>
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="image-upload cursor-pointer"
                                                    multiple
                                                    onChange={(e) => handleImageChange(e)}
                                                />
                                            </div>
                                        </div>
                                        {
                                            imagesToUpload?.length > 0 && <div>
                                                {
                                                    imagesToUpload.map((image, imx) => {
                                                        return <div key={'image-'+imx} className='mx-2 my-1 d-flex justify-content-between align-items-center'>
                                                            <div>{image.name}</div>
                                                            <X className='cursor-pointer text-primary' size={16} onClick={() => {
                                                                const tempImages = [...imagesToUpload];
                                                                tempImages.splice(imx, 1);
                                                                setImagesToUpload(tempImages);
                                                            }}/>
                                                        </div>;
                                                    })
                                                }
                                                <div className='d-flex flex-column align-items-end pe-2'>
                                                    <Button color='primary' outline onClick={uploadImages}>Upload</Button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='editItem w-100'>
                                        <div className='font-medium-2'>Files</div>
                                        <div className="box">
                                            <div class="upload-options">
                                                <div className="d-flex align-items-center justify-content-center flex-column" style={{width: '100%', height: '100px'}}>
                                                    <UploadCloud size={50} />
                                                    <p className="text-secondary">
                                                        You can choose files from{' '}
                                                        <a href="/" onClick={(e) => e.preventDefault()}>
                                                        Library
                                                        </a>
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="image-upload cursor-pointer"
                                                    multiple
                                                    onChange={(e) => handleFilesChange(e)}
                                                />
                                            </div>
                                        </div>
                                        {
                                            filesToUpload?.length > 0 && <div>
                                                {
                                                    filesToUpload.map((file, fx) => {
                                                        return <div key={'file-'+fx} className='mx-2 my-1 d-flex justify-content-between align-items-center'>
                                                            <div>{file.name}</div>
                                                            <X className='cursor-pointer text-primary' size={16} onClick={() => {
                                                                const tempFiles = [...filesToUpload];
                                                                tempFiles.splice(fx, 1);
                                                                setFilesToUpload(tempFiles);
                                                            }}/>
                                                        </div>;
                                                    })
                                                }
                                                <div className='d-flex flex-column align-items-end pe-2'>
                                                    <Button color='primary' outline onClick={uploadFiles}>Upload</Button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {
                                        contentCollect && contentCollect.fields && contentCollect.fields.length > 0 && Object.entries(contentCollect?.fields[0] || {}).filter(([key, value]) =>
                                            value === true && webCollection?.fields?.some(field => field.name === key && field.type !== "Image" && field.type !== "Rich text" && field.type !== "Array")
                                        ).map(([key]) => (
                                            <div className='editItem w-100'>
                                                <div className='font-medium-2'>{key}</div>
                                                <Input type="text" value={editValues[key]} onChange={(e) => { handleChangeValue(key, e.target.value) }} />
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    contentCollect && contentCollect.fields && contentCollect.fields.length > 0 && Object.entries(contentCollect?.fields[0] || {}).filter(([key, value]) =>
                                        value === true && webCollection?.fields?.some(field => field.name === key && field.type === "Rich text")
                                    ).map(([key]) => (
                                        <div className='editItem w-100 mt-1'>
                                            <div className='font-medium-2'>{key}</div>
                                            <Input type="textarea" value={editValues[key]} onChange={(e) => { handleChangeValue(key, e.target.value) }} />
                                        </div>
                                    ))
                                }
                                <hr className='mt-2'/>
                                <div className='w-100 d-flex mt-1 justify-content-end'>
                                    <Button color='primary' disabled={isSaving} onClick={handleClickSave}>Submit</Button>
                                </div>
                            </div>
                        </div >
                )
            }
        </div>
    );
}