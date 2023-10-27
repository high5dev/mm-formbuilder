import Avatar from '@components/avatar';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import imgBirth from '../../../../../src/assets/images/avatars/5.png';
import { Link } from 'react-router-dom';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { Eye } from 'react-feather';
import moment from 'moment';

const DropDownMenuNoti = () => {
  return (
    <DropdownMenu flip right>
      <DropdownItem tag={Link} className="w-100">
        <IoNotificationsOffOutline size={14} className="me-50" />
        <span className="align-middle">Remove Notification</span>
      </DropdownItem>
    </DropdownMenu>
  );
};
export const ClassComponent = () => {
  return (
    <>
      <div className="border-bottom  p-1 ">
        <div className="d-flex  justify-content-between gap-1 align-items-center">
          <div className="" style={{ fontSize: '13px' }}>
            Physics class
          </div>
          <div className=" " style={{ fontSize: '13px' }}>
            <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
              Tycawando
            </Badge>
          </div>

          <div className="d-flex justify-content-end">
            <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
              August 17 2023, 8:52 PM
            </Badge>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: '1px' }}
        >
          <div className="ms-1    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            4 hour ago
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      <div className="border-bottom  p-1 ">
        <div className="d-flex  justify-content-between gap-1 align-items-center">
          <div className="" style={{ fontSize: '13px' }}>
            Physics class
          </div>
          <div className=" " style={{ fontSize: '13px' }}>
            <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
              Tycawando
            </Badge>
          </div>

          <div className="d-flex justify-content-end">
            <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
              August 17 2023, 8:52 PM
            </Badge>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: '1px' }}
        >
          <div className="ms-1    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            4 hour ago
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      <div className="border-bottom  p-1 mb-3 ">
        <div className="d-flex  justify-content-between gap-1 align-items-center">
          <div className="" style={{ fontSize: '13px' }}>
            Physics class
          </div>
          <div className=" " style={{ fontSize: '13px' }}>
            <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
              Tycawando
            </Badge>
          </div>

          <div className="d-flex justify-content-end">
            <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
              August 17 2023, 8:52 PM
            </Badge>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: '1px' }}
        >
          <div className="ms-1    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            4 hour ago
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </>
  );
};
export const BirthdayComponent = (props) => {
  const { notificationBirthdayMain } = props;
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

    if (row?.photo || row?.img) {
      return <Avatar className="me-1" img={row.photo} width="32" height="32" />;
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

  const MouseOver = (event) => {
    event.currentTarget.style.cursor = 'pointer';
    event.currentTarget.style.background = '#e8e9eb';
  };
  const MouseOut = (event) => {
    event.currentTarget.style.background = '';
  };
  return (
    <>
      {notificationBirthdayMain?.data?.map((item, i) => {
        return (
          <div className="border-bottom  p-1  " onMouseOver={MouseOver} onMouseOut={MouseOut}>
            <div className="d-flex justify-content-between  flex-wrap gap-1  align-items-start ms-1">
              <div
                className=" d-flex  flex-row justify-content-start align-items-start "
                style={{ fontSize: '13px', fontWeight: '500', maxWidth: '140px' }}
              >
                {/* <Avatar className="me-50" img={imgBirth} width="32" height="32" />{' '} */}
                {renderClient(item?.fullName)}
                <span className="" style={{ marginLeft: '8px' }}>
                  {item?.fullName}
                </span>
              </div>
              <div className="d-flex flex-column">
                <span
                  style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}
                  className=""
                >
                  Contact Type
                </span>
                <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-warning">
                {item?.contactType?.name}
                </Badge>
              </div>
              <div className="d-flex flex-column">
                <span
                  style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}
                  className=""
                >
                  Status
                </span>

                <Badge
                  style={{ fontSize: '10px', padding: '6px' }}
                  className="text-success  bg-light"
                >
                  Active
                </Badge>
              </div>

              <div className="d-flex flex-column">
                <span
                  style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }}
                  className=""
                >
                  DOB{' '}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
                  {moment(item.dob).format('MMMM D, YYYY')}
                </span>
              </div>
              <div className="d-flex flex-column">
                <span
                  style={{ fontSize: '13px', marginBottom: '4px', fontWeight: '500' }}
                  className=""
                >
                  Joined at
                </span>
                <span style={{ fontSize: '13px', fontWeight: '400' }}>August 27 2022</span>
              </div>
              <div>
                <Eye size="20" />
              </div>
              <div className="">
                <UncontrolledDropdown>
                  <DropdownToggle tag="div" className="btn btn-sm">
                    <HiOutlineDotsHorizontal size="18" />
                  </DropdownToggle>
                  <DropDownMenuNoti />
                </UncontrolledDropdown>
              </div>
            </div>
            {/* <div
            className="d-flex justify-content-between align-items-center ms-1"
            style={{ marginTop: '-2px' }}
          >
            <div className="ms-3    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
              4 hour ago
            </div>
          </div> */}
          </div>
        );
      })}
    </>
  );
};

