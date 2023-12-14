import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, TabContent, TabPane, Form, FormGroup, Card, Row, Col, InputGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getWebsiteAction, updatePageNameAction } from '../../../store/action';

const SeoModal = ({ editor, setEditor, seoModalData, setSeoModalData, selectedPage }) => {

  const store = useSelector((state) => state.websiteEditor);
  const dispatch = useDispatch();

  const [active, setActive] = useState("1");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [enableIndex, setEnableIndex] = useState(true);

  const [seoData, setSeoData] = useState();
  const [logo, setLogo] = useState();
  // const { id } = useParams();

  useEffect(() => {
    if (seoModalData?.data?.seoDetails) {
      setSeoData(seoModalData.data.seoDetails);
    }
  }, [seoModalData?.data?.seoDetails]);

  const handleOnChange = (e) => {
    if (e.target.name === 'socialImage') {
      setLogo(e.target.files[0]);
    } else {
      setSeoData({ ...seoData, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (logo) {
      //upload logo
      let formData = new FormData();
      formData.append('file', logo);
      useUploadSignature(formData).then((res) => {
        if (res.success === true) {
          let payload = { ...seoData, socialImage: res.url };
          dispatch(updatePageNameAction(selectedPage._id, {seoDetails: payload})).then((res) => {
            if (res.success === true) {
              dispatch(getWebsiteAction);
            }
          });
        }
      });
    } else {
      dispatch(updatePageNameAction(selectedPage._id, {seoDetails: seoData})).then((res) => {
        if (res.success === true) {
          dispatch(getWebsiteAction);
        }
      });
    }
    setSeoModalData({...seoModalData, isOpen: false});
  };

  useEffect(() => {
    if (store && store.form) {
      setSeoData(store?.form?.seoDetails);
    }
  }, [store?.form]);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  }

  const toggle = () => {
    setSeoModalData({...seoModalData, isOpen: false});
  };

  return (
    <>
      <Modal isOpen={seoModalData.isOpen} toggle={toggle} centered size="lg">
        <ModalHeader toggle={toggle} className="font-medium-5 p-2 modal-title text-primary">
          Page Setting
        </ModalHeader>
        <ModalBody>
          {/* <Nav tabs> 
            <NavItem> 
              <NavLink active={active === "1"} onClick={() => toggleTab("1")}> 
                SEO Basics
              </NavLink> 
            </NavItem> 
            <NavItem> 
              <NavLink active={active === "2"} onClick={() => toggleTab("2")}> 
                Advanced SEO
              </NavLink> 
            </NavItem> 
          </Nav> 
          <TabContent activeTab={active}> 
            <TabPane tabId="1"> 
              <Label className='mt-1 fs-6'>Title tag (title in search results)</Label>
              <Input
                type="text"
                value={title}
                placeholder={`Search engines may show a different title`}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Label className='mt-1 fs-6'>Meta description (description in search results)</Label>
              <Input
                type="textarea"
                value={description}
                placeholder={`Search engines may show a different description`}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
              <div className='d-flex align-items-center mt-1'>
                <Label className='me-1 fs-6'>Let search engines index this page</Label>
                <Form>
                  <FormGroup switch>
                    <Input type='switch' role="switch" checked={enableIndex} onChange={() => setEnableIndex(!enableIndex)} />
                  </FormGroup>
                </Form>
              </div>
            </TabPane>
            <TabPane tabId="2"> 
              
            </TabPane> 
          </TabContent>  */}
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label for="seoMetaData">Title</Label>
                <Input
                  value={seoData?.title}
                  name="title"
                  onChange={handleOnChange}
                  placeholder="A title for your page to show in top bar"
                  type="text"
                  required
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label for="keywords">Keywords</Label>
                <Input
                  value={seoData?.keywords}
                  name="keywords"
                  placeholder="Separate with comma , "
                  type="text"
                  onChange={handleOnChange}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label for="socialImage">Social Logo</Label>
                <InputGroup>
                  <Input
                    onChange={handleOnChange}
                    name="socialImage"
                    placeholder="Your logo"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                  />
                </InputGroup>
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label for="author">Author</Label>
                <Input
                  value={seoData?.author}
                  name="author"
                  placeholder="Your name or social name"
                  type="text"
                  onChange={handleOnChange}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label for="twitter">Twitter Handler</Label>
                <Input
                  value={seoData?.twitter}
                  name="twitter"
                  placeholder="Your twitter handle start with @"
                  type="text"
                  onChange={handleOnChange}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label>Description</Label>
                <Input
                  value={seoData?.description}
                  name="description"
                  placeholder="A bit of description about your page"
                  type="textarea"
                  onChange={handleOnChange}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label for="headCode">
                  Head Tracking Code (To track your form on search consoles)
                </Label>
                <Input
                  onChange={handleOnChange}
                  name="headCode"
                  type="textarea"
                  value={seoData?.headCode}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div style={{ marginBottom: '15px' }}>
                <Label for="bodyCode">
                  Body Tracking Code (To track your form on search consoles)
                </Label>
                <Input
                  onChange={handleOnChange}
                  name="bodyCode"
                  type="textarea"
                  value={seoData?.bodyCode}
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="d-flex">
          <Button color="primary" className="add-todo-item me-1" onClick={() => {handleSave()}}>
            Save & UPDATE
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default SeoModal;
