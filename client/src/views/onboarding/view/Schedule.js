import React, { Fragment } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import { Badge, Button, Card, Col, Row } from 'reactstrap';
import { getOnboardingStatus } from '../../../utility/Utils';

export const basicData = [
  {
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4>{'Step 1'}</h4>
            <p>{'Fill in your account and business information'}</p>
          </div>
          <Button color="primary" id="reportToggler" outline>
            Done
          </Button>
        </div>
        <hr />
      </Fragment>
    ),
    completed: true
  },
  {
    color: 'secondary',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4>{'Step 2'}</h4>
            <p>{'Add your first contacts'}</p>
          </div>
          <Button
            color="primary"
            outline
            disabled={getOnboardingStatus()?.contactCreated}
            onClick={() => {
              window.location = '/contacts/clients/list';
            }}
          >
            {getOnboardingStatus()?.contactCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'success',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 3'}</h4>
            <p>{'Organise your life with tasks goals'}</p>
          </div>
          <Button
            color="primary"
            id="reportToggler"
            outline
            disabled={getOnboardingStatus()?.goalCreated}
            onClick={() => {
              window.location = '/tasksAndGoals';
            }}
          >
            {getOnboardingStatus()?.goalCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'warning',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 4'}</h4>
            <p>{'Automate your marketing with powerful marketing tools'}</p>
          </div>
          <Button
            color="primary"
            outline
            disabled={getOnboardingStatus()?.automationCreated}
            onClick={() => {
              window.location = '/marketing';
            }}
          >
            {getOnboardingStatus()?.automationCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'danger',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 5'}</h4>
            <p>{'Go to MySocial section and connect your workspace.'}</p>
          </div>
          <Button
            color="primary"
            outline
            disabled={getOnboardingStatus()?.socialCreated}
            onClick={() => {
              window.location = '/mysocial';
            }}
          >
            {getOnboardingStatus()?.socialCreated ? 'Done' : 'Start'}
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'success',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 6'}</h4>
            <p>{'A powerful shop and storefront at your convenience'}</p>
          </div>
          <Button color="primary" id="reportToggler" outline>
            Start
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'info',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 7'}</h4>
            <p>{'Knowing your numbers are the key to success'}</p>
          </div>
          <Button color="primary" id="reportToggler" outline>
            Start
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  },
  {
    color: 'success',
    customContent: (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ width: '220px' }}>
            <h4>{'Step 8'}</h4>
            <p>{'Other powerful unique tools your manager can do'}</p>
          </div>
          <Button color="primary" id="reportToggler" outline>
            Start
          </Button>
        </div>
        <hr />
      </Fragment>
    )
  }
];
