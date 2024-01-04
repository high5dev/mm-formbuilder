import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CollectCustomer.scss';
import { getCustomerCollectAction, saveCustomerDatasetAction, uploadCustomerImageAction } from '../../../store/action';
import { Button, Input } from 'reactstrap';

export default function CollectCustomer() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [customerCollect, setCustomerCollect] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [valueIdx, setValueIdx] = useState(-1);
    const [editValues, setEditValues] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [file, setFile] = useState(null);
    const imagePreviewRefs = useRef({});

    const store = useSelector((state) => {
        return {
            ...state.websiteEditor
        };
    });

    useEffect(() => {
        if (id) {
            dispatch(getCustomerCollectAction(id));
        }
    }, [id])

    useEffect(() => {
        if (store?.customerCollect) {
            setCustomerCollect(store?.customerCollect);
        }
    }, [store?.customerCollect]);

    const handleClickItem = (idx) => {
        if (idx == -1) {
            const emptyObject = {};
            if (customerCollect?.customerDataset?.values?.[0]) {
                Object.keys(customerCollect.customerDataset.values[0]).forEach(key => {
                    emptyObject[key] = ''; // Set each value to empty
                });
            }
            setEditValues(emptyObject);
        } else {
            setEditValues(customerCollect?.customerDataset?.values[idx]);
        }
        setIsEdit(true);
        setValueIdx(idx);
        // initImageRefs(idx)
    }

    const handleChangeValue = (key, value) => {
        setEditValues({ ...editValues, [key]: value });
    }

    const handleClickSave = async () => {
        setIsSaving(true);
        let newValues;
        if (valueIdx === -1) {
            // Add a new item to the end of the array
            newValues = [...customerCollect.customerDataset.values, editValues];
        } else {
            // Replace an existing item at the specified index
            newValues = customerCollect.customerDataset.values.map((item, idx) => {
                return idx === valueIdx ? editValues : item;
            });
        }
        setCustomerCollect(prevState => {
            // Check if we need to add a new value or update an existing one
            const newValues = valueIdx === -1
                ? [...prevState.customerDataset.values, editValues] // Add new value
                : prevState.customerDataset.values.map((item, index) =>
                    index === valueIdx ? editValues : item); // Update existing value

            return {
                ...prevState,
                customerDataset: {
                    ...prevState.customerDataset,
                    values: newValues
                }
            };
        });

        await dispatch(saveCustomerDatasetAction({ id: customerCollect._id, values: newValues, websiteId: id }));
        setIsSaving(false);
        setIsEdit(false);
    }

    const handleImageChange = async (key, e) => {
        const file = e.target.files[0];
        if (file && checkType(file)) {
            setFile({ [key]: file });
            const formData = new FormData();
            formData.append("file", file);
            const data = await dispatch(uploadCustomerImageAction(formData));
            if (data.success) {
                setEditValues({ ...editValues, [key]: data.data });
            }
        }
    };

    const checkType = (file) => {
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            alert('File is not an image');
            return false;
        }
        return true;
    };

    const updateImagePreview = (key, file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreviewRefs.current[key].style.backgroundImage = `url(${e.target.result})`;
            imagePreviewRefs.current[key].className += ' js--no-default'
        };
        reader.readAsDataURL(file);
    };

    const initImageRefs = (idx) => {
        // Set default images for each field
        if (customerCollect.fields) {
            Object.entries(customerCollect?.fields[0] || {}).forEach(([key, value]) => {
                if (value === true && customerCollect?.customerDataset?.fields) {
                    const field = customerCollect.customerDataset.fields.find(f => f.name === key && f.type === "Image");
                    if (field && imagePreviewRefs.current[key]) {
                        imagePreviewRefs.current[key].style.backgroundImage = `url(${editValues[key]})`;
                        imagePreviewRefs.current[key].className += ' js--no-default'
                    }
                }
            });
        }
    }

    useEffect(() => {
        if (customerCollect.fields && valueIdx != -1) {
            Object.entries(customerCollect?.fields[0] || {}).forEach(([key, value]) => {
                if (value === true && customerCollect?.customerDataset?.fields) {
                    const field = customerCollect.customerDataset.fields.find(f => f.name === key && f.type === "Image");
                    if (field && imagePreviewRefs.current[key]) {
                        imagePreviewRefs.current[key].style.backgroundImage = `url(${editValues[key]})`;
                        imagePreviewRefs.current[key].className += ' js--no-default'
                    }
                }
            });
        }
    }, [imagePreviewRefs, valueIdx, editValues]);

    return (
        <div className='customerContent w-100 h-100'>
            {
                isEdit ?
                    (
                        <div className='collectContent pt-3 collectEditContent'>
                            <div className='editItemList'>
                                {
                                    Object.entries(customerCollect?.fields[0] || {}).filter(([key, value]) =>
                                        value === true && customerCollect?.customerDataset?.fields.some(field => field.name === key && field.type === "Image")
                                    ).map(([key]) => (
                                        <div key={key} className='editItem w-100'>
                                            <div className='font-medium-5'>{key}:</div>
                                            <div className="box">
                                                <div
                                                    className="js--image-preview"
                                                    ref={el => imagePreviewRefs.current[key] = el}
                                                    style={{ position: 'relative' }}
                                                >
                                                </div>
                                                <div class="upload-options">
                                                    <label>
                                                        <input
                                                            type="file"
                                                            className="image-upload"
                                                            onChange={(e) => handleImageChange(key, e)}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='editItemList mt-3'>
                                {
                                    Object.entries(customerCollect?.fields[0] || {}).filter(([key, value]) =>
                                        value === true && customerCollect?.customerDataset?.fields.some(field => field.name === key && field.type !== "Image")
                                    ).map(([key]) => (
                                        <div className='editItem w-100'>
                                            <div className='font-medium-5'>{key}:</div>
                                            <Input type="text" className='mt-1' value={editValues[key]} onChange={(e) => { handleChangeValue(key, e.target.value) }} />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='w-100 d-flex mt-3 justify-content-end'>
                                <Button className={isSaving ? 'disabled' : ''} color='success' onClick={handleClickSave}>Save</Button>
                                <Button className='ms-2' onClick={() => { setIsEdit(false) }}>Cancel</Button>
                            </div>
                        </div>
                    ) :
                    (
                        <div className='d-grid collectContent'>
                            {
                                customerCollect?.customerDataset?.values?.map((data, idx) => {
                                    return (
                                        <div className='collectItem' onClick={() => { handleClickItem(idx) }}>
                                            {
                                                Object.entries(customerCollect?.fields[0]).map(([key, value]) => {
                                                    if (value == true) {
                                                        return (
                                                            <div>{key}: {data[key]}</div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                            <div className='collectItem addItem d-flex justify-content-center align-items-center' onClick={() => { handleClickItem(-1) }}>+</div>
                        </div>
                    )
            }
        </div >
    );
}