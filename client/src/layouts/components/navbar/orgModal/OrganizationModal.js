import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import { getUserData } from '../../../../auth/utils';

import { setPermissions } from '../../../../utility/Utils';
import { getOrgByPath } from '../../../../views/organizations/store/api';
import PaymentModal from '../orgPayment/PaymentModal';
import { useDispatch } from 'react-redux';
import {
  addUpdateLocalStorageAction,
  createOrgSubscriptionForUserAction
} from '../../../../views/organizations/store/action';
import { id } from 'react-scroll-calendar';
import { useHistory } from 'react-router-dom';
import NoImage from '../../../../assets/img/no-image.jpg'
import Logo from '../../../../assets/images/logo/logo.svg'

export default function OrganizationDropdown({
  user,
  organization,
  dispatch,
  isOnboarded,
  DefaultRoute
}) {
  // ** State
  const [orgs, setOrgs] = useState([]);
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const [plan, setPlan] = useState();
  const [planDetails, setPlanDetails] = useState();

  const [title, setTitle] = useState('Personal');
  const [selectedOrg, setSelectedOrg] = useState();

  const [openPayment, setOpenPayment] = useState(false);
  const togglePaymentModal = () => setOpenPayment(!openPayment);

  const history = useHistory();

  // ** Function
  const handleChangeToPersonal = () => {
    localStorage.removeItem('organization');

    const user = getUserData();
    //rewrite with user plan permissions

    const newAbility = setPermissions(user.plan.permissions);
    const localUser = JSON.parse(localStorage.getItem('userData'));
    delete localUser.curRole;
    localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));

    setTitle('Personal');
    const u = JSON.parse(localStorage.getItem('userData'));
    const payload = {
      accessToken: u.accessToken.trim(),
      refreshToken: u.refreshToken.trim(),
      userData: u
    };
    dispatch(addUpdateLocalStorageAction({ localStorage: { ...payload } })).then((res) => {
      if (res) {
        window.location.href = `https://me.mymanager.com/token/${u.accessToken.trim()}`;
      }
    });
    //window.location.href = `https://me.mymanager.com/token/${u.accessToken.trim()}`;
  };
  const handleChangeOrganization = async (o) => {
    //get org
    let org = await getOrgByPath(o.path);
    let plan = org?.data[0]?.plan[org?.data[0].plan?.length - 1];
    let planDetails = org?.data[0]?.planDetails?.find((x) => x?._id === plan?.planId);
    setPlan(plan);
    setPlanDetails(planDetails);
    if (planDetails?.pricePerMonth === 0) {
      //free plan for organization
      const newAbility = setPermissions(planDetails?.permissions);
      localStorage.setItem('organization', JSON.stringify(org?.data[0]));
      const localUser = JSON.parse(localStorage.getItem('userData'));
      delete localUser?.curRole;
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
            org.data[0].path
          }.mymanager.com/token/${u.accessToken.trim()}`;
        }
      });
      //window.location.href = `https://${org.data[0].path}.mymanager.com/`;
    } else {
      if (planDetails.payByUser === true) {
        let userPlan = org.data[0].plan.find(
          (x) => x.userId === getUserData().id && x.planId === planDetails._id
        );
        if (userPlan === undefined) {
          //create plan for user
          const payload = {
            userId: getUserData().id,
            organizationId: org.data[0]._id,
            paymentInfo: [],
            planId: planDetails._id,
            status: 'waiting',
            upgraded: false
          };
          dispatch(createOrgSubscriptionForUserAction(payload)).then((res) => {
            plan = res;

            setPlan(res);
          });
        } else {
          plan = userPlan;
          setPlan(plan);
        }
      }

      switch (plan.status) {
        case 'waiting':
          const trialExp = new Date(plan.updatedAt).setDate(
            new Date(plan.updatedAt).getDate() + planDetails?.trialTime
          );
          const now = new Date();
          if (trialExp > now) {
            // go to organization
            const newAbility = setPermissions(planDetails.permissions);
            localStorage.setItem('organization', JSON.stringify(org.data[0]));
            const localUser = JSON.parse(localStorage.getItem('userData'));
            delete localUser?.curRole;
            localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
            localStorage.setItem('expire', false);
            const u = JSON.parse(localStorage.getItem('userData'));
            const payload = {
              accessToken: u.accessToken.trim(),
              refreshToken: u.refreshToken.trim(),
              userData: u,
              organization: JSON.parse(localStorage.getItem('organization')),
              expire: JSON.parse(localStorage.getItem('expire'))
            };
            dispatch(addUpdateLocalStorageAction({ localStorage: { ...payload } })).then((res) => {
              if (res) {
                window.location.href = `https://${
                  org.data[0].path
                }.mymanager.com/token/${u.accessToken.trim()}`;
              }
            });
            //window.location.href = `https://${org.data[0].path}.mymanager.com/`;
          } else {
            // payment then go to organization
            // const newAbility = setPermissions(planDetails.permissions);
            // localStorage.setItem('organization', JSON.stringify(org.data[0]));
            // const localUser = JSON.parse(localStorage.getItem('userData'));
            // localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
            // localStorage.setItem('expire',true)
            setSelectedOrg(org.data[0]);
            togglePaymentModal();
          }
          break;
        case 'suspended':
          toast.error('Your organization plan is suspended! please contact support');
          break;
        case 'active':
          const newAbility = setPermissions(planDetails.permissions);
          localStorage.setItem('organization', JSON.stringify(org.data[0]));
          const localUser = JSON.parse(localStorage.getItem('userData'));
          localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
          const u = JSON.parse(localStorage.getItem('userData'));
          const payload = {
            accessToken: u.accessToken.trim(),
            refreshToken: u.refreshToken.trim(),
            userData: u,
            organization: JSON.parse(localStorage.getItem('organization'))
            //expire:JSON.parse(localStorage.getItem('expire'))
          };
          dispatch(addUpdateLocalStorageAction({ localStorage: { ...payload } })).then((res) => {
            if (res) {
              window.location.href = `https://${
                org.data[0].path
              }.mymanager.com/token/${u.accessToken.trim()}`;
            }
          });
          //window.location.href = `https://${org.data[0].path}.mymanager.com/`;
          break;

        default:
          toast.error('No status found for your organization. please contact support');
          break;
      }
    }
  };

  const handleOrganizationChange = (organizationName) => {
    if (organizationName === 'Personal') {
      handleChangeToPersonal();
    } else {
      handleChangeOrganization(organizationName);
    }

    // Close the modal
    toggle();

    // Redirect to the appropriate route
    history.push(isOnboarded ? DefaultRoute : '/dashboard/analytics');
  };

  useEffect(() => {
    if (user) {
      let tempOrg = [];
      if (user?.organizations) {
        tempOrg = [...user.organizations];
      }
      if (user?.roles) {
        if (tempOrg.length > 0) {
          const tmpIds = tempOrg.map((x) => x?.organizationId);
          const newOrgs = user.roles.filter((x) => !tmpIds.includes(x.organizationId));
          newOrgs.map((x) => {
            tempOrg.push({
              organizationId: x.organizationId,
              name: x.organizationName,
              path: x.orgPath,
              userType: x.contactTypeId.name
            });
          });
        } else {
          user.roles.map((x) => {
            const tmpIds = tempOrg.map((x) => x?.organizationId);
            if (!tmpIds.includes(x.organizationId)) {
              tempOrg.push({
                organizationId: x.organizationId,
                name: x.organizationName,
                path: x.orgPath,
                userType: x.contactTypeId.name
              });
            }
          });
        }
      }
      setOrgs(tempOrg);
    }
  }, []);

  useEffect(() => {
    if (organization) {
      let o = JSON.parse(organization);
      setTitle(o.name);
    }
  }, [organization]);
  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>SELECT YOUR ACCOUNT <br />
        <span style={{fontWeight: '400'}}>Please select an account to login</span>
        </ModalHeader>
        
        <ModalBody className='orgModal'>
          <Card onClick={() => handleOrganizationChange('Personal')} style={{cursor: 'pointer'}} >
            <Row className='d-flex p-1'>
              <Col md={4}>
                <img src={Logo} alt="logo" style={{width: '120px', height: '40px'}} />
              </Col>
              <Col md={8} className='mt-1 org-text'>
                <h5>Personal</h5>
              </Col>
            </Row>
          </Card>
          {orgs?.map((o, idx) => (
            <Card  key={idx} onClick={() => handleOrganizationChange(o)} style={{cursor: 'pointer'}}>
              <Row className='d-flex p-1'>
                <Col md={4} >
                  <img src={o.logo ? o.logo : Logo} alt="logo" style={{width: '120px', height: '40px'}} />
                </Col>
                <Col md={8} className='mt-1 org-text'>
                  <h5>{o.name}</h5>
                </Col>
              </Row>
            </Card>
          ))}
        </ModalBody>
      </Modal>

      {/* {selectedOrg && plan && planDetails && (
        <PaymentModal
          toggle={togglePaymentModal}
          open={openPayment}
          org={selectedOrg}
          plan={plan}
          planDetails={planDetails}
          dispatch={dispatch}
        />
      )} */}
    </>
  );
}
