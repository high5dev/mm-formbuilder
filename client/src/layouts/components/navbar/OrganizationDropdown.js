import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { getUserData } from '../../../auth/utils';

import { setPermissions } from '../../../utility/Utils';
import { getOrgByPath } from '../../../views/organizations/store/api';
//import PaymentModal from './orgPayment/PaymentModal';
import { useDispatch } from 'react-redux';
import {
  addUpdateLocalStorageAction,
  createOrgSubscriptionForUserAction
} from '../../../views/organizations/store/action';
import { id } from 'react-scroll-calendar';

export default function OrganizationDropdown({ user,organization,dispatch }) {
  // ** State
  const [orgs, setOrgs] = useState([]);

  const [plan, setPlan] = useState();
  const [planDetails, setPlanDetails] = useState();

  const [title, setTitle] = useState('Personal');
  const [selectedOrg, setSelectedOrg] = useState();

  const [openPayment, setOpenPayment] = useState(false);
  const togglePaymentModal = () => setOpenPayment(!openPayment);


  // ** Function
  const handleChangeToPersonal = () => {
    localStorage.removeItem('organization');
    
    const user = getUserData();
    //rewrite with user plan permissions
    
    const newAbility = setPermissions(user.plan.permissions);
    const localUser = JSON.parse(localStorage.getItem('userData'));
    delete localUser.curRole
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
    let plan = org.data[0].plan[org.data[0].plan.length - 1];
    let planDetails = org.data[0].planDetails.find((x) => x._id === plan.planId);
    setPlan(plan);
    setPlanDetails(planDetails);
    if (planDetails.pricePerMonth === 0) {
      //free plan for organization
      const newAbility = setPermissions(planDetails.permissions);
      localStorage.setItem('organization', JSON.stringify(org.data[0]));
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
              expire:JSON.parse(localStorage.getItem('expire'))
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
              organization: JSON.parse(localStorage.getItem('organization')),
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
  useEffect(() => {
    if(user){
      let tempOrg = []
      if (user?.organizations) {
        tempOrg = [...user.organizations]
      }
      if(user?.roles){
        console.log(tempOrg)
        if(tempOrg.length>0){
          const tmpIds = tempOrg.map(x=>x?.organizationId)
          const newOrgs = user.roles.filter(x=>!tmpIds.includes(x.organizationId))
          newOrgs.map(x=>{
            tempOrg.push({organizationId:x.organizationId,name:x.organizationName,path:x.orgPath,userType:x.contactTypeId.name})
          })
        }
        else{
          user.roles.map(x=>{
            const tmpIds = tempOrg.map(x=>x?.organizationId)
            if(!tmpIds.includes(x.organizationId)){
              tempOrg.push({organizationId:x.organizationId,name:x.organizationName,path:x.orgPath,userType:x.contactTypeId.name})
            }
            
          })
        }
      }
      let temp = []
      for (const t of tempOrg) {
        if(temp.filter(x=>x.organizationId===t.organizationId).length===0){
          temp.push(t)
        }
      }
      setOrgs(temp);
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
      
      <UncontrolledDropdown className="me-50">
        <DropdownToggle caret color="outline-primary">
          {title}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="w-100" onClick={handleChangeToPersonal}>
          Personal
          </DropdownItem>
          {orgs?.map((o, idx) => {
            return (
              <DropdownItem key={idx} className="w-100" onClick={() => handleChangeOrganization(o)}>
                {o.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
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
