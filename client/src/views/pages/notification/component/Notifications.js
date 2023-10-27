import React, { useEffect, useMemo, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegAddressBook } from 'react-icons/fa';
import { RiCake2Line, RiMoneyDollarBoxLine } from 'react-icons/ri';
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import Avatar from '@components/avatar';
import {
  ClassComponent,
  BirthdayComponent,
  EventComponent,
  TaskComponent,
  MembershipComponent
} from './NotificationComp';
import imgBirth from '../../../../../src/assets/images/avatars/5.png';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { Book } from 'react-feather';
import { AiOutlineBars } from 'react-icons/ai';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { TbHomeOff } from 'react-icons/tb';
import { useSelector } from 'react-redux';

function Notifications() {
  const [isBirthdayComponentVisible, setIsBirthdayComponentVisible] = useState(true);
  const [isRetentionComponentVisible, setIsRetentionComponentVisible] = useState(true);
  const [isTaskComponentVisible, setIsTaskComponentVisible] = useState(true);
  const [isEventComponentVisible, setIsEventComponentVisible] = useState(true);
  const [isMembershipComponentVisible, setIsMembershipComponentVisible] = useState(true);
  const [isClassComponentVisible, setIsClassComponentVisible] = useState(true);
  const [isFinanceComponentVisible, setIsFinanceComponentVisible] = useState(true);
  const notificationBirthday = useSelector((state) => state.totalContacts?.notificationList);
  const [notificationBirthdayMain, setNotificationBirthday] = useState({ totalLengh: 0, data: [] });
  const [active, setActive] = useState('1');
  // useEffect(() => {
  //      setNotificationBirthday({
  //       data: notificationBirthdayMain?.thisMonthBirthdays  ,
  //       totalLengh: notificationBirthdayMain?.thisMonthBirthdaysCount || 0
  //     });
  // }, [notificationBirthday]);
  useMemo(() => {
    // if (notificationSelected === 'today') {
      // notificationBirthday?.thisMonthBirthdays
      setNotificationBirthday({
        data: notificationBirthday?.thisMonthBirthdays  ,
        totalLengh: notificationBirthday?.thisMonthBirthdaysCount || 0
      });
    //  }
    },[notificationBirthday])

  return (
    <Row className="px-1">
      <Col md="3" className="">
        <Card className="advanced-setting  mb-3">
          <div className="text-center mt-2">
            <h5 className="">Manage your Notifications</h5>
          </div>
          <div
            className="form-group-compose text-center compose-btn  mb-5  ms-2 me-2"
            style={{ marginTop: '3px' }}
          >
            <Link to="/setting">
              <Button className="compose-email" color="primary" block>
                View Setting
              </Button>
            </Link>
          </div>
        </Card>
      </Col>
      <Col
        md={{
          offset: 0,
          size: 7
        }}
        className=""
      >
        <Card className="advanced-setting  mb-3  " style={{ marginLeft: '-12px' }}>
          <div className="p-2 border-bottom ">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="notification-title mb-0 me-auto">Notifications</h4>
              <div className="me-1">
                {' '}
                <HiOutlineDotsHorizontal size="19" />
              </div>
            </div>
            <div className="mt-1">
              {' '}
              <Nav pills className="mb-0">
                <NavItem>
                  <NavLink
                    className="account-tour-start-point"
                    active={active === '1'}
                    onClick={() => {
                      setActive('1');
                    }}
                  >
                    <span className="" style={{ fontSize: '15px', fontWeight: '400' }}>
                      All
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="billing-tour-start-point"
                    active={active === '2'}
                    onClick={() => {
                      setActive('2');
                    }}
                  >
                    <span className="" style={{ fontSize: '15px', fontWeight: '400' }}>
                      Unread
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <div
            className={
              isBirthdayComponentVisible
                ? 'p-1 border-top d-flex justify-content-between'
                : '     border p-1 d-flex justify-content-between '
            }
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <RiCake2Line size="21" />
                </div>
              </div>
              <div className="ms-2 " style={{ fontWeight: '500' }}>
                Birthday{' '}
              </div>
            </div>
            <div className="d-flex ">
              <div className="me-5 ">
                {' '}
                <Badge pill color="light-info" className="">
                  {notificationBirthdayMain?.totalLengh}
                </Badge>
              </div>
              <div
                className="me-1 "
                onClick={() => setIsBirthdayComponentVisible(!isBirthdayComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {isBirthdayComponentVisible ? (
                  <FaChevronUp size="14" />
                ) : (
                  <FaChevronDown size="14" />
                )}
              </div>
            </div>
          </div>
          {
            isBirthdayComponentVisible &&  <BirthdayComponent notificationBirthdayMain =  {notificationBirthdayMain} />
          }
          <div
            className={
              isRetentionComponentVisible
                ? 'p-1 border-top d-flex justify-content-between'
                : '     border p-1 d-flex justify-content-between '
            }
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <Book size="21" style={{ fontWeight: '500' }} />
                </div>
              </div>
              <div className="ms-2 " style={{ fontWeight: '500' }}>
                Retention{' '}
              </div>
            </div>
            <div className="d-flex ">
              <div className="me-5 ">
                {' '}
                <Badge pill color="light-info" className="">
                  {2}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => {
                  setIsRetentionComponentVisible(!isRetentionComponentVisible);
                }}
                style={{ cursor: 'pointer' }}
              >
                {isRetentionComponentVisible ? (
                  <FaChevronUp size="14" />
                ) : (
                  <FaChevronDown size="14" />
                )}
              </div>
            </div>
          </div>
          {isRetentionComponentVisible && <BirthdayComponent />}
          <div className="border p-1 d-flex justify-content-between ">
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <RiMoneyDollarBoxLine size="21" style={{ fontWeight: '500' }} />
                </div>
              </div>
              <div className="ms-2 " style={{ fontWeight: '500' }}>
                Finance{' '}
              </div>
            </div>
            <div className="d-flex ">
              <div className="me-5 ">
                {' '}
                <Badge pill color="light-info" className="">
                  {2}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => {
                  setIsFinanceComponentVisible(!isFinanceComponentVisible);
                }}
                style={{ cursor: 'pointer' }}
              >
                {isFinanceComponentVisible ? (
                  <FaChevronUp size="14" />
                ) : (
                  <FaChevronDown size="14" />
                )}
              </div>
            </div>
          </div>
          <div
            className={
              isTaskComponentVisible
                ? 'p-1 border-top d-flex justify-content-between'
                : '     border p-1 d-flex justify-content-between '
            }
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <AiOutlineBars size="21" style={{ fontWeight: '500' }} />
                </div>
              </div>
              <div className="ms-2 " style={{ fontWeight: '500' }}>
                Task & Goals{' '}
              </div>
            </div>
            <div className="d-flex ">
              <div className="me-5 ">
                {' '}
                <Badge pill color="light-info" className="">
                  {2}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsTaskComponentVisible(!isTaskComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {isTaskComponentVisible ? <FaChevronUp size="14" /> : <FaChevronDown size="14" />}
              </div>
            </div>
          </div>
          {isTaskComponentVisible && <TaskComponent />}
          <div
            className={
              isEventComponentVisible
                ? 'p-1 border-top d-flex justify-content-between'
                : '     border p-1 d-flex justify-content-between '
            }
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <HiOutlineCalendarDays size="21" style={{ fontWeight: '500' }} />
                </div>
              </div>
              <div className="ms-2 " style={{ fontWeight: '500' }}>
                Events{' '}
              </div>
            </div>
            <div className="d-flex ">
              <div className="me-5 ">
                {' '}
                <Badge pill color="light-info" className="">
                  {3}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsEventComponentVisible(!isEventComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {isEventComponentVisible ? <FaChevronUp size="14" /> : <FaChevronDown size="14" />}
              </div>
            </div>
          </div>
          {isEventComponentVisible && <EventComponent />}
          <div
            className={
              isMembershipComponentVisible
                ? 'p-1 border-top d-flex justify-content-between'
                : '     border p-1 d-flex justify-content-between '
            }
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <TbHomeOff size="21" />
                </div>
              </div>
              <div className="ms-2  " style={{ fontWeight: '500' }}>
                Membership{' '}
              </div>
            </div>
            <div className="d-flex ">
              <div className="me-5 ">
                {' '}
                <Badge pill color="light-info" className="">
                  {3}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsMembershipComponentVisible(!isMembershipComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {isMembershipComponentVisible ? (
                  <FaChevronUp size="14" />
                ) : (
                  <FaChevronDown size="14" />
                )}
              </div>
            </div>
          </div>
          {isMembershipComponentVisible && <MembershipComponent />}
          <div
            className={
              isClassComponentVisible
                ? 'p-1  border-top  d-flex justify-content-between'
                : '   mb-3  border border-bottom p-1 d-flex justify-content-between '
            }
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <FaRegAddressBook size="21" />
                </div>
              </div>
              <div className="ms-2 " style={{ fontWeight: '500' }}>
                Classes{' '}
              </div>
            </div>
            <div className="d-flex ">
              <div className="me-5 ">
                {' '}
                <Badge pill color="light-info" className="">
                  {3}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsClassComponentVisible(!isClassComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {isClassComponentVisible ? <FaChevronUp size="14" /> : <FaChevronDown size="14" />}
              </div>
            </div>
          </div>
          {isClassComponentVisible && <ClassComponent />}
        </Card>
        {/* <div className="border p-1 d-flex justify-content-between"></div> */}
        {/* <Card className="advanced-setting sidebar-wdth mb-3 " style={{ marginLeft: '10px' }}>
          <Card
            className="advanced-setting sidebar-wdth mb-0 "
            style={{ marginLeft: '10px', background: 'yellow' }}
          >
            <CardBody>
              <div className="fs-5 fw-medium">This Week Birthday Notification</div>
            </CardBody>
          </Card>
          <Card
            className="advanced-setting sidebar-wdth mb-0 "
            style={{ marginLeft: '10px', background: 'red' }}
          >
            <CardBody>
              <div className="fs-5 fw-medium">This Week Birthday Notification</div>
            </CardBody>
          </Card>
          <Card
            className="advanced-setting sidebar-wdth mb-0 "
            style={{ marginLeft: '10px', background: '#f5cb42' }}
          >
            <CardBody>
              <div className="fs-5 fw-medium">This Week Birthday Notification</div>
            </CardBody>
          </Card>
        </Card>  */}
      </Col>
    </Row>
  );
}

export default Notifications;
