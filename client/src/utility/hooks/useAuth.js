// import React from 'react'
import { useAxios } from '../../lib/AxiosProvider';
// import Axios from 'axios'

const useAuth = () => {
  const axios = useAxios();

  async function sendSignupOtp(payload) {
    const { data } = await axios.post('temp/send-otp', payload);
    return data;
  }

  async function sendContactSignupOtp(payload) {
    const { data } = await axios.post('temp/send-contact-otp', payload);
    return data;
  }

  async function registrationReqeust(payload) {
    const { data } = await axios.post('auth/signup', payload);
    return data;
  }
  async function orgRegistrationReqeust(organization, payload) {
    const { data } = await axios.post(`auth/${organization}/signup`, payload);
    return data;
  }

  async function contactRegistrationReqeust(payload) {
    const { data } = await axios.post('auth/contact-signup', payload);
    return data;
  }

  async function getContactForLoginRequest(id) {
    const data  = await axios.get(`auth/contact-signup/${id}`);
    return data;
  }

  // Login
  async function LoginRequest(payload) {
    const { data } = await axios.post('auth/signin', payload);
    return data;
  }

  async function ActivateRequest(payload) {
    const { data } = await axios.post('auth/activate', payload);
    return data;
  }

  async function getVisitorInfo(payload) {
    try {
      const { data } = await axios.get('https://www.cloudflare.com/cdn-cgi/trace');
      return data;
    } catch (error) {}
  }

  return {
    sendSignupOtp,
    sendContactSignupOtp,
    getVisitorInfo,
    registrationReqeust,
    LoginRequest,
    ActivateRequest,
    orgRegistrationReqeust,
    contactRegistrationReqeust,
    getContactForLoginRequest
  };
};

export default useAuth;
