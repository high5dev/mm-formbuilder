import React, { useRef, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import SelectFormTypeStep from './steps/SelectFormTypeStep';
import FormInfoStep from './steps/FormInfoStep';
import Wizard from '@components/wizard';
import TemplateStep from './steps/TemplateStep';

export default function CreateFormModal({ open, toggle, dispatch, store }) {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [form, setForm] = useState({
    name: '',
    memberType: 'leads',
    subCategory: null,
    formType: 'leads',
    formData: [
      { id: crypto.randomUUID(), step: '1', name: 'Home', path: 'home', html: '', css: '' }
    ],
    automateEntry: false,
    status: 'create'
  });
  const steps = [
    {
      id: 'form',
      title: 'Create Website',
      subtitle: 'Fill in information below',
      content: (
        <FormInfoStep
          form={form}
          setForm={setForm}
          stepper={stepper}
          store={store}
          dispatch={dispatch}
        />
      )
    },
    {
      disabled: true,
      id: 'design',
      title: 'Select Template',
      subtitle: 'Select Template or create new',
      content: <SelectFormTypeStep form={form} setForm={setForm} stepper={stepper} />
    },
    // {
    //   id: 'template',
    //   title: 'Select Design',
    //   subtitle: 'Use Template or Create New',
    //   content: (
    //     <TemplateStep
    //       form={form}
    //       setForm={setForm}
    //       stepper={stepper}
    //       store={store}
    //       dispatch={dispatch}
    //     />
    //   )
    // }
  ];

  return (
    <Modal isOpen={open} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>Create </ModalHeader>
      <ModalBody>
        <div className="modern-horizontal-wizard">
          <Wizard
            headerClassName="pointer-events-none"
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