export const EventComponent = () => {
  const MouseOver = (event) => {
    event.currentTarget.style.cursor = 'pointer';
    event.currentTarget.style.background = '#e8e9eb';
  };
  const MouseOut = (event) => {
    event.currentTarget.style.background = '';
  };
  return (
    <>
      <div className="border-bottom  p-1  " onMouseOver={MouseOver} onMouseOut={MouseOut}>
        <div className="d-flex justify-content-between  flex-wrap gap-1  align-items-start ms-1">
          <div style={{ fontSize: '13px', fontWeight: '500', maxWidth: '150px' }}>
            Dharamshala Grand Show
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Venue
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              Dharamshala
            </span>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Date & Time
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              August 17 2023, 12.16 AM
            </span>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Type
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-success">
              Public
            </Badge>
          </div>

          <div className="d-flex flex-column">
            <span style={{ fontSize: '13px', marginBottom: '4px', fontWeight: '500' }} className="">
              Price
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }}>20$</span>
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center ms-1"
          style={{ marginTop: '-2px' }}
        >
          <div className="    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            16 minute ago
          </div>
        </div>
      </div>
      <div className="border-bottom  p-1  " onMouseOver={MouseOver} onMouseOut={MouseOut}>
        <div className="d-flex justify-content-between  flex-wrap gap-1  align-items-start ms-1">
          <div style={{ fontSize: '13px', fontWeight: '500', maxWidth: '150px' }}>
            Step by Step Corporate
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Venue
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              Dharamshala
            </span>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Date & Time
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              August 17 2023, 12.16 AM
            </span>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Type
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-success">
              Public
            </Badge>
          </div>

          <div className="d-flex flex-column">
            <span style={{ fontSize: '13px', marginBottom: '4px', fontWeight: '500' }} className="">
              Price
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }}>20$</span>
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center ms-1"
          style={{ marginTop: '-2px' }}
        >
          <div className="    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            16 minute ago
          </div>
        </div>
      </div>
      <div className="border-bottom  p-1  " onMouseOver={MouseOver} onMouseOut={MouseOut}>
        <div className="d-flex justify-content-between  flex-wrap gap-1  align-items-start ms-1">
          <div style={{ fontSize: '13px', fontWeight: '500', maxWidth: '150px' }}>
            The Event Fairy corporation
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Venue
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              New Delhi
            </span>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Date & Time
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              August 17 2023, 12.16 AM
            </span>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Type
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-success">
              Public
            </Badge>
          </div>

          <div className="d-flex flex-column">
            <span style={{ fontSize: '13px', marginBottom: '4px', fontWeight: '500' }} className="">
              Price
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }}>20$</span>
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center ms-1"
          style={{ marginTop: '-2px' }}
        >
          <div className="    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            2 minute ago
          </div>
        </div>
      </div>
    </>
  );
};
export const TaskComponent = () => {
  const MouseOver = (event) => {
    event.currentTarget.style.cursor = 'pointer';
    event.currentTarget.style.background = '#e8e9eb';
  };
  const MouseOut = (event) => {
    event.currentTarget.style.background = '';
  };
  return (
    <>
      <div className="border-bottom  p-1  " onMouseOver={MouseOver} onMouseOut={MouseOut}>
        <div className="d-flex justify-content-between  flex-wrap gap-1  align-items-start ms-1">
          <div style={{ fontSize: '13px', fontWeight: '500', minWidth: '130px' }}>
            Sell my product
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Type
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-primary">
              Task
            </Badge>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Status
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-success">
              In Progress
            </Badge>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Description
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              My product name is xyz
            </span>
          </div>

          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center ms-1"
          style={{ marginTop: '-2px' }}
        >
          <div className="    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            16 minute ago
          </div>
        </div>
      </div>
      <div className="border-bottom  p-1  " onMouseOver={MouseOver} onMouseOut={MouseOut}>
        <div className="d-flex justify-content-between  flex-wrap gap-1  align-items-start ms-1">
          <div style={{ fontSize: '13px', fontWeight: '500', minWidth: '130px' }}>Go to gym</div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Type
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-primary">
              Goal
            </Badge>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Goal Type
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-warning">
              Habit
            </Badge>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }} className="">
              Status
            </span>
            <Badge style={{ fontSize: '10px', padding: '6px' }} color="light-success">
              2/30 Day
            </Badge>
          </div>
          <div className="d-flex flex-column">
            <span style={{ fontSize: '12px', marginBottom: '4px', fontWeight: '500' }} className="">
              Progress
            </span>
            <span style={{ fontSize: '13px', fontWeight: '400' }} className="">
              6%
            </span>
          </div>

          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center ms-1"
          style={{ marginTop: '-2px' }}
        >
          <div className="    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            16 minute ago
          </div>
        </div>
      </div>
    </>
  );
};

