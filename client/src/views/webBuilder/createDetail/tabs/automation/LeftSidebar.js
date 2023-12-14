// ** React Imports
import { Link, useParams } from 'react-router-dom';

import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Plus, Info, Trash, Home } from 'react-feather';

import { Button, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import NewAutomationModal from './NewAutomation/NewAutomationModal';

const LeftSidebar = ({
  isMobileView,
  isTabletView,
  isDesktopView,
  form,
  selectedCriteria,
  setSelectedCriteria,
  setTitle,
  setShowAutomation,
  currentAutomation
}) => {
  // ** Vars
  const params = useParams();

  const dispatch = useDispatch();
  const [newAutomationModal, setNewAutomationModal] = useState(false);

  const newAutomation = () => {
    setNewAutomationModal(true);
  };
  const toggleNewAutomationModal = () => {
    setNewAutomationModal((prev) => !prev);
  };
  const formData = form?.formData;
  const criterias = ['Entry', 'Sales', 'Waiver', 'Survey', 'Booking'];

  return (
    <div
      className="sidebar"
      style={{
        height: isMobileView ? '30vh' : isTabletView ? '25vh' : '77vh',
        maxWidth: isMobileView ? '' : isTabletView ? '' : '260px'
      }}
    >
      <div className="sidebar-content email-app-sidebar bg-white">
        <div className="email-app-menu border-end " style={{ height: '77vh' }}>
          <div className="form-group-compose text-center compose-btn automation-tour-2 p-1">
            <Button
              className="compose-email"
              color="primary"
              block
              onClick={() => newAutomation()}
              disabled={currentAutomation?._id !== ''}
            >
              Create Automation
            </Button>
          </div>

          {/* <Mail size={18} className="me-75" /> */}
          <div className="d-flex">
            <h5 className="align-middle p-1" style={{ marginTop: '10px' }}>
              My Automations
            </h5>
          </div>
          <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <ListGroup tag="div" className="list-group-messages">
              {criterias?.map((criteria) => (
                <ListGroupItem
                  tag={Link}
                  action
                  onClick={() => {
                    setSelectedCriteria(criteria);
                  }}
                  active={selectedCriteria === criteria}
                >
                  <span className="align-middle">{criteria}</span>
                </ListGroupItem>
              ))}
            </ListGroup>
          </PerfectScrollbar>
        </div>
        <NewAutomationModal
          open={newAutomationModal}
          toggle={toggleNewAutomationModal}
          setTitle={setTitle}
          setShowAutomation={setShowAutomation}
          selectedCriteria={selectedCriteria}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;
