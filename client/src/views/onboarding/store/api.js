import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point

export const onboardingStatus = () => {
  return API.get('/onboarding/status');
};

export const createOnboardingStatus = (payload) => {
  return API.post('/onboarding/status', payload);
};
