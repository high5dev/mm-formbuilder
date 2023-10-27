// ** Icons Import
import { Circle } from 'react-feather';
import { RiContactsBookLine, RiContactsLine } from 'react-icons/ri';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../auth/utils';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const contactTypes = useSelector((state) => state?.totalContacts?.contactTypeList);
  //const userData = getUserData();
  //const organization = JSON.parse(localStorage.getItem('organization'));
  const [organization,setOrganization] = useState();
  const [userData,setUserData] = useState()
  useEffect(() => {
    if (contactTypes && contactTypes.length > 0) {
      let tempContactNavs = contactTypes.map((x) => {
        return {
          id: x._id,
          title: x.name,
          icon: <RiContactsLine size={20} />,
          navLink: `/contacts/${x.type}/${x._id}`,
          action: 'read',
          resource: `contacts/contact-list/${x._id}`
        };
      });
      if (userData?.curRole?.contactTypeId?.type === 'employee' && userData?.curRole?.contactId) {
        tempContactNavs.push({
          id: 'employeeInfo',
          title: 'Employee Profile',
          icon: <RiContactsLine size={20} />,
          navLink: '/contact/employee/info',
          action: 'read',
          resource: 'contacts/employee/employeeInfo/EmployeeInfo'
        });
      }
      if(organization && organization!==null){
        userData?.organizations.map((organizationInfo) => {
          if (organizationInfo.organizationId === organization._id && organizationInfo.userType == "admin") {
            let contactNavs = [
              {
                id: 'user',
                title: 'Users',
                icon: <RiContactsLine size={20} />,
                navLink: '/contacts/users',
                action: 'read',
                resource: 'admingOrg/users/list'
              }
            ];
            tempContactNavs = contactNavs.concat(tempContactNavs);
          }
        })
      }
    

      setContacts([
        {
          id: 'contacts',
          title: 'Contacts',
          action: 'read',
          resource: `contacts`,
          icon: <RiContactsBookLine size={20} />,
          children: tempContactNavs
        }
      ]);
    }
  }, [contactTypes, userData,organization]);
  useEffect(()=>{
    setUserData(getUserData());
    const org = localStorage.getItem('organization')
    if(org!==undefined && org!==null){
      setOrganization(JSON.parse(org))
    }
  },[])
  return { contacts };
};
//export default contacts;

// export default [
//   {
//     id: 'contacts',
//     title: 'Contacts',
//     action: 'read',
//     resource: 'contacts',
//     icon: <RiContactsBookLine size={20} />,
//     children: [
//       {
//         id: 'client',
//         title: 'Clients',
//         icon: <RiContactsLine size={20} />,
//         navLink: '/contacts/clients/list',
//         action: 'read',
//         resource: 'contacts/client'
//       },
//       {
//         id: 'employee',
//         title: 'Employee',
//         icon: <RiContactsLine size={20} />,
//         navLink: '/contacts/employee/list',
//         action: 'read',
//         resource: 'contacts/employee'
//       },
//       {
//         id: 'employeeInfo',
//         title: 'Employee Info',
//         icon: <RiContactsLine size={20} />,
//         navLink: '/contacts/employee/info',
//         action: 'read',
//         resource: 'contacts/employeeInfo'
//       },
//       {
//         id: 'leads',
//         title: 'Leads',
//         icon: <RiContactsLine size={20} />,
//         navLink: '/contacts/leads/list',
//         action: 'read',
//         resource: 'contacts/leads'
//       },
//       {
//         id: 'relationships',
//         title: 'Relationships',
//         icon: <RiContactsLine size={20} />,
//         navLink: '/contacts/relationship/list',
//         action: 'read',
//         resource: 'contacts/relationships'
//       },
//       {
//         id: 'vendor',
//         title: 'Vendor',
//         icon: <RiContactsLine size={20} />,
//         navLink: '/contacts/vendor/list',
//         action: 'read',
//         resource: 'contacts/vendor'
//       },
//       {
//         id: 'vendor',
//         title: 'Vendor',
//         icon: <RiContactsLine size={20} />,
//         navLink: '/contacts/vendor/list',
//         action: 'read',
//         resource: 'contacts/vendor'
//       },
//       // {
//       //   id: 'members',
//       //   title: 'Members',
//       //   icon: <RiContactsLine size={20} />,
//       //   navLink: '/contacts/members/list',
//       //   action: 'read',
//       //   resource: 'contacts/member'
//       // }
//     ]
//   }
// ];
