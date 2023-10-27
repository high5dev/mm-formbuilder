// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Custom Components
import NavbarUser from './NavbarUser';
import NavbarBookmarks from './NavbarBookmarks';
import OrganizationDropdown from './OrganizationDropdown';

import { getUserData } from '../../../auth/utils';
import LocationsDropdown from './LocationsDropdown';
import SuperAdminOrgDropdown from './superAdmin/SuperAdminOrgDropdown';
import SuperAdminLocDropdown from './superAdmin/SuperAdminLocDropdown';

import { useDispatch, useSelector } from 'react-redux';

const ThemeNavbar = (props) => {
  // ** Vars
  const user = getUserData();
  const sId = localStorage.getItem('sId');
  const organization = localStorage.getItem('organization');

  const [userRole, setUserRole] = useState('Primary Account');

  const dispatch = useDispatch();
  const store = useSelector((state) => state.organizations);

  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  useEffect(() => {
    if (user && user.userType === 'super-admin') {
      localStorage.setItem('sId', user.id);
    }
  }, [user]);
  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />

        {/* org users and admin */}
        {/* && user?.organizations && user?.organizations?.length > 0 */}
        
        {/* supper admin */}
    
        {sId ? (
          <>
            <SuperAdminOrgDropdown
              dispatch={dispatch}
              store={store}
              sId={sId}
              organization={organization}
            />
            <SuperAdminLocDropdown
              dispatch={dispatch}
              store={store}
              sId={sId}
              organization={organization}
              user={user}
            />
          </>
        ) : (
          <>
          {/* other users */}
            <OrganizationDropdown user={user} organization={organization} dispatch={dispatch} />
            <LocationsDropdown user={user} org={organization} setUserRole={setUserRole} dispatch={dispatch} />
          </>
        )}
        {/* employee and clients  */}
        {/* {user && user.roles &&user.roles.length > 0 && <>
        <RoleOrgDropdown/>
        <RoleLocDropdown/>
        </>} */}
      </div>
      <NavbarUser
        skin={skin}
        setSkin={setSkin}
        user={user}
        organization={organization}
        userRole={userRole}
      />
    </Fragment>
  );
};

export default ThemeNavbar;