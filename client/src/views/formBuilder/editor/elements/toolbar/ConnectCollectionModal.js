import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { MoreVertical, Send, Image, ChevronDown, ChevronRight, Link2, ChevronLeft } from 'react-feather';
import { isObjEmpty, selectThemeColors } from '@utils'
import Select, { components } from 'react-select';
import { useDispatch } from 'react-redux';

const ConnectCollectionModal = ({ store, connectData, setConnectData, modelsToConnect }) =>{
  const dispatch = useDispatch();
  const [dataSets, setDataSets] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [viewConnection, setViewConnection] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [fieldsOfCollection, setFieldsOfCollection] = useState([]);
  const [selectedField, setSelectedField] = useState('');

  useEffect(() => {
    if (store.webDatasets.length > 0) {
      const tempDatasets = [];
      store.webDatasets.map(ds => {tempDatasets.push({value: ds._id, label: ds.name})})
      setDataSets(tempDatasets);
    }
  }, [store.webDatasets]);

  useEffect(() => {
    if (selectedDataSet && store.webCollections.length > 0) {
      const selDataset = store.webDatasets.find(d => d._id === selectedDataSet.value);
      const collection = store.webCollections.find(c => c._id === selDataset.collectionId);
      
      const tempFields = [];
      collection.fields.map(f => {
        tempFields.push({value: f.name, label: f.name});
      });
      setFieldsOfCollection(tempFields);
    }
  }, [selectedDataSet, store.webCollections]);

  return (
    <>
      <Modal isOpen={connectData} toggle={() => setConnectData(!connectData)} centered size='md'>
        <ModalHeader toggle={() => setConnectData(!connectData)} className="font-medium-5 px-2 py-1 modal-title text-primary">
          Connect to dataset
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between p-2"  style={{minHeight: 400}}>
          {
            viewConnection ? (
              <div className='d-flex flex-column flex-1'>
                <Badge className='mb-1 round px-2' style={{width: 'fit-content'}} color='light-primary' onClick={() => setViewConnection(false)}>
                  <ChevronLeft size={14} className='me-1'/>
                  Back to connections
                </Badge>
                <div className='bg-light-secondary d-flex justify-content-center'>
                  <Label className="mdl-select-main-menu-label fs-6 my-1" for="mdl-select-main-menu">
                    Connect {selectedModel?.attributes.type}
                  </Label>
                </div>
                <Label className="mdl-select-main-menu-label fs-6 mt-1" for="mdl-select-main-menu">
                    Choose a dataset
                  </Label>
                <Select
                  id="mdl-select-main-menu"
                  className="react-select mb-1"
                  classNamePrefix="select"
                  isClearable={false}
                  options={dataSets}
                  theme={selectThemeColors}
                  value={selectedDataSet}
                  onChange={(data) => setSelectedDataSet(data)}
                />
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
                  onChange={(data) => {setSelectedField(data)}}
                />
              </div>
            ) : (
              <div className='d-flex flex-column flex-1 ps-1'>
                {
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
                        value={selectedDataSet}
                        onChange={(data) => setSelectedDataSet(data)}
                      />
                    </>
                  ) : (
                    <>
                      <Label className="mdl-select-main-menu-label fs-6" for="mdl-select-main-menu">
                        Start by creating a dataset
                      </Label>
                      <Button color="primary" className="add-todo-item me-1 align-self-center mt-1" onClick={() => {}}>
                        Create Dataset
                      </Button>
                    </>
                  )
                }            
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
                                  {connect?.description || 'Not connected'}
                                </Label>
                              </div>
                              <div className='d-flex'>
                                <Link2 size={17} className='me-2' color='#7fb1ff'/>
                                <ChevronRight size={17} onClick={() => {
                                  setSelectedModel(connect);
                                  setViewConnection(true);
                                }} color='#7fb1ff'/>
                              </div>
                            </div>
                            <hr className='m-0'/>
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

export default ConnectCollectionModal;
