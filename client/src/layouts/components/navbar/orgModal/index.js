import React, { useEffect, useState } from 'react';
import { getUserData } from '../../../../auth/utils';
import OrganizationModal from './OrganizationModal';
import { useDispatch, useSelector } from 'react-redux';

function OrganizationMain(props) {
  // ** Vars
  const user = getUserData();
  const sId = localStorage.getItem('sId');
  const organization = localStorage.getItem('organization');

  const [userRole, setUserRole] = useState('Primary Account');

  const dispatch = useDispatch();
  const store = useSelector((state) => state.organizations);

  // ** Props
  const { isOnboarded, DefaultRoute, setUserType } = props;
  useEffect(() => {
    if (user && user.userType === 'super-admin') {
      localStorage.setItem('sId', user.id);
    }
    if (user) {
      setUserType(user.userType);
    }
  }, [user]);

  return (
    <div>
      {sId ? (
        ''
      ) : (
        <OrganizationModal
          user={user}
          organization={organization}
          dispatch={dispatch}
          isOnboarded={isOnboarded}
          DefaultRoute={DefaultRoute}
          setUserType={setUserType}
        />
      )}
    </div>
  );
}

export default OrganizationMain;
