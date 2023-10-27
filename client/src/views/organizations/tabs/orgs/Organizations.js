import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Home,
  Link,
  MoreVertical,
  Phone,
  Plus,
  Send,
  Trash,
  Trash2,
  UserPlus
} from 'react-feather';
import { useHistory } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { sendOrgEmailAction, updateOrgAction } from '../../store/action';
import AddUserModal from './AddUserModal';

import CreateOrgModal from '../../orgs/create/CreateOrgModal';
import PermissionsModal from './../../permissions/PermissionsModal';

import { useColumns } from './useColumns';
import TopStats from '../TopStats';
import ReactPaginate from 'react-paginate';
import { MdEmail } from 'react-icons/md';
import { FaTasks, FaUser } from 'react-icons/fa';
import moment from 'moment';

export default function Organizations({ store, dispatch, isMobileView, isTabletView }) {
  const [openCreate, setOpencreate] = useState(false);
  const [openPermision, setOpenPermision] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [dropdownStatue, setDropdownStatus] = useState('Active');
  const [data, setData] = useState([]);

  const [selectedOrg, setSelectedOrg] = useState(null);

  const toggleCreate = () => setOpencreate(!openCreate);
  const toggleOpenPermission = () => setOpenPermision(!openPermision);
  const toggleAddUser = () => setOpenAddUser(!openAddUser);

  const history = useHistory();

  //Handle Column Functions
  const handleDetails = (row) => {
    history.push(`/organizations/${row._id}`);
  };

  const handleFilter = (val) => {
    if (val === 'Active') {
      setData(store.myOrgs.filter((x) => x.isDeleted === false));
      setDropdownStatus('Active');
    } else {
      setData(store.myOrgs.filter((x) => x.isDeleted === true));
      setDropdownStatus('Archived');
    }
  };
  const MySwal = withReactContent(Swal);
  const handleDelete = async (row) => {
    const res = await MySwal.fire({
      title: 'Delete Organization',
      text: 'Are you sure you want to delete this organization? ',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      dispatch(updateOrgAction(row._id, { isDeleted: true }));
    }
  };

  const handleActivate = async (row) => {
    const res = await MySwal.fire({
      title: 'Activate Organization',
      text: 'Are you sure you want to activate this organization? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Activate',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      dispatch(updateOrgAction(row._id, { isDeleted: false }));
    }
  };

  const handleSendEmail = (row) => {
    const payload = {
      message: 'Hi, This is a reminder email for activating your organization.',
      organizationId: row._id
    };
    dispatch(sendOrgEmailAction(payload));
  };

  // ** COLUMNS
  const { columns } = useColumns(
    { handleDetails },
    { handleDelete },
    { handleSendEmail },
    { handleActivate }
  );

  const conditionalRowStyles = [
    {
      when: (row) => row.isDeleted === true,
      style: {
        backgroundColor: '#ededed',
        color: '#b8c2cc'
      }
    }
  ];

  useEffect(() => {
    if (store && store.myOrgs) {
      setData(store.myOrgs.filter((x) => x.isDeleted === false));
    }
  }, [store]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(data.length / rowsPerPage);

    return (
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center justify-content-end">
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
    <>
      <TopStats store={store} />
      <div className="app-user-list">
        <div className={`${isMobileView ? '' : isTabletView ? '' : 'card'}`} style={isMobileView ? {backgroundColor: '#ffffff00', boxShadow: 'none'} : {  }}>
          <div className="m-1">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <h2 className="mb-2 mt-0 my-sm-0">My Organizations</h2>
              <div className="my-0 my-sm-0">
                <div className="d-flex flex-sm-row align-items-start align-items-sm-center">
                  <Row>
                    <Col xs={12} md={4} className="mb-2">
                      <UncontrolledDropdown className="w-100">
                        <DropdownToggle color="outline-primary" caret className="w-100">
                          {dropdownStatue}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem className="w-100" onClick={() => handleFilter('Active')}>
                            Active
                          </DropdownItem>
                          <DropdownItem className="w-100" onClick={() => handleFilter('Archived')}>
                            Archived
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                    <Col xs={12} md={8}>
                      <Button color="primary" onClick={toggleCreate} className="w-100">
                        <Plus size={14} /> Add new Organization
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>

          <div className="react-dataTable employee-list-table">
            {(isMobileView || isTabletView) ? (
              <div className='d-flex flex-wrap'>
                {data.map((item, index) => {
                  console.log(item)

                  function formatPhoneNumber(phoneNumber) {
                    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
                    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
                    if (match) {
                      return match[1] + '-' + match[2] + '-' + match[3] + '-' + match[4];
                    }
                    // Return the original number if it cannot be formatted
                    return phoneNumber;
                  }
                  
                  // Example usage:
                  const phoneNumber = item?.contact;
                  const formattedNumber = formatPhoneNumber(phoneNumber);
                  const handleCopyLink = (row) => {
                    navigator.clipboard.writeText(`https://${row.path}.mymanager.com/register`);
                  };
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
                        <div>
                          <h5 className="mb-0">{item.name}</h5>
                          <p className="text-truncate text-muted"
                            style={{
                              marginBottom: '5px !important'
                            }}
                          >
                            {item.email}
                          </p>
                        </div>

                        <div className="d-flex">
                          <Trash2
                            size={16}
                            className="cursor-pointer text-danger"
                            onClick={() => handleDelete(item)}
                          />
                          <Send
                            className="mx-50 text-primary"
                            size={18}
                            style={{ cursor: 'pointer' }}
                            onClick={()=>handleSendEmail(item)}
                          />
                        </div>
                      </div>
                      <div
                        style={{ height: '1px', background: '#e0e0e0', marginBottom: '10px' }}
                      ></div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <Phone size={16} className="me-1" />
                          <p>{formattedNumber}</p>
                        </div>
                        <div className="d-flex">
                          {item?.isVerified === true ? (
                            <Badge style={{ height: '20px' }} color="light-primary" pill>
                              Verified
                            </Badge>
                          ) : (
                            <Badge color="light-danger" pill>
                              Not Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="d-flex">
                        <Home size={16} className="me-1" />
                        <p>{item.address}</p>
                      </div>
                      <div className="d-flex">
                        {/* <Link size={16} className="me-1" /> */}
                        <p>{item.path}.mymanager.com</p>
                        <Copy
                          size={16}
                          className="text-primary"
                          onClick={() => handleCopyLink(item)}
                          style={{ cursor: 'pointer', marginTop: '2px', marginLeft: '5px' }}
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex" onClick={() => handleDetails(item)}>
                          <h6 style={{ marginRight: '5px' }}>Last Update</h6>
                          <p className="mb-0">{moment(item.updatedAt).format("MM/DD/yyyy")}</p>
                        </div>
                        <div
                          className="d-flex"
                          style={{ background: 'light-blue !important', border: '1xp solid' }}
                        >
                          <FaUser size={16} style={{ marginRight: '5px' }} />
                          <p>{item.userCount}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              store && (
                <DataTable
                  noHeader
                  pagination
                  responsive
                  paginationServer
                  columns={columns}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  conditionalRowStyles={conditionalRowStyles}
                  data={data}
                  onRowClicked={handleDetails}
                  paginationComponent={CustomPagination}
                  highlightOnHover
                  pointerOnHover
                />
              )
            )}
          </div>
          {store && (
            <CreateOrgModal
              toggle={toggleCreate}
              open={openCreate}
              store={store}
              dispatch={dispatch}
              isMobileView={isMobileView}
            />
          )}
          {store && <PermissionsModal open={openPermision} toggle={toggleOpenPermission} />}
          {store && selectedOrg && (
            <AddUserModal open={openAddUser} toggle={toggleAddUser} selectedOrg={selectedOrg} />
          )}
        </div>
      </div>
    </>
  );
}
