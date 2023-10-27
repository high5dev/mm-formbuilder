import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { updateLocationNameAction } from '../../../../../store/action';

export default function LocationNameModal({
  open,
  toggle,
  selectedUser,
  setSelectedOrg,
  selectedOrg,
  dispatch
}) {
  const [locationName, setLocationName] = useState();
  const handleSaveLocation = () => {
    dispatch(
      updateLocationNameAction({
        locationName: locationName,
        organizationId: selectedOrg._id,
        userId: selectedUser.userId
      })
    ).then(res=>{setSelectedOrg(res[0]); toggle()});
  };
  useEffect(() => {
    if (selectedUser && selectedOrg) {
      setLocationName(
        selectedUser.organizations.find((x) => x.organizationId === selectedOrg._id)
          ?.locationName || ''
      );
    }
  }, [selectedUser, selectedOrg]);
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Location Name</ModalHeader>
      <ModalBody>
        <div>
          <Label>Location Name</Label>
          <Input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end mt-1">
          <Button color="primary" onClick={handleSaveLocation}>
            Save
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}
