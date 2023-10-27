import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowUp, CreditCard, Lock, Plus } from 'react-feather';
import { BiUpArrow } from 'react-icons/bi';
import { Badge, Button, Card, Col, Row } from 'reactstrap';
import NewPlanModal from '../../../../plans/create/NewPlanModal';

export default function PlansTab({ selectedOrg, setSelectedOrg, dispatch, store, isMobileView }) {
  const [openAddPlan, setOpenAddPlan] = useState(false);

  const toggleAddPlan = () => setOpenAddPlan(!openAddPlan);
  const handleViewPermissions = (row) => {};
  const statusColor = {
    waiting: 'light-warning',
    active: 'light-success',
    suspended: 'light-danger',
    upgraded: 'light-secondary'
  };
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '10%'
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      width: '25%'
    },
    {
      name: 'Price Per Month',
      selector: (row) => row.pricePerMonth,
      width: '15%',
      cell: (row) => <span>{row?.pricePerMonth} $/Month</span>
    },
    {
      name: 'Price Per year',
      selector: (row) => row.pricePerYear,
      width: '15%',
      cell: (row) => <span>{row?.pricePerYear} $/Year</span>
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      width: '10%',
      cell: (row) => <Badge color={`${statusColor[row.status]}`}>{row.status}</Badge>
    },
    {
      name: 'Actions',
      selector: (row) => row._id,
      width: '20%',
      cell: (row) => (
        <div className="d-flex justify-content-between">
          <Lock
            size="18"
            className="text-secondary mx-50"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleViewPermissions(row);
            }}
          />
          <CreditCard
            size="18"
            className="text-succes mx-50"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleViewPermissions(row);
            }}
          />
        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className="task-application">
            {selectedOrg?.plans ? (
              <div className="list-group task-task-list-wrapper">
                <div className="d-flex justify-content-end my-50">
                  <Button color="primary" onClick={toggleAddPlan}>
                    <Plus /> New Plan
                  </Button>
                </div>

                {isMobileView ? (
                  <div style={{ padding: '5px' }}>
                    {selectedOrg?.plans.map((item, index) => {
                      return (
                        <Card
                          key={index}
                          style={{
                            border: '1px solid #ededed',
                            marginBottom: '5px !important',
                            padding: '10px'
                          }}
                          className="mb-1"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <h5>Plan: {item.name}</h5>
                            <div>
                              <div className="d-flex">
                                <Lock
                                  size="18"
                                  className="text-secondary mx-50"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    handleViewPermissions(item);
                                  }}
                                />
                                <CreditCard
                                  size="18"
                                  className="text-succes mx-50"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    handleViewPermissions(item);
                                  }}
                                />
                              </div>
                              <div style={{marginTop: '5px'}}>
                                {item?.status === 'waiting' ? (
                                  <Badge color={`${statusColor[item.status]}`}>{item.status}</Badge>
                                ) : (
                                  <Badge color="light-danger" pill>
                                    Not Verified
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p>Description:{item.description}</p>
                          <div
                            style={{ height: '1px', background: '#e0e0e0', marginBottom: '10px' }}
                          ></div>
                          <p>Price Per Month: $ {item.pricePerMonth}</p>
                          <p>Price Per Year: $ {item.pricePerYear}</p>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  selectedOrg?.plans && (
                    <DataTable
                      noHeader
                      responsive
                      className="react-dataTable"
                      columns={columns}
                      data={selectedOrg?.plans || []}
                    />
                  )
                )}

                {/* <DataTable
                  noHeader
                  responsive
                  className="react-dataTable"
                  columns={columns}
                  data={selectedOrg?.plans || []}
                /> */}
              </div>
            ) : (
              <div className="text-center">
                <p>You didn't create any plan yet!</p>
                <Button color="primary" onClick={toggleAddPlan}>
                  <Plus /> New Plan
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <NewPlanModal
        open={openAddPlan}
        toggle={toggleAddPlan}
        org={selectedOrg}
        setOrg={setSelectedOrg}
        dispatch={dispatch}
        store={store}
      />
    </Fragment>
  );
}
