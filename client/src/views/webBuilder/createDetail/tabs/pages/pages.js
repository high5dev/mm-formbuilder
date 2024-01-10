import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip
} from 'reactstrap';
import { Sidebar } from './leftSidebar';
import { Copy, Edit, Trash } from 'react-feather';
import { BsFillEyeFill } from 'react-icons/bs';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserData } from '../../../../../auth/utils';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import {
  cloneFormAction,
  deleteFormAction,
  deleteWebsiteAction,
  duplicateWebsiteAction,
  getPageAction,
  getWebsiteAction,
  updatePageNameAction,
  getFormAction
} from '../../../store/action';
import { useHistory } from 'react-router-dom';
import DuplicateModal from '../../../editor/topNav/duplicate/duplicateModal';
import { FaClone, FaRegClone } from 'react-icons/fa';
import { BiCopy, BiDuplicate } from 'react-icons/bi';
import { GrClone } from 'react-icons/gr';
import { useUploadSignature } from '../../../../../requests/documents/recipient-doc';
import { setCurrentPage } from '../../../store/reducer';
export const Pages = ({ id }) => {
  // ** dispatch
  const dispatch = useDispatch();

  // ** redux-store
  const store = useSelector((state) => {
    return {
      ...state?.websiteEditor
    };
  });

  // ** useStates
  const [active, setActive] = useState('');
  const [pageData, setPageData] = useState('');
  const [duplicateMdl, setDuplicateMdl] = useState(false);
  const [seoData, setSeoData] = useState({});
  const [logo, setLogo] = useState();

  useEffect(() => {
    if (store?.form?.formData?.length > 0) {
      setActive(store.form.formData[0]._id);
      setSeoData(store.currentPage?.seoDetails || {});
    }
  }, [store?.form?.formData]);
  useEffect(() => {
    dispatch(getWebsiteAction(id));
  }, [id]);

  useEffect(() => {
    if (active) {
        console.log(pageData)
      let currnetpage = store.form.formData.filter((item) => item._id == active);
      dispatch(setCurrentPage(currnetpage));
      setSeoData(store.currentPage?.seoDetails || {});
      dispatch(getPageAction(active)).then((res) => {
        setPageData(res);
      });
    }
  }, [active]);

  const _toggleDuplicate = () => {
    setDuplicateMdl(!duplicateMdl);
  };

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
          dispatch(updatePageNameAction(active, { seoDetails: payload })).then((res) => {
            if (res.success === true) {
              dispatch(getWebsiteAction);
            }
          });
        }
      });
    } else {
      dispatch(updatePageNameAction(active, { seoDetails: seoData })).then((res) => {
        if (res.success === true) {
          dispatch(getWebsiteAction);
        }
      });
    }
  };

  // ** constants
  const organization = JSON.parse(localStorage.getItem('organization'));
  const user = getUserData();
  const history = useHistory();

  // ** functions
  const handleCopyUrl = (x) => {
    navigator.clipboard.writeText(
      `https://${organization ? organization?.path : 'me'}.mymanager.com/web-preview/${
        store?.form?._id
      }&path=${x?.path}`
    );
    toast.success('URL copied!');
  };

  const handleViewUrl = (x) => {
    window.open(`/website/${store.form._id ? store.form._id : id}`);
  };

  // ** fire
  const MySwal = withReactContent(Swal);
  const handleDeleteForm = async () => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete the website? ',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      await dispatch(deleteWebsiteAction(store.form._id ? store.form._id : id));
      history.push('/business/tools');
    }
  };

  const handleClone = () => {
    _toggleDuplicate();
  };

  const openEditor = () => {
    history.push(`/webpages/editor/${store.form._id ? store.form._id : id}`);
  };

  return (
    <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
      <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
        <div className="tasks-border">
          <Sidebar active={active} setActive={setActive} dispatch={dispatch} store={store} />
          <TabContent activeTab={active} className={'w-100'}>
            {store?.form &&
              store?.form?.formData?.map((x) => {
                return (
                  <TabPane tabId={x?._id}>
                    <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                      <Fragment>
                        <div className="m-1">
                          <div className="d-flex justify-content-between">
                            <InputGroup size="md">
                              {/* <Input
                                                        value={`https://${organization ? organization?.path : 'me'
                                                        }.mymanager.com/web-preview/${store?.form?._id}&path=${x?.path}`}
                                                        disabled="true"
                                                    /> */}
                              <Input
                                value={`https://${
                                  organization ? organization?.path : 'me'
                                }.mymanager.com/website/${store.form._id ? store.form._id : id}`}
                                disabled="true"
                              />
                              <InputGroupText>
                                <Button
                                  color="link"
                                  className="p-0"
                                  onClick={() => handleCopyUrl(x)}
                                >
                                  <Copy />
                                </Button>
                              </InputGroupText>
                            </InputGroup>
                            <Button
                              id="edit-page"
                              color="primary"
                              className="ms-1"
                              outline
                              onClick={() => openEditor()}
                            >
                              <Edit size={18} />
                            </Button>
                            <UncontrolledTooltip placement="top" target="edit-page">
                              Edit Page
                            </UncontrolledTooltip>
                            <Button
                              id="clone-website"
                              color="primary"
                              className="ms-1"
                              outline
                              onClick={() => handleClone()}
                            >
                              <GrClone size={18} />
                            </Button>
                            <UncontrolledTooltip placement="top" target="clone-website">
                              Clone Website
                            </UncontrolledTooltip>
                            <Button
                              id="delete-website"
                              color="primary"
                              className="ms-1"
                              outline
                              onClick={() => handleDeleteForm()}
                            >
                              <Trash size={18} />
                            </Button>
                            <UncontrolledTooltip placement="top" target="delete-website">
                              Delete Website
                            </UncontrolledTooltip>
                            <Button
                              color="primary"
                              className="ms-2"
                              style={{ minWidth: '120px' }}
                              onClick={() => handleViewUrl(x)}
                            >
                              <BsFillEyeFill className="me-1" />
                              View
                            </Button>
                          </div>
                          <Card
                            style={{
                              height: '100%',
                              borderRadius: 10,
                              marginBottom: '1em',
                              marginTop: '1em'
                            }}
                            className={`shadow`}
                          >
                            <CardBody>
                              <iframe
                                // scrolling="no"
                                className="shadow-sm"
                                style={{
                                  position: 'relative',
                                  overflow: 'scroll',
                                  width: '100%',
                                  border: 'none',
                                  height: '400px',
                                  borderRadius: 10
                                }}
                                key={x.html?.length}
                                srcDoc={pageData}
                                // src={
                                //     pageData !== ''
                                //         ? `/preview${x.path}`
                                //         : `/logo.html`
                                // }
                              />
                            </CardBody>
                          </Card>

                          <Card
                            style={{
                              height: '100%',
                              borderRadius: 10,
                              marginTop: '1em',
                              marginBottom: '1em'
                            }}
                            className={`shadow`}
                          >
                            <CardBody>
                              <div className="d-flex justify-content-between align-items-center">
                                <h5>Page Setting</h5>
                                <Button
                                  color="primary"
                                  className="ms"
                                  onClick={() => {
                                    handleSave();
                                  }}
                                >
                                  Save & Update
                                </Button>
                              </div>
                              <Row>
                                <Col lg={6} md={6} sm={12}>
                                  <div style={{ marginBottom: '15px' }}>
                                    <Label for="seoMetaData">Title</Label>
                                    <Input
                                      value={seoData?.title || ''}
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
                                      value={seoData?.keywords || ''}
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
                                      value={seoData?.author || ''}
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
                                      value={seoData?.twitter || ''}
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
                                      value={seoData?.description || ''}
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
                                      value={seoData?.headCode || ''}
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
                                      value={seoData?.bodyCode || ''}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          {/* <Row>
                                                <Col className="d-flex flex-row-reverse">

                                                    <Button
                                                        color="danger"
                                                        onClick={handleDeleteForm}
                                                    >
                                                        REMOVE
                                                    </Button>


                                                    <Button
                                                        color="outline-primary"
                                                        className="me-2"
                                                        onClick={handleClone}
                                                    >
                                                        CLONE
                                                    </Button>

                                                    <Button
                                                        color="primary"
                                                        className="me-2"
                                                        onClick={openEditor}
                                                    >
                                                        EDIT PAGE
                                                    </Button>

                                                </Col>
                                            </Row> */}
                        </div>
                        {/* <EditModal
                                            toggle={toggleEditor}
                                            open={openEditor}
                                            store={store}
                                            dispatch={dispatch}
                                            step={x}
                                        /> */}
                      </Fragment>
                    </div>
                  </TabPane>
                );
              })}
          </TabContent>
        </div>
      </Col>
      <DuplicateModal store={store} isOpen={duplicateMdl} toggle={_toggleDuplicate} />
    </Row>
  );
};
