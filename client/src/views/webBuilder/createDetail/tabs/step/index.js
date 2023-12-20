/* eslint-disable no-unused-vars */
// ** React Imports
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Col, TabContent, TabPane } from 'reactstrap';

// ** CUSTOM COMPONENTS
import Sidebar from './Sidebar';
// import EditModal from '../../../edit/EditModal';
import StepTab from './StepTab';

const FormStep = ({ dispatch, store, isMobileView,
  isTabletView }) => {
  // ** States
  const [active, setActive] = useState();
  return (
    <>
      {store && (
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="tasks-border"  style={{ minHeight: '75vh', background: '#fff' }}>
              <Sidebar
                active={active}
                setActive={setActive}
                dispatch={dispatch}
                store={store}
              />
              <div className="tasks-area">
                  <StepTab store={store} active={active} dispatch={dispatch}  isMobileView={isMobileView}
                    isTabletView={isTabletView}/>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FormStep;
