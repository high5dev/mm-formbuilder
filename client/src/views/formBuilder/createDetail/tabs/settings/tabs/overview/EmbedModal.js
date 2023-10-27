import React from 'react';
import { Copy } from 'react-feather';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';

export default function EmbedModal({ open, toggle, store }) {
  const organization = JSON.parse(localStorage.getItem('organization'));

  const handleCopy = () => {
    navigator.clipboard.writeText(`   <iframe height="100%" width="100%"
    style="position: 'relative';overflow-x: 'hidden';border: 'none';border: none;min-height: 300px;"
    src="https://${organization ? organization.path : 'me'}.mymanager.com/web-preview/${
      store?.form?._id
    }&path=${store?.form?.formData[0]?.path}"
  />`);
    toast.success('Link Copied!');
  };
  return (
    <>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Embed Funnel In Your Website</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between">
            <p>Place this code in your HTML where you want your Funnel to appear.</p>
            <Button color="link" onClick={handleCopy}>
              <Copy />
            </Button>
          </div>
          <Card className="bg-light border">
            <CardBody>
              <p>
                <code className="bg-transparent text-secondary">{`<iframe height="100%" width="100%"
    style="position: 'relative';overflow-x: 'hidden';border: 'none';border: none;min-height: 300px;"
    src="https://${organization ? organization.path : 'me'}.mymanager.com/web-preview/${
                  store?.form?._id
                }&path=${store?.form?.formData[0]?.path}"
  />`}</code>
              </p>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}
