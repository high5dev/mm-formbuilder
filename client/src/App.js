// ** Router Import
import Router from './router/Router';

// ** React Query Import
import { QueryClientProvider, QueryClient } from 'react-query';
import { SocketProvider } from './utility/context/Socket';

import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData, setTemplateData } from './utility/Utils';
import {
  getLeadsSourceAction,
  getTagsAction,
  getStagesAction,
  getContactTypesAction,
  getTotalContactsCountsActions
} from './views/contacts/store/actions';
import { TemplateContext } from './utility/context/Template';
//import { getOnboardingStatus } from './requests/onboarding';
import { fetchUserApi, handleLogout } from './redux/authentication';


const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  const { setElements } = useContext(TemplateContext);
  // ** Get Current User
  const [curUserInfo, setCurrentUserInfo] = useState(null);
  // ** Get All Contacts
  const dispatch = useDispatch();

  useEffect(() => {
    const urlsNotInclude = [
      '/login',
      '/register',
      '/shop/',
      '/book/add/',
      '/book/update/',
      '/book/confirm/',
      '/event/',
      '/event-view/',
      '/document/preview/',
      '/document/email-link/',
      '/invoice-preview/',
      '/invoice/print/',
      '/payment/invoice/',
      '/payment-confirm/',
      '/web-preview/',
      '/token/',
      '/register',
      '/forgot-password',
      '/misc/',
      '/payment/p/',
      '/qrcodelink',
      '/employee/checkin',
      '/watchVideo/',
      '/token/',
      '/fill',
      '/digital-contracts/checkout/'
    ];
    if (!urlsNotInclude.some(function(v) { return window.location.href.indexOf(v) >= 0; })){
      dispatch(fetchUserApi()).then((res) => {
        if (res.error) {
          
          dispatch(handleLogout());
          if (!window.location.href.includes('login')) {
            window.location.href = '/login';
          }
        } else {
          setCurrentUserInfo(getUserData());
        }
      });
    }
   
  }, []);

  useEffect(() => {
    if (curUserInfo !== null && curUserInfo !== undefined) {
      dispatch(getContactTypesAction());
      dispatch(getTotalContactsCountsActions())
      dispatch(getTagsAction());
      dispatch(getStagesAction());
      dispatch(getLeadsSourceAction());
      setElements(setTemplateData(curUserInfo.plan.permissions));
      (async () => {
        // const onboardingStatus = await getOnboardingStatus();
        // localStorage.setItem('onboarding', JSON.stringify(onboardingStatus));
      })();
    }
  }, [curUserInfo]);


  return (
    <QueryClientProvider client={client}>
      <SocketProvider>
        <Router />
      </SocketProvider>
    </QueryClientProvider>
  );
};

export default App;
