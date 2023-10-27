import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import {
  addUpdateLocalStorageAction,
  getOrgAdminAction,
  getOrgsAction,
  getSuperAdminAction
} from '../../../../views/organizations/store/action';
import { setPermissions } from '../../../../utility/Utils';
import { AbilityContext } from '../../../../utility/context/Can';
import { handleLogin } from '../../../../redux/authentication';

export default function SuperAdminOrgDropdown({ dispatch, store, sId, organization }) {
  const [orgs, setOrgs] = useState([{ label: 'Super Admin', value: sId }]);
  const [selectedOrg,setSelectedOrg] = useState()
  const ability = useContext(AbilityContext);

  const handleSelectOrg = (data) => {
    setSelectedOrg(data)
    if (data.label === 'Super Admin') {
      //get super admin
      console.log(data.value)
      localStorage.removeItem("organization")
      dispatch(getSuperAdminAction(data.value)).then((res) => {
        console.log(res)
        let newAbility = [];
        const permissions = res.userData.plan.permissions
          ? res.userData.plan.permissions
          : res.userData.permissions;

        newAbility = setPermissions(permissions);
        if (newAbility) ability.update(newAbility);

        const data = {
          ...res.userData,
          ability: newAbility,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        };

        dispatch(handleLogin(data));
        const payload = {
          accessToken: res.accessToken.trim(),
          refreshToken: res.refreshToken.trim(),
          userData: JSON.parse(localStorage.getItem('userData')),
          organization: JSON.parse(localStorage.getItem('organization')),
          sId:sId.trim()
        };
        dispatch(addUpdateLocalStorageAction({ localStorage: { ...payload } })).then((x) => {
          if (x) {
            window.location.href = `https://me.mymanager.com/token/${res.accessToken.trim()}`;

            //window.location.href = `http://localhost:3000/token/${res.accessToken}`;
          }
        });
      });
    } else {
      //organization
      let org = data.org;
      let plan = org.plan[org.plan.length - 1];
      let planDetails = org.planDetails.find((x) => x._id === plan.planId);
      const newAbility = setPermissions(planDetails.permissions);
      localStorage.setItem('organization', JSON.stringify(org));
      //get org admin

      const localUser = JSON.parse(localStorage.getItem('userData'));
      delete localUser?.curRole;

      dispatch(getOrgAdminAction(org._id)).then((res) => {
        if (res && res.length) {
          const userData = {
            id: res[0].userId,
            avatar: res[0]?.avatar || '',
            email: res[0].auths.email,
            extras: { eCommerceCartItemsCount: '' },
            fullName: `${res[0].firstName} ${res[0].lastName}`,
            organizations: res[0].organizations,
            phone: res[0].auths.phone || '',
            roles: res[0].roles,
            userType: res[0].auths.userType,
            username: '',
            plan: org.planDetails[org.planDetails.length - 1],
            ability: newAbility,
            accessToken: localUser.accessToken.trim(),
            refreshToken: localUser.refreshToken.trim()
          };
          localStorage.setItem('userData', JSON.stringify({ ...userData }));
          // const payload = {
          //   accessToken,
          //   refreshToken,
          //   userData:data.userData,
          //   sId:sId,
          //   organization:org
          // }
          const payload = {
            accessToken: localUser.accessToken.trim(),
            refreshToken: localUser.refreshToken.trim(),
            userData: JSON.parse(localStorage.getItem('userData')),
            organization: JSON.parse(localStorage.getItem('organization')),
            sId:sId.trim()
          };
          dispatch(addUpdateLocalStorageAction({ localStorage: { ...payload } })).then((x) => {
            if (x) {
              // window.location.href = `https://${
              //   org.path
              // }.mymanager.com/token/${u.accessToken.trim()}`;
              window.location.href = `https://${org.path}.mymanager.com/token/${localUser.accessToken.trim()}`
              //window.location.href = `http://localhost:3000/token/${localUser.accessToken.trim()}`;
            }
          });
        }
      });
    }
  };
  useEffect(() => {
    //get all orgs
    dispatch(getOrgsAction());
  }, []);

  useEffect(()=>{
    if(organization){
      const temp = JSON.parse(organization)
      setSelectedOrg({label:temp.name,value:temp._id,org:temp})
    }
    else{
      setSelectedOrg({ label: 'Super Admin', value: sId })
    }
  },[organization])

  useEffect(() => {
    if (store && store.myOrgs) {
      const options = store.myOrgs.filter(x=>x.isDeleted===false).map((x) => {
        return { label: x.name, value: x._id, org: x };
      });
      setOrgs([{ label: 'Super Admin', value: sId }, ...options]);
    }
  }, [store]);
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: 180
    }),
    option:(styles,{data, isSelected})=>({
      ...styles,
      color: isSelected ? 'white':data.label==='Super Admin' && '#174be7' ,

    })
  };
  return (
    <>
      <Select isSearchable styles={customStyles} value={selectedOrg} options={orgs} onChange={(data) => handleSelectOrg(data)} />
    </>
  );
}
