import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
// import ProfitAndLoss from './Schedule';
// import Notification from './Notification';
// import OverDue from './OverDue';
// import AnalyticsEarningReports from './EarningReport';
// import NotificationCard from './NotificationCard';
// import MyGoal from './MyGoal';
// import UpComingEvent from './UpComingEvent';
// import MyTask from './MyTask';
import { useDispatch, useSelector } from 'react-redux';
// import { getInvoicesAction } from '../../../finance/invoice/store/action';
// import { IncomeFetchAction, allGoalAction } from '../../../finance/store/actions';

// import { fetchGoalWorkspaceAction } from '../../../taskngoals/store/actions';

function index() {
  const dispatch = useDispatch();
  const [view, setView] = useState(false);

  
  useEffect(() => {
    // dispatch(getInvoicesAction());
    // dispatch(allGoalAction());
    // // dispatch(contactsAction())
    // dispatch(IncomeFetchAction());
    // dispatch(fetchGoalWorkspaceAction('initialFetch'));
  }, []);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const isTablet = windowWidth >= 768 && windowWidth <= 1023;
      setView(isTablet);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      {/* <Row
        className="tablet-view-responsive-dash-com mobile-view-dash-com"
        style={{ position: 'relative', top: '-40px', margin: '10px' }}
      >
        {view === false ? (
          <>
            <Col md={4}>
              <ProfitAndLoss />
            </Col>
            <Col md={8}>

              <AnalyticsEarningReports />
 
            </Col>
            <Row>
              <Col md={4}>
                <NotificationCard />
              </Col>
              <Col md={4}>
                <OverDue />
              </Col>
              <Col md={4}>
                <MyGoal />
              </Col>
            </Row>
            <div className='d-flex'>
              <div style={{width: '35%'}}>
                <UpComingEvent />
              </div>
              <div style={{width: '63%', marginLeft: '2%'}}>
                <MyTask />
              </div>
            </div>
          </>
        ) : (
          <>
            <Col md={6}>
              <ProfitAndLoss />
            </Col>
            <Col md={6}>

              <AnalyticsEarningReports />

            </Col>
            <Row>
              <Col md={6}>
                <NotificationCard />
              </Col>
              <Col md={6}>
                <OverDue />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <MyGoal />
              </Col>
              <Col md={6}>
                <UpComingEvent />
              </Col>
            </Row>
            <Col md={12}>
              <MyTask />
            </Col>
          </>
        )}
      </Row> */}
    </div>
  );
}

export default index;
