import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { MoreVertical, Send, Image, ChevronDown, ChevronRight, Link2, ChevronLeft, Link } from 'react-feather';
import { isObjEmpty, selectThemeColors } from '@utils'
import Select, { components } from 'react-select';
import { useDispatch } from 'react-redux';
import { createOrUpdateConnectionAction, deleteMultipleWebConnectionAction } from '../../../store/action';
import { toast } from 'react-toastify';

const ConnectCollectionModal = ({ store, connectData, setConnectData, getProductDataset, datasetConnect, setDatasetConnect, selectedDataset, handleSelectChangeDataSet, selectedCmp, selectedCollection, setSelectedCollection, createDatasetToggle }) => {

  const dispatch = useDispatch();
  const [dataSets, setDataSets] = useState([]);
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [viewConnection, setViewConnection] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [fieldsOfCollection, setFieldsOfCollection] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [checkedConModels, setCheckedConModels] = useState([]);
  const [repeaterChildCmps, setRepeaterChildCmps] = useState([]);
  const [modelsToConnect, setModelsToConnect] = useState([]);

  useEffect(() => {
    if (store.webDatasets.length > 0) {
      const tempDatasets = [];
      store.webDatasets.map(ds => { tempDatasets.push({ value: ds._id, label: ds.name }) })
      setDataSets(tempDatasets);
    }
  }, [store.webDatasets]);

  useEffect(() => {
    const connectedCon = store.webConnections.find(c => c.componentId === selectedCmp?.ccid && c.websiteId === store?.form?._id);
    if (connectedCon) {
      const originDataset = store.webDatasets.find(ds => ds._id === connectedCon.datasetId);
      if (originDataset)
        setSelectedDataSet({value: originDataset._id, label: originDataset.name});
      else
        setSelectedDataSet(null);
    } else {
      setSelectedDataSet(null);
    }
  }, [store.webConnections, store.webDatasets, selectedCmp]);

  useEffect(() => {
    const checkedModels = [];
    modelsToConnect.map(m => {
      const con = store.webConnections.find(c => c.componentId === m.ccid && c.websiteId === store.form._id);
      if (con) {
        checkedModels.push({...m, connectionId: con._id, websiteId: con.websiteId, connectedField: con.connectedField});
      } else {
        checkedModels.push(m);
      }
    });
    setCheckedConModels(checkedModels);
  }, [modelsToConnect, store.webConnections]);

  useEffect(() => {
    if (selectedDataSet && store.webCollections.length > 0) {
      const selDataset = store.webDatasets.find(d => d._id === selectedDataSet.value);
      const collection = store.webCollections.find(c => c._id === selDataset.collectionId);

      if (collection && selectedCmp?.attributes?.type === 'repeater') {
        const firstChild = selectedCmp.getChildAt(0);

        if (selectedCmp.components().length > collection.values.length) {
          if (collection.values.length === 0) {
            toast.error('No values in selected collection');
          } else {
            let n = selectedCmp.components().length - collection.values.length;
            for (let i = 1; i <= n; i++) {
              const childCmp = selectedCmp.getChildAt(selectedCmp.components().length - i);
              childCmp.remove();
            }
          }
        }
        if (selectedCmp.components().length < collection.values.length) {
          const n = collection.values.length - selectedCmp.components().length;
          for (let i = 0; i <= n; i++) {
            selectedCmp.append(firstChild.clone());
          }
        }
        
        const tempModels = [];
        for (let ci = 0; ci < selectedCmp.components().length; ci++) {
          const repeaterItemCmp = selectedCmp.getChildAt(ci);
          const tempModelsToConnect = [];
          repeaterItemCmp.components().models.map(m => {
            if (m.attributes.type === 'image' || m.attributes.type === 'text') {
              tempModelsToConnect.push(m);
            }
          });
          tempModels.push(tempModelsToConnect);
          if (ci === 0)
            setModelsToConnect(tempModelsToConnect);
        }
        setRepeaterChildCmps(tempModels);
      }
      else{
        let tempModelsToConnect=[];
        const models=selectedCmp.components().models;
        models && models.map(m=>{
        if (m.attributes.type === 'image' || m.attributes.type === 'text') {
            tempModelsToConnect.push(m);
          }
        })
        setModelsToConnect(tempModelsToConnect);
      }
      setSelectedCollection(collection);
      
      const tempFields = [];
      collection?.fields.map(f => {
        if (!f.default)
          tempFields.push({value: f.name, label: f.name});
      });
      setFieldsOfCollection(tempFields);
    }
  }, [selectedDataSet, store.webCollections]);

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
    setDatasetConnect(datasetConnect);
  }

  useEffect(() => {
    if (selectedModel?.connectedField) {
      const selectedFieldOfCollection = fieldsOfCollection.find(f => f.value === selectedModel.connectedField);
      if (selectedFieldOfCollection) {
        setSelectedField(selectedFieldOfCollection);
      } else {
        setSelectedField(null);
      }
    } else {
      setSelectedField(null);
    }
  }, [selectedModel]);

  const onSelectDataset = (data) => {
    setSelectedDataSet(data);
    const datasetId = data.value;
    const componentId = selectedCmp?.ccid;
    const componentType = selectedCmp.attributes.type;
    const websiteId = store.form._id;

    const ids = [];
    checkedConModels.map(c => {
      if (c.connectedField) {
        ids.push(c.connectionId);
      }
    });
    dispatch(deleteMultipleWebConnectionAction({ids}));
    dispatch(createOrUpdateConnectionAction({datasetId, componentId, websiteId, componentType}));
  };

  const onChangeConnectionOption = (data) => {
    setSelectedField(data);
    const datasetId = selectedDataSet?.value;
    const componentId = selectedModel?.ccid;
    const componentType = selectedModel?.attributes.type;
    const websiteId = store.form._id;
    const connectedField = data.value;
    dispatch(createOrUpdateConnectionAction({datasetId, componentId, websiteId, componentType, connectedField}));
  };
  return (
    <>
      <Modal isOpen={connectData.isOpen} toggle={() => { setConnectData({...connectData, isOpen: false}); setViewConnection(false); }} centered size='md'>
        <ModalHeader toggle={() => { setConnectData({...connectData, isOpen: false}); setViewConnection(false); }} className="font-medium-5 px-2 py-1 modal-title text-primary">
          Connect to dataset
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between p-2" style={{ minHeight: 400 }}>
          {
            viewConnection ? (
              <div className='d-flex flex-column flex-1'>
                <Badge className='mb-1 round px-2' style={{ width: 'fit-content' }} color='light-primary' onClick={() => setViewConnection(false)}>
                  <ChevronLeft size={14} className='me-1' />
                  Back to connections
                </Badge>
                {/* <div className='bg-light-secondary d-flex justify-content-center'>
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
                  onChange={(data) => {
                    // changeField(data);
                    onChangeConnectionOption(data);
                  }}
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
                        onChange={(data) => { handleSelectChangeDataSet(data); onSelectDataset(data);}}
                      />
                    </>
                  ) : (
                    <>
                      <Label className="mdl-select-main-menu-label fs-6" for="mdl-select-main-menu">
                        Start by creating a dataset
                      </Label>
                      <Button color="primary" className="add-todo-item me-1 align-self-center my-1" onClick={() => {createDatasetToggle()}}>
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
                  checkedConModels.length > 0 && (
                    <ListGroup>
                      {
                        checkedConModels.map((connect, idx) => {
                          if (connect.connectedField) {
                            if (connect.attributes.type === 'text') {
                              if (selectedCmp?.attributes.type === 'repeater') {
                                for (let j = 0; j < repeaterChildCmps.length; j++) {
                                  repeaterChildCmps[j][idx].components(selectedCollection.values[j] ? selectedCollection.values[j][connect.connectedField] || '' : '');
                                }
                              } else {
                                // modelsToConnect[idx].components(selectedCollection.values[0][connect.connectedField]);
                              }
                            }
                            if (connect.attributes.type === 'image') {
                              if (selectedCmp?.attributes.type === 'repeater') {
                                for (let j = 0; j < repeaterChildCmps.length; j++) {
                                  repeaterChildCmps[j][idx].setAttributes({src: selectedCollection.values[j] ? selectedCollection.values[j][connect.connectedField] || '' : ''});
                                  repeaterChildCmps[j][idx].attributes.src = selectedCollection.values[j] ? selectedCollection.values[j][connect.connectedField] || '' : '';
                                }
                              } else {
                                // modelsToConnect[idx].setAttributes({src: 'https://i.ibb.co/tm0rJ2c/youtube-1.png'});
                              }
                            }
                          }
                          return <ListGroupItem className='item-to-connect' key={idx}>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div className='d-flex flex-column align-items-start'>
                                <Label className="mdl-input-category-label fs-6" for="mdl-input-category">
                                  {connect?.attributes.type || 'Connection name'}
                                </Label>
                                <Label className="mdl-input-category-label fs-7" for="mdl-input-category">
                                  {connect?.connectedField ? `Connected to ${connect.connectedField}` : 'Not connected'}
                                </Label>
                              </div>
                              <div className='d-flex'>
                                {connect?.connectedField && <Link size={17} className='me-2' color='#7fb1ff'/>}
                                <ChevronRight size={17} onClick={() => {
                                  if (connect?.description) {
                                    setSelectedField(connect?.description);
                                  }
                                  setSelectedModel(connect);
                                  setViewConnection(true);
                                }} color='#7fb1ff' />
                              </div>
                            </div>
                            <hr className='m-0' />
                          </ListGroupItem>;
                        })
                      }
                    </ListGroup>
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
