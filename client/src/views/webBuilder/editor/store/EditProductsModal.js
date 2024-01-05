import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { ChevronDown, Plus } from 'react-feather';
import CollectionField from './fields';
import FieldTypeModal from './FieldTypeModal';
import AddFieldModal from './AddFieldModal';
import AddItemField from './addItemFields';
// import { updateProductDatasetAction } from '../../store/action';
import { setWebStoreReducer } from '../../store/reducer';

const EditProductsModal = ({ store, showEditProductsModal, setShowEditProductsModal }) => {
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState('multiple');
  const [newFieldType, setNewFieldType] = useState('');
  const [openFieldTypeModal, setOpenFieldTypeModal] = useState(false);
  const [openAddFieldModal, setOpenAddFieldModal] = useState(false);
  const [addNewItem, setAddNewItem] = useState(false);
  const [newItemToAdd, setNewItemToAdd] = useState({});
  const dispatch = useDispatch();

  const fieldTypeToggle = () => {
    setOpenFieldTypeModal(!openFieldTypeModal);
  };

  const addFieldToggle = () => {
    setOpenAddFieldModal(!openAddFieldModal);
  };

  const onChange = (fieldName, changedValue, index) => {
    let updatedWebProducts = { ...store?.webProducts };
    let updatedValues = [...updatedWebProducts.values];
    updatedValues[index] = { ...updatedValues[index], [fieldName]: changedValue };
    updatedWebProducts.values = updatedValues;
    dispatch(setWebStoreReducer(updatedWebProducts));
    // console.log(fieldName);
  };

  const onBlur = (fieldName, changedValue, index) => {
    if (((store?.webProducts.values[index][fieldName] == undefined || store?.webProducts.values[index][fieldName] == null) && (changedValue == null || changedValue == undefined || changedValue == "")) || store?.webProducts.values[index][fieldName] == changedValue) return;
    let updatedWebProducts = { ...store?.webProducts };
    let updatedValues = [...updatedWebProducts.values];
    updatedValues[index] = { ...updatedValues[index], [fieldName]: changedValue };
    updatedWebProducts.values = updatedValues;
    // dispatch(updateProductDatasetAction(store?.form?._id, { values: updatedValues }));
    // console.log(fieldName);
  };

  const removeProduct = (index) => {
    let updatedValues = [...store?.webProducts.values];
    updatedValues.splice(index, 1);
    // dispatch(updateProductDatasetAction(store?.form?._id, { values: updatedValues }));
  }

  const onChangeAddItem = (valueObj) => {
    setNewItemToAdd({ ...newItemToAdd, ...valueObj });
  };

  const saveNewItem = () => {
    // if (collection) {
    const currentDateString = new Date().toLocaleString();
    const newItemId = `item-${new Date().getTime().toString()}`;
    const newItem = {
      ...newItemToAdd,
      id: newItemId,
      createdAt: currentDateString,
      updatedAt: currentDateString,
    }
    // dispatch(updateProductDatasetAction(store?.form?._id, { values: [...store?.webProducts?.values, newItem] })).then((res) => {
    //   if (res.success) {
    //     // setOpenEditCollection({ ...openCollection, data: res.data });
    //   }
    // });

    setAddNewItem(false);
  };

  const addEmptyItem = () => {
    if (store?.webProducts) {
      const currentDateString = new Date().toLocaleString();
      const newItemId = `item-${new Date().getTime().toString()}`;
      const newItem = {
        id: newItemId,
        createdAt: currentDateString,
        updatedAt: currentDateString,
      }
      // dispatch(updateProductDatasetAction(store?.form?._id, { values: [...store?.webProducts?.values, newItem] })).then((res) => {
      //   if (res.success) {
      //     // setOpenEditCollection({ ...openCollection, data: res.data });
      //   }
      // });
    }
  };

  return (
    <>
      <Modal isOpen={showEditProductsModal} toggle={() => setShowEditProductsModal(!showEditProductsModal)} centered size='xl'>
        <ModalHeader toggle={() => setShowEditProductsModal(!showEditProductsModal)} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Product List</h4>
        </ModalHeader>
        {
          !addNewItem && (
            <ModalBody className='p-0'>
              <div style={{ height: '70vh' }}>
                <div className='p-2 d-flex align-items-center' style={{ backgroundColor: '#eceff3' }}>
                  {/* <div>
                    <h5>{`CMS > ${collection?.name}`}</h5>
                    <b><h3 className='mb-0'>{collection?.name}</h3></b>
                  </div> */}
                  <Button color='primary' outline className='round ms-auto me-1'>
                    More Actions
                    <ChevronDown size={15} className='ms-1' />
                  </Button>
                  <Button color='primary' className='d-flex align-items-center round' onClick={() => setAddNewItem(true)}>
                    <Plus size={15} className='me-1' />
                    Add Item
                  </Button>
                </div>
                <div className='mb-2 mt-1'>
                  {
                    store?.webProducts && (
                      <table>
                        <thead>
                          <th style={{ padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', backgroundColor: '#e7f0ff' }}></th>
                          {
                            store?.webProducts.fields?.length > 0 && store?.webProducts.fields.map(e => {
                              if (!e.default) {
                                return (
                                  <th style={{ padding: '8px 20px 8px 20px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', backgroundColor: '#e7f0ff' }}>{e.name}</th>
                                );
                              }
                            })
                          }
                          <th style={{ padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', backgroundColor: '#e7f0ff' }}></th>
                          <th style={{ padding: '8px 20px 8px 20px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', backgroundColor: '#e7f0ff', color: '#7caeff' }}><a onClick={fieldTypeToggle}>+ Add Field</a></th>
                        </thead>
                        <tbody>
                          {
                            store?.webProducts.values?.length > 0 && store?.webProducts.values.map((e, idx) => {
                              return (
                                <tr>
                                  <td style={{ padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', color: '#7caeff' }}>{idx + 1}</td>
                                  {
                                    store?.webProducts.fields?.length > 0 && store?.webProducts.fields.map((f, index) => {
                                      if (!f.default) {
                                        return (
                                          <td style={{ borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff' }}>
                                            <CollectionField field={f.name} type={f.type} value={e[f.name] || null} onChange={onChange} isDefault={f.default} index={idx} onBlur={onBlur} />
                                          </td>
                                        );
                                      }
                                    })
                                  }
                                  <td style={{ padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', color: '#7caeff' }}>
                                    <svg viewBox="0 0 24 24" style={{ width: "24px", cursor: "pointer" }} onClick={() => removeProduct(idx)}><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path></svg>
                                  </td>
                                </tr>
                              )
                            })
                          }
                          {
                            store?.webProducts.values?.length > 0 && (
                              <tr>
                                <td style={{ padding: '8px 10px 8px 10px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', color: '#7caeff' }}></td>
                                <td style={{ padding: '8px 20px 8px 20px', borderRight: '1px solid #cbdfff', borderBottom: '1px solid #cbdfff', color: '#7caeff' }}><b><a onClick={addEmptyItem}>+ Add Item</a></b></td>
                              </tr>
                            )
                          }
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
              <div className='p-2 d-flex flex-column align-items-center' style={{ backgroundColor: '#eceff3', height: '70vh' }}>
                <div style={{ width: '60%', height: 'fit-content' }}>
                  <div className='d-flex align-items-center w-100' style={{ height: 80 }}>
                    {/* <div>
                      <h5>{`CMS > ${collection?.name} > Add new item`}</h5>
                      <b><h3 className='mb-0'>{'Add new item'}</h3></b>
                    </div> */}
                    <Button color='primary' outline className='round ms-auto me-1' onClick={() => setAddNewItem(false)}>
                      Cancel
                    </Button>
                    <Button color='primary' className='d-flex align-items-center round' onClick={() => saveNewItem()}>
                      Save
                    </Button>
                  </div>
                  <div className='mt-2' style={{ backgroundColor: 'white', height: 'calc(70vh - 200px)', width: '100%', borderRadius: 5, overflow: 'scroll' }}>
                    <div className='pt-1 px-2 fs-4'>Item content</div>
                    <hr />
                    {
                      store?.webProducts?.fields.length > 0 && store?.webProducts?.fields.map((field) => {
                        if (!field.default) {
                          return (
                            <div className='px-2 pb-1'>
                              <Label className='fs-5'>{field.name}</Label><br />
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
        collection={store?.webProducts}
        openCollection={showEditProductsModal}
        setOpenEditCollection={setShowEditProductsModal}
        store={store}
      />
    </>
  );
}

export default EditProductsModal;
