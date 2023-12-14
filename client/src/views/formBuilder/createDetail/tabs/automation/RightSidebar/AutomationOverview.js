// ** React Imports
import { Fragment, useState, forwardRef } from 'react';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';

import { ChevronDown, Loader, Lock, Menu, Plus, Search, Trash2 } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import {
  setEditAutomation,
  setNewAutomation,
  changeStatusAction,
  getAllAutomations,
  deleteAutomationAction,
  setSelectedAutomationAction,
  changeFormAutomationStatusAction,
  deleteFormAutomationAction
} from '../../../../../marketing/automation/store/actions';
import '@styles/react/apps/app-kanban.scss';
import { Check, X, MoreVertical, Edit, FileText, Archive, Trash, Share2 } from 'react-feather';
// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  InputGroupText,
  InputGroup,
  UncontrolledTooltip,
  CardBody
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Swal from 'sweetalert2';
import '@src/assets/styles/business/formsnfunnels/automation/toggle-switch.scss';
import '@src/assets/styles/toggle-switch.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import '@styles/react/apps/app-email.scss';
import '@src/assets/styles/marketing.scss';
import { FaChevronDown, FaChevronUp, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import automationImg from '@src/assets/images/pages/automation.png';
import automationImg3 from '@src/assets/images/pages/automation3.jpg';

// ** Utils
import { selectThemeColors } from '@utils';
import NewAutomationModal from '../NewAutomation/NewAutomationModal';
// ** Reactstrap Imports

// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef((props, ref) => (
//   <div className="form-check">
//     <Input type="checkbox" ref={ref} {...props} />
//   </div>
// ));
const CustomLabel = ({ htmlFor, changeStatus, automationId }) => {
  return (
    <Label
      className="form-check-label"
      onClick={(e) => {
        changeStatus(automationId);
      }}
    >
      <span className="switch-icon-left">
        <Check
          size={14}
          onClick={(e) => {
            changeStatus(automationId);
          }}
        />
      </span>
      <span className="switch-icon-right">
        <X
          size={14}
          onClick={(e) => {
            changeStatus(automationId);
          }}
        />
      </span>
    </Label>
  );
};
const AutomationOverview = ({
  isMobileView,
  isTabletView,
  isDesktopView,
  form,
  setTitle,
  setShowAutomation,
  currentAutomation,
  selectedCriteria
}) => {
  // ** States
  const [newAutomationModal, setNewAutomationModal] = useState(false);

  const dispatch = useDispatch();

  const onSetEditAutomatoin = async (id) => {
    await dispatch(setEditAutomation(id));
    setShowAutomation(true);
  };

  const changeStatus = (id) => {
    dispatch(
      setSelectedAutomationAction({
        ...currentAutomation,
        isActive: !currentAutomation?.isActive
      })
    );
    dispatch(changeFormAutomationStatusAction({ automationId: id, formId: form?._id }));
  };

  const deleteAutomation = async (id) => {
    try {
      const automationId = id;

      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete the automation.',
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete anyway',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteFormAutomationAction({ automationId, formId: form?._id }));
        }
      });
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while deleting the automation.', 'error');
    }
  };

  const handleCreateNewAutomation = () => {
    setNewAutomationModal(true);
  };
  const toggleNewAutomationModal = () => {
    setNewAutomationModal((prev) => !prev);
  };

  return (
    <Fragment>
      <Card
        className="mb-0 automation-tour-15"
        style={{ width: '100%', boxShadow: 'none', height: 'calc(100vh - 16rem)' }}
      >
        <div className="p-1">
          <Row>
            <Col md="12">
              <div className="d-flex align-items-center pb-1" style={{ width: '100%' }}>
                <div className="" style={{ width: 'calc(100% - 100px)' }}>
                  <h4 className="mb-0">{selectedCriteria} Automation</h4>
                </div>
              </div>
            </Col>
            <Col md="12">
              {currentAutomation?._id !== '' ? (
                <div className="automatio-overview-page d-flex justify-content-center mt-5">
                  <div className="d-flex align-items-center">
                    <Row>
                      <Col lg={6} md={12} sm={12}>
                        <img src={automationImg3} width={270} height={300} alt="auto-overview" />
                      </Col>
                      <Col
                        className="d-flex flex-column justify-content-center"
                        lg={6}
                        md={12}
                        sm={12}
                      >
                        <div className="ms-1" style={{ minWidth: '400px' }}>
                          <div>
                            <div>
                              <Label>
                                <h6>
                                  Automation name: <b>{currentAutomation?.automationName}</b>
                                </h6>
                              </Label>
                            </div>
                            <div>
                              <Label>
                                <h6>
                                  Actions: <b>{currentAutomation?.actions?.length}</b>
                                </h6>
                              </Label>
                            </div>
                            <div>
                              <Label>
                                <h6>
                                  Activate time:{' '}
                                  <b>
                                    {currentAutomation?.activateTime?.isImmediately
                                      ? 'Immediately'
                                      : currentAutomation?.activateTime?.time +
                                        ' ' +
                                        currentAutomation?.activateTime?.unit +
                                        ' ' +
                                        currentAutomation?.activateTime?.type?.toLowerCase()}
                                  </b>
                                </h6>
                              </Label>
                            </div>
                            <div>
                              <div className="d-flex align-items-center">
                                <Label className="mb-0">
                                  <h6 className="mb-0">Status:</h6>
                                </Label>
                                <div
                                  id={currentAutomation._id}
                                  className="ms-1"
                                  style={{ cursor: 'pointer', width: '100%', padding: 'auto' }}
                                  // onClick={(e) => onSetEditAutomatoin(e.target.id)}
                                >
                                  {/* {row.status} */}
                                  <div className="form-switch form-check-danger">
                                    <Input
                                      type="switch"
                                      id={currentAutomation._id}
                                      onChange={(e) => changeStatus(e.target.id)}
                                      checked={currentAutomation.isActive}
                                      name="icon-danger"
                                      style={{ zIndex: 9999 }}
                                    />
                                    <CustomLabel
                                      htmlFor={currentAutomation._id}
                                      changeStatus={changeStatus}
                                      automationId={currentAutomation._id}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Row>
                              <Col xl={6} lg={12} md={12} sm={12}>
                                <Button
                                  className="mt-1 me-50"
                                  color="primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onSetEditAutomatoin(currentAutomation?._id);
                                  }}
                                  style={{ minWidth: '200px' }}
                                >
                                  Edit automation
                                </Button>
                              </Col>
                              <Col xl={6} lg={12} md={12} sm={12}>
                                <Button
                                  className="mt-1"
                                  color="danger"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteAutomation(currentAutomation?._id);
                                  }}
                                  style={{ minWidth: '200px' }}
                                  outline
                                >
                                  Delete automation
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ) : (
                <div className="no-automation-page d-flex justify-content-center mt-5">
                  <div className="d-flex flex-column align-items-center">
                    <img src={automationImg} alt="no-auto" width={200} height={200} />
                    <h4>No {selectedCriteria?.toLowerCase()} automation</h4>
                    <div className="">
                      <Button className="mt-1" color="primary" onClick={handleCreateNewAutomation}>
                        Create automation
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Card>
      <NewAutomationModal
        open={newAutomationModal}
        toggle={toggleNewAutomationModal}
        setTitle={setTitle}
        setShowAutomation={setShowAutomation}
        selectedCriteria={selectedCriteria}
      />
    </Fragment>
  );
};

export default AutomationOverview;
