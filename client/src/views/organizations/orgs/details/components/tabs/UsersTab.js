import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  ArrowUp,
  CreditCard,
  Edit,
  Edit2,
  Eye,
  Lock,
  MoreVertical,
  Plus,
  Trash,
  User
} from 'react-feather';
import { BiUpArrow } from 'react-icons/bi';
import {
  Badge,
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import UserEditModal from './UserEdit/UserEditModal';
import NoteModal from './NoteModal';
import LocationNameModal from './UserEdit/LocationNameModal';
import { getUserData } from '../../../../../../auth/utils';
import { setPermissions } from '../../../../../../utility/Utils';
import { addUpdateLocalStorageAction, deleteUserFromOrganizationAction } from '../../../../store/action';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function UsersTab({ selectedOrg, dispatch, setSelectedOrg, isMobileView, setIsCall }) {
  const [selectedUser, setSelectedUser] = useState();
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openEditLocation, setOpenEditLocation] = useState(false);

  const toggleOpenNote = () => setOpenNotes(!openNotes);
  const toggleOpenEdit = () => setOpenEditUser(!openEditUser);
  const toggleOpenEditLocation = () => setOpenEditLocation(!openEditLocation);

  const handleLoginUser = (data) => {
    const user = getUserData();
    localStorage.setItem(
      'userData',
      JSON.stringify({
        ...user,
        curRole: {
          contactTypeId: { type: 'employee', name: 'Admin' },
          assignerId: data.userId,
          location: {
            label: user.organizations.map((x) => x.organizationId === selectedOrg._id)
              ?.locationName,
            value: data._id,
            location: {
              location: user.organizations.map((x) => x.organizationId === selectedOrg._id)
                ?.locationName,
              userId: data.userId
            }
          }
        }
      })
    );
    const path = selectedOrg.path;
    const localUser = JSON.parse(localStorage.getItem('userData'));
    localStorage.setItem('organization', JSON.stringify(selectedOrg));
    let plan = selectedOrg.plan[selectedOrg.plan.length - 1];
    let planDetails = selectedOrg.planDetails.find((x) => x._id === plan.planId);
    const newAbility = setPermissions(planDetails.permissions);
    localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
    const u = JSON.parse(localStorage.getItem('userData'));
    const payload = {
      accessToken: u.accessToken.trim(),
      refreshToken: u.refreshToken.trim(),
      userData: u,
      organization: JSON.parse(localStorage.getItem('organization'))
    };
    dispatch(addUpdateLocalStorageAction({ localStorage: { ...payload } })).then((res) => {
      if (res) {
        window.location.href = `https://${
          selectedOrg.path
        }.mymanager.com/token/${u.accessToken.trim()}`;
      }
    });
    // window.location.href = `https://${path}.mymanager.com`
    //window.location.reload()
  };

const mySwal = withReactContent(Swal)
const handleDeleteUserFromOrg = async (user) =>{

  const result  = await mySwal.fire({
    title: 'Delete?',
      text: 'Are you sure you want to delete this user from the organization?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
  })
  if(result.isConfirmed){
    dispatch(deleteUserFromOrganizationAction({organizationId:selectedOrg._id,userId:user.userId})).then(res=>{
      setIsCall(true)
    })
  }
 
}
  const userTypeColor = {
    admin: 'light-success',
    user: 'light-warning'
  };
  const columns = [
    {
      name: 'LOCATION',
      selector: (row) => row._id,
      width: '10%',
      cell: (row) => (
        <span>
          {row?.organizations && row?.organizations?.find((x) => x.organizationId === selectedOrg._id)?.locationName && row?.organizations?.find((x) => x.organizationId === selectedOrg._id)?.locationName !== ''
            ? row.organizations.find((x) => x.organizationId === selectedOrg._id)?.locationName?.toUpperCase()
            : row?.userId?.slice(-6)}
        </span>
      )
    },
    {
      name: 'NAME',
      selector: (row) => row.firstName,
      width: '30%',
      cell: (row) => (
        <div>
          <p className="my-0">
            <span>
              {row?.firstName} {row?.lastName}
            </span>
          </p>
          <p className="my-0 text-secondary">
            <span>
              <small>{row?.email}</small>
            </span>
          </p>
        </div>
      )
    },
    {
      name: 'PHONE',
      selector: (row) => row?.phone,
      width: '20%',
      cell: (row) => <span>{row?.phone}</span>
    },
    {
      name: 'TYPE',
      width: '15%',
      cell: (row) => (
        <Badge
          color={
            userTypeColor[
              row?.organizations?.find((x) => x.organizationId === selectedOrg._id)?.userType
            ]
          }
        >
          {row?.organizations?.find((x) => x.organizationId === selectedOrg._id)?.userType}
        </Badge>
      )
    },
    {
      name: 'NOTE',
      width: '15%',
      cell: (row) => (
        <Eye
          className="text-secondary"
          onClick={() => {
            setSelectedUser(row);
            toggleOpenNote();
          }}
          style={{ cursor: 'pointer' }}
        />
      )
    },
    {
      name: 'ACTIONS',
      width: '15%',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu container="body">
              <DropdownItem
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedUser(row);
                  toggleOpenEditLocation();
                }}
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">Location Name</span>
              </DropdownItem>
              {/* <DropdownItem
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleLoginUser(row);
                }}
              >
                <User size={14} className="me-50" />
                <span className="align-middle">Login as user</span>
              </DropdownItem> */}
              <DropdownItem
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedUser(row);
                  toggleOpenEdit();
                }}
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteUserFromOrg(row)
                }}
              >
                <Trash size={14} className="me-50" />
                <span className="align-middle">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];
  return (
    <Fragment>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className="task-application">
            <div className="list-group task-task-list-wrapper">
              {isMobileView ? (
                <div style={{ padding: '5px' }}>
                  {selectedOrg?.users.map((item, index) => {
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
                          <div>
                            <h5 className="mb-0">
                              {item.firstName} {item.lastName}
                            </h5>
                            <p
                              className="text-truncate text-muted"
                              style={{
                                marginBottom: '5px !important'
                              }}
                            >
                              {item.email}
                            </p>
                          </div>

                          <div className="d-flex">
                            <Eye
                              size={16}
                              className="cursor-pointer text-danger"
                              onClick={() => {
                                setSelectedUser(item);
                                toggleOpenNote();
                              }}
                            />
                            <Edit2
                              className="mx-50 text-primary"
                              size={18}
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedUser(item);
                                toggleOpenEdit();
                              }}
                            />
                          </div>
                        </div>
                        <div
                          style={{ height: '1px', background: '#e0e0e0', marginBottom: '10px' }}
                        ></div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <Phone size={16} className="me-1" />
                            <p>{item.phone}</p>
                          </div>
                          <div className="d-flex">
                            {item?.organizations.map((items) => (
                              <Badge
                                color={`${userTypeColor[items.userType]}`}
                                style={{ height: '20px !important' }}
                              >
                                {items.userType}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <DataTable
                  noHeader
                  responsive
                  className="react-dataTable"
                  columns={columns}
                  data={selectedOrg?.users || []}
                  highlightOnHover
                  pointerOnHover
                  pagination
                  
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
      {selectedUser && (
        <UserEditModal
          open={openEditUser}
          toggle={toggleOpenEdit}
          selectedUser={selectedUser}
          dispatch={dispatch}
          setSelectedOrg={setSelectedOrg}
        />
      )}
      {selectedUser && (
        <NoteModal
          open={openNotes}
          toggle={toggleOpenNote}
          selectedUser={selectedUser}
          dispatch={dispatch}
        />
      )}
      {selectedUser && (
        <LocationNameModal
          open={openEditLocation}
          toggle={toggleOpenEditLocation}
          selectedUser={selectedUser}
          dispatch={dispatch}
          setSelectedOrg={setSelectedOrg}
          selectedOrg={selectedOrg}
        />
      )}
    </Fragment>
  );
}