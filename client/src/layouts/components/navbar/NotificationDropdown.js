// ** React Imports
import { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components
import Avatar from '@components/avatar';
import imgBirth from '../../../../src/assets/images/avatars/5.png';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Bell,
  X,
  Check,
  AlertTriangle,
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  FileText
} from 'react-feather';
import Select from 'react-select';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { Book } from 'react-feather';
// import { selectThemeColors } from '../../../../../utility/Utils';
import { selectThemeColors } from '../../../../src/utility/Utils';
import useBirthdaySearch from './notificationHeader/useBirthdaySearch';
import useEventSearch from './notificationHeader/useEventSearch';
import useTaskSearch from './notificationHeader/useTaskSearch';

// ** Reactstrap Imports
import {
  Button,
  Badge,
  Input,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Card,
  CardBody,
  Row,
  Col,
  InputGroup,
  Dropdown,
  Spinner
} from 'reactstrap';
import { getUserData, formatToShortName, formatDateToMonthShort } from '../../../utility/Utils';
import { BiDockTop, BiFilterAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { RiCake2Line, RiMoneyDollarBoxLine } from 'react-icons/ri';
import { FaBirthdayCake, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { HiOutlineCake, HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AiOutlineBars } from 'react-icons/ai';
import { FiFilter } from 'react-icons/fi';
import {  AiOutlineAudit } from 'react-icons/ai';

import {
  TbAnalyze,
  TbHomeOff,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRight,
  TbLayoutSidebarRightCollapse,
  TbReportSearch
} from 'react-icons/tb';
import { MdCalendarMonth } from 'react-icons/md';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import '../../../assets/styles/Status.scss';
import moment from 'moment';
import { SocketContext } from '../../../../src/utility/context/Socket';
import { getNotificationsByCategoryAction } from './notifications/store/action';

const NotificationDropdown = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const chatStore = useSelector((state) => state.text);
  const { chats } = chatStore;
  const store = useSelector((state) => state.appNotifications);
  const [notificationArr, setNotificationArr] = useState([]);
  const newWorkspace = useSelector((state) => state?.workspace?.newWorkspace);
  const [isBirthdayComponentVisible, setIsBirthdayComponentVisible] = useState(false);
  const [isRetentionComponentVisible, setIsRetentionComponentVisible] = useState(false);
  const [isEventComponentVisible, setIsEventComponentVisible] = useState(false);
  const [isTaskComponentVisible, setIsTaskComponentVisible] = useState(false);
  const [isChatComponentVisible, setIsChatComponentVisible] = useState(false);
  const [isMyBuilderComponentVisible, setIsMyBuilderComponentVisible] = useState(false);
  const notificationBirthday = useSelector((state) => state.totalContacts.notificationList);
  const notificationEvent = useSelector((state) => state.totalContacts.notificationEventList);
  const notificationTask = useSelector((state) => state.totalContacts.notificationTaskList);
  const notificationRenewal = useSelector((state) => state.totalContacts.notificationRenewalList);
  const [isFinanceComponentVisible, setIsFinanceComponentVisible] = useState(false);
  const [dropdownOpenDelete, setDropdownOpenDelete] = useState(false);
  const toggleDelete = () => setDropdownOpenDelete((prevState) => !prevState);
  const [openSection, setOpenSection] = useState(null);

  const [notificationBirthdayMain, setNotificationBirthday] = useState({ totalLengh: 0, data: [] });
  const [notificationEventMain, setNotificationEventMain] = useState({ totalLengh: 0, data: [] });
  const [notificationTaskMain, setNotificationTaskMain] = useState({ totalLengh: 0, data: [] });
  const [notificationRenewalMain, setNotificationRenewalMain] = useState({
    totalLengh: 0,
    data: []
  });
  const [notificationSelected, setNotificationSelected] = useState('today');
  const [allNotificationLength, setAllNotificationLength] = useState(0);
  const [notificationBirthdayCount, setNotificationBirthdayCount] = useState(10);
  const [notificationEventCount, setNotificationEventCount] = useState(10);
  const [notificationTaskCount, setNotificationTaskCount] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [errorBirthday, setErrorBirthday] = useState(false);
  const { loadingBirthday, hasMoreBirthday, setLoadingBirthday } = useBirthdaySearch(
    notificationSelected,
    notificationBirthdayCount,
    openSection
  );
  const { loadingEvent, hasMoreEvent, setLoadingEvent } = useEventSearch(
    notificationSelected,
    notificationEventCount,
    openSection
  );
  const { loadingTask, hasMoreTask, setLoadingTask } = useTaskSearch(
    notificationSelected,
    notificationTaskCount,
    openSection
  );
  const observer = useRef();
  const observerEvent = useRef();
  const observerTask = useRef();
  const lastBirthdayElementRef = useCallback(
    (node) => {
      if (loadingBirthday) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (notificationBirthdayMain?.data.length + 5 > notificationBirthdayMain?.totalLengh) {
            setNotificationBirthdayCount(notificationBirthdayMain?.totalLengh);
          } else {
            setNotificationBirthdayCount((prevCount) => prevCount + 5);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingBirthday, hasMoreBirthday]
  );

  const lastEventElementRef = useCallback(
    (node) => {
      if (loadingEvent) return;
      if (observerEvent.current) observerEvent.current.disconnect();
      observerEvent.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (notificationEventMain?.data.length + 5 > notificationEventMain?.totalLengh) {
            setNotificationEventCount(notificationEventMain?.totalLengh);
          } else {
            setNotificationEventCount((prevCount) => prevCount + 5);
          }
        }
      });
      if (node) observerEvent.current.observe(node);
    },
    [loadingEvent, hasMoreEvent]
  );

  const lastTaskElementRef = useCallback(
    (node) => {
      if (loadingTask) return;
      if (observerTask.current) observerTask.current.disconnect();
      observerTask.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (notificationTaskMain?.data.length + 5 > notificationTaskMain?.totalLengh) {
            setNotificationTaskCount(notificationTaskMain?.totalLengh);
          } else {
            setNotificationTaskCount((prevCount) => prevCount + 5);
          }
        }
      });
      if (node) observerTask.current.observe(node);
    },
    [loadingTask, hasMoreTask]
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(()=>{
    dispatch(getNotificationsByCategoryAction({category:"MyBuilder"}))
  },[])
  useMemo(() => {
    setAllNotificationLength(
      notificationBirthdayMain?.totalLengh +
        notificationEventMain?.totalLengh +
        notificationTaskMain?.totalLengh +
        notificationRenewalMain?.totalLengh + 
        store?.myBuilder?.length + 
        store?.bookings?.length
    );
  }, [notificationBirthdayMain, notificationEventMain, notificationTaskMain, store]);
  useMemo(() => {
    if (notificationSelected === 'today') {
      setNotificationBirthday({
        data: notificationBirthday?.todays,
        totalLengh: notificationBirthday?.todaysCount || 0
      });
      setNotificationTaskMain({
        data: notificationTask?.todays,
        totalLengh: notificationTask?.todaysTaskCount || 0
      });
      setNotificationEventMain({
        data: notificationEvent?.todays,
        totalLengh: notificationEvent?.todaysEventsCount || 0
      });
      setNotificationRenewalMain({
        data: notificationRenewal?.todayExpired,
        totalLengh: notificationRenewal?.todayExpiredCount || 0
      });
    } else if (notificationSelected === 'tomorrow') {
      setNotificationBirthday({
        data: notificationBirthday?.tommorrow,
        totalLengh: notificationBirthday?.tommorrowBirthdaysCount || 0
      });

      setNotificationTaskMain({
        data: notificationTask?.tommorrow,
        totalLengh: notificationTask?.tommorrowTaskCount || 0
      });
      setNotificationEventMain({
        data: notificationEvent?.tommorrow,
        totalLengh: notificationEvent?.tommorrowEventsCount || 0
      });
      setNotificationRenewalMain({
        data: notificationRenewal?.tommorrowExpired,
        totalLengh: notificationRenewal?.tommorrowExpiredCount || 0
      });
    } else if (notificationSelected === 'thisWeek') {
      setNotificationBirthday({
        data: notificationBirthday?.thisWeek,
        totalLengh: notificationBirthday?.thisWeekBirthday || 0
      });
      setNotificationTaskMain({
        data: notificationTask?.sevenDays,
        totalLengh: notificationTask?.sevenDaysTask || 0
      });
      setNotificationEventMain({
        data: notificationEvent?.sevenDays,
        totalLengh: notificationEvent?.sevenDaysEventsCount || 0
      });
      setNotificationRenewalMain({
        data: notificationRenewal?.thisWeekExpired,
        totalLengh: notificationRenewal?.thisWeekExpiredCount || 0
      });
    } else if (notificationSelected === 'thisMonth') {
      setNotificationBirthday({
        data: notificationBirthday?.thisMonthBirthdays,
        totalLengh: notificationBirthday?.thisMonthBirthdaysCount || 0
      });
      setNotificationTaskMain({
        data: notificationTask?.thisMonth,
        totalLengh: notificationTask?.thisMonthTaskCount || 0
      });
      setNotificationEventMain({
        data: notificationEvent?.thisMonth,
        totalLengh: notificationEvent?.thisMonthEventsCount || 0
      });
      setNotificationRenewalMain({
        data: notificationRenewal?.thisMonthExpired,
        totalLengh: notificationRenewal?.thisMonthExpiredCount || 0
      });
    }
  }, [
    notificationBirthday,
    notificationSelected,
    notificationTask,
    notificationEvent,
    notificationRenewal
  ]);

  const handleSectionClick = (sectionName) => {
    if (openSection === sectionName) {
      setOpenSection(null); // Close the section if it's already open
    } else {
      setOpenSection(sectionName); // Open the clicked section
    }
  };

  const fetchMoreBirthday = () => {
    socket.emit('getNotifications', getUserData().id, notificationBirthdayCount, 1);
    setNotificationBirthdayCount((prevCount) => prevCount + 5);
  };
  const handleScrollYReachEnd = (container) => {
    //   container.scrollTop + container.clientHeight === container.scrollHeight;
    // if (container.scrollTop === 277 && notificationBirthdayCount !== notificationBirthdayMain?.length)  {
    //   socket.emit('getNotifications', getUserData().id, notificationBirthdayCount, 1);
    //   setNotificationBirthdayCount((prevCount) => prevCount + 5);
    // }
  };

  const clearAllNotifications = () => {};

  const renderChevronIcon = (sectionName) => {
    if (openSection === sectionName) {
      return <FaChevronUp size="14" />;
    } else {
      return <FaChevronDown size="14" />;
    }
  };
  useEffect(() => {
    if (newWorkspace?.length > 0) {
      let tmp = [...notificationArr];
      newWorkspace.map((newWorkspaceItem) => {
        if (newWorkspaceItem?.assigner && newWorkspaceItem?.workspace) {
          tmp.push({
            link: '/tasksAndGoals/2',
            fullName:
              newWorkspaceItem.assigner.firstName + ' ' + newWorkspaceItem.assigner.lastName,
            subtitle: `${
              newWorkspaceItem.assigner.firstName + ' ' + newWorkspaceItem.assigner.lastName
            } shared ${newWorkspaceItem.workspace.title} workspace`,
            date: formatDateToMonthShort(newWorkspaceItem.workspace.updatedAt),
            title: (
              <p className="media-heading">
                <span className="fw-bolder">New shared 🎉</span>workspace!
              </p>
            )
          });
        }
      });
      setNotificationArr(tmp);
    } else return;
  }, [newWorkspace]);
  const DropDownMenuNoti = () => {
    return (
      <DropdownMenu flip right>
        <DropdownItem
          tag={Link}
          className="w-100"
          // to={`/contacts/view/${item._id}/${contactType}`}
        >
          <IoNotificationsOffOutline size={14} className="me-50" />
          <span className="align-middle">Remove Notification</span>
        </DropdownItem>
      </DropdownMenu>
    );
  };
  useMemo(() => {
    if (isRetentionComponentVisible) {
      setIsBirthdayComponentVisible(false);
    }
  }, [isRetentionComponentVisible]);
  useEffect(() => {
    socket.on('newWorkspace', (data) => {
      if (data.assigneeArr.includes(getUserData().id)) {
        let tmp = [...notificationArr];
        tmp.push({
          link: '/tasksAndGoals/2',
          fullName: data.assigner,
          subtitle: `${data.assigner} shared ${data.workspace} workspace`,
          date: formatDateToMonthShort(new Date()),
          title: (
            <p className="media-heading">
              <span className="fw-bolder">New shared 🎉</span>workspace!
            </p>
          )
        });
        setNotificationArr(tmp);
      }
    });
    return () => {
      socket.off('newWorkspace');
    };
  }, [socket]);

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <div
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false
        }}
      >
        {notificationArr.map((item, index) => {
          return (
            <div className="d-flex align-items-center py-1">
              <a key={index} className="d-flex align-items-center" href={item.link}>
                <div className="p-50">
                  <Avatar
                    color="primary"
                    imgHeight="40"
                    imgWidth="40"
                    status="online"
                    content={formatToShortName(item.fullName) || 'N/A'}
                  />
                </div>
                <div className="ps-2">
                  <h4>{item.title}</h4>
                  <h4 className="font-small-4 mb-0">{item.subtitle}</h4>
                </div>
                <div className="ps-1">
                  <h4>{item?.date}</h4>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    );
  };

  const BirthdayComponent = () => {
    const renderClient = (row) => {
      let tmpValue = 0;
      Array.from(row).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
      const stateNum = tmpValue % 6,
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];

      if (row?.photo) {
        return (
          <Link to={`/contacts/view/${row._id}/${contactType}`}>
            <Avatar className="me-1" img={row?.photo} width="32" height="32" />
          </Link>
        );
      } else {
        return (
          <Avatar
            color={color || 'primary'}
            className="me-1"
            content={row || 'John Doe'}
            initials
          />
        );
      }
    };

    return (
      <>
        {notificationBirthdayMain?.totalLengh > 0 ? (
          notificationBirthdayMain?.data?.map((birthday, index) => {
            if (
              notificationBirthdayMain?.data?.totalLengh === notificationBirthdayMain?.data.length
            ) {
              setLoadingBirthday(false);
            }
            if (notificationBirthdayMain?.data.length === index + 1) {
              return (
                <div
                  className="border-bottom  p-1 ms-1  me-1 "
                  ref={
                    notificationBirthdayMain?.data?.totalLengh !==
                    notificationBirthdayMain?.data.length
                      ? lastBirthdayElementRef
                      : null
                  }
                  key={birthday?._id}
                >
                  <div className="d-flex justify-content-between gap-1  align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      {renderClient(birthday?.fullName)}
                      {birthday?.fullName}
                    </div>
                    <div className="flex-fill " style={{ fontSize: '13px' }}>
                      <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
                        {birthday?.contactType?.name}
                      </Badge>
                    </div>
                    <div className="flex-fill">
                      <Badge style={{ fontSize: '10px' }} className="text-success  bg-light">
                        {moment(birthday.dob).format('MMMM D, YYYY')}
                      </Badge>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <div
                      className="ms-3    fw-semibold  text-secondary"
                      style={{ fontSize: '12px' }}
                    >
                      2 hours ago
                    </div>
                    <div className="me-2">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <HiOutlineDotsHorizontal size="18" />
                        </DropdownToggle>
                        <DropDownMenuNoti />
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="border-bottom  p-1 ms-1  me-1 " key={birthday?._id}>
                  <div className="d-flex justify-content-between gap-1  align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      {renderClient(birthday?.fullName)}
                      {birthday?.fullName}
                    </div>
                    <div className="flex-fill " style={{ fontSize: '13px' }}>
                      <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
                        {birthday?.contactType?.name}
                      </Badge>
                    </div>
                    <div className="flex-fill">
                      <Badge style={{ fontSize: '10px' }} className="text-success  bg-light">
                        {moment(birthday.dob).format('MMMM D, YYYY')}
                      </Badge>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <div
                      className="ms-3    fw-semibold  text-secondary"
                      style={{ fontSize: '12px' }}
                    >
                      2 hours ago
                    </div>
                    <div className="me-2">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <HiOutlineDotsHorizontal size="18" />
                        </DropdownToggle>
                        <DropDownMenuNoti />
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="  pb-1  pr-1 pl-1 me-1 text-center">
            Sorry! There are no Birthdays🎂🎂🎉🎉{' '}
          </div>
        )}
        {loadingBirthday && (
          <div className="d-flex  justify-content-center mb-2 mt-2">
            <Spinner color="primary">Loading...</Spinner>
          </div>
        )}
      </>
    );
  };
  const RenewalComponent = () => {
    const renderClient = (row) => {
      let tmpValue = 0;
      Array.from(row).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
      const stateNum = tmpValue % 6,
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];

      if (row?.photo) {
        return (
          <Link to={`/contacts/view/${row._id}/${contactType}`}>
            <Avatar className="me-1" img={row?.photo} width="32" height="32" />
          </Link>
        );
      } else {
        return (
          <Avatar
            color={color || 'primary'}
            className="me-1"
            content={row || 'John Doe'}
            initials
          />
        );
      }
    };

    return (
      <>
        {notificationRenewalMain?.totalLengh > 0 ? (
          notificationRenewalMain?.data?.map((item, index) => {
            if (
              notificationRenewalMain?.data?.totalLengh === notificationRenewalMain?.data.length
            ) {
              setLoadingBirthday(false);
            }
            if (notificationRenewalMain?.data.length === index + 1) {
              return (
                <div
                  className="border-bottom  p-1 ms-1  me-1 "
                  ref={
                    notificationRenewalMain?.data?.totalLengh !==
                    notificationRenewalMain?.data.length
                      ? lastBirthdayElementRef
                      : null
                  }
                  key={item?._id}
                >
                  <div className="d-flex justify-content-between gap-1  align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      Your Membership{' '}
                      <span className="" style={{ fontWeight: '600' }}>
                        {item?.name}
                      </span>
                      is Expring on{' '}
                      <span className="" style={{ fontWeight: '500' }}>
                        {' '}
                        ⏰⏰ {moment(item.endDate).calendar()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start mt-1">
                    <div className="   fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
                      2 hours ago
                    </div>
                    <div className="me-2">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <HiOutlineDotsHorizontal size="18" />
                        </DropdownToggle>
                        <DropDownMenuNoti />
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="border-bottom  p-1 ms-1  me-1 " key={item?._id}>
                  <div className="d-flex justify-content-between gap-1  align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      Your Membership{' '}
                      <span className="" style={{ fontWeight: '600' }}>
                        {item?.name}
                      </span>
                      is Expring on{' '}
                      <span className="" style={{ fontWeight: '500' }}>
                        {' '}
                        ⏰⏰ {moment(item.endDate).calendar()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start mt-1">
                    <div className="   fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
                      2 hours ago
                    </div>
                    <div className="me-2">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <HiOutlineDotsHorizontal size="18" />
                        </DropdownToggle>
                        <DropDownMenuNoti />
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="  pb-1  pr-1 pl-1 me-1 text-center">
            Sorry! There are no Membership expired 🎉🎉{' '}
          </div>
        )}
        {/* {loadingBirthday && (
          <div className="d-flex  justify-content-center mb-2 mt-2">
            <Spinner color="primary">Loading...</Spinner>
          </div>
        )} */}
      </>
    );
  };
  const MissCallComponent = () => {
    const renderClient = (row) => {
      let tmpValue = 0;
      Array.from(row).forEach((x, index) => {
        tmpValue += x.codePointAt(0) * (index + 1);
      });
      const stateNum = tmpValue % 6,
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];

      if (row?.photo) {
        return (
          <Link to={`/contacts/view/${row._id}/${contactType}`}>
            <Avatar className="me-1" img={row?.photo} width="32" height="32" />
          </Link>
        );
      } else {
        return (
          <Avatar
            color={color || 'primary'}
            className="me-1"
            content={row || 'John Doe'}
            initials
          />
        );
      }
    };

    return (
      <>
        {notificationRenewalMain?.totalLengh > 0 ? (
          notificationRenewalMain?.data?.map((item, index) => {
            if (
              notificationRenewalMain?.data?.totalLengh === notificationRenewalMain?.data.length
            ) {
              setLoadingBirthday(false);
            }
            if (notificationRenewalMain?.data.length === index + 1) {
              return (
                <div
                  className="border-bottom  p-1 ms-1  me-1 "
                  ref={
                    notificationRenewalMain?.data?.totalLengh !==
                    notificationRenewalMain?.data.length
                      ? lastBirthdayElementRef
                      : null
                  }
                  key={item?._id}
                >
                  <div className="d-flex justify-content-between gap-1  align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      Your Membership{' '}
                      <span className="" style={{ fontWeight: '600' }}>
                        {item?.name}
                      </span>
                      is Expring on{' '}
                      <span className="" style={{ fontWeight: '500' }}>
                        {' '}
                        ⏰⏰ {moment(item.endDate).calendar()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start mt-1">
                    <div className="   fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
                      2 hours ago
                    </div>
                    <div className="me-2">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <HiOutlineDotsHorizontal size="18" />
                        </DropdownToggle>
                        <DropDownMenuNoti />
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="border-bottom  p-1 ms-1  me-1 " key={item?._id}>
                  <div className="d-flex justify-content-between gap-1  align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      Your Membership{' '}
                      <span className="" style={{ fontWeight: '600' }}>
                        {item?.name}
                      </span>
                      is Expring on{' '}
                      <span className="" style={{ fontWeight: '500' }}>
                        {' '}
                        ⏰⏰ {moment(item.endDate).calendar()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-start mt-1">
                    <div className="   fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
                      2 hours ago
                    </div>
                    <div className="me-2">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <HiOutlineDotsHorizontal size="18" />
                        </DropdownToggle>
                        <DropDownMenuNoti />
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="  pb-1  pr-1 pl-1 me-1 text-center">
            Sorry! There are no Membership expired 🎉🎉{' '}
          </div>
        )}
        {/* {loadingBirthday && (
          <div className="d-flex  justify-content-center mb-2 mt-2">
            <Spinner color="primary">Loading...</Spinner>
          </div>
        )} */}
      </>
    );
  };
  const EventComponent = () => {
    return (
      <>
        {notificationEventMain?.totalLengh > 0 ? (
          notificationEventMain?.data?.map((item, i) => {
            if (notificationEventMain?.data.length === i + 1) {
              return (
                <div
                  className="border-bottom p-1 ms-1 me-1"
                  ref={
                    notificationEventMain?.data?.totalLengh !== notificationEventMain?.data.length
                      ? lastEventElementRef
                      : null
                  }
                  key={item?._id}
                >
                  <div className="d-flex    justify-content-between gap-1   align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      {item?.title}
                    </div>
                    <div className="flex-fill" style={{ fontSize: '13px' }}>
                      20$
                    </div>
                    <div className="flex-fill">
                      <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
                        {moment(item.events?.start).format('MMMM D, YYYY')}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className="   fw-semibold text-secondary "
                    style={{ fontSize: '12px', marginTop: '2px' }}
                  >
                    {item?.note && item?.note?.length > 56
                      ? item?.note.slice(0, 56) + '...'
                      : item?.note}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="border-bottom p-1 ms-1 me-1" key={item?._id}>
                  <div className="d-flex    justify-content-between gap-1   align-items-center">
                    <div className=" flex-fill" style={{ fontSize: '13px' }}>
                      {item?.title}
                    </div>
                    <div className="flex-fill" style={{ fontSize: '13px' }}>
                      20$
                    </div>
                    <div className="flex-fill">
                      <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
                        {moment(item.events?.start).format('MMMM D, YYYY')}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className="   fw-semibold text-secondary "
                    style={{ fontSize: '12px', marginTop: '2px' }}
                  >
                    {item?.note && item?.note?.length > 56
                      ? item?.note.slice(0, 56) + '...'
                      : item?.note}
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="  pb-1  pr-1 pl-1 me-1 text-center">Sorry! There are no Events🎉🎉 </div>
        )}
        {loadingEvent && (
          <div className="d-flex  justify-content-center mb-2 mt-2">
            <Spinner color="primary">Loading...</Spinner>
          </div>
        )}
      </>
    );
  };

  const TaskComponent = () => {
    return (
      <>
        {notificationTaskMain?.totalLengh > 0 ? (
          notificationTaskMain?.data?.map((item, i) => {
            if (notificationTaskMain?.data.length === i + 1) {
              return (
                <div
                  className="border-bottom  p-1 ms-2 me-2 "
                  ref={
                    notificationTaskMain?.data?.totalLengh !== notificationTaskMain?.data.length
                      ? lastTaskElementRef
                      : null
                  }
                  key={item?._id}
                >
                  <Link to="/tasksAndGoals" style={{ color: 'inherit' }}>
                    <div className="d-flex  justify-content-start  flex-wrap   align-items-center ">
                      <div className=" " style={{ fontSize: '13px' }}>
                        your task is{' '}
                        <span className="" style={{ fontWeight: '600' }}>
                          {item?.title}
                        </span>{' '}
                        for{' '}
                        <span className="" style={{ fontWeight: '500' }}>
                          🚀🚀{' '}
                          {item?.description && item.description.length > 70
                            ? item.description.slice(0, 70) + '...'
                            : item?.description}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            } else {
              return (
                <div className="border-bottom  p-1 ms-2 me-2 " key={item?._id}>
                  <Link to="/tasksAndGoals" style={{ color: 'inherit' }}>
                    <div className="d-flex  justify-content-start  flex-wrap   align-items-center ">
                      <div className=" " style={{ fontSize: '13px' }}>
                        your task is{' '}
                        <span className="" style={{ fontWeight: '600' }}>
                          {item?.title}
                        </span>{' '}
                        for{' '}
                        <span className="" style={{ fontWeight: '500' }}>
                          🚀🚀{' '}
                          {item?.description && item.description.length > 70
                            ? item.description.slice(0, 70) + '...'
                            : item?.description}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          })
        ) : (
          <div className="  pb-1  pr-1 pl-1 me-1 text-center">
            Sorry! There are no Tasks<span className="fs-5 "> 🪁🪁</span>
          </div>
        )}
        {loadingTask && (
          <div className="d-flex  justify-content-center mb-2 mt-2">
            <Spinner color="primary">Loading...</Spinner>
          </div>
        )}
      </>
    );
  };

  const ChatComponent = () => {
    const [filteredNotice, setFilteredNotice] = useState('');
    return (
      <>
        {chats?.map((item) => {
          const time = formatDateToMonthShort(item.messages ? item.messages.createdAt : new Date());
          return (
            <li
              key={item._id}
              onClick={(e) => handleUserClick(e, item)}
              onContextMenu={(e) => menuShow(item, e)}
              className="chat-sidebar-link"
            >
              <Avatar
                img={require('@src/assets/images/avatars/avatar-blank.png').default}
                imgHeight={42}
                imgWidth={42}
                status={item.status}
              />
              <div className="chat-info flex-grow-1">
                <h5 className="mb-0">{item.contact.fullName}</h5>
                <CardText className="text-truncate">{item.messages.msg}</CardText>
              </div>
              <div className="chat-meta text-nowrap">
                <small className="float-end mb-25 chat-time ms-25">{time}</small>
                {item.chat?.unseenMsgs >= 1 ? (
                  <Badge className="float-end" color="danger" pill>
                    {item.chat.unseenMsgs}
                  </Badge>
                ) : null}
              </div>
            </li>
          );
        })}
      </>
    );
  };
  const MyBuilderComponent = () => {
    return (
      <>
        {store?.myBuilder?.map((item) => {
          const time = formatDateToMonthShort(item.messages ? item.messages.createdAt : new Date());
          return (
            <li
              key={item._id}
              //onClick={(e) => handleUserClick(e, item)}
              onContextMenu={(e) => menuShow(item, e)}
              className="chat-sidebar-link"
            >
              <div className="d-flex justify-content-between px-1">
                <div>
                  <p className="my-0 py-0">{item?.message}</p>
                  <Link to={`/form-funnel/form-setting/${item?.categoryId}`}>
                    <small>Check it out</small>
                  </Link>
                </div>
                <div>
                  <div className="d-flex justify-content-end">
                    <Badge color="light-primary">{item?.title}</Badge>
                  </div>
                  <Badge color="light-secondary">
                    {moment(item?.createdAt).format('MM/DD/yyyy')}
                  </Badge>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </>
    );
  };
  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-notification nav-item me-25"
      isOpen={isOpen}
      toggle={toggleDropdown}
    >
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => {
          e.preventDefault(), setIsOpen(true);
        }}
      >
        <Bell size={21} />
        <Badge pill color="danger" className="badge-up">
          {allNotificationLength || 0}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="" tag="div" header>
            <Row>
              <Col md="6">
                <h4 className="notification-title mb-0 me-auto">
                  Notifications
                  <span style={{ marginLeft: '19px', fontSize: '14px' }}>
                    <Badge tag="div" color="light-primary" pill>
                      {allNotificationLength || 0}
                    </Badge>
                  </span>
                </h4>
              </Col>
              <Col className="d-flex justify-content-end  align-items-center " md="6">
                <div className="me-2">
                  <Button
                    size="sm"
                    tag={'div'}
                    className=" text-primary"
                    color="light-primary"
                    style={{ background: 'rgba(23, 74, 231, 0.12)' }}
                    onClick={clearAllNotifications}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="me-1">
                  <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
                    <DropdownToggle
                      href="/"
                      tag="a"
                      className="nav-link dropdown-user-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <FiFilter size="19" />
                    </DropdownToggle>
                    <DropdownMenu end className="pt-1 pb-1">
                      <DropdownItem
                        tag={'div'}
                        onClick={() => setNotificationSelected('today')}
                        active={notificationSelected === 'today'}
                      >
                        <BiDockTop size={19} className="me-75" />
                        <span className="align-middle">Today</span>
                      </DropdownItem>
                      <DropdownItem
                        tag={'div'}
                        onClick={() => setNotificationSelected('tomorrow')}
                        active={notificationSelected === 'tomorrow'}
                      >
                        <TbLayoutSidebarLeftExpand size={19} className="me-75" />
                        <span className="align-middle">tomorrow</span>
                      </DropdownItem>
                      <DropdownItem
                        tag={'div'}
                        onClick={() => setNotificationSelected('thisWeek')}
                        active={notificationSelected === 'thisWeek'}
                      >
                        <TbLayoutSidebarRightCollapse size={19} className="me-75" />
                        <span className="align-middle">This Week</span>
                      </DropdownItem>
                      <DropdownItem
                        tag={'div'}
                        onClick={() => setNotificationSelected('thisMonth')}
                        active={notificationSelected === 'thisMonth'}
                      >
                        <MdCalendarMonth size={19} className="me-75" />
                        <span className="align-middle">This Month </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </Col>
            </Row>
          </DropdownItem>
        </li>
        <PerfectScrollbar style={{ height: '32vh' }}>
          <div
            className={
              openSection === 'birthday'
                ? 'p-1 border-top d-flex justify-content-between '
                : '  act-1    border p-1 d-flex justify-content-between '
            }
            onClick={() => handleSectionClick('birthday')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <RiCake2Line size="18" />
                </div>
              </div>
              <div className="ms-1 ">Birthday </div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {notificationBirthdayMain?.totalLengh}
                </Badge>
              </div>
              <div
                className="me-1 "
                onClick={() => setIsBirthdayComponentVisible(!isBirthdayComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {renderChevronIcon('birthday')}
              </div>
            </div>
          </div>
          {openSection === 'birthday' && <BirthdayComponent />}
          <div
            className={
              openSection === 'events'
                ? 'p-1 border-top d-flex justify-content-between'
                : ' border p-1 d-flex justify-content-between act-1'
            }
            onClick={() => handleSectionClick('events')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <HiOutlineCalendarDays size="18" />
                </div>
              </div>
              <div className="ms-1 ">Events </div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {notificationEventMain?.totalLengh}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsEventComponentVisible(!isEventComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {renderChevronIcon('events')}
              </div>
            </div>
          </div>
          {openSection === 'events' && <EventComponent />}
          <div
            className={
              openSection === 'task'
                ? 'p-1 border-top d-flex justify-content-between'
                : ' border p-1 d-flex justify-content-between act-1'
            }
            onClick={() => handleSectionClick('task')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <AiOutlineBars size="18" />
                </div>
              </div>
              <div className="ms-1 ">Task & Goals </div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {notificationTaskMain?.totalLengh}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsTaskComponentVisible(!isTaskComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {/* <FaChevronDown size="14" /> */}
                {renderChevronIcon('task')}
              </div>
            </div>
          </div>
          {openSection === 'task' && <TaskComponent />}

          <div
            className={
              openSection === 'renewal'
                ? 'p-1 border-top d-flex justify-content-between '
                : '  act-1    border p-1 d-flex justify-content-between '
            }
            onClick={() => handleSectionClick('renewal')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <TbHomeOff size="18" />
                </div>
              </div>
              <div className="ms-1 ">Renewal </div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {notificationRenewalMain?.totalLengh}
                </Badge>
              </div>
              <div
                className="me-1 "
                onClick={() => handleSectionClick('renewal')}
                style={{ cursor: 'pointer' }}
              >
                {renderChevronIcon('renewal')}
              </div>
            </div>
          </div>
          {openSection === 'renewal' && <RenewalComponent />}

          <div
            className={
              openSection === 'retention'
                ? 'p-1 border-top d-flex justify-content-between'
                : ' border p-1 d-flex justify-content-between act-1  '
            }
            onClick={() => handleSectionClick('retention')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <Book size="18" />
                </div>
              </div>
              <div className="ms-1 ">Retention </div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {0}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => {
                  setIsRetentionComponentVisible(!isRetentionComponentVisible);
                }}
                style={{ cursor: 'pointer' }}
              >
                {renderChevronIcon('retention')}
              </div>
            </div>
          </div>
          {/* {openSection === 'retention' && <BirthdayComponent />} */}
          <div
            className={
              openSection === 'finance'
                ? 'p-1 border-top d-flex justify-content-between'
                : '  border p-1 d-flex justify-content-between act-1'
            }
            onClick={() => handleSectionClick('finance')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <RiMoneyDollarBoxLine size="18" />
                </div>
              </div>
              <div className="ms-1 ">Finance </div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {0}
                </Badge>
              </div>
              <div
                className="me-1"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsFinanceComponentVisible(!isFinanceComponentVisible);
                }}
              >
                {renderChevronIcon('finance')}
              </div>
            </div>
          </div>
          {/* {openSection === 'finance' && <EventComponent />} */}

          {/* text and chat start*/}
          <div
            className={
              openSection === 'chat'
                ? 'p-1 border-top d-flex justify-content-between'
                : '  border p-1 d-flex justify-content-between act-1'
            }
            onClick={() => handleSectionClick('chat')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <MessageSquare size="18" />
                </div>
              </div>
              <div className="ms-1 ">Text & Chat</div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {/* {chats.length === 0 ?} */}
                  {chats?.length > 0 ? chats?.length : 0}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsChatComponentVisible(!isChatComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {/* <FaChevronDown size="14" /> */}
                {renderChevronIcon('chat')}
              </div>
            </div>
          </div>
          {openSection === 'chat' && <ChatComponent />}
          {/* text and chat close */}
          {/* my builder start*/}
          <div
            className={
              openSection === 'chat'
                ? 'p-1 border-top d-flex justify-content-between'
                : '  border p-1 d-flex justify-content-between act-1'
            }
            onClick={() => handleSectionClick('mybuilder')}
          >
            <div className="ms-1  d-flex">
              <div>
                <div>
                  <AiOutlineAudit size="18" />
                </div>
              </div>
              <div className="ms-1 ">My Builder</div>
            </div>
            <div className="d-flex ">
              <div className="me-2 ">
                {' '}
                <Badge pill color="light-primary" className="">
                  {/* {chats.length === 0 ?} */}
                  {store?.myBuilder?.length > 0 ? store?.myBuilder?.length : 0}
                </Badge>
              </div>
              <div
                className="me-1"
                onClick={() => setIsMyBuilderComponentVisible(!isMyBuilderComponentVisible)}
                style={{ cursor: 'pointer' }}
              >
                {/* <FaChevronDown size="14" /> */}
                {renderChevronIcon('mybuilder')}
              </div>
            </div>
          </div>
          {openSection === 'mybuilder' && <MyBuilderComponent />}
          {/* mybuilder close */}
        </PerfectScrollbar>
        <li className="dropdown-menu-footer">
          <Link to="/pages/notification">
            <Button color="primary" block onClick={() => setIsOpen(false)}>
              Read all notifications
            </Button>
          </Link>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationDropdown;
