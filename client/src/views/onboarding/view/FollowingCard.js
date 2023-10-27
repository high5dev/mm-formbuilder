import React from 'react';

import { SelectTourAction, createOnboardingStatusAction } from '../store/actions';
import { Card, Progress, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Database } from 'react-feather';

function FollowingCard(props) {
  const { stepTitle, stepData, store, user } = props;
  const totalContactTypes = useSelector((state) => state.totalContacts?.contactTypeList);
  const totalItems = stepData.length;
  const dispatch = useDispatch();
  const history = useHistory();

  // Tour Start Button Handler
  const handleStartClick = (id, title, url) => {
    dispatch(SelectTourAction({ id, title }));
    switch (url) {
      case '/client':
        history.push(`/contacts${url}/${totalContactTypes.find((x) => x.type == 'client')?._id}`);
        break;
      case '/employee':
        history.push(`/contacts${url}/${totalContactTypes.find((x) => x.type == 'employee')?._id}`);
        break;
      case '/lead':
        history.push(`/contacts${url}/${totalContactTypes.find((x) => x.type == 'lead')?._id}`);
        break;
      default:
        history.push(url);
        break;
    }
  };

  // Find if a tour is complete or not
  const isTourCompleted = (id) => {
    if (store?.onboardStatus?.data?.length) {
      return store?.onboardStatus?.data?.some((item) => item.tourStepId === id.toString());
    }
  };
  const completedItems = stepData?.filter((item) => isTourCompleted(item.id)).length;

  // Find Last Update Date
  const lastUpdateDate = store?.onboardStatus?.data?.reduce((latest, current) => {
    const currentDate = new Date(current.createdAt);
    return currentDate > latest ? currentDate : latest;
  }, new Date(0));

  return (
    <Card className="p-2">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="fs-3 me-1">Let's get started,</span>
            <span className="fs-3 fw-bold">{user?.fullName}!</span>
          </div>
          <div>
            <Database size={15} className="me-1" />
            <span className="me-1">Last Updated:</span>
            <span className="fw-bold">{lastUpdateDate?.toString().slice(4, 21)}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 mb-3">
        <Progress
          style={{ height: '18px' }}
          value={(completedItems * 100) / totalItems}
          color="#174ae7"
        >
          {parseFloat((completedItems * 100) / totalItems).toFixed(2)}%
        </Progress>
      </div>

      <div>
        <span className="fs-4 fw-bolder ms-2">{stepTitle}</span>
        {stepData?.map((item, index) => (
          <Card
            key={item.id}
            className="pt-2 pb-2 ps-1 pe-1 mt-1 position-relative"
            style={{
              background: isTourCompleted(item.id) ? 'rgba(40, 199, 111, 0.12)' : '#ffffff',
              border: '1px dashed rgba(23, 74, 231, 0.12)'
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="ms-1 d-flex align-items-center">
                  <div
                    style={{
                      height: '50px',
                      width: '50px',
                      backgroundColor: 'white',
                      borderRadius: '5px'
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {item.icon}
                  </div>
                  <div className="d-flex flex-column ms-1">
                    <span className="fs-5 fw-bolder" style={{ marginBottom: '6px' }}>
                      {item.title}
                    </span>
                    <span>{item.subTitle}</span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  color="primary"
                  onClick={() => handleStartClick(item.id, item.title, item.url)}
                  disabled={
                    (item.url == '/client' || item.url == '/employee' || item.url == '/lead') &&
                    !totalContactTypes?.length
                  }
                >
                  {isTourCompleted(item.id) ? 'Restart' : 'Start'}
                </Button>
              </div>
            </div>
            {isTourCompleted(item.id) && (
              <div
                className="translate-middle badge rounded-pill bg-success"
                style={{ position: 'absolute', top: 0, right: 90 }}
              >
                <span>Completed</span>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default FollowingCard;
