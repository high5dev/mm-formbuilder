import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  ChevronDown,
  Edit,
  Lock,
  MoreVertical,
  Trash,
  ChevronRight,
  DivideCircle,
  Loader,
  TrendingUp
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import {
  Badge,
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Input,
  UncontrolledDropdown,
  Card,
  UncontrolledTooltip,
  CardBody
} from 'reactstrap';
import '@src/assets/styles/toggle-switch.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { deleteFormAction, getWebBuildersAction, getWebsiteAction } from '../store/action';
import '../../../assets/scss/style.css';
import ReactPaginate from 'react-paginate';
import { getUserData } from '../../../auth/utils';
import { AbilityContext } from '../../../utility/context/Can';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { FaEdit, FaEye, FaHeart, FaTrash } from 'react-icons/fa';
import '@src/assets/styles/marketing/email/toggle-switch.scss';
import '@styles/react/apps/app-email.scss';
import '../../../../src/assets/styles/marketing.scss';
import UILoader from '../../../@core/components/ui-loader';
import { useSelector } from 'react-redux';
import moment from 'moment';

const label = {
  clients: 'light-primary',
  employees: 'light-danger',
  leads: 'light-warning',
  relationships: 'light-success',
  vendors: 'light-muted',
  members: 'light-muted'
};
export default function FunnelTable({
  categoryData,
  active,
  dispatch,
  collapse,
  handleCategoryCollapse,
  isMobileView,
  isTabletView,
  isDesktopView,
  checkedCategoryData
}) {
  const ability = useContext(AbilityContext);
  // ** STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toggleListOrBoard, setToggleListOrBoard] = useState(true);
  const [count, setCount] = useState(1);
  const [displayData, setDisplayData] = useState([]);

  const contactTypes = useSelector((state) => state.totalContacts.contactTypeList);
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const history = useHistory();
  const user = getUserData();

  // ** FUNCTIONS

  const handleEdit = (row) => {
    history.push(`/webpages/editor/${row._id}`);
  };
  const handleDetails = (row) => {
    dispatch(getWebsiteAction(row?._id)).then((res)=>{
      if(res){
        history.push(`/form-funnel/form-setting/${row._id}`)
      }
    })

    // history.push(`/webpages/editor/${row._id}`);
  };

  useEffect(()=>{
    const payload={
      currentPage,
      rowsPerPage,
      template:false
    };
    dispatch(getWebBuildersAction(payload)).then(res=>{
      if(res && res.data){
        setDisplayData([...res.data]);
        setCount(Math.ceil(res.count / rowsPerPage))
      }
    })
  }, [currentPage]);


  useEffect(() => {
    setCurrentPage(1);
  }, [checkedCategoryData, rowsPerPage]);

  const CustomPagination = () => {
    return (
      <>
        <div className="justify-content-end d-flex">
          <div className='my-auto'>
            <div className="d-flex  justify-content-end">
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
              <label htmlFor="rows-per-page" className='my-auto'>Per Page</label>
            </div>
          </div>
          <div className='ms-1'>
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
         
        </div>
       
      </>
    );
  };

  const MySwal = withReactContent(Swal);
  const handleRemove = async (row) => {
    const res = await MySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this form?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      //delete form
      dispatch(deleteFormAction(row._id));
    }
  };
  const optionLabels = ['Table', 'List'];

  const bootstrapClass =
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">';
  const setToggle = () => {
    setToggleListOrBoard(!toggleListOrBoard);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode !== 32) return;

    e.preventDefault();
    setToggle(!toggleListOrBoard);
  };
  const getTextColor = (formType) => {
    switch (formType) {
      case 'email':
        return 'success';
      case 'leads':
        return 'info';
      case 'sales':
        return 'warning';
      default:
        return 'danger';
    }
  };
  const id = 'toggle-switch-task';
  const nameToggle = 'toggle-switch-task';
  const columns = [
    {
      name: 'Name',
      sortable: 'true',
      selector: (row) => row.name,
      cell: (row) => <span onClick={() => handleDetails(row)}>{row.name}</span>
    },
    {
      name: 'Type',
      sortable: 'true',
      selector: (row) => row.formType,
      cell: (row) => (
        <span onClick={() => handleDetails(row)}>
          <Badge color={getTextColor(row?.formType)} style={{ paddingTop: '6px' }} className="me-1">
            {row?.formType}
          </Badge>
        </span>
      )
    },
    {
      name: 'Last Updated',
      sortable: 'true',
      selector: (row) => row.updatedAt,
      cell: (row) => (
        <span onClick={() => handleDetails(row)}>
          <Badge color="light-primary" style={{ paddingTop: '6px' }}>
            {moment(row?.updatedAt)?.format("MM/DD/yyyy")}
          </Badge>
        </span>
      )
    },
    // {
    //   name: 'Smartlist',
    //   selector: (row) => (
    //     <span>
    //       {row.smartlist && row.smartlist !== '' && `${row.smartList} > ${row.subCategory}`}
    //     </span>
    //   )
    // },
    {
      name: 'Automated',
      selector: (row) => row.automateEntry,
      cell: (row) =>
        row.automateEntry ? (
          <Badge color="light-primary">Yes</Badge>
        ) : (
          <Badge color="light-secondary">No</Badge>
        )
    },
    {
      name: 'Contact Type',
      selector: (row) => row.memberType,
      cell: (row) => (
        <Badge color="light-primary">
          {contactTypes?.find((x) => x._id === row?.contactType)?.name}
        </Badge>
      )
    },

    {
      name: 'Action',
      selector: (row) => row._id,
      cell: (row) => (
        <>
          {row.userId === user.id ? (
            <div className="column-action">
              <UncontrolledDropdown >
                <DropdownToggle tag="div" className="btn btn-sm">
                  <MoreVertical size={14} className="cursor-pointer" />
                </DropdownToggle>
                <DropdownMenu>
                  {ability.can('update', 'business/formsFunnels') ? (
                    <DropdownItem tag="span" className="w-100" onClick={() => handleEdit(row)}>
                      <Edit size={14} className="me-50" />
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                  ) : (
                    <DropdownItem tag="span" className="w-100">
                      <Lock size={14} className="me-50" />
                      <span className="align-middle">Edit</span>
                    </DropdownItem>
                  )}
                  {ability.can('delete', 'business/formsFunnels') ? (
                    <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(row)}>
                      <Trash size={14} className="me-50" />
                      <span className="align-middle">Remove</span>
                    </DropdownItem>
                  ) : (
                    <DropdownItem tag="span" className="w-100">
                      <Lock size={14} className="me-50" />
                      <span className="align-middle">Remove</span>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          ) : (
            <Lock className="text-muted" size={14} />
          )}
        </>
      )
    }
  ];
  const containerClasses = `p-1 pb-0 justify-content-between ${
    collapse === true ? 'd-flex' : 'd-inline-block'
  }`;

  const getCategoryName = (subCategory) => {
    const matchedCategory = categoryData.find((category) => category._id === subCategory);
    return matchedCategory ? matchedCategory.name : '';
  };
  return (
    <div className="formBuilder-table flex-1 d-flex flex-row">
      {collapse && active === '2' && (
        <div className="btn-collapse-wrapper">
          <Button
            className="btn-icon btn btn-flat-dark btn-sm btn-toggle-sidebar m-1"
            color="flat-dark"
            onClick={handleCategoryCollapse}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      {(isMobileView || isTabletView) && (
        <div style={{ padding: '5px', width: isMobileView ? '100%' : '100%' }}>
          <div className="flex-wrap">
            {tableData?.map((item, index) => {
              return (
                <>
                  <Card
                    key={index}
                    style={{
                      border: '1px solid #ededed',
                      marginBottom: '5px !important',
                      padding: '10px',
                      width: '100%', // Adjusted width with spacing
                      marginRight: '10px' // Added margin for spacing
                    }}
                    className="mb-1"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4>{item?.name}</h4>
                      </div>
                      <div className="d-flex">
                        {ability.can('update', 'business/formsFunnels') ? (
                          <div tag="span" className="w-100" onClick={() => handleEdit(item)}>
                            <Edit size={14} className="me-50" />
                          </div>
                        ) : (
                          <div tag="span" className="w-100">
                            <Lock size={14} className="me-50" />
                          </div>
                        )}
                        {ability.can('delete', 'business/formsFunnels') ? (
                          <div tag="span" className="w-100" onClick={() => handleRemove(item)}>
                            <Trash size={14} className="me-50" />
                          </div>
                        ) : (
                          <div tag="span" className="w-100">
                            <Lock size={14} className="me-50" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        height: '1px',
                        background: '#e0e0e0',
                        marginTop: '10px',
                        marginBottom: '10px'
                      }}
                    ></div>

                    <div className="d-flex ">
                      <h6 className="text-secondary">Type</h6>
                      <div style={{ marginLeft: '10px' }} onClick={() => handleDetails(item)}>
                        {item.formType}
                      </div>
                    </div>
                    <div className="d-flex ">
                      <h6 className="text-secondary">Last Updated</h6>
                      <div style={{ marginLeft: '10px' }} onClick={() => handleDetails(item)}>
                        {moment(item.updatedAt).format("MM/DD/yyyy")}
                      </div>
                    </div>
                    <div className="d-flex ">
                      <h6 className="text-secondary">Automated</h6>
                      <div style={{ marginLeft: '10px' }}>
                        {item.automateEntry ? (
                          <Badge color="light-primary">Yes</Badge>
                        ) : (
                          <Badge color="light-secondary">No</Badge>
                        )}
                      </div>
                    </div>
                    <div className="d-flex ">
                      <h6 className="text-secondary">Contact</h6>
                      <div style={{ marginLeft: '10px' }}>
                        <Badge color={label[item.memberType]}>{item.memberType}</Badge>
                      </div>
                    </div>
                  </Card>
                </>
              );
            })}
          </div>
        </div>
      )}

      {isDesktopView && (
        <div className="flex-1 react-dataTable">
          <Row spacing={2} className="p-0 m-0 mt-0">
            <Col sm={12} md={12} lg={12}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <h4 className="m-0">{toggleListOrBoard ? 'Table View' : 'Card View'}</h4>
                </div>
                <div
                  id="task-toggle-board-list"
                  className="toggle-switch task-tour-element-4"
                  style={{ float: 'right', margin: '10px' }}
                >
                  <input
                    type="checkbox"
                    name={nameToggle}
                    className="toggle-switch-checkbox"
                    id={id}
                    checked={toggleListOrBoard}
                    onChange={(e) => setToggle(e.target.checked)}
                  />
                  {id ? (
                    <label
                      className="toggle-switch-label"
                      onKeyDown={(e) => handleKeyPress(e)}
                      htmlFor={id}
                    >
                      <span
                        className="toggle-switch-inner"
                        data-yes={optionLabels[0]}
                        data-no={optionLabels[1]}
                        tabIndex={-1}
                      />
                      <span className="toggle-switch-switch" tabIndex={-1} />
                    </label>
                  ) : null}
                </div>
                <UncontrolledTooltip placement={'top'} target={'task-toggle-board-list'}>
                  Switch Table and List
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
          {toggleListOrBoard ? (
            <>
              {displayData && displayData?.length ? (
                <DataTable
                  header
                  sortServer
                  pagination
                  responsive
                  paginationServer
                  selectableRows
                  paginationPerPage={10}
                  className="react-dataTable"
                  data={displayData}
                  style={{ cursor: 'pointer' }}
                  sortIcon={<ChevronDown size={14} />}
                  columns={columns}
                  onRowClicked={handleDetails}
                  pointerOnHover="cursor"
                  paginationComponent={CustomPagination}
                />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: '70vh' }}
                >
                  <span className="me-2"> Loading...</span>
                  <UILoader blocking={true} overlayColor="rgba(255,255,255, .5)"></UILoader>
                </div>
              )}
            </>
          ) : (
            <Row spacing={2} className="p-0 m-0 mt-3">
              {displayData && displayData?.length ? (
                <>
                  {displayData?.map((item) => {
                    const categoryName = getCategoryName(item.subCategory);
                    return (
                      <Col key={item._id} sm={12} md={4} lg={4}>
                        <Card style={{ height: '280px' }} className="template-item-card">
                          <div className={containerClasses}>
                            <p style={{ fontSize: '16px', marginBottom: '2px' }}>
                              <b>
                                {item?.name?.length > 5
                                  ? item?.name.substring(0, 5) + '...'
                                  : item?.name}
                              </b>
                            </p>
                            <span
                              style={{
                                textAlign: 'right',
                                float: `${collapse === false ? 'right' : 'none'}`
                              }}
                            >
                              <Badge
                                color={getTextColor(item?.formType)}
                                style={{ paddingTop: '6px' }}
                                className="me-1"
                              >
                                {item?.formType}
                              </Badge>
                              <Badge color="light-primary" style={{ paddingTop: '6px' }}>
                                {moment(item.updatedAt).format("MM/DD/yyyy")}
                              </Badge>
                            </span>
                          </div>
                          <span
                            style={{ textAlign: 'right', paddingRight: '15px', paddingTop: '4px' }}
                          >
                            <Badge color="secondary">{categoryName}</Badge>
                          </span>

                          <div className="template-iframe" style={{ height: '200px' }}>
                            <div
                              className="border box-shadow stt-3"
                              style={{
                                borderRadius: '12px',
                                padding: '0.5em',
                                margin: '0.5em',
                                height: `${collapse === true ? '200px' : '180px'}`
                              }}
                            >
                              {
                                    item?.formData?.[0] &&              
                                    <iframe
                                        style={{ borderRadius: '12px' }}
                                        scrolling="no"
                                        width="100%"
                                        height="100%"
                                        srcDoc={
                                          bootstrapClass +
                                          item?.formData?.[0].html +
                                          '<style>' +
                                          item?.formData?.[0].css +
                                          '</style>'
                                        }
                                        title="Customized Form"
                                      ></iframe>
                              }
                            </div>
                          </div>
                          <div className="template-btn-group p-1">
                            <div className="d-flex flex-column align-items-center w-100">
                              <div className="shadow-lg rounded p-1 d-flex justify-content-between flex-column gap-2">
                                {item.userId === user.id ? (
                                  <>
                                    <Button
                                      color="success"
                                      className="text-capitalize"
                                      onClick={() => handleEdit(item)}
                                    >
                                      <FaEdit size={18} />
                                      &nbsp;&nbsp; Edit
                                    </Button>
                                    <Button
                                      color="danger"
                                      className="text-capitalize"
                                      onClick={() => handleRemove(item)}
                                    >
                                      <FaTrash size={18} />
                                      &nbsp;&nbsp;Delete
                                    </Button>
                                    <Button
                                      color="primary"
                                      className="text-capitalize"
                                      onClick={() => setViewModal(!viewModal)}
                                    >
                                      <FaEye size={18} />
                                      &nbsp;&nbsp; View
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Lock className="text-muted" size={14} />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    );
                  })}
                </>
              ) : (
                <>
                  Loading... <Loader size={24} />
                </>
              )}
            </Row>
          )}
        </div>
      )}
    </div>
  );
}