export const MembershipComponent = () => {
  return (
    <>
      <div className="border-bottom  p-1  ">
        <div className="d-flex  justify-content-between gap-1 align-items-center  ">
          <div className=" " style={{ fontSize: '13px' }}>
            <Avatar className="me-50" img={imgBirth} width="32" height="32" /> Emma Williams{' '}
          </div>
          <div className="" style={{ fontSize: '13px' }}>
            7 Month PIF E
          </div>
          <div className=" " style={{ fontSize: '13px' }}>
            <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
              Member
            </Badge>
          </div>

          <div className="d-flex justify-content-end">
            <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
              August 17 2023
            </Badge>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: '1px' }}
        >
          <div className="ms-1    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            4 hour ago
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      <div className="border-bottom  p-1  ">
        <div className="d-flex  justify-content-between gap-1 align-items-center">
          <div className=" " style={{ fontSize: '13px' }}>
            <Avatar className="me-50" img={imgBirth} width="32" height="32" /> Emma Williams{' '}
          </div>
          <div className="" style={{ fontSize: '13px' }}>
            7 Month PIF E
          </div>
          <div className=" " style={{ fontSize: '13px' }}>
            <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
              Member
            </Badge>
          </div>

          <div className="d-flex justify-content-end">
            <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
              August 17 2023
            </Badge>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: '1px' }}
        >
          <div className="ms-1    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            4 hour ago
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      <div className="border-bottom  p-1 ">
        <div className="d-flex  justify-content-between gap-1 align-items-center">
          <div className=" " style={{ fontSize: '13px' }}>
            <Avatar className="me-50" img={imgBirth} width="32" height="32" /> Emma Williams{' '}
          </div>
          <div className="" style={{ fontSize: '13px' }}>
            7 Month PIF E
          </div>
          <div className=" " style={{ fontSize: '13px' }}>
            <Badge style={{ fontSize: '10px' }} className="text-info  bg-light">
              Member
            </Badge>
          </div>

          <div className="d-flex justify-content-end">
            <Badge style={{ fontSize: '10px' }} className="text-success bg-light">
              August 17 2023
            </Badge>
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: '1px' }}
        >
          <div className="ms-1    fw-semibold  text-secondary" style={{ fontSize: '12px' }}>
            4 hour ago
          </div>
          <div className="">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <HiOutlineDotsHorizontal size="18" />
              </DropdownToggle>
              <DropDownMenuNoti />
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </>
  );
};
