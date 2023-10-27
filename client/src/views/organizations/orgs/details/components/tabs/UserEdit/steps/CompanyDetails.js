import React from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import { updateUserDetailsAction } from '../../../../../../store/action';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function CompanyDetails({ stepper, selectedUser, setForm,dispatch,toggle,setSelectedOrg }) {
    const {id} = useParams()
    const handleUpdateDetails =()=>{
        dispatch(updateUserDetailsAction(selectedUser.userId,selectedUser,id)).then(res=>{
            setSelectedOrg(res[0])
            toggle()
        })
    }
  return (
    <div>
      <Row>
        <Col md="12">
          <Label>Company Name</Label>
          <Input
            type="text"
            value={selectedUser?.company?.title}
            name="title"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, title: e.target.value }
              });
            }}
          />
        </Col>
        <Col md="6">
          <Label>Phone Number</Label>
          <Input
            type="text"
            value={selectedUser?.company?.phone}
            name="phone"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, phone: e.target.value }
              });
            }}
          />
        </Col>
        <Col md="6">
          <Label>Alternative Phone Number</Label>
          <Input
            type="text"
            value={selectedUser?.company?.alternativePhone}
            name="alternativePhone"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, alternativePhone: e.target.value }
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
            value={selectedUser?.company?.address?.street}
            name="street"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, address: { ...tmp.address, street: e.target.value } }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>Zip Code</Label>
          <Input
            type="text"
            value={selectedUser?.company?.address?.zipCode}
            name="zipCode"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, address: { ...tmp.address, zipCode: e.target.value } }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>City</Label>
          <Input
            type="text"
            value={selectedUser?.company?.address?.city}
            name="city"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, address: { ...tmp.address, city: e.target.value } }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>State</Label>
          <Input
            type="text"
            value={selectedUser?.company?.address?.state}
            name="state"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, address: { ...tmp.address, state: e.target.value } }
              });
            }}
          />
        </Col>
        <Col md="4">
          <Label>Country</Label>
          <Input
            type="text"
            value={selectedUser?.company?.address?.country}
            name="country"
            onChange={(e) => {
              const tmp = selectedUser.company;
              setForm({
                ...selectedUser,
                company: { ...tmp, address: { ...tmp.address, country: e.target.value } }
              });
            }}
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-between mt-1">
        <Button color="primary" outline onClick={() => stepper.previous()}>
          Back
        </Button>
        <Button color="primary" onClick={handleUpdateDetails}>Update Details</Button>
      </div>
    </div>
  );
}
