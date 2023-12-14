import React, { useEffect, useState } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { selectThemeColors } from '@utils'
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { createWebDatasetAction, getWebCollectionsAction } from '../../store/action';

const CreateDatasetModal = ({ store, mdlData, toggle }) =>{
  const dispatch = useDispatch();
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({value: '', label: ''});
  const [datasetName, setDatasetName] = useState('');

  const initState = () => {
    setDatasetName('');
    setSelectedCollection({value: '', label: ''});
  };

  useEffect(() => {
    if (store?.form?._id)
      dispatch(getWebCollectionsAction(store?.form?._id));
  }, [store?.form?._id]);

  useEffect(() => {
    if (store?.webCollections?.length > 0) {
      const tempCols = [];
      store.webCollections.map(c => {
        tempCols.push({value: c._id, label: c.name});
      });
      setCollections(tempCols);
    }
  }, [store.webCollections]);

  return (
    <>
      <Modal isOpen={mdlData.isOpen} toggle={toggle} centered size='md'>
        <ModalHeader toggle={() => {toggle(); initState();}} className="font-medium-5 px-2 py-1 modal-title text-primary">
          {`Create ${mdlData?.data?.isFormDataset? 'Form ' : ''}Dataset`}
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between py-1 pb-2">
          <div className='d-flex flex-column flex-1'>
            <Label className="mdl-select-main-menu-label fs-6" for="mdl-select-main-menu">
              Collection
            </Label>
            <Select
              id="mdl-select-main-menu"
              className="react-select mb-1"
              classNamePrefix="select"
              isClearable={false}
              options={collections}
              theme={selectThemeColors}
              value={selectedCollection}
              onChange={(data) => {
                setSelectedCollection(data)
              }}
            />
            <Label className="mdl-select-main-menu-label fs-6" for="mdl-select-main-menu">
              Dataset Name
            </Label>
            <Input placeholder='dataset name' value={datasetName} onChange={(e) => setDatasetName(e.target.value)} />
          </div>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color='primary' outline className="add-todo-item me-1 align-self-end" onClick={() => {toggle(); initState();}}>
            Cancel
          </Button>
          <Button
            color="primary"
            className="add-todo-item me-1 align-self-end"
            disabled={!datasetName || !selectedCollection.value}
            onClick={() => {
              if (mdlData?.data?.isFormDataset) {
                dispatch(createWebDatasetAction({collectionId: selectedCollection.value, name: datasetName, isFormDataset: true}));
              } else {
                dispatch(createWebDatasetAction({collectionId: selectedCollection.value, name: datasetName}));
              }
              initState();
              toggle();
            }}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CreateDatasetModal;
