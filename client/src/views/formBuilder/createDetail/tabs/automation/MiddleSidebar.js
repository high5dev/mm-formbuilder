import { useState } from 'react';
import { Check, X } from 'react-feather';
import { Button, Input, Label } from 'reactstrap';
import NewAutomationModal from './NewAutomation/NewAutomationModal';
import Swal from 'sweetalert2';
import { saveFormAutomationAction } from '../../../../marketing/automation/store/actions';
import { getUserData } from '../../../../../utility/Utils';
import { useDispatch } from 'react-redux';
import { updateFormAction } from '../../../store/action';

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label">
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

const MiddleSidebar = ({
  isMobileView,
  isTabletView,
  form,
  selectedStep,
  title,
  setTitle,
  automationUpdated,
  setAutomationUpdated,
  showAutomation,
  setShowAutomation,
  currentAutomation
}) => {
  const [newAutomationModal, setNewAutomationModal] = useState(false);
  const [row, setRow] = useState({
    // id: '2633463k23423',
    id: '',
    isActive: false
  });

  const dispatch = useDispatch();
  const userData = getUserData();
  const userName = userData?.fullName,
    userEmail = userData?.email,
    userPhone = userData?.phone;

  const newAutomation = () => {
    setNewAutomationModal(true);
  };
  const toggleNewAutomationModal = () => {
    setNewAutomationModal((prev) => !prev);
  };
  const handleEditAutomation = () => {
    setShowAutomation(true);
  };
  const handleSaveAutomation = () => {
    Swal.fire({
      title: 'Save Automation',
      text: `Do you want to save this automation for step 1?`,
      icon: 'question',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#d33',

      showCancelButton: true,
      cancelButtonText: 'No',
      cancelButtonColor: '#3085d6',

      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        const _selectedAutomation = {
          ...currentAutomation,
          automationName: title,
          userName,
          userEmail,
          userPhone
        };
        dispatch(saveFormAutomationAction(_selectedAutomation)).then((res) => {
          console.log(res);
          const savedData = res.data.data;
          const automationId = savedData?._id;
          const tmpForm = {
            ...form,
            formData: form.formData?.map((step) =>
              step.id == selectedStep.id
                ? {
                    ...step,
                    automationId
                  }
                : step
            )
          };
          dispatch(updateFormAction(form?._id, tmpForm));
          if ((res.status = 200)) {
            Swal.fire({
              icon: 'success',
              title: 'Saved!',
              text: 'Your automation saved successfully.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong!',
              text: 'Save automation failed.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          }
        });
      }
    });
  };
  const handleChangeAutomationStatus = (id) => {
    setRow((prev) => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  return (
    <div
      className="sidebar"
      style={{
        height: isMobileView ? '30vh' : isTabletView ? '25vh' : '77vh',
        maxWidth: isMobileView ? '' : isTabletView ? '' : '260px'
      }}
    >
      <div className="sidebar-content email-app-sidebar bg-white h-100">
        <div className="email-app-menu border-end " style={{ height: '77vh' }}>
          {!title || title.length == 0 ? (
            <div>
              <div className="form-group-compose text-center compose-btn automation-tour-2 p-1">
                <Button
                  className="compose-email"
                  color="primary"
                  block
                  onClick={() => newAutomation()}
                >
                  Create Automation
                </Button>
              </div>
              <div className="no-automation d-flex justify-content-center text-center">
                Create your automation <br /> for {selectedStep?.name}
              </div>
            </div>
          ) : (
            <div>
              <div className="title d-flex justify-content-between align-items-center p-1">
                <h5 className="mb-0">Automation Type</h5>
                {showAutomation ? (
                  <Button
                    className=""
                    color="primary"
                    onClick={handleSaveAutomation}
                    disabled={!automationUpdated}
                  >
                    Save
                  </Button>
                ) : (
                  <Button className="" color="primary" onClick={handleEditAutomation}>
                    Edit
                  </Button>
                )}
              </div>
              <div className="form-name p-1">
                <h5 className="m-0">Form step name</h5>
                <h6 className="ms-1 mt-1 mb-0">{selectedStep?.name}</h6>
              </div>
              <div className="automation-setting p-1">
                <h5 className="m-0">Setting</h5>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="ms-1 mt-1">Status</h6>
                  <div className="form-switch form-check-danger">
                    <Input
                      type="switch"
                      id={row._id}
                      onChange={(e) => handleChangeAutomationStatus(e.target.id)}
                      checked={row.isActive}
                      name="icon-danger"
                    />
                    <CustomLabel htmlFor={row._id} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <NewAutomationModal
        open={newAutomationModal}
        toggle={toggleNewAutomationModal}
        title={title}
        setTitle={setTitle}
      />
    </div>
  );
};

export default MiddleSidebar;
