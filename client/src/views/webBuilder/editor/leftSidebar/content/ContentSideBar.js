import React, {useEffect, useRef, useState} from "react";
import { ChevronDown, ChevronRight, Edit, Key, Link, MoreHorizontal, Plus, Trash, List } from "react-feather";
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, UncontrolledDropdown } from "reactstrap";
import RichTextEditor from "./RichTextEditor";
import { useDispatch } from "react-redux";
import { CustomerDatasetModal } from "../../store/customerDataset/CustomerDatasetModal";
import { createContentCollectAction, deleteWebCollectionAction, getContentCollectAction, getContentCollectByColAction, saveContentDataAction, updateWebCollectionAction } from "../../../store/action";
import { CiWarning } from "react-icons/ci";
import { toast } from "react-toastify";
import FileSelectUploadModal from "./FileSelectUploadModal";
import Select from 'react-select';
import { selectThemeColors } from '@utils'
import AddItemField from "../../cms/collection/addItemFields";
import EditCollectionSection from "../../cms/collection/EditCollectionSection";

const ContentSideBar = ({store, openCreateModalToggle}) => {
  const dispatch = useDispatch();
  const [selectedConnectedData, setSelectedConnectedData] = useState('');
  const [customerCollectId, setCustomerCollectId] = useState('');
  const [showCustomerDatasetModal, setShowCustomerDatasetModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openSelFields, setOpenSelFields] = useState(false);
  const [cdCheckedItems, setCDCheckedItems] = useState([]);
  const [collection, setCollection] = useState(null);
  const [collectionValue, setCollectionValue] = useState({});
  const [value, setValue] = useState({});
  const [openSelectImageModal, setOpenSelectImageModal] = useState(false);
  const [mdlOpt, setMdlOpt] = useState({images: [], multiple: false, category: ''});
  const [collections, setCollections] = useState([]);
  const [selectedIncomeData, setSelectedIncomeData] = useState({});
  const [collectionToOpen, setCollectionToOpen] = useState({ isOpen: false, data: {} });
  const editValues = useRef({});

  useEffect(() => {
    if (store?.webCollections?.length > 0) {
      const colSelectorData = [];
      store.webCollections.forEach(c => {
        colSelectorData.push({value: c._id, label: c.name});
        setCollections(colSelectorData);
      });
    }
  }, [store?.webCollections]);

  useEffect(() => {
    if (selectedIncomeData?.contentCol?.values?.length > 0) {
      editValues.current = {...selectedIncomeData.contentCol.values[0]};
    }
  }, [selectedIncomeData?.contentCol])

  useEffect(() => {
    setInterval(() => {
      if (store?.form?._id) {
        dispatch(getContentCollectByColAction({websiteId: store?.form?._id}));
      }
    }, 5000);
  }, []);

  useEffect(() => {
      if (store?.contentCollect?.values?.length > 0) {
        setValue(store.contentCollect.values[0]);
      }
  }, [store.contentCollect]);

  useEffect(() => {
    if (collection) {
      let tempFields = [];
      collection.fields.map(field => {
        tempFields.push(field);
      });
      setCDCheckedItems(tempFields);
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
          fields: cdCheckedItems,
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
    if (isChecked) {
      const tempField = collection.fields.find(e => e.name === field);
      setCDCheckedItems([...cdCheckedItems, tempField])
    } else {
      const tempCheckedFields = [...cdCheckedItems];
      const index = tempCheckedFields.findIndex(e => e.name === field);
      tempCheckedFields.splice(index, 1);
      setCDCheckedItems(tempCheckedFields);
    }
  };

  const approveData = () => {
    let newValues = [];
    if (selectedIncomeData.webCol.type === 'multiple') {
      newValues = [...selectedIncomeData.webCol.values, editValues.current];
    } else {
      newValues = [editValues.current];
    }
    dispatch(updateWebCollectionAction(selectedIncomeData.webCol._id, {values: newValues})).then((res1) => {
      if (res1.success) {
        dispatch(saveContentDataAction(selectedIncomeData.contentCol._id, {isApproved: 'approved'})).then((res2) => {
          if (res2.success) {
            toast.success('Add content successfully');
            setCollectionToOpen({...collectionToOpen, data: res1.data});
          }
        });
      }
    });
    setSelectedConnectedData('open-collection');
    setSelectedCategory('collections');
  };

  const onChangeValue = (key, data) => {
    setValue({...value, [key]: data});
  };

  const onChangeProfileCol = (key, data) => {
    setCollectionValue({...collectionValue, [key]: data});
    dispatch(updateWebCollectionAction(collection._id, {values: {...collectionValue, [key]: data}}));
  };

  const handleChangeValue = (newValueObj) => {
    editValues.current = { ...editValues.current, ...newValueObj };
  }

  return (
    <div className="h-100 d-flex" style={{overflow: 'scroll'}}>
      <div className="h-100 d-flex flex-column border-end" style={{width: 350}}>
        <div className="d-flex justify-content-center align-items-center p-2 pb-0 flex-column">
          <div style={{textAlign: 'center'}}>Send clients a content request form to get site texts, images and other files.</div>
          <h5 className='mt-1 align-self-start'>Collection</h5>
          <Select
            theme={selectThemeColors}
            className='align-self-start w-100 react-select'
            classNamePrefix='select'
            // value={collection?._id || ''}
            options={collections}
            isClearable={false}
            onChange={({ value }) => {
              setCollection(store?.webCollections?.find(c => c._id === value));
            }}
          />
          <div className="align-self-start mt-1 w-100">
            <div className='d-flex justify-content-between align-items-center cursor-pointer mb-1' onClick={() => {setOpenSelFields(!openSelFields)}}>
              <h5 className="mb-0">Select fields</h5>
              {
                openSelFields ? <ChevronDown className='me-1' size={15} /> : <ChevronRight className='me-1' size={15} />
              }
            </div>
            {
              openSelFields && (
                <div className="mb-1">
                  {
                    collection?.fields?.map((field, idx) => {
                      // if (!field.isDefault) {
                        return (
                          <div className="d-flex ms-1">
                            <Input
                              type="checkbox"
                              id={collection._id + field.name + idx}
                              checked={
                                cdCheckedItems.find(e => e.name === field.name)
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
                      // }
                    })
                  }
                </div>
              )
            }
          </div>
          <div className="d-flex justify-content-around ">
            <Button
              color="primary"
              outline
              disabled={!collection}
              onClick={collectFromClient}
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
        </div>

        {
          store?.contentCollect?.length > 0 && (
            <div>
              <hr/>
              <div className='d-flex justify-content-between align-items-center  cursor-pointer' onClick={() => {setSelectedCategory(selectedCategory === 'incoming_data' ? '' : 'incoming_data');}}>
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
                  <div className="mt-1">
                    {
                      store?.contentCollect?.map(c => {
                        const tempCol = store?.webCollections?.find(e => e._id === c.collectionId);
                        return <div
                          className={`cursor-pointer px-1 mx-1 ${c._id === selectedIncomeData?.contentCol?._id ? 'selected-connected-data' : ''}`}
                          style={{paddingTop: 10, paddingBottom: 10}}
                          onClick={() => {
                            setSelectedIncomeData({...selectedIncomeData, contentCol: c, webCol: tempCol});
                            setSelectedConnectedData('dataToApprove');
                          }}>
                          {tempCol?.name || ''}
                        </div>
                      })
                    }
                  </div>
                )
              }
            </div>
          )
        }
        <hr/>
        <div>
          <div className='d-flex justify-content-between align-items-center  cursor-pointer' onClick={() => {setSelectedCategory(selectedCategory === 'collections' ? '' : 'collections');}}>
            <h5 className='ms-1 mb-0'>Collections</h5>
            {
              selectedCategory === 'collections' ? <ChevronDown className='me-1' size={15} /> : <ChevronRight className='me-1' size={15} />
            }
          </div>
          {
            selectedCategory === 'collections' && (
              <div className="d-flex flex-column align-items-centers mt-1">
                {
                  store?.webCollections?.map((c, ci) => {
                    // if (!c.isProfile) {
                      return <div key={ci} className={`d-flex align-items-center justify-content-between px-2 collection-item ${c._id === collectionToOpen.data._id ? 'selected-connected-data' : ''}`}
                          style={{paddingTop: 5, paddingBottom: 5}}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedConnectedData('open-collection');
                            setCollectionToOpen({...collectionToOpen, data: c});
                          }}
                        >
                        <div className='d-flex align-items-center'>
                          <List size={17} className='me-1' color='#66b1f0' />
                          <div className='fs-6'>
                            {c.name} <br/>
                            {c.values.length === 1 ? `${c.values.length} item` : c.values.length === 0 ? 'No item' : `${c.values.length} items`}
                          </div>
                        </div>
                        <UncontrolledDropdown className='more-dropdown'>
                          <DropdownToggle tag='span' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                            <MoreHorizontal size={17} className='more-icon'/>
                          </DropdownToggle>
                          <DropdownMenu end className='more-menu'>
                            {/* <DropdownItem className='w-100' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                              <Edit size={15} className='me-1'/>
                              Edit settings
                            </DropdownItem>
                            <DropdownItem className='w-100' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                              <Key size={15} className='me-1'/>
                              Permissions & privacy
                            </DropdownItem>
                            <DropdownItem className='w-100' onClick={(e) => {e.stopPropagation(); e.preventDefault();}}>
                              <Link size={15} className='me-1'/>
                              Add dynamic page
                            </DropdownItem> */}
                            <DropdownItem className='w-100' onClick={(e) => {
                                e.stopPropagation(); e.preventDefault();
                                dispatch(deleteWebCollectionAction(c._id));
                              }}>
                              <Trash size={15} className='me-1'/>
                              Delete collection
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>;
                    // }
                  })
                }
                <Button
                  color='primary'
                  style={{width: 200}}
                  className='my-1 align-self-center'
                  onClick={() => {
                    openCreateModalToggle();
                  }}
                >
                  Create Collection
                </Button>
              </div>
            )
          }
        </div>
        <hr/>
      </div>
      {
        selectedConnectedData === 'dataToApprove' && (
          <div className='h-100' style={{width: '40vw'}}>
            <div className='p-2'>
              <h3>Incoming Content</h3>
              <div className="d-flex align-items-center">
                <div>To make sure following content is for current website, check the content and click "Approve" button.</div>
                <Button className="ms-1" color='primary' onClick={() => {approveData()}}>Approve</Button>
              </div>
              <div className="mt-1" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: 20, rowGap: 10}}>
              {
                  selectedIncomeData?.webCol?.fields?.map((field, i) => {
                      const incomeField = selectedIncomeData?.contentCol?.fields?.find(f => f.name === field.name);
                      if (field.type === 'Date' || field.type === 'Time') {
                          return <div>
                              <div className='font-medium-1'>{field.name}<span className="text-primary ms-1">{incomeField ? '(form field)' : ''}</span></div>
                              <AddItemField key={field.name + '-' + i} field={{...field, defaultValue: selectedIncomeData.contentCol.values[0][field.name] || ''}} type={field?.type} onChange={(e) => {handleChangeValue(e)}} />
                          </div>;
                      } else if (field.type !== 'Image' && field.type !== 'Video' && field.type !== 'Audio' && field.type !== 'Rich text' && field.type !== 'Rich content' && field.type !== 'Address' && field.type !== 'Object' && field.type !== 'Array') {
                          return <div>
                              <div className='font-medium-1'>{field.name}<span className="text-primary ms-1">{incomeField ? '(form field)' : ''}</span></div>
                              <AddItemField key={field.name + '-' + i} field={{...field, defaultValue: selectedIncomeData.contentCol.values[0][field.name] || ''}} type={'Text'} onChange={(e) => {handleChangeValue(e)}} />
                          </div>;
                      }
                  })
              }
              </div>
              {
                  selectedIncomeData?.webCol?.fields?.map((field, i) => {
                    const incomeField = selectedIncomeData?.contentCol?.fields?.find(f => f.name === field.name);
                      if ( field.type === 'Rich text' || field.type === 'Rich content' || field.type === 'Address' || field.type === 'Object' || field.type === 'Array') {
                          return <div className='mt-1'>
                              <div className='font-medium-1'>{field.name}<span className="text-primary ms-1">{incomeField ? '(form field)' : ''}</span></div>
                              <AddItemField key={field.name + '-' + i} field={{...field, defaultValue: selectedIncomeData.contentCol.values[0][field.name] || ''}} type={'Array'} onChange={(e) => {handleChangeValue(e)}} />
                          </div>;
                      }
                      if (field.type === 'Image' || field.type === 'Video' || field.type === 'Audio') {
                          return <div className='mt-1'>
                              <div className='font-medium-1'>{field.name}<span className="text-primary ms-1">{incomeField ? '(form field)' : ''}</span></div>
                              <div key={field.name + '-' + i} className='d-flex mt-1'>
                                  <div
                                      className='rounded d-flex flex-column align-items-center justify-content-center' 
                                      style={{borderStyle: 'dashed', border: '1px dashed #2c7dff', color: '#2c7dff', width: 100, height: 100}}
                                      onClick={() => {
                                          // setSelectedField(field.name);
                                          // setOpenSelectImageModal(true);
                                      }}>
                                      <Plus size={20} color='#2c7dff' />
                                      <div>Select File</div>
                                  </div>
                                  <div className='ms-1'>
                                      File Url: <br/>{selectedIncomeData.contentCol.values[0][field.name] || ''}
                                  </div>
                              </div>
                              Upload a file or <a style={{color: '#2c7dff', borderBottom: '1px solid #2c7dff'}} onClick={() => {
                                  // setSelectedField(field.name);
                                  // toggleURLModal();
                              }}>add a file URL</a>
                          </div>;
                      }
                  })
              }
            </div>
          </div>
        )
      }
      {
        selectedConnectedData === 'open-collection' && (
          <div className='h-100' style={{width: '60vw'}}>
            <EditCollectionSection openCollection={collectionToOpen} setOpenEditCollection={setCollectionToOpen} />
          </div>
        )
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