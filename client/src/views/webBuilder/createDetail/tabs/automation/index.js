// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Menu } from 'react-feather';

// ** Email App Component Imports

import RightSidebar from './RightSidebar';

// ** Third Party Components
import classnames from 'classnames';
import '@styles/react/apps/app-email.scss';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-email.scss';
import LeftSidebar from './LeftSidebar';
import MiddleSidebar from './MiddleSidebar';
import {
  getAllAutomations,
  getAllFormAutomations,
  setSelectedAutomationAction
} from '../../../../marketing/automation/store/actions';

const Progression = ({ isMobileView, isTabletView, isDesktopView }) => {
  // ** States
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState('Entry');
  const [title, setTitle] = useState('');
  const [automationUpdated, setAutomationUpdated] = useState(false);
  const [showAutomation, setShowAutomation] = useState(false);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const currentAutomation = useSelector((state) => state.automation?.selectedAutomation);
  const allAutomations = useSelector((state) => state.automation?.allAutomations);
  const form = useSelector((state) => state.websiteEditor?.form);

  useEffect(() => {
    dispatch(getAllFormAutomations({ formId: form?._id }));
  }, [form]);
  // useEffect(() => {
  //   setSelectedCriteria(form?.formData?.[0]);
  // }, [form]);
  useEffect(() => {
    setTitle(currentAutomation?.automationName);
  }, [currentAutomation]);
  useEffect(() => {
    if (currentAutomation?.actions?.length > 0) {
      setAutomationUpdated(true);
    }
  }, [currentAutomation?.actions]);
  useEffect(() => {
    setAutomationUpdated(false);
    setShowAutomation(false);
    const tmpSelectedAutomation = allAutomations.find(
      (x) => x?.activationUpon?.criteria?.criteriaType == selectedCriteria
    );
    if (tmpSelectedAutomation) {
      dispatch(setSelectedAutomationAction(tmpSelectedAutomation));
    } else {
      dispatch(
        setSelectedAutomationAction({
          _id: '',
          automationName: '',
          contactInfo: {},
          activationUpon: {},
          activateTime: {},
          actions: [],
          isActive: false,
          userName: '',
          userEmail: '',
          userPhone: ''
        })
      );
    }
  }, [allAutomations, selectedCriteria]);

  // ** Vars
  const params = useParams();

  return (
    <div className="overflow-hidden email-application">
      <div className="content-area-wrapper animate__animated animate__fadeIn d-flex">
        <LeftSidebar
          isMobileView={isMobileView}
          isTabletView={isTabletView}
          isDesktopView={isDesktopView}
          form={form}
          selectedCriteria={selectedCriteria}
          setSelectedCriteria={setSelectedCriteria}
          setTitle={setTitle}
          setShowAutomation={setShowAutomation}
          currentAutomation={currentAutomation}
        />

        {/* <MiddleSidebar
          isMobileView={isMobileView}
          isTabletView={isTabletView}
          isDesktopView={isDesktopView}
          form={form}
          selectedCriteria={selectedCriteria}
          title={title}
          setTitle={setTitle}
          automationUpdated={automationUpdated}
          setAutomationUpdated={setAutomationUpdated}
          showAutomation={showAutomation}
          setShowAutomation={setShowAutomation}
          currentAutomation={currentAutomation}
        /> */}

        <RightSidebar
          isDesktopView={isDesktopView}
          isMobileView={isMobileView}
          isTabletView={isTabletView}
          form={form}
          title={title}
          setTitle={setTitle}
          selectedCriteria={selectedCriteria}
          setAutomationUpdated={setAutomationUpdated}
          showAutomation={showAutomation}
          setShowAutomation={setShowAutomation}
          automationUpdated={automationUpdated}
          currentAutomation={currentAutomation}
        />
      </div>
    </div>
  );
};

export default Progression;
