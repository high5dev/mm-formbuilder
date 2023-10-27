import React, { useState } from 'react';
import { Button, Col, Input, Label, Row, Spinner } from 'reactstrap';
import { useUploadSignature } from '../../../../../../../../requests/documents/recipient-doc';
import { toast } from 'react-toastify';

export default function PersonalDetails({ stepper, selectedUser, setForm }) {
  const [isLoading, setisLoading] = useState(false);
  const onChangeAvatar = async (e) => {
    setisLoading(true)
    const form = new FormData();
    form.append('file', e.target.files[0]);
    const res = await useUploadSignature(form);
    if (res.success && res.success === true) {
      setForm({ ...selectedUser, avatar: res.url });
      setisLoading(false)
    }
    else{
        toast.error("Image upload failed. Please try again")
        setisLoading(false)
    }
    
  };
  const handleImgReset = () => {
    setForm({ ...selectedUser, avatar: '' });
  };
  return (
    <div>
      <div className="d-flex justify-content-start mb-1">
        <div>
          {isLoading === true ? (
            <Spinner color="primary" />
          ) : (
            <img
              className="rounded me-50"
              src={
                selectedUser?.avatar ||
                require('@src/assets/images/avatars/avatar-blank.png').default
              }
              alt="User profile image"
              height="100"
              width="100"
            />
          )}
        </div>
        <div className="d-flex align-items-end mt-75 ms-1">
          <div>
            <Button tag={Label} className="mb-75 me-75" size="sm" color="primary">
              Upload
              <Input type="file" onChange={onChangeAvatar} hidden accept="image/*" />
            </Button>
            <Button className="mb-75" color="secondary" size="sm" outline onClick={handleImgReset}>
              Reset
            </Button>
            {/* <p className="mb-0">Allowed JPG, GIF or PNG. Max size of 800kB</p> */}
          </div>
        </div>
      </div>
      <Row>
        <Col md="6">
          <Label>First Name</Label>
          <Input
            type="text"
            value={selectedUser?.firstName}
            name="firstName"
            onChange={(e) => {
              setForm({
                ...selectedUser,
                firstName: e.target.value
              });
            }}
          />
        </Col>
        <Col md="6">
          <Label>Last Name</Label>
          <Input
            type="text"
            value={selectedUser?.lastName}
            name="lastName"
            onChange={(e) => {
              setForm({
                ...selectedUser,
                lastName: e.target.value
              });
            }}
          />
        </Col>
        <Col md="6">
          <Label>Email</Label>
          <Input
            type="text"
            value={selectedUser?.email}
            name="email"
            disabled
            onChange={(e) => {
              setForm({
                ...selectedUser,
                email: e.target.value
              });
            }}
          />
        </Col>
        <Col md="6">
          <Label>Phone Number</Label>
          <Input
            type="text"
            value={selectedUser?.phone}
            name="phone"
            onChange={(e) => {
              setForm({
                ...selectedUser,
                phone: e.target.value
              });
            }}
          />
        </Col>
        <h6 className="mt-1">Address</h6>
        <hr />
        <Col md="8">
          <Label>Street</Label>
          <Input
            type="text"
            value={selectedUser?.address?.street}
            name="street"
            onChange={(e) => {
              const tmp = selectedUser.address;
              setForm({
                ...selectedUser,
                address: { ...tmp, street: e.target.value }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>Zip Code</Label>
          <Input
            type="text"
            value={selectedUser?.address?.zipCode}
            name="zipCode"
            onChange={(e) => {
              const tmp = selectedUser.address;
              setForm({
                ...selectedUser,
                address: { ...tmp, zipCode: e.target.value }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>City</Label>
          <Input
            type="text"
            value={selectedUser?.address?.city}
            name="city"
            onChange={(e) => {
              const tmp = selectedUser.address;
              setForm({
                ...selectedUser,
                address: { ...tmp, city: e.target.value }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>State</Label>
          <Input
            type="text"
            value={selectedUser?.address?.state}
            name="state"
            onChange={(e) => {
              const tmp = selectedUser.address;
              setForm({
                ...selectedUser,
                address: { ...tmp, state: e.target.value }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>Country</Label>
          <Input
            type="text"
            value={selectedUser?.address?.country}
            name="country"
            onChange={(e) => {
              const tmp = selectedUser.address;
              setForm({
                ...selectedUser,
                address: { ...tmp, country: e.target.value }
              });
            }}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-end mt-1">
        <Button color="primary" outline onClick={() => stepper.next()}>
          Next
        </Button>
      </div>
    </div>
  );
}
