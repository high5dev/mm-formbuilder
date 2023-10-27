// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import Proptypes from 'prop-types';
import { Grid, CheckSquare, MessageSquare, Mail, Calendar } from 'react-feather';

// ** Reactstrap Imports
import {
  Breadcrumb,
  DropdownMenu,
  DropdownItem,
  BreadcrumbItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
//import Timetracker from '../../../views/contacts/workHistory/view/TimeDoctor/Timetracker';

// import TopCheckInButtonForClass from '../../../views/calendar/attendance/attendanceByPunchId/TopCheckInButtonForClass';
// import TopCheckInButtonForShift from '../../../views/contacts/checkin/TopCheckInButtonForShift';
import { useSelector } from 'react-redux';

const BreadCrumbs = (props) => {
  // ** Props
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParent2,
    breadCrumbParent3,
    breadCrumbActive,
    isMobileView,
    isTabletView,
    shepherd
  } = props;

  const userData = useSelector((state) => state.auth.userData);

  return (
    <div
      className={`${
        isMobileView
          ? 'content-header row mt-5'
          : isTabletView
          ? 'content-header row mt-2'
          : 'content-header row'
      }`}
    >
      <div className="content-header-left col-md-8 col-sm-6 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            {breadCrumbTitle ? (
              <h2 className="content-header-title float-start mb-0">{breadCrumbTitle}</h2>
            ) : (
              ''
            )}
            <div className="breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12">
              <Breadcrumb>
                <BreadcrumbItem tag="li">
                  <Link className="breadcrumb-items-mode" to="/">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem tag="li" className="breadcrumb-items-parent">
                  {breadCrumbParent}
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag="li" className="text-primary">
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag="li" active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center content-header-right text-md-end col-md-4 col-sm-6 d-md-block  px-0">
        {breadCrumbTitle === 'Calendar' ? (
          <div className="time-tracker d-flex justify-content-end" style={{ marginRight: '-2rem' }}>
            {/* {userData?.curRole?.contactId ? null : <TopCheckInButtonForClass shepherd={shepherd} />} */}
          </div>
        ) : breadCrumbTitle == 'Employee' ? (
          <div className="time-tracker d-flex justify-content-end">
            {/* {userData?.curRole?.contactId ? null : <TopCheckInButtonForShift shepherd={shepherd} />} */}
            {/* <Timetracker
              project={{
                value: 'general',
                label: 'General'
              }}
              shepherd={shepherd}
              isMobileView={isMobileView}
              isTabletView={isTabletView}
              isEmployee={userData?.curRole?.contactId ? true : false}
            /> */}
          </div>
        ) : (
          <div className="breadcrumb-right dropdown">
            {/* <UncontrolledButtonDropdown
              style={{ display: isMobileView ? 'none' : isTabletView ? 'none' : '' }}
            >
              <DropdownToggle
                color="primary"
                size="sm"
                className="btn-icon btn-round dropdown-toggle"
              >
                <Grid size={14} />
              </DropdownToggle>
              <DropdownMenu tag="ul" end>
                <DropdownItem tag={Link} to="/apps/todo">
                  <CheckSquare className="me-1" size={14} />
                  <span className="align-middle">Todo</span>
                </DropdownItem>
                <DropdownItem tag={Link} to="/apps/chat">
                  <MessageSquare className="me-1" size={14} />
                  <span className="align-middle">Chat</span>
                </DropdownItem>
                <DropdownItem tag={Link} to="/apps/email">
                  <Mail className="me-1" size={14} />
                  <span className="align-middle">Email</span>
                </DropdownItem>
                <DropdownItem tag={Link} to="/apps/calendar">
                  <Calendar className="me-1" size={14} />
                  <span className="align-middle">Calendar</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default BreadCrumbs;

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired
};
