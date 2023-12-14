import { React, Fragment, useState, useEffect } from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Button,
  FormGroup,
  Col,
  Label,
  Input,
  CardContent,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';
import { MoreVertical, Edit } from 'react-feather';

// table import
import EmbedModal from './EmbedModal';
import { updateFormAction } from '../../../../../store/action';
import { useParams } from 'react-router-dom';
import QrCodeModal from './QrCodeModal';
import Select from 'react-select';
import { toast } from 'react-toastify';

function Overview({ store, dispatch, contactTypeOptions }) {
  const organization = JSON.parse(localStorage.getItem('organization'));

  const [openEmbed, setOpenEmbed] = useState(false);
  const [openQr, setOpenQr] = useState(false);

  const [form, setForm] = useState();

  const { id } = useParams();

  const toggleEmbed = () => setOpenEmbed(!openEmbed);
  const toggleQr = () => setOpenQr(!openQr);
  const handleOnChange = (e) => {
    if (e.target.name === 'automateEntry') {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleSave = () => {
    if(form?.automateEntry === true && (form?.contactType === undefined || form?.contactType === null)){
      toast.error('Select contact type is required')
      return
    }
    const payload = {
      name: form.name,
      contactType: form.contactType,
      automateEntry: form.automateEntry
    };
    dispatch(updateFormAction(id, payload));
  };

  useEffect(() => {
    if (store && store.form) {
      setForm(store.form);
    }
  }, [store?.form]);

  return (
    <>
      <div className="p-1">
        <Row>
          <Col md={6}>
            <h2>Overview</h2>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            
            <Button className="ms-1" color="primary" onClick={handleSave}>
              Save & UPDATE
            </Button>
          </Col>
        </Row>
        {form && (
          <>
            <Row>
              <Col lg={3} md={3} sm={12}>
                <div className="mb-1">
                  <Label for="formName">Form Name</Label>
                  <Input
                    id="formName"
                    name="name"
                    onChange={handleOnChange}
                    placeholder="Form Name"
                    type="text"
                    required
                    value={form?.name}
                  />
                </div>
              </Col>

              <Col lg={3} md={3} sm={12} className="d-flex align-items-center mt-25">
                <FormGroup switch>
                  <Label for="automateEntry">Automate Entry</Label>
                  <Input
                    id="automateEntry"
                    name="automateEntry"
                    type="switch"
                    className="px-2"
                    checked={Boolean(form?.automateEntry)}
                    onChange={handleOnChange}
                  />
                </FormGroup>
              </Col>
              {form?.automateEntry === true && (
                <Col lg={3} md={3} sm={12}>
                  <div>
                    <Label for="memberType">Select a contact type to save to</Label>
                    <Select options={contactTypeOptions} value={contactTypeOptions.find(x=>x.value===form?.contactType)} onChange={(data)=>setForm({...form,contactType:data.value})}/>
                  </div>
                </Col>
              )}
            </Row>
          </>
        )}
        <Row>
          <Col md={4} sm={4} lg={4}>
            <Card color="primary" outline>
              <CardHeader>EMBED CODE</CardHeader>
              <CardBody style={{ minHeight: '4rem' }}>
                <CardText>Add your page inside of an iframe to embed on any website</CardText>
              </CardBody>
              <Button color="primary" onClick={toggleEmbed} className="m-1">
                VIEW
              </Button>
            </Card>
          </Col>
          <Col md={4} sm={4} lg={4}>
            <Card color="primary" outline>
              <CardHeader>DOWNLOAD HTML</CardHeader>
              <CardBody style={{ minHeight: '4rem' }}>
                <CardText>Download the .html file of your page to host anywhere</CardText>
              </CardBody>
              {store?.form && (
                <a
                  href={`data:text/html;charset=utf-8,<!DOCTYPE html>
  <html>
  <head>
  </head>
  <body style="min-height: 100vh;">
    <iframe
      style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"
      src="https://${organization ? organization.path : 'me'}.mymanager.com/web-preview/${
                    store?.form?._id
                  }&path=${store?.form?.formData[0]?.path}">
      your browser doesn't support form
    </iframe>
  </body>
  </html>`}
                  className="btn btn-primary m-1"
                  download={`index.html`}
                >
                  DOWNLOAD
                </a>
              )}
            </Card>
          </Col>
          <Col md={4} sm={4} lg={4}>
            <Card color="primary" outline>
              <CardHeader>QR CODE</CardHeader>
              <CardBody style={{ minHeight: '4rem' }}>
                <CardText>Scan the QR code</CardText>
              </CardBody>
              <Button color="primary" onClick={toggleQr} className="m-1">
                VIEW QR CODE
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
      {store && store?.form?.formData && (
        <EmbedModal open={openEmbed} toggle={toggleEmbed} store={store} />
      )}
      {store && store?.form?.formData && (
        <QrCodeModal open={openQr} toggle={toggleQr} store={store} />
      )}
    </>
  );
}

export default Overview;
