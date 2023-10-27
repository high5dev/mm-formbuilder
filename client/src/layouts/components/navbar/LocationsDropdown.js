import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import '@styles/react/libs/react-select/_react-select.scss';
import { getUserData } from '../../../auth/utils';
import { setPermissions } from '../../../utility/Utils';
//import { getEmployeePermissionAction } from '../../../views/contacts/store/actions';
import { getContactElementsAction } from '../../../views/organizations/store/action';
import { toast } from 'react-toastify';


export default function LocationsDropdown({ user, org, setUserRole, dispatch }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const handleSelectLocation = (data) => {
    if (data.value === user.id) {
      delete user.curRole;

      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...user
        })
      );
      setUserRole('Primary Account');
      window.location.reload();
    } else {
      let contactTypeId = { type: 'employee', name: 'Employee' };
      if (data.contactTypeId) {
        contactTypeId = data.contactTypeId;
        let newAbility = [],
          permissions = [];
        if (data.contactTypeId.type === 'employee') {
          //localStorage.setItem('employee', true);
          // dispatch(getEmployeePermissionAction(data.contactId)).then((res) => {
          //   if (res.success && res.success === true) {
          //     permissions = res.data;
          //     newAbility = setPermissions(permissions);
              
          //     //if (newAbility) ability.update(newAbility);
          //     localStorage.setItem(
          //       'userData',
          //       JSON.stringify({
          //         ...user,
          //         ability: newAbility,
          //         curRole: {
          //           contactTypeId: contactTypeId,
          //           assignerId: data.value.split('-')[0],
          //           ...data
          //         }
          //       })
          //     );
          //     setUserRole(contactTypeId.name);
          //     window.location.reload();
          //   }
          //   else{
          //     toast.error("Not authorized. Please ask the employer to set roles permission!")
          //     return
          //   }
          // });
        } else {
          dispatch(getContactElementsAction()).then(res=>{
            if(res){
              for (const element of res) {
                permissions.push({
                  elementTitle: element.elementTitle,
                  elementParent: element.elementParent,
                  navLink: element.navLink,
                  read: true,
                  write: true,
                  update: true,
                  delete: true,
                  defaultId: element.id
                });
              }
              newAbility = setPermissions(permissions)
              localStorage.setItem(
                'userData',
                JSON.stringify({
                  ...user,
                  ability: newAbility,
                  curRole: {
                    contactTypeId: contactTypeId,
                    assignerId: data.value.split('-')[0],
                    ...data,
                    
                  }
                })
              );
              setUserRole(contactTypeId.name);
              window.location.reload();
            }

          })
          
        }
      } else {
        localStorage.setItem(
          'userData',
          JSON.stringify({
            ...user,
            curRole: {
              contactTypeId: contactTypeId,
              assignerId: data.value,
              ...data,
              
            }
          })
        );
        setUserRole(contactTypeId.name);
        window.location.reload();
      }
    }

   
  };
  useEffect(() => {
    let options = [];
    if (org && org !== null) {
      const organization = JSON.parse(org);
      if (user.organizations.filter((x) => x.organizationId === organization._id).length > 0) {
        if (user.organizations.find((x) => x.organizationId === organization._id)?.userType === 'admin') {
          const firstOption = organization.locations.find((x) => x.userId === user.id);
          options.push({
            label: firstOption?.location,
            value: firstOption?.userId,
            ...firstOption
          });
          organization.locations
            .filter((x) => x.userId !== user.id)
            .map((x) => {
              options.push({
                label: x.location ? x.location : x.userId.slice(-6),
                value: x?.userId,
                ...x
              });
            });
          setLocations([...options]);
          setSelectedLocation(options[0]);
        } else {
          const x = organization.locations.find((x) => x.userId === user.id);
          options.push({
            label: x.location ? x.location : x.userId.slice(-6),
            value: x?.userId,
            ...x
          });
          //add roles
          if (user.roles && user.roles.length > 0) {
            const roles = user.roles.filter((x) => x.organizationId === organization._id);
            roles.map((y) => {
              options.push({
                label: y.locationName ? y.locationName : y.assignerId.slice(-6),
                value: y?.assignerId,
                ...y
              });
            });
          }
          setLocations([...options]);
          setSelectedLocation(options[0]);
          console.log("ROLE")
          // let contactTypeId = options[0].location.contactTypeId;
          // localStorage.setItem(
          //   'userData',
          //   JSON.stringify({
          //     ...user,
          //     curRole: {
          //       contactTypeId: contactTypeId,
          //       assignerId: options[0].value,
          //       location: options[0]
          //     }
          //   })
          // );
          // setUserRole(contactTypeId.name);
        }
      } else {
        options = [];
        const users = user.roles.filter((x) => x.organizationId === organization._id);
        users.map((x) => {
          options.push({
            label: x.locationName ? x.locationName : x.assignerId.slice(-6),
            value: x?.assignerId,
            ...x
          });
        });
        setLocations([...options]);
        if (user?.curRole) {
          const currentRole = options.find(
            (x) => x.assignerId === user.curRole.assignerId && x.contactId===user.curRole.contactId
          );
          setSelectedLocation(currentRole);
          let contactTypeId = currentRole.contactTypeId;
          localStorage.setItem(
            'userData',
            JSON.stringify({
              ...user,
              curRole: {
                contactTypeId: contactTypeId,
                assignerId: currentRole.value,
                ...currentRole
              }
            })
          );
          setUserRole(contactTypeId?.name);
        } else {
          setSelectedLocation(options[0]);
          let contactTypeId = options[0]?.contactTypeId;
          localStorage.setItem(
            'userData',
            JSON.stringify({
              ...user,
              curRole: {
                contactTypeId: contactTypeId,
                assignerId: options[0].value,
                ...options[0]
              }
            })
          );
          setUserRole(contactTypeId?.name);
        }
      }
    } else {
      if (user && user.roles && user.roles.length > 0) {
        const roles = user.roles.filter((x) => x.organizationId === null);
        roles.map((x) => {
          options.push({
            label: `${x.assignerName} (${x.contactTypeId.name})`,
            value: `${x?.assignerId}-${x?.contactTypeId._id}`,
            ...x
          });
        });
        setLocations([...locations, ...options]);
      }
    }
  }, [org]);
  useEffect(() => {
    if (user && user.curRole ) {
      setSelectedLocation(user.curRole);
      setUserRole(
        user?.curRole?.contactTypeId?.name ? user?.curRole?.contactTypeId?.name : 'Primary Account'
      );
      //user.organizations.find(x=>x.organizationId===org._id).userType
    }
  }, [user]);
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: 180
    })
  };
  return (
    <>
      {locations.length > 0 && (
        <Select
          styles={customStyles}
          options={locations}
          value={selectedLocation}
          className="react-select"
          classNamePrefix="select"
          onChange={(data) => handleSelectLocation(data)}
          isSearchable
        />
      )}
    </>
  );
}
