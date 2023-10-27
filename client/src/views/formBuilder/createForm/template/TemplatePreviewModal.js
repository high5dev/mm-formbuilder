import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function TemplatePreviewModal({ open, toggle, template }) {
  return (
    <Modal isOpen={open} toggle={toggle} centered size="xl">
      <ModalHeader toggle={toggle}>{template?.name}</ModalHeader>
      <ModalBody>
        <iframe
          scrolling="no"
          className="shadow-sm"
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            border: 'none',
            height: '800px',
            borderRadius: 10
          }}
          key={template && template?.formData?.length > 0 && template?.formData[0]?.html?.length}
          src={
            template && template?.formData?.length > 0 && template?.formData[0].html !== ''
              ? `/web-preview/${template._id}&path=${template.formData[0].path}`
              : `/logo.html`
          }
        />
      </ModalBody>
    </Modal>
  );
}
