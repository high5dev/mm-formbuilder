import React, { createContext, useMemo, useContext } from 'react';
import Axios from 'axios';
import { getUserData } from '../auth/utils';
const AxiosContext = createContext();

export function AxiosProvider({ children }) {
  const devBaseUrl = process.env.REACT_APP_API;
  const productionBaseUrl = process.env.REACT_APP_API;

  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    });

    axios.interceptors.request.use((config) => {
      // Read token for anywhere, in this case directly from localStorage
      if (String(window.location.href).indexOf('localhost') > -1) {
        config.baseURL = devBaseUrl;
      } else {
        config.baseURL = productionBaseUrl;
      }
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return axios;
  }, []);

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
}

export function useAxios() {
  return useContext(AxiosContext);
}

export function useBaseUrl() {
  var url = devBaseUrl;
  return {
    url
  };
}
export function customInterIceptors() {
  const API = Axios.create({ baseURL: process.env.REACT_APP_API });

  API.interceptors.request.use((req) => {
    if (localStorage.getItem('accessToken')) {
      const token = String(localStorage.getItem('accessToken')).split('"').join('');
      req.headers.Authorization = `Bearer ${token}`;
      // req.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjg0OTU3YmIzZGFkNjgwODM4Zjk5Y2EiLCJpYXQiOjE2NTI4NTYxODgsImV4cCI6MTY1Mjk0MjU4OH0.lc5tsb4WlQ7BHkBeqZxsSCz_lTiTAj5FZJZNlkzDvfs`
    }
    const user = getUserData();
    if (user && user.curRole) {
      const currentRole = user.curRole;
      if (typeof currentRole !== 'string') {
        if (currentRole.contactTypeId && currentRole.contactTypeId.type === 'employee') {
          req.headers = { ...req.headers, assigner: currentRole.assignerId };
        }
      }
    }
    if (localStorage.getItem('sId') && user) {
      req.headers = { ...req.headers, assigner: user.id };
    }

    let organization = localStorage.getItem('organization');
    if (organization) {
      organization = JSON.parse(organization);
      req.headers = { ...req.headers, organization: organization._id };
    }

    return req;
  });

  API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        if(error.response.data.errors.common.msg == "Already logged out"){
          localStorage.clear(); // Clear local storage
          window.location.href = '/login'; // Redirect to login page  
        }
      }
      return Promise.reject(error);
    }
  );
  return API;
}

export function getVerifyAPIInstance() {
  const API = Axios.create({ baseURL: 'https://verify.mymanager.com' });

  return API;
}

export function publicInterIceptors() {
  const API = Axios.create({ baseURL: process.env.REACT_APP_API });
  return API;
}
