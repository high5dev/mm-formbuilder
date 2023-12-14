import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { ChevronDown, HelpCircle, Info, Plus } from 'react-feather';
import CollectionField from './fields';
import FieldTypeModal from './FieldTypeModal';
import AddFieldModal from './AddFieldModal';
import AddItemField from './addItemFields';
import { updateWebCollectionAction } from '../../../store/action';
import { collectionFieldTypes } from '../../util';

let types = [];
collectionFieldTypes.map((fieldType) => {types = [...types, ...fieldType.types]});

const EditCollectionModal = ({ store, editor, setEditor, openCollection, setOpenEditCollection, toggle }) =>{
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState('multiple');
  const [collection, setCollection] = useState(openCollection.data);
  const [newFieldType, setNewFieldType] = useState('');
  const [openFieldTypeModal, setOpenFieldTypeModal] = useState(false);
  const [openAddFieldModal, setOpenAddFieldModal] = useState(false);
  const [addNewItem, setAddNewItem] = useState(false);
  const [newItemToAdd, setNewItemToAdd] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setName('');
    setSelectedValue('multiple');
  }, [openCollection.isOpen]);

  useEffect(() => {
    if (openCollection?.data)
      setCollection(openCollection.data);
  }, [openCollection?.data])

  const fieldTypeToggle = () => {
    setOpenFieldTypeModal(!openFieldTypeModal);
  };

  const addFieldToggle = () => {
    setOpenAddFieldModal(!openAddFieldModal);
  };

  const onChange = (fieldName, changedValue, rowId) => {
    const changedRow = collection.values[rowId];
    changedRow[fieldName] = changedValue;
    const tempValues = [...collection.values];
    tempValues.splice(rowId, 1, changedRow);
    dispatch(updateWebCollectionAction(collection._id, {values: tempValues}));
  };

  const onChangeAddItem = (valueObj) => {
    setNewItemToAdd({...newItemToAdd, ...valueObj});
  };

  const saveNewItem = () => {
    if (collection) {
      const currentDateString = new Date().toLocaleString();
      const newItemId = `item-${new Date().getTime().toString()}`;
      const newItem = {
        ...newItemToAdd,
        id: newItemId,
        createdAt: currentDateString,
        updatedAt: currentDateString,
      }
      
      dispatch(updateWebCollectionAction(collection._id, {values: [...collection.values, newItem]})).then((res) => {
        if (res.success) {
          setOpenEditCollection({...openCollection, data: res.data});
        }
      });
    }
    setAddNewItem(false);
  };

  const addEmptyItem = () => {
    if (collection) {
      const currentDateString = new Date().toLocaleString();
      const newItemId = `item-${new Date().getTime().toString()}`;
      const newItem = {
        id: newItemId,
        createdAt: currentDateString,
        updatedAt: currentDateString,
      }
      dispatch(updateWebCollectionAction(collection._id, {values: [...collection.values, newItem]})).then((res) => {
        if (res.success) {
          setOpenEditCollection({...openCollection, data: res.data});
        }
      });
    }
  };

  return (
    <>
      <Modal isOpen={openCollection.isOpen} toggle={toggle} centered size='xl'>
        <ModalHeader toggle={toggle} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>CMS</h4>
        </ModalHeader>
        {
          !addNewItem && (
            <ModalBody className='p-0'>
              <div style={{height: '70vh'}}>
                <div className='p-2 d-flex align-items-center' style={{backgroundColor: '#eceff3'}}>
                  <div>
                    <h5>{`CMS > ${collection?.name}`}</h5>
                    <b><h3 className='mb-0'>{collection?.name}</h3></b>
                  </div>
                  <Button color='primary' outline className='round ms-auto me-1'>
                    More Actions
                    <ChevronDown size={15} className='ms-1'/>
                  </Button>
                  <Button color='primary' className='d-flex align-items-center round' onClick={() => {setAddNewItem(true); setNewItemToAdd({});}}>
                    <Plus size={15} className='me-1'/>
                    Add Item
                  </Button>
                </div>
                <div className='mb-2 mt-1'>
                  {
                    collection && (
                      <table>
                        <thead>
                          <th style={{padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', backgroundColor: '#e7f0ff'}}></th>
                          {
                            collection.fields?.length > 0 && collection.fields.map(e => {
                              const icon = types.find(ty => ty.name === e.type).icon;
                              if (!e.default) {
                                return (
                                  <th style={{padding: '8px 20px 8px 20px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', backgroundColor: '#e7f0ff'}}>
                                    {icon}
                                    {` ${e.name}`}
                                    {e.helpText && <>
                                      <Info size={14} className='ms-1' color='#7caeff' id="helpInfo"/>
                                      <UncontrolledTooltip
                                        placement='top'
                                        // isOpen={tooltipOpen}
                                        target='helpInfo'
                                        // toggle={() => setTooltipOpen(!tooltipOpen)}
                                      >
                                        {e.helpText || ''}
                                      </UncontrolledTooltip>
                                    </>}
                                  </th>
                                );
                              }
                            })
                          }
                          <th style={{padding: '8px 20px 8px 20px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', backgroundColor: '#e7f0ff', color: '#7caeff'}}><a onClick={fieldTypeToggle}>+ Add Field</a></th>
                        </thead>
                        <tbody>
                          {
                            collection.values?.length > 0 && collection.values.map((e, idx) => {
                              return (
                                <tr>
                                  <td style={{padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', color: '#7caeff'}}>{idx + 1}</td>
                                  {
                                    collection.fields?.length > 0 && collection.fields.map(f => {
                                      if (!f.default) {
                                        return (
                                          <td style={{borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff'}}>
                                            <CollectionField field={f.name} type={f.type} value={e[f.name] || null} rowId={idx} onChange={onChange} isDefault={f.default}/>
                                          </td>
                                        );
                                      }
                                    })
                                  }
                                </tr>
                              )
                            })
                          }
                          {/* {
                            collection.values?.length > 0 && (
                              <tr>
                                <td style={{padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', color: '#7caeff'}}></td>
                                <td style={{padding: '8px 20px 8px 20px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', color: '#7caeff'}}><b><a onClick={addEmptyItem}>+ Add Item</a></b></td>
                              </tr>
                            )
                          } */}
                        </tbody>
                      </table>
                    )
                  }
                </div>
              </div>
            </ModalBody>
          )
        }
        {
          addNewItem && (
            <ModalBody className='p-0'>
              <div className='p-2 d-flex flex-column align-items-center' style={{backgroundColor: '#eceff3', height: '70vh'}}>
                <div style={{width: '60%', height: 'fit-content'}}>
                  <div className='d-flex align-items-center w-100' style={{height: 80}}>
                    <div>
                      <h5>{`CMS > ${collection?.name} > Add new item`}</h5>
                      <b><h3 className='mb-0'>{'Add new item'}</h3></b>
                    </div>
                    <Button color='primary' outline className='round ms-auto me-1' onClick={() => setAddNewItem(false)}>
                      Cancel
                    </Button>
                    <Button color='primary' className='d-flex align-items-center round' onClick={() => saveNewItem()}>
                      Save
                    </Button>
                  </div>
                  <div className='mt-2' style={{backgroundColor: 'white', height: 'calc(70vh - 200px)', width: '100%', borderRadius: 5, overflow: 'scroll'}}>
                    <div className='pt-1 px-2 fs-4'>Item content</div>
                    <hr />
                    {
                      collection?.fields?.length > 0 && collection.fields.map((field) => {
                        if (!field.default) {
                          return (
                            <div className='px-2 pb-1'>
                              <Label className='fs-5'>{`${field.name} ${field.isRequired ? '*' : ''}`}</Label><br/>
                              <AddItemField field={field} type={field.type} onChange={onChangeAddItem} />
                            </div>
                          );
                        }
                      })
                    }
                  </div>
                </div>
              </div>
            </ModalBody>
          )
        }
        
      </Modal>
      <FieldTypeModal
        open={openFieldTypeModal}
        toggle={fieldTypeToggle}
        addFieldToggle={addFieldToggle}
        setNewFieldType={setNewFieldType}
      />
      <AddFieldModal
        open={openAddFieldModal}
        toggle={addFieldToggle}
        fieldTypeToggle={fieldTypeToggle}
        fieldType={newFieldType}
        collection={collection}
        openCollection={openCollection}
        setOpenEditCollection={setOpenEditCollection}
      />
    </>
  );
}

export default EditCollectionModal;
