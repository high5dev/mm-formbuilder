// ** React Imports
import { useState, Fragment, useRef } from 'react';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader
} from 'reactstrap';

// ** moment
import moment from 'moment';

// ** Icons
import { FiEdit2, FiEye } from 'react-icons/fi';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';


import { Copy, Edit, Send } from 'react-feather';
import { toast } from 'react-toastify';
import { formatDateToMonthShort } from '../../../../../utility/Utils';
import { useUploadSignature } from '../../../../../requests/documents/recipient-doc';
import { getOrgByIdAction, updateOrgAction } from '../../../store/action';
import { useDispatch } from 'react-redux';
import OrgAvatar from './OrgAvatar';

const OrgInfoCard = ({ selectedOrg, toggleSendRecipients,setOrg }) => {
  const dispatch = useDispatch();
  const photoRef = useRef();
  function onChoosePhoto() {
    photoRef?.current?.click();
  }
  const handleUploadOrganization = async (e) => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    await useUploadSignature(formData).then((res) => {
      if (res && res.success && res.success === true) {
        dispatch(updateOrgAction(selectedOrg._id, { logoLink: res.url })).then(res=>{
          dispatch(getOrgByIdAction(selectedOrg._id)).then(data=>{
            setOrg(data[0])
          })
        })
      }
    });
  };
  const handleCopyPath = () => {
    navigator.clipboard.writeText(`https://${selectedOrg?.path}.mymanager.com/register`);
    toast.success('Copied!');
  };

  // ** render user img
  const renderUserImg = () => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];
    return (
      <div className="organization-avatar">
        <OrgAvatar
          initials
          img={selectedOrg?.logoLink}
          color={color}
          className="rounded mt-3 mb-2 cursor-pointer"
          content={selectedOrg?.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
        <div className="organization-edit-button" onClick={onChoosePhoto}>
          <Edit className="edit-icon" />
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {/* upload photo */}
      <input type="file" onChange={handleUploadOrganization} hidden ref={photoRef} />

      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4 className="d-flex justify-content-center">
                    {selectedOrg !== null ? selectedOrg.name : 'Eleanor Aguilar'}
                    {/* <div className="ms-1">
                                            <FiEye className="cic-eye-icon" />
                                        </div> */}
                  </h4>
                  <div>
                    {/* <span className="fw-bolder me-25">Status :</span> */}
                    {selectedOrg !== null ? (
                      <>
                        <Badge
                          color={selectedOrg?.isVerified ? 'light-success' : 'light-danger'}
                          className="text-capitalize me-1"
                        >
                          {selectedOrg?.isVerified ? 'Verified' : 'Not Verified'}
                        </Badge>
                        {selectedOrg?.isDeleted && (
                          <Badge className="text-capitalize" color="light-secondary">
                            Archived
                          </Badge>
                        )}
                      </>
                    ) : null}
                  </div>
                  <div className="d-flex justify-content-center mt-50">
                    <Badge color="primary" style={{ cursor: 'pointer' }} onClick={handleCopyPath}>
                      <span>{selectedOrg?.path && <>/{selectedOrg?.path}/register</>}</span>
                      <Copy className="ms-50" />
                    </Badge>
                    <Send
                      size={18}
                      onClick={toggleSendRecipients}
                      style={{ cursor: 'pointer' }}
                      className="text-primary my-auto ms-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2"></div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Organization Info</h4>
          <div className="info-container mb-3">
            {selectedOrg !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Contact:</span>
                  <span>{selectedOrg?.contact}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email:</span>
                  <span>{selectedOrg?.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Address:</span>
                  <span>{selectedOrg?.address && <>{selectedOrg?.address}</>}</span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25">Start Date:</span>
                  <span>
                    {moment(selectedOrg.createdAt).format("MM/DD/yyyy")}{' '}
                    {formatDateToMonthShort(selectedOrg.createdAt)}
                  </span>
                </li>
              </ul>
            ) : null}
          </div>

          {/* <div className="d-flex justify-content-center pt-2">
                        <Button color="primary" >
                            Edit
                        </Button>
                        <Button
                            className="ms-1"
                            color="primary"
                            outline
                            
                        >
                            Details
                        </Button>
                    </div> */}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default OrgInfoCard;
