import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { setSelectedAutomation } from '../../../../../marketing/automation/store/reducer';

const NewAutomationModal = ({ open, toggle, setTitle, setShowAutomation, selectedCriteria }) => {
  const dispatch = useDispatch();
  const currentAutomation = useSelector((state) => state.automation?.selectedAutomation);
  const [newAutomationTitle, setNewAutomationTitle] = useState('');
  const handleCreate = () => {
    // Create Automation Action
    setTitle(newAutomationTitle);
    dispatch(
      setSelectedAutomation({
        _id: '',
        automationName: newAutomationTitle,
        contactInfo: {},
        activationUpon: {},
        activateTime: {},
        actions: [],
        isActive: false,
        userName: '',
        userEmail: '',
        userPhone: ''
      })
    );
    // Close Modal
    toggle();
    setNewAutomationTitle('');
    setShowAutomation(true);
  };

  const handleTitleChange = (e) => {
    setNewAutomationTitle(e.target.value);
  };

  return (
    <Modal isOpen={open} toggle={toggle} size="md" centered={true}>
      <ModalHeader toggle={toggle}>Create New Automation</ModalHeader>
      <ModalBody>
        <Label>Please input automation name</Label>
        <Input
          type="text"
          value={newAutomationTitle}
          placeholder={`${selectedCriteria || ''} Automation`}
          onChange={handleTitleChange}
        ></Input>
      </ModalBody>
      <ModalFooter>
        <Button color="btn btn-outline-danger" onClick={toggle}>
          Cancle
        </Button>
        <Button color="btn btn-primary" onClick={handleCreate}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewAutomationModal;
