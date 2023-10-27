import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getOrgByIdAction, getOrgByPathAction, getUserByIdAction } from '../../../../views/organizations/store/action';
export default function SuperAdminLocDropdown({ dispatch, store, sId, organization ,user}) {
  const [locs, setLocs] = useState([{ label: 'Home', value: '' }]);
  const [selectedLoc, setSelectedLoc] = useState([{ label: 'Home', value: '' }]);

  const handleSelectedLoc = (data)=>{
    if(data.value===''){
      setSelectedLoc({ label: 'Home', value: '' })
      return
    }
    const org = JSON.parse(organization)
    dispatch(getUserByIdAction(data.value)).then(res=>{
      if(res){
        const userData = {
          id: res.userId,
          avatar: res?.avatar || '',
          email: res.auths.email,
          extras: { eCommerceCartItemsCount: '' },
          fullName: `${res.firstName} ${res.lastName}`,
          organizations: res.organizations,
          phone: res.auths.phone || '',
          roles: res.roles,
          userType: res.auths.userType,
          username: '',
          accessToken: user.accessToken.trim(),
          refreshToken: user.refreshToken.trim()
        };
        let u = user
        delete u.curRole
        u = {...u,...userData}
        localStorage.setItem(
          'userData',
          JSON.stringify({
            ...u
          })
        );
        window.location.reload();
      }
    })
    // delete user.curRole;
      
    // localStorage.setItem(
    //   'userData',
    //   JSON.stringify({
    //     ...user,
    //     id:data.value
    //   })
    // );
  }
  useEffect(()=>{
    if(organization && user){
      const temp = JSON.parse(organization)
      dispatch(getOrgByPathAction(temp.path)).then(res=>{
        console.log(res)
        if(res && res.length){
          const u = res[0].locations
          const options = u.map(x=>{
            return {label:x.location?x.location:x.userId.slice(-6), value:x.userId, location:x}
          })
          setLocs(options)
          setSelectedLoc(options.find(x=>x.value===user.id))
        }
      })
    }
  },[organization,user])
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: 180
    }),
    
  };
  return (
    <>
      <Select className='ms-50'
        value={selectedLoc}
        options={locs}
        onChange={(data) => handleSelectedLoc(data)}
        styles={customStyles}
        isSearchable
      />
    </>
  );
}
