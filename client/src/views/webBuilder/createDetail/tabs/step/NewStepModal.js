import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { updateFormDataAction } from '../../../store/action';

export default function NewStepModal({ open, toggle, store, dispatch }) {
  // ** STATES
  const [step, setStep] = useState({ show: 'true' });
  const [isValid, setIsValid] = useState(true);

  const handleCreateStep = () => {
    let temp = store.form;
    if (!step.path) {
      temp = [
        ...temp.formData,
        {
          id: crypto.randomUUID(),
          step: temp.length,
          css: '',
          html: '',
          path: step.name.replace(' ', '-'),
          ...step
        }
      ];
    } else {
      temp = [
        ...temp.formData,
        { id: crypto.randomUUID(), step: temp.length, css: '', html: '', ...step }
      ];
    }
    dispatch(updateFormDataAction(store.form._id, { formData: temp }));
    toggle()
  };

  const handleInputChange = (e) => {
    let { name, value, checked } = e.target;
    if (e.target.name === 'show') {
      setStep({ ...step, [name]: checked });
    } else if (name === 'path') {
      const isValidInput = /^[a-z0-9]+$/.test(value);
      setStep({ ...step, [name]: value.replace(' ', '-') });
      setIsValid(isValidInput);
    } else {
      setStep({ ...step, [name]: value });
    }
  };

  return (
    <Modal isOpen={open} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Add New Step to Funnel</ModalHeader>
      <ModalBody>
        <div>
          {/* <div className="d-flex justify-content-between"></div> */}
          <Row>
            <Col md={8}>
              <div className="w-100 me-1">
                <Label>Name of funnel step</Label>
                <Input
                  type="text"
                  className="w-100"
                  name="name"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Col>
            <Col md={4} className="d-flex align-items-center">
              <div className="d-flex align-items-center mt-2">
                <Input type="checkbox" name="show" onChange={handleInputChange} defaultChecked />{' '}
                <Label className="ms-1">Show in Funnel</Label>
              </div>
            </Col>
          </Row>

          <Label className="mt-2">
            Path for funnel step
            {/* <span className="d-block text-muted">Define the path for this step </span> */}
          </Label>
          <Input
            type="text"
            name="path"
            required
            invalid={!isValid}
            onChange={handleInputChange}
            placeholder="Define the path for this step"
          />
          {!isValid ? (
            <Label style={{ color: 'red' }}>Only small letters and numbers are allowed.</Label>
          ) : (
            ''
          )}

          <div className="d-flex justify-content-end mt-2 ">
            <Button color="primary" className="mt-50" onClick={handleCreateStep}>
              Create Funnel Step
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
