import React, {useEffect, useState} from "react";
import { ChevronDown, ChevronRight, Plus } from "react-feather";
import { Button, Input, Label } from "reactstrap";
import RichTextEditor from "./RichTextEditor";
import { useDispatch } from "react-redux";
import { CustomerDatasetModal } from "../../store/customerDataset/CustomerDatasetModal";
import { createContentCollectAction, getContentCollectAction, getContentCollectByColAction, saveContentDataAction, updateWebCollectionAction } from "../../../store/action";
import { CiWarning } from "react-icons/ci";
import { toast } from "react-toastify";
import FileSelectUploadModal from "./FileSelectUploadModal";

const ContentSideBar = ({store}) => {
  const dispatch = useDispatch();
  const [selectedConnectedData, setSelectedConnectedData] = useState('');
  const [customerCollectId, setCustomerCollectId] = useState('');
  const [showCustomerDatasetModal, setShowCustomerDatasetModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openSelFields, setOpenSelFields] = useState(false);
  const [cdCheckedItems, setCDCheckedItems] = useState({});
  const [collection, setCollection] = useState(null);
  const [collectionValue, setCollectionValue] = useState({});
  const [value, setValue] = useState({});
  const [openSelectImageModal, setOpenSelectImageModal] = useState(false);
  const [mdlOpt, setMdlOpt] = useState({images: [], multiple: false, category: ''});

  useEffect(() => {
    if (store?.webCollections?.length > 0) {
      if (store.webCollections.find(c => c.isProfile)) {
        setCollection(store.webCollections.find(c => c.isProfile));
      } else {
        
      }      
    }
  }, [store.webCollections]);

  useEffect(() => {
    setInterval(() => {
      if (collection?._id && store?.form?._id) {
        dispatch(getContentCollectByColAction({websiteId: store?.form?._id, collectionId: collection?._id}));
      }
    }, 5000);
  }, [collection, store?.form]);

  useEffect(() => {
      if (store?.contentCollect?.values?.length > 0) {
        setValue(store.contentCollect.values[0]);
      }
  }, [store.contentCollect]);

  useEffect(() => {
    if (collection && !cdCheckedItems[collection._id]) {
      let tempFields = {};
      collection.fields.map(field => {
        tempFields = {
          ...tempFields,
          [field.name]: true,
        }
      });
      setCDCheckedItems({...cdCheckedItems, [collection._id]: tempFields});
    }

    if (collection?.values.length > 0) {
      setCollectionValue(collection.values[0]);
    }
  }, [collection]);

  const collectFromClient = async () => {
    if (collection) {
      dispatch(
        createContentCollectAction({
          websiteId: store?.form?._id,
          fields: cdCheckedItems[collection._id],
          collectionId: collection._id
        })
      ).then((res) => {
        if (res?.success) {
          setCustomerCollectId(res.data._id);
          setShowCustomerDatasetModal(true);
        }
      });
    }
  };

  const handleCDCheckboxChange = (field, isChecked) => {
    setCDCheckedItems({
      ...cdCheckedItems,
      [collection._id]: {
        ...cdCheckedItems[collection._id],
        [field]: isChecked
      }
    });
  };

  const approveData = (data) => {
    const newValues = [];
    if (collection?.values?.length > 0) {
      const tempValue = {...collection.values[0], ...data};
      newValues.push(tempValue);
    } else {
      newValues.push(data);
    }
    dispatch(updateWebCollectionAction(collection._id, {values: newValues})).then((res1) => {
      if (res1.success) {
        dispatch(saveContentDataAction(store.contentCollect._id, {isApproved: 'approved'})).then((res2) => {
          if (res2.success) {
            toast.success('Add content successfully');
          }
        });
      }
    });
    setSelectedConnectedData('businessInfo');
    setSelectedCategory('connected_data');
  };

  const onChangeValue = (key, data) => {
    setValue({...value, [key]: data});
  };

  const onChangeProfileCol = (key, data) => {
    setCollectionValue({...collectionValue, [key]: data});
    dispatch(updateWebCollectionAction(collection._id, {values: {...collectionValue, [key]: data}}));
  };

  return (
    <div className="h-100 d-flex">
      <div className="h-100 d-flex flex-column border-end" style={{width: 350}}>
        <div className="d-flex justify-content-center align-items-center p-2 pb-0 flex-column">
          <div style={{textAlign: 'center'}}>Send clients a content request form to get site texts, images and other files.</div>

          <div className="d-flex justify-content-around ">
            <Button
              color="primary"
              outline
              onClick={collectFromClient}
              className="mt-1"
            >
              + Collect From Client
            </Button>
            {/* <Button
              color="primary d-flex align-items-center mt-1 ms-2"
              size="sm"
              onClick={collectFormSubmission}
            >
              <IoMdSend />
              <div className="ps-50">SENT FORMS</div>
            </Button> */}
          </div>
          <div className="align-self-start mt-1 w-100">
            <div className='d-flex justify-content-between align-items-center cursor-pointer mb-1' onClick={() => {setOpenSelFields(!openSelFields)}}>
              <div>Select fields of the request form</div>
              {
                openSelFields ? <ChevronDown className='me-1' size={15} /> : <ChevronRight className='me-1' size={15} />
              }
            </div>
            {
              openSelFields && (
                <>
                  {
                    collection?.fields?.map((field, idx) => {
                      return (
                        <div className="d-flex ms-1">
                          <Input
                            type="checkbox"
                            id={collection._id + field.name + idx}
                            checked={
                              cdCheckedItems[collection._id]?.[
                                field.name
                              ]
                            }
                            onChange={(e) => {
                              handleCDCheckboxChange(
                                field.name,
                                e.target.checked
                              );
                            }}
                          />
                          <Label
                            className="ms-1"
                            for={collection._id + field.name + idx}
                          >
                            {field.name}
                          </Label>
                        </div>
                      );
                    })
                  }
                </>
              )
            }
          </div>
        </div>

        {
          store?.contentCollect?.isApproved === 'pending' && (
            <div>
              <hr/>
              <div className='d-flex justify-content-between align-items-center  cursor-pointer mb-1' onClick={() => {setSelectedCategory(selectedCategory === 'incoming_data' ? '' : 'incoming_data');}}>
                <h5 className='ms-1 mb-0'>Incoming Data</h5>
                <div className="d-flex align-items-center">
                  <CiWarning className="text-danger me-1" size={22} />
                  {
                    selectedCategory === 'incoming_data' ? <ChevronDown className='me-1' size={15} /> : <ChevronRight className='me-1' size={15} />
                  }
                </div>
              </div>
              {
                selectedCategory === 'incoming_data' && (
                  <>
                    {
                      collection && <div className={`cursor-pointer px-1 mx-1 ${selectedConnectedData === 'dataToApprove' ? 'selected-connected-data' : ''}`} style={{paddingTop: 10, paddingBottom: 10}} onClick={() => {setSelectedConnectedData('dataToApprove')}}>Profile</div>
                    }
                  </>
                )
              }
            </div>
          )
        }
        <hr/>
        <div>
          <div className='d-flex justify-content-between align-items-center  cursor-pointer mb-1' onClick={() => {setSelectedCategory(selectedCategory === 'connected_data' ? '' : 'connected_data');}}>
            <h5 className='ms-1 mb-0'>Connected Data(CMS)</h5>
            {
              selectedCategory === 'connected_data' ? <ChevronDown className='me-1' size={15} /> : <ChevronRight className='me-1' size={15} />
            }
          </div>
          {
            selectedCategory === 'connected_data' && (
              <>
                <div className={`cursor-pointer px-1 mx-1 ${selectedConnectedData === 'businessInfo' ? 'selected-connected-data' : ''}`} style={{paddingTop: 10, paddingBottom: 10}} onClick={() => {setSelectedConnectedData('businessInfo')}}>Business Info</div>
                <div className={`cursor-pointer px-1 mx-1 ${selectedConnectedData === 'businessText' ? 'selected-connected-data' : ''}`} style={{paddingTop: 10, paddingBottom: 10}} onClick={() => {setSelectedConnectedData('businessText')}}>Business Text</div>
                <div className={`cursor-pointer px-1 mx-1 ${selectedConnectedData === 'businessImage' ? 'selected-connected-data' : ''}`} style={{paddingTop: 10, paddingBottom: 10}} onClick={() => {setSelectedConnectedData('businessImage')}}>Business Images</div>
              </>
            )
          }
        </div>

        {/* <div className="mt-2 pe-3" style={{ flex: 1, overflow: 'scroll' }}>
          <div className="ms-1 font-medium-5">Collections</div>

          {store?.webCollections?.map((collection) => {
            return (
              <div className="ms-2 mt-1">
                <div
                  className="d-flex align-items-center "
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleChangeCustomerDataset('cms', collection._id);
                  }}
                >
                  <IoMdArrowDropright
                    size={18}
                    hidden={
                      customerDataset.collectionId === collection._id
                        ? true
                        : false
                    }
                  />
                  <IoMdArrowDropdown
                    size={18}
                    hidden={
                      customerDataset.collectionId === collection._id
                        ? false
                        : true
                    }
                  />
                  <div className="font-medium-6 ps-50 submenu-item h5 mb-0 ">
                    {collection.name} Collection
                  </div>
                </div>
                {customerDataset.type === 'cms' &&
                  customerDataset.collectionId === collection._id && (
                    <div className="mt-1">
                      {collection?.fields?.map((field, idx) => {
                        return (
                          <div className="d-flex">
                            <Input
                              type="checkbox"
                              id={collection._id + field.name + idx}
                              checked={
                                cdCheckedItems[`cms-${collection._id}`]?.[
                                  field.name
                                ]
                              }
                              onChange={(e) => {
                                handleCDCheckboxChange(
                                  field.name,
                                  e.target.checked
                                );
                              }}
                            />
                            <Label
                              className="ms-1"
                              for={collection._id + field.name + idx}
                            >
                              {field.name}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            );
          })}

          <div
            className="ms-1 font-medium-5 mt-2"
            hidden={ClientWaiting ? false : true}
          >
            Waiting Clients ...
          </div>
          {store?.waitingClients.map((client) => {
            return (
              <div className="d-flex align-items-center justify-content-between ms-1 mt-2 w-100">
                <div className="">
                  {client.user.firstName} {client.user.lastName}
                </div>
                <div className="">
                  <Button
                    color="success"
                    className="me-1"
                    onClick={() => {
                      handleConfirmCustomerDataset(client._id, {
                        isApproved: true,
                        isDeclined: false
                      });
                    }}
                  >
                    <ImCheckmark />
                  </Button>
                  <Button
                    onClick={() => {
                      handleConfirmCustomerDataset(client._id, {
                        isApproved: true,
                        isDeclined: true
                      });
                    }}
                  >
                    <ImCross />
                  </Button>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
      {
        selectedConnectedData && <div className='h-100' style={{width: '40vw'}}>
          {
            selectedConnectedData === 'businessInfo' && (
              <div className='p-2'>
                <h3>Business Information</h3>
                <div>To make sure your site always shows the most accurate and up-to-date images of your business, add them below and place them in your site using Connected Data. </div>
                <hr/>
                <div className='d-flex'>
                  <div className='w-50 pe-1'>
                    <Label>Business Name</Label>
                    <Input value={collectionValue['Business Name'] || ''} onChange={(e) => {onChangeProfileCol('Business Name', e.target.value)}} />
                    <Label className='mt-1'>Business Type</Label>
                    <Input value={collectionValue['Business Type'] || ''} onChange={(e) => {onChangeProfileCol('Business Type', e.target.value)}} />
                  </div>
                  <div className='w-50 ps-1'>
                    <Label>Business Logo</Label>
                    <div className='d-flex align-items-end'>
                      <div style={{width: 100, height: 100, borderRadius: 5, backgroundColor: '#f4f7ff', marginTop: 5}}>
                        {
                          collectionValue['Business Logo']
                            ? <img className="w-100 h-100 border" src={collectionValue['Business Logo']} />
                            : <div
                                className='w-100 h-100 rounded d-flex flex-column align-items-center justify-content-center' 
                                style={{borderStyle: 'dashed', border: '1px dashed #2c7dff', color: '#2c7dff'}}
                                onClick={() => {
                                  setMdlOpt({...mdlOpt, images: [collectionValue['Business Logo']] || [], multiple: false, category: 'logo'});
                                  setOpenSelectImageModal(true);
                                }}>
                                <Plus size={20} color='#2c7dff' />
                                <div>Image</div>
                              </div>
                        }
                      </div>
                      {
                        collectionValue['Business Logo'] && 
                        <Button
                          className="ms-1"
                          outline color="primary"
                          onClick={() => {
                            setMdlOpt({...mdlOpt, images: [collectionValue['Business Logo']] || [], multiple: false, category: 'logo'});
                            setOpenSelectImageModal(true);
                          }}
                        >Replace</Button>
                      }
                    </div>
                  </div>
                </div>
                <hr/>
                <div>
                  <h6>Address</h6>
                  <div className='d-flex'>
                    <div className='w-50 pe-1'>
                      <Label>Location Name</Label>
                      <Input value={collectionValue['Location Name'] || ''} onChange={(e) => {onChangeProfileCol('Location Name', e.target.value)}}/>
                      <Label className='mt-1'>Location Address</Label>
                      <Input value={collectionValue['Location Address'] || ''} onChange={(e) => {onChangeProfileCol('Location Address', e.target.value)}} />
                    </div>
                    <div className='w-50 ps-1'>
                      <iframe className='w-100 mt-1' style={{height: 120}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d169827.9504260016!2d-122.4826673710496!3d37.72825663040249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1701423038189!5m2!1sen!2sbd"/>
                    </div>
                  </div>
                </div>
                <hr/>
                <div>
                  <h6>Phone Number</h6>
                  <div className='d-flex'>
                    <div className='w-50 pe-1'>
                      <Label>Label</Label>
                      <Input value={collectionValue['Phone Label'] || ''} onChange={(e) => {onChangeProfileCol('Phone Label', e.target.value)}} />
                    </div>
                    <div className='w-50 ps-1'>
                      <Label>Number</Label>
                      <Input value={collectionValue['Phone Number'] || ''} onChange={(e) => {onChangeProfileCol('Phone Number', e.target.value)}} />
                    </div>
                  </div>
                </div>
                <hr/>
                <div>
                  <h6>Email</h6>
                  <div className='d-flex'>
                    <div className='w-50 pe-1'>
                      <Label>Label</Label>
                      <Input value={collectionValue['Email Label'] || ''} onChange={(e) => {onChangeProfileCol('Email Label', e.target.value)}} />
                    </div>
                    <div className='w-50 ps-1'>
                      <Label>Email</Label>
                      <Input value={collectionValue['Email'] || ''} onChange={(e) => {onChangeProfileCol('Email', e.target.value)}} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {
            selectedConnectedData === 'businessText' && (
              <div className='p-2'>
                <h3>Business Text</h3>
                <div>To make sure your site always shows the most accurate and up-to-date content about your business, add relevant paragraphs below and insert them into your site using Connected Data. Use up to 4000 characters for each.</div>
                <hr/>
                <div>
                  <h6>About Us</h6>
                  <Input type="textarea" value={collectionValue['About Us'] || ''} onChange={(e) => {onChangeProfileCol('About Us', e.target.value)}} />
                  {/* <RichTextEditor field="address" value={collectionValue['About Us'] || ''} onChange={() => {}}/> */}
                </div>
                <hr/>
                <div>
                  <h6>Company Overview</h6>
                  <Input type="textarea" value={collectionValue['Company Overview'] || ''} onChange={(e) => {onChangeProfileCol('Company Overview', e.target.value)}} />
                  {/* <RichTextEditor field="company_overview" value={collectionValue['Company Overview'] || ''} onChange={() => {}} /> */}
                </div>
                <hr/>
                <div>
                  <h6>Business Services</h6>
                  <Input type="textarea" value={collectionValue['Business Services'] || ''} onChange={(e) => {onChangeProfileCol('Business Services', e.target.value)}} />
                  {/* <RichTextEditor field="business_services" value={collectionValue['Business Services'] || ''} onChange={() => {}} /> */}
                </div>                                         
              </div>
            )
          }
          {
            selectedConnectedData === 'businessImage' && (
              <div className='p-2'>
                <h3>Business Images</h3>
                <div>To make sure your site always shows the most accurate and up-to-date images of your business, add them below and place them in your site using Connected Data.</div>
                <div
                  className='d-flex align-items-center mt-1 text-primary cursor-pointer'
                  onClick={() => {
                    setMdlOpt({...mdlOpt, images: collectionValue['Business Images'] || [], multiple: true, category: 'images'});
                    setOpenSelectImageModal(true);
                  }}>
                  <Plus size={15} />Select Images
                </div>
                <hr/>
                {
                  collectionValue['Business Images']?.length > 0 && (
                    <div>
                      {
                        collectionValue['Business Images'].map((v, vi) => {
                          return (
                            <div key={vi}>
                              <div className="d-flex align-items-end">
                                <img className="border me-1" width={100} height={100} src={v} />
                                <Button
                                  className="me-1"
                                  outline
                                  color="primary"
                                  onClick={() => {
                                    setMdlOpt({...mdlOpt, images: [v], multiple: false, category: 'replace'});
                                    setOpenSelectImageModal(true);
                                  }}
                                >Replace</Button>
                                <Button
                                  outline
                                  color="primary"
                                  onClick={() => {
                                    const tempImgs = [...collectionValue['Business Images']];
                                    tempImgs.splice(vi, 1);
                                    dispatch(updateWebCollectionAction(collection._id, {values: {...collectionValue, 'Business Images': tempImgs}}));
                                  }}
                                >Delete</Button>
                              </div>
                              <hr/>
                            </div>
                          );
                        })
                      }
                    </div>
                  )
                }
              </div>
            )
          }
          {
            selectedConnectedData === 'dataToApprove' && (
              <div className='p-2'>
                <h3>Incoming Content</h3>
                <div className="d-flex align-items-center">
                  <div>To make sure following content is for current website, check the content and click "Approve" button.</div>
                  <Button className="ms-1" color='primary' onClick={() => {approveData(value)}}>Approve</Button>
                </div>
                {
                  store?.contentCollect?.fields && (store?.contentCollect?.fields[0]['Business Name'] || store?.contentCollect?.fields[0]['Business Type']) && (
                    <>
                      <hr/>
                      <div className='d-flex'>
                        {
                          store?.contentCollect?.fields[0]['Business Name'] && (
                            <div className='w-50 pe-1'>
                              <Label>Business Name</Label>
                              <Input type="text" disabled value={value['Business Name']} onChange={e => onChangeValue('Business Name', e.target.value)}/>
                            </div>
                          )
                        }
                        {
                          store?.contentCollect?.fields[0]['Business Type'] && (
                            <div className='w-50 ps-1'>
                              <Label>Business Type</Label>
                              <Input type="text" disabled value={value['Business Type']} onChange={e => onChangeValue('Business Type', e.target.value)} />
                            </div>
                          )
                        }
                      </div>
                    </>
                  )
                }
                {
                  store?.contentCollect?.fields && (store?.contentCollect?.fields[0]['Location Name'] || store?.contentCollect?.fields[0]['Location Address']) && (
                    <>
                      <hr/>
                      <div>
                        <h6>Address</h6>
                        <div className='d-flex'>
                          <div className='w-50 pe-1'>
                            {
                              store?.contentCollect?.fields[0]['Location Name'] && (
                                <div>
                                  <Label>Location Name</Label>
                                  <Input type="text" disabled value={value['Location Name']} onChange={e => onChangeValue('Location Name', e.target.value)} />
                                </div>
                              )
                            }
                            {
                              store?.contentCollect?.fields[0]['Location Address'] && (
                                <div className="pt-1">
                                  <Label>Location Address</Label>
                                  <Input type="text" disabled value={value['Location Address']} onChange={e => onChangeValue('Location Address', e.target.value)} />
                                </div>
                              )
                            }
                          </div>
                          {store?.contentCollect?.fields[0]['Location Address'] && (
                            <div className='w-50 ps-1'>
                              <iframe className='w-100 mt-1' style={{height: 120}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d169827.9504260016!2d-122.4826673710496!3d37.72825663040249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1701423038189!5m2!1sen!2sbd"/>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )
                }
                {
                  store?.contentCollect?.fields && (store?.contentCollect?.fields[0]['Phone Label'] || store?.contentCollect?.fields[0]['Phone Number']) && (
                    <>
                      <hr/>
                      <div>
                        <h6>Phone Number</h6>
                        <div className='d-flex'>
                          {store?.contentCollect?.fields[0]['Phone Label'] && (
                            <div className='w-50 pe-1'>
                              <Label>Label</Label>
                              <Input type="text" disabled value={value['Phone Label']} onChange={e => onChangeValue('Phone Label', e.target.value)} />
                            </div>
                          )}
                          {store?.contentCollect?.fields[0]['Phone Number'] && (
                            <div className='w-50 ps-1'>
                              <Label>Number</Label>
                              <Input type="text" disabled value={value['Phone Number']} onChange={e => onChangeValue('Phone Number', e.target.value)} />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )
                }
                {
                  store?.contentCollect?.fields && (store?.contentCollect?.fields[0]['Email Label'] || store?.contentCollect?.fields[0]['Email']) && (
                    <>
                      <hr/>
                      <div>
                        <h6>Email</h6>
                        <div className='d-flex'>
                          {store?.contentCollect?.fields[0]['Email Label'] && (
                            <div className='w-50 pe-1'>
                              <Label>Label</Label>
                              <Input type="text" disabled value={value['Email Label']} onChange={e => onChangeValue('Email Label', e.target.value)} />
                            </div>
                          )}
                          {store?.contentCollect?.fields[0]['Email'] && (
                            <div className='w-50 ps-1'>
                              <Label>Email</Label>
                              <Input type="text" disabled value={value['Email']} onChange={e => onChangeValue('Email', e.target.value)} />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )
                }
                {store?.contentCollect?.fields && store?.contentCollect?.fields[0]['About Us'] && (
                  <>
                    <hr/>
                    <div>
                      <h6>About Us</h6>
                      <Input type="textarea" disabled value={value['About Us']} onChange={e => onChangeValue('About Us', e.target.value)} />
                    </div>
                  </>
                )}
                {store?.contentCollect?.fields && store?.contentCollect?.fields[0]['Company Overview'] && (
                  <>
                    <hr/>
                    <div>
                      <h6>Company Overview</h6>
                      <Input type="textarea" disabled value={value['Company Overview']} onChange={e => onChangeValue('Company Overview', e.target.value)} />
                    </div>
                  </>
                )}
                {store?.contentCollect?.fields && store?.contentCollect?.fields[0]['Business Services'] && (
                  <>
                    <hr/>
                    <div>
                      <h6>Business Services</h6>
                      <Input type="textarea" disabled value={value['Business Services']} onChange={e => onChangeValue('Business Services', e.target.value)} />
                    </div>   
                  </>
                )}             
              </div>
            )
          }
        </div>
      }
      <CustomerDatasetModal
        showCustomerDatasetModal={showCustomerDatasetModal}
        setShowCustomerDatasetModal={setShowCustomerDatasetModal}
        customerCollectId={customerCollectId}
        store={store}
      />
      <FileSelectUploadModal
        store={store}
        open={openSelectImageModal}
        toggle={() => {setOpenSelectImageModal(!openSelectImageModal)}}
        images={mdlOpt.images || []}
        multiple={mdlOpt.multiple || false}
        onSelect={(images) => {
          if (mdlOpt.category === 'logo') {
            dispatch(updateWebCollectionAction(collection._id, {values: {...collectionValue, 'Business Logo': images[0]}}));
          }
          if (mdlOpt.category === 'images') {
            dispatch(updateWebCollectionAction(collection._id, {values: {...collectionValue, 'Business Images': images}}));
          } 
          if (mdlOpt.category === 'replace') {
            const tempImgs = [...collectionValue['Business Images']] || [];
            const tempIndex = tempImgs.indexOf(mdlOpt.images[0]);
            tempImgs.splice(tempIndex, 1, images[0]);
            dispatch(updateWebCollectionAction(collection._id, {values: {...collectionValue, 'Business Images': tempImgs}}));
          }
        }}
      />
    </div>
  );
}

export default ContentSideBar;