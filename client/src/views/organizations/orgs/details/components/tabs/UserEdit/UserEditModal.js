import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, User } from 'react-feather';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PersonalDetails from './steps/PersonalDetails';
import CompanyDetails from './steps/CompanyDetails';
import Wizard from '@components/wizard';

export default function UserEditModal({ open, toggle, selectedUser, dispatch,setSelectedOrg }) {
  const [stepper, setStepper] = useState(null);
  const [form, setForm] = useState();
  const ref = useRef(null);
  const steps = [
    {
      id: 'personal',
      title: 'Personal Details',
      subtitle: 'Update user personal details',
      icon: <User size={18} />,
      content: (
        <PersonalDetails
          stepper={stepper}
          type="modern-horizontal"
          selectedUser={form}
          setForm={setForm}
        />
      )
    },
    {
      id: 'company',
      title: 'Company Details',
      subtitle: 'Update Company details',
      icon: <Briefcase size={18} />,
      content: (
        <CompanyDetails
          stepper={stepper}
          type="modern-horizontal"
          selectedUser={form}
          setForm={setForm}
          dispatch={dispatch}
          toggle={toggle}
          setSelectedOrg={setSelectedOrg}
        />
      )
    }
  ];
  useEffect(() => {
    if (selectedUser) {
      setForm(selectedUser);
    }
  }, [selectedUser]);
  return (
    <Modal isOpen={open} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Edit User Details</ModalHeader>
      <ModalBody>
        <div className="modern-horizontal-wizard">
          <Wizard
            type="modern-horizontal"
            ref={ref}
            steps={steps}
            options={{
              linear: false
            }}
            instance={(el) => setStepper(el)}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
