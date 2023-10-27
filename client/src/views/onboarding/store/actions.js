import * as api from './api';
import { onbordStatusReducer, selectTourReducer, setCurrentShepherd } from './reducer';

// ** Create Onboarding Status
export const createOnboardingStatusAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createOnboardingStatus(payload);
    dispatch(onbordStatusReducer(data));
  } catch (error) {}
};

// ** Get Onboarding Status
export const OnBoardingStatusAction = () => async (dispatch) => {
  try {
    const { data } = await api.onboardingStatus();
    dispatch(onbordStatusReducer(data));
  } catch (error) {}
};

// ** Select Tour to start
export const SelectTourAction = (payload) => async (dispatch) => {
  try {
    dispatch(selectTourReducer(payload));
  } catch (error) {}
};

// ** Select Tour to start
export const setShepherd = (payload) => async (dispatch) => {
  try {
    dispatch(setCurrentShepherd(payload));
  } catch (error) {}
};
