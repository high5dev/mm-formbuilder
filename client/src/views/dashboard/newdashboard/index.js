import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

// import MainDashboardPage from './component';
// import OnBoarding from '../../onboarding';
// import Header from './component/Header';

// import { IoNavigateCircleOutline } from 'react-icons/io5';
// import { RxDashboard } from 'react-icons/rx';

// import { OnBoardingStatusAction } from '../../onboarding/store/actions';
// import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
// import { getAttendance } from '../../calendar/store';
// import moment from 'moment';

function index() {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [attendanceThisWeek, setAttendanceThisWeek] = useState([]);
  const [users] = useState([
    { label: 'Dashboard', value: 'Dashboard' },
    { label: 'Onboarding', value: 'Onboarding' }
  ]);
  const handleOptionChange = (selected) => {
    setSelectedOption(selected.value);
  };

  // useEffect(() => {
  //   dispatch(OnBoardingStatusAction());
  //   const getAtt = async () => {
  //     const res = await dispatch(
  //       getAttendance({
  //         startDate: new Date(moment().startOf('week').format('yyyy-MM-DD')),
  //         endDate: new Date(moment().endOf('week').format('yyyy-MM-DD'))
  //       })
  //     );
  //     if (res?.payload?.length > 0) {
  //       const currentDate = new Date();
  //       const startOfWeek = new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth(),
  //         currentDate.getDate() - currentDate.getDay()
  //       );
  //       const endOfWeek = new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth(),
  //         currentDate.getDate() + (6 - currentDate.getDay())
  //       );
  //       const attendedWithinCurrentWeek = res?.payload.filter((item) => {
  //         const attendedDate = new Date(item.attendedDateTime);
  //         return attendedDate >= startOfWeek && attendedDate <= endOfWeek;
  //       });
  //       setAttendanceThisWeek(attendedWithinCurrentWeek);
  //     }
  //   };
  //   getAtt();
  // }, []);
  const activeUser = users.find((user) => user.value === selectedOption);
  const dashboardLabel = activeUser ? activeUser.label : 'Dashboard';
  return (
    <>
      {/* <div
        className="mobile-view-responsive-dashboard"
        style={{
          background: 'rgb(67 112 251 / 95%)',
          height: selectedOption === 'Onboarding' ? '300px' : '330px',
          borderRadius: '5px'
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {selectedOption === 'Onboarding' ? (
              <IoNavigateCircleOutline size={25} style={{ color: '#fff', marginLeft: '10px' }} />
            ) : (
              <RxDashboard size={20} style={{ color: '#fff', marginLeft: '10px' }} />
            )}
            <span
              style={{ marginLeft: '10px', marginBottom: 0, fontSize: '16px' }}
              className="text-white"
            >
              {selectedOption}
            </span>
          </div>
          <UncontrolledDropdown className="dashboard-dropdown dashboard-dropdown-white">
            <DropdownToggle className="finance-dark-mode" color="outline-primary" caret>
              {dashboardLabel}
            </DropdownToggle>
            <DropdownMenu>
              {users.map((user) => (
                <DropdownItem
                  key={user.value}
                  className="w-100"
                  active={selectedOption === user.value}
                  onClick={() => handleOptionChange(user)}
                >
                  {user.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        {selectedOption === 'Dashboard' && <Header attendanceThisWeek={attendanceThisWeek} />}
      </div>
      <div style={{ margin: '10px' }}>
        {selectedOption === 'Dashboard' ? <MainDashboardPage /> : <OnBoarding />}
      </div> */}
    </>
  );
}

export default index;
