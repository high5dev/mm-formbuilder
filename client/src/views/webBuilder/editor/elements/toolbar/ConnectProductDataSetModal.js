import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { MoreVertical, Send, Image, ChevronDown, ChevronRight, Link2, ChevronLeft } from 'react-feather';
import { isObjEmpty, selectThemeColors } from '@utils'
import Select, { components } from 'react-select';

const ConnectProductDataSetModal = ({ store, storeProducts, showProductDataSetModal, setShowProductDataSetModal, modelsToConnect, datasetConnect, setDatasetFields }) => {
  const [viewConnection, setViewConnection] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [fieldsOfCollection, setFieldsOfCollection] = useState([]);
  const [selectedField, setSelectedField] = useState('');

  useEffect(() => {
    if (storeProducts?.fields?.length > 0) {
      const tempFields = [];
      storeProducts?.fields.map(f => {
        tempFields.push({ value: f.name, label: f.name });
      });
      setFieldsOfCollection(tempFields);
    }
  }, [storeProducts]);

  const changeField = (data) => {
    setSelectedField(data);
    const existingItemIndex = datasetConnect.findIndex(item => item.id === selectedModel.ccid);

    if (existingItemIndex !== -1) {
      // Update the name if the ID exists
      datasetConnect[existingItemIndex].name = data.value;
    } else {
      // Add a new item if the ID doesn't exist
      datasetConnect.push({ id: selectedModel.ccid, name: data.value });
    }
    setDatasetFields(datasetConnect);
  }

  return (
    <>
      <Modal isOpen={showProductDataSetModal} toggle={() => { setShowProductDataSetModal(!showProductDataSetModal); setViewConnection(false); }} centered size='md'>
        <ModalHeader toggle={() => { setShowProductDataSetModal(!showProductDataSetModal); setViewConnection(false); }} className="font-medium-5 px-2 py-1 modal-title text-primary">
          Connect to Product Dataset
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between p-2" style={{ minHeight: 400 }}>
          {
            viewConnection ? (
              <div className='d-flex flex-column flex-1'>
                <Badge className='mb-1 round px-2' style={{ width: 'fit-content', cursor: 'pointer' }} color='light-primary' onClick={() => setViewConnection(false)}>
                  <ChevronLeft size={14} className='me-1' />
                  Back to connections
                </Badge>
                <div className='bg-light-secondary d-flex justify-content-center'>
                  <Label className="mdl-select-main-menu-label fs-6 my-1" for="mdl-select-main-menu">
                    Connect {selectedModel?.attributes.type}
                  </Label>
                </div>
                {/* <Label className="mdl-select-main-menu-label fs-6 mt-1" for="mdl-select-main-menu">
                  Choose a dataset
                </Label>
                <Select
                  id="mdl-select-main-menu"
                  className="react-select mb-1"
                  classNamePrefix="select"
                  isClearable={false}
                  options={dataSets}
                  theme={selectThemeColors}
                  value={selectedDataset}
                  onChange={(data) => { handleSelectChangeDataSet(data); }}
                /> */}
                <div className='bg-light-secondary d-flex justify-content-center'>
                  <Label className="mdl-select-main-menu-label fs-6 my-1" for="mdl-select-main-menu">
                    Connect Options
                  </Label>
                </div>
                <Label className="mdl-select-main-menu-label fs-6 mt-1" for="mdl-select-main-menu">
                  {selectedModel?.attributes.type} connects to
                </Label>
                <Select
                  id="mdl-select-main-menu"
                  className="react-select mb-1"
                  classNamePrefix="select"
                  isClearable={false}
                  options={fieldsOfCollection}
                  theme={selectThemeColors}
                  value={selectedField}
                  onChange={(data) => { changeField(data); }}
                />
              </div>
            ) : (
              <div className='d-flex flex-column flex-1 ps-1'>
                {/* {
                  dataSets?.length > 0 ? (
                    <>
                      <Label className="mdl-select-main-menu-label fs-6" for="mdl-select-main-menu">
                        Choose a dataset
                      </Label>
                      <Select
                        id="mdl-select-main-menu"
                        className="react-select mb-1"
                        classNamePrefix="select"
                        isClearable={false}
                        options={dataSets}
                        theme={selectThemeColors}
                        value={selectedDataset}
                        onChange={(data) => { handleSelectChangeDataSet(data); }}
                      />
                    </>
                  ) : (
                    <>
                      <Label className="mdl-select-main-menu-label fs-6" for="mdl-select-main-menu">
                        Start by creating a dataset
                      </Label>
                      <Button color="primary" className="add-todo-item me-1 align-self-center mt-1" onClick={() => { }}>
                        Create Dataset
                      </Button>
                    </>
                  )
                } */}
                <div className='bg-light-secondary d-flex justify-content-center'>
                  <Label className="mdl-input-category-label fs-6 my-1" for="mdl-input-category">
                    Connections
                  </Label>
                </div>
                {
                  modelsToConnect.length > 0 ? (
                    <ListGroup>
                      {
                        modelsToConnect.map((connect) => {
                          return <ListGroupItem className='item-to-connect'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div className='d-flex flex-column align-items-start'>
                                <Label className="mdl-input-category-label fs-6" for="mdl-input-category">
                                  {connect?.attributes.type || 'Connection name'}
                                </Label>
                                <Label className="mdl-input-category-label fs-7" for="mdl-input-category">
                                  {connect?.description ? ('Connected to ' + connect?.description) : 'Not connected'}
                                </Label>
                              </div>
                              <div className='d-flex'>
                                <Link2 size={17} className='me-2' color='#7fb1ff' />
                                <ChevronRight size={17} onClick={() => {
                                  if (connect?.description) {
                                    setSelectedField(connect?.description);
                                  }
                                  setSelectedModel(connect);
                                  setViewConnection(true);
                                }} color='#7fb1ff' style={{ cursor: 'pointer' }} />
                              </div>
                            </div>
                            <hr className='m-0' />
                          </ListGroupItem>;
                        })
                      }
                    </ListGroup>
                  ) : (
                    <Label className="mdl-input-category-label fs-5 align-self-center" for="mdl-input-category">
                      No connection...
                    </Label>
                  )
                }
              </div>
            )
          }

        </ModalBody>
      </Modal>
    </>
  );
}

export default ConnectProductDataSetModal;
