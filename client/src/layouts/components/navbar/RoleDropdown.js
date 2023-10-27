import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
// ** Context
import { handleRole } from '@store/authentication';
import Avatar from '@components/avatar';
import { AbilityContext } from '@src/utility/context/Can';
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather';

import { customInterIceptors } from '../../../lib/AxiosProvider';
import { setPermissions } from '../../../utility/Utils';
import { toast, Slide } from 'react-toastify';
import { getHomeRouteForLoggedInUser, getUserData } from '../../../utility/Utils';
import { getContactElementsAction } from '../../../views/organizations/store/action';
import { createOrgSubscriptionForUserAction } from '../../../views/organizations/store/action';
//import PaymentModal from './orgPayment/PaymentModal';
import {
  getOrgByPath
} from '../../../views/organizations/store/api';
//import { getEmployeePermissionAction } from '../../../views/contacts/store/actions';

const ToastContent = ({ name, role }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to My Manager. Now you can start to
        explore. Enjoy!
      </span>
    </div>
  </>
);

export default function RoleDropdown({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openPayment, setOpenPayment] = useState(false);
  const togglePaymentModal = () => setOpenPayment(!openPayment);
  const [selectedOrg, setSelectedOrg] = useState();
  const [plan, setPlan] = useState();
  const [planDetails, setPlanDetails] = useState();
  // ** States
  const [title, setTitle] = useState(getUserData().curRole && getUserData()?.curRole?.contactTypeId ? getUserData().curRole.contactTypeId.name : 'Primary Account');
  const [path, setPath] = useState('');
  const [curUserType, setCurUserType] = useState('');
  const [roles, setRoles] = useState([]);
  // ** Contexts
  const ability = useContext(AbilityContext);

  // ** Effects
  useEffect(() => {
    setPath(/:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]);
  }, []);
  useEffect(() => {
    user.organizations.map((org) => {
      if (org.path === path) {
        setCurUserType(org.userType);
      }
    });
  }, [user, path]);

  useEffect(async () => {
    if (user?.roles?.length && user?.roles?.length>0 && path) {
      const organization = JSON.parse(localStorage.getItem("organization"))
      setRoles(user.roles.filter(x=>x.organizationId===organization?._id))
    }
  }, [user?.roles,path]);

  // ** Handlers
  const handleChangeToUserAccount = async (role) =>{
    let organization = localStorage.getItem("organization")
    let newAbility;
    if(organization===null){
      const user = getUserData();
      newAbility = setPermissions(user.plan.permissions);
      const localUser = JSON.parse(localStorage.getItem('userData'));
      localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
  
      setTitle('Personal');
      localStorage.removeItem("employee")
      window.location.href = 'https://me.mymanager.com/';
      //history.push(getHomeRouteForLoggedInUser(user.userType));
    }
    else{
      let o = JSON.parse(organization)
      let org = await getOrgByPath(o.path);
      let plan = org.data[0].plan[org.data[0].plan.length - 1];
      let planDetails = org.data[0].planDetails.find((x) => x._id === plan.planId);
      setPlan(plan);
      setPlanDetails(planDetails);
      if (planDetails.pricePerMonth === 0) {
        //free plan for organization
        newAbility = setPermissions(planDetails.permissions);
        localStorage.setItem('organization', JSON.stringify(org.data[0]));
        const localUser = JSON.parse(localStorage.getItem('userData'));
        localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
        localStorage.removeItem("employee")
        window.location.href = `https://${org.data[0].path}.mymanager.com/`;
      } else {
        localStorage.removeItem("employee")
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
              newAbility = setPermissions(planDetails.permissions);
              localStorage.setItem('organization', JSON.stringify(org.data[0]));
              const localUser = JSON.parse(localStorage.getItem('userData'));
              localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
              localStorage.setItem('expire', false);
              window.location.href = `https://${org.data[0].path}.mymanager.com/`;
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
            newAbility = setPermissions(planDetails.permissions);
            localStorage.setItem('organization', JSON.stringify(org.data[0]));
            const localUser = JSON.parse(localStorage.getItem('userData'));
            localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
            window.location.href = `https://${org.data[0].path}.mymanager.com/`;
            break;
  
          default:
            toast.error('No status found for your organization. please contact support');
            break;
        }
      }
    }
    const data = { ability: newAbility, curRole:  role };

    dispatch(handleRole(data));

  }
  const handleChangeRole = async (role) => {
    if (role?.contactTypeId?.name) {
      setTitle(role.contactTypeId.name);
    } else {
      setTitle(role);
    }
    let newAbility = [],
      permissions = [];
    if (role.contactTypeId && role.contactTypeId.type === 'employee') {
      //add isEmployee === true
      localStorage.setItem("employee",true)
      // const res = await dispatch(getEmployeePermissionAction(role.contactId))


      // if (res.success && res.success===true) {
        
      //   permissions = res.data;

      //   permissions.push({
      //     defaultId:"employeeInfo",
      //     delete:true,
      //     read:true,
      //     write:true,
      //     update:true,
      //     navLink:'/contact/employee/info'
      //   })
      // } else {
      //   return
      // }
    } else {
      //get contact account for the organization
      localStorage.removeItem("employee")
      const res = await dispatch(getContactElementsAction());
      for (const element of res) {
        permissions.push({
          elementTitle: element.elementTitle,
          elementParent: element.elementParent,
          navLink: element.navLink,
          read: true,
          write: true,
          update: true,
          delete: true,
          defaultId: element.defaultId
        });
      }
    }
    newAbility = setPermissions(permissions);

    if (newAbility) ability.update(newAbility);

    //setElements(setTemplateData(permissions));

    const data = { ability: newAbility, curRole:  role };

    dispatch(handleRole(data));
    // setTimeout(() => {
    //   fetchData();
    // }, 1000);
    toast.success(
      <ToastContent name={user.fullName || 'John Doe'} role={role?.contactTypeId?.name ? role.contactTypeId.name : role} />,
      {
        icon: false,
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      }
    );
    history.push(getHomeRouteForLoggedInUser(user.userType));
  };
  return (
    <>
      <UncontrolledDropdown className="me-50">
        <DropdownToggle tag="div" className="cursor-pointer">
          <div className="d-flex justify-content-center align-items-center">
            {title}
            <ChevronDown size={14} className="ms-50" />
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() =>
              handleChangeToUserAccount(curUserType === 'admin' ? 'Primary Account(Admin)' : 'Primary Account(User)')
            }
          >
            <span className="text-capitalize">
              {curUserType === 'admin' ? 'Primary Account (Admin)' : 'Primary Account(User)'}
            </span>
          </DropdownItem>
          {roles?.map((role, idx) => {
            return (
              <DropdownItem key={idx} className="w-100" onClick={() => handleChangeRole(role)}>
                {role?.contactTypeId?.name}
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
