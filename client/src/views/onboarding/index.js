// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';

// ** Components
import FollowingCard from './view/FollowingCard';
import { getUserData } from '../../auth/utils';
import Timeline from '@components/timeline';

// ** Reactstrap Imports
import { Card, Col, Row, Button } from 'reactstrap';
import {
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  step10,
  step11
} from './view/stepData';

// ** Redux
import { OnBoardingStatusAction } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

// ** Icons
import { PenTool, CheckSquare, Twitter, DollarSign } from 'react-feather';
import onboardingsvg from '../../assets/img/svg/onboarding.svg';
import { BsBriefcase, BsGear, BsShop } from 'react-icons/bs';
import { RiContactsLine } from 'react-icons/ri';
import { BiBuildings } from 'react-icons/bi';
import { FaBullhorn } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';

// ** Styles
import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';

const OnBoarding = () => {
  const user = getUserData();
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.OnBoarding);

  const getStepTitle = (step) => {
    switch (step) {
      case 1:
        return 'Build your Organization';
      case 2:
        return 'Manage all your contacts in one place';
      case 3:
        return 'Organise your life with tasks goals';
      case 4:
        return 'Automate your marketing with powerful marketing tools';
      case 5:
        return 'Go to MySocial section and connect your workspace.';
      case 6:
        return 'Go to the business tools and enjoy it';
      case 7:
        return 'A powerful shop and storefront at your convenience';
      case 8:
        return 'Knowing your numbers are the key to success';
      case 9:
        return 'You can manage your own folder and files in here';
      case 10:
        return 'Go to Settings to update your account information, credit card, notifications, security, and more.';
      case 11:
        return 'Other powerful unique tools your manager can do';
      default:
        return;
    }
  };
  const getStepData = (step) => {
    switch (step) {
      case 1:
        return step1;
      case 2:
        return step2;
      case 3:
        return step3;
      case 4:
        return step4;
      case 5:
        return step5;
      case 6:
        return step6;
      case 7:
        return step7;
      case 8:
        return step8;
      case 9:
        return step9;
      case 10:
        return step10;
      case 11:
        return step11;
      default:
        return;
    }
  };

  const [stepData, setStepData] = useState(step1);
  const [stepTitle, setStepTitle] = useState('');

  const handleStepButtonClick = (step) => {
    const stepTitle = getStepTitle(step);
    const stepData = getStepData(step);
    setStepTitle(stepTitle);
    setStepData(stepData);
  };

  useEffect(() => {
    if (stepData === stepData) {
    } else {
      const stepData = getStepData(stepData);
    }
  }, [stepData]);

  useEffect(() => {
    dispatch(OnBoardingStatusAction());
  }, [dispatch]);

  const timelineData = [
    {
      title: <span className="fs-4">Organization</span>,
      icon: <BiBuildings size={14} />,
      color: 'primary',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Fill in your account and business <br /> information
            </span>

            <Button
              color="primary"
              id="reportToggler intro"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(1);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Contacts</span>,
      icon: <RiContactsLine size={14} color="#6c757d" />,
      color: 'secondary',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Learn how your manager can manage <br /> your contacts in your life & business
            </span>

            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(2);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Task & Goals</span>,
      icon: <CheckSquare size={14} />,
      color: 'success',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Organise your life with tasks and <br /> goals
            </span>

            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(3);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Marketing</span>,
      icon: <FaBullhorn size={14} color="#ffc107" />,
      color: 'warning',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Automate your marketing with powerful <br /> marketing tools
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(4);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">My Social</span>,
      icon: <Twitter size={14} />,
      color: 'danger',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Go to MySocial section and connect your <br /> workspace
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(5);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Businees Tools</span>,
      icon: <BsBriefcase size={14} />,
      color: 'primary',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Go to the business tools and <br /> enjoy it
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(6);
                window.scrollTo(0, 0);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Shop</span>,
      icon: <BsShop size={14} color="#28a745" />,
      color: 'success',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              A powerful shop and storefront at <br /> your convenience
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(7);
                window.scrollTo(0, 0);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Finance</span>,
      icon: <DollarSign size={14} />,
      color: 'info',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Knowing your numbers are the key <br /> to success
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(8);
                window.scrollTo(0, 0);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">File Manager</span>,
      icon: <FiSave size={14} />,
      color: 'danger',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              You can manage your own folder and <br /> files in here
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(9);
                window.scrollTo(0, 0);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Settings</span>,
      icon: <BsGear size={14} color="#ffc107" />,
      color: 'warning',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Go to Settings to update your account <br /> information, credit card, notifications,
              <br />
              security, and more.
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(10);
                window.scrollTo(0, 0);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    },
    {
      title: <span className="fs-4">Explore More</span>,
      icon: <PenTool size={14} />,
      color: 'success',
      customContent: (
        <Fragment>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ position: 'relative', top: '-10px' }}
          >
            <span>
              Other powerful unique tools your manager <br /> can do
            </span>
            <Button
              color="primary"
              outline
              onClick={(e) => {
                e.preventDefault();
                handleStepButtonClick(11);
                window.scrollTo(0, 0);
              }}
            >
              View
            </Button>
          </div>
          <hr className="mt-0 mb-1" />
        </Fragment>
      )
    }
  ];

  return (
    <Row style={{ position: 'relative', top: '-220px', margin: '10px' }}>
      <Col md={4}>
        <Card className="p-1 dashboard-timeline">
          <div className="p-1">
            <span className="fs-3">Welcome to Mymanager</span>
            <div className="d-flex justify-content-center align-items-center flex-column">
              <img src={onboardingsvg} alt="onboarding" height={200} />
              <h5 style={{ marginTop: '10px' }}>Get more by setting up the basics</h5>
            </div>
          </div>
          <Timeline data={timelineData} />
        </Card>
      </Col>
      <Col md={8}>
        <FollowingCard stepTitle={stepTitle} stepData={stepData} store={store} user={user} />
      </Col>
    </Row>
  );
};

export default OnBoarding;
