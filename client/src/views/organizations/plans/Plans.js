import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown, Plus } from 'react-feather';
import { FcBusiness } from 'react-icons/fc';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import NewPlanModal from './create/NewPlanModal';
import UpgradeModal from './UpgradeModal';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Icons from 'react-feather';
import EditPlanModal from './edit/EditPlanModal';
import ReactPaginate from 'react-paginate';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { FaTasks } from 'react-icons/fa';
import moment from 'moment';

export default function Plans({ dispatch, store, isMobileView, isTabletView }) {
  const [openEditPlan, setOpenEditPlan] = useState(false);
  const [openAddPlan, setOpenAddPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };
  const toggleEditPlan = () => setOpenEditPlan(!openEditPlan);
  const toggleAddPlan = () => setOpenAddPlan(!openAddPlan);
  const handleOpenDetails = (plan) => {
    console.log(plan);
    setSelectedPlan(plan);
    toggleEditPlan();
  };

  const data = store?.plans.filter((x) => x.type === 'business');

  const columns = [
    {
      name: 'Plan',
      selector: (row) => row?.name,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row?.name}</span>
    },
    {
      name: 'Price Per Month',
      selector: (row) => row?.pricePerMonth,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>$ {row?.pricePerMonth}</span>
    },
    {
      name: 'Price Per Year',
      selector: (row) => row?.pricePerYear,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>$ {row?.pricePerYear}</span>
    },
    {
      name: 'Trial',
      selector: (row) => row?.trialTime,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row?.trialTime} days</span>
    },
    {
      name: 'Description',
      selector: (row) => row?.description,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{row?.description}</span>
    },
    {
      name: 'Created At',
      selector: (row) => row?.createdAt,
      width: '14%',
      cell: (row) => <span style={{ cursor: 'pointer' }}>{moment(row?.createdAt).format("MM/DD/yyyy")}</span>
    },
    {
      name: 'Actions',
      selector: (row) => row?._id,
      cell: (row) => (
        <>
          <div className="column-action">
            <UncontrolledDropdown style={{ cursor: 'pointer' }}>
              <DropdownToggle tag="div" className="btn btn-sm">
                <Icons.MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu container="body">
                <DropdownItem tag="span" onClick={() => handleOpenDetails(row)} className="w-100">
                  <Icons.Edit2
                    className="mx-50 text-primary"
                    size={18}
                    style={{ cursor: 'pointer' }}
                  />
                  <span className="align-middle">Edit</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </>
      )
    }
  ];

  const CustomPagination = () => {
    const totalItems = store?.plans.filter((x) => x.type === 'business').length; // total number of items
    const count = Math.ceil(totalItems / rowsPerPage); // total number of pages

    return (
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center justify-content-end">
          {/* <label htmlFor="rows-per-page">Show</label> */}
          <Input
            className="mx-50"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: '5rem' }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>
          <label htmlFor="rows-per-page" style={{ marginRight: '1rem' }}>
            Per Page
          </label>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={count || 1}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </div>
    );
  };

  return (
    <div className="w-100">
      <div className="m-1 d-flex justify-content-end">
        <Button color="primary" onClick={toggleAddPlan}>
          <Plus size={14} /> Add new Plan
        </Button>
      </div>
      <h5>Personal Plans</h5>
      <Row>
        {store?.plans &&
          store?.plans
            .filter((x) => x.type === 'personal')
            .map((plan, idx) => {
              const Icon = Icons[plan?.icon];
              return (
                <Col xs="12" sm="6" md="6" lg="4" xl="3" key={idx} className="mb-1">
                  <Card className="h-100">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center">
                          {plan?.icon && <Icon className="text-primary me-1" />}
                          <h5 className="my-auto text-capitalize">{plan?.name}</h5>
                        </div>
                        <div>
                          {plan?.isDefault === true ? (
                            <Badge color="light-primary">Default & Free</Badge>
                          ) : (
                            <Badge color="light-primary">{plan.pricePerMonth} $/Month</Badge>
                          )}
                        </div>
                      </div>
                      <p>{plan?.description}</p>
                      <ul>
                        {plan?.benefits.map((b, i) => {
                          return <li key={i}>{b}</li>;
                        })}
                      </ul>
                      <div className="d-flex justify-content-end">
                        <Button color="primary" size="sm" onClick={() => handleOpenDetails(plan)}>
                          Details
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
      </Row>
      <Row className="mt-1">
        <h5>Organizations Plans</h5>
        {(isMobileView || isTabletView) ? (
          <div className='d-flex flex-wrap'>
            {data.map((item, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    border: '1px solid #ededed',
                    marginBottom: '5px !important',
                    padding: '10px',
                    width: isTabletView ? 'calc(50% - 10px)' : '100%', 
                            marginRight: isTabletView ? '10px' : ''
                  }}
                  className="mb-1"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Plan: {item.name}</h5>
                    <Icons.Edit2
                      size={16}
                      className="cursor-pointer text-primary"
                      onClick={() => handleOpenDetails(item)}
                    />
                  </div>
                  <p>Description:{item.description}</p>
                  <div style={{ height: '1px', background: '#e0e0e0', marginBottom: '10px' }}></div>
                  <p>Price Per Month: $ {item.pricePerMonth}</p>
                  <p>Price Per Year: $ {item.pricePerYear}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>Trial: {item.trialTime} Days</p>
                    <p>Created At: {moment(item?.createdAt).format("MM/DD/yyyy")}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          store && (
            <div className="react-dataTable">
              <DataTable
                noHeader
                responsive
                pagination
                paginationServer
                columns={columns}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                paginationComponent={CustomPagination}
                data={data}
                highlightOnHover
                pointerOnHover
              />
            </div>
          )
        )}
      </Row>
      {store && (
        <NewPlanModal open={openAddPlan} toggle={toggleAddPlan} dispatch={dispatch} store={store} />
      )}
      {selectedPlan && (
        <EditPlanModal
          open={openEditPlan}
          toggle={toggleEditPlan}
          dispatch={dispatch}
          store={store}
          plan={selectedPlan}
          setPlan={setSelectedPlan}
        />
      )}
    </div>
  );
}
