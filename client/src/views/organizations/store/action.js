import { setElements, setOrgs, setPlans } from './reducer';

import * as api from './api';
import { toast } from 'react-toastify';

export const getOrgsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getOrgs();
    if (data) {
      dispatch(setOrgs(data));
    }
  } catch (error) {}
};

export const getOrgByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getOrg(id);
    return data;
  } catch (error) {}
};

export const getOrgByPathAction = (path) => async (dispatch) => {
  try {
    const { data } = await api.getOrgByPath(path);
    return data;
  } catch (error) {}
};
export const deleteUserFromOrganizationAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteUserFromOrganization(payload);
    console.log(data)
    return data;
  } catch (error) {}
};

export const addNewOrgAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addOrg(payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('Organization added successfully');
        return data.data;
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const updateOrgAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateOrg(id, payload);
    if (data) {
      if (data.success === true) {
        dispatch(getOrgsAction());
        toast.success('Organization updated successfully');
        return data
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const getOrgAvailableAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.isOrgAvailable(payload);
    return data;
  } catch (error) {}
};

//default elements
export const getDefaultElementsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getDefaultElements();
    if (data) {
      dispatch(setElements(data));
      return data;
    }
  } catch (error) {}
};
export const getContactElementsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getContactElements();
    if (data) {
      //dispatch(setElements(data))
      return data;
    }
  } catch (error) {}
};
export const addElementAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addNewElement(payload);
    if (data) {
      if (data.success) {
        dispatch(getDefaultElementsAction());
        toast.success('Element added successfully! To change permissions please go to plans');
      }
    }
  } catch (error) {}
};
export const updateElementAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.updateElement(payload);
    if (data) {
      if (data.success) {
        dispatch(getDefaultElementsAction());
        toast.success(
          'Add/Edit Default Element successfull. Any plan after now will update with new element'
        );
      }
    }
  } catch (error) {}
};
//plan element
export const updatePlanElementAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updatePlanElement(id, payload);
    if (data) {
      if (data.success) {
        dispatch(getDefaultElementsAction());
        toast.success('Add/Edit Element successfull');
      }
    }
  } catch (error) {}
};
//plans
export const createPlanAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createPlan(payload);
    if (data) {
      toast.success('Plan created successfully');
      dispatch(getPlansAction());
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};

export const getPlansAction = () => async (dispatch) => {
  try {
    const { data } = await api.getPlans();
    if (data) {
      dispatch(setPlans(data));
      return data;
    }
  } catch (error) {}
};

export const getPlansByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getplanById(id);
    if (data) {
      if (data.success === true) {
        return data;
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const getPlansByOrgAction = (orgId) => async (dispatch) => {
  try {
    const { data } = await api.getPlanByOrg(orgId);
    if (data) {
      if (data.success === true) {
        return data;
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const updatePlanByIdAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updatePlanById(id, payload);
    if (data) {
      if (data.success === true) {
        dispatch(getPlansAction());
        toast.success('Plan updated successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

export const deletePlanByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePlanById(id);
    if (data) {
      if (data.success === true) {
        toast.success('Plan deleted successfully');
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {}
};

//subscription plan
export const createOrganizationSubscriptionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createOrganizationSubscription(payload);
    if (data) {
      toast.success('subscription added to organization successfully');
      dispatch(getOrgsAction());
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};
export const createOrgSubscriptionForUserAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createOrganizationSubscription(payload);
    if (data) {
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};
export const updateOrganizationSubscriptionAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateOrganizationSubscription(id, payload);
    if (data) {
      toast.success('Payment Done');
      //dispatch(getOrgsAction())
     
    } else {
      toast.error(data.message);
    }
    return data
  } catch (error) {}
};
export const getOrganizationSubscriptionAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getOrganizationSubscription(id);
    if (data) {
      return data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};

//send email
export const sendOrgEmailAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.sendEmail(payload);
    if (data.success === true) {
      toast.success('Email Sent successfully');
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};

export const sendOrgBulkEmailAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.sendBulkEmail(payload);
    if (data.success === true) {
      toast.success('Email Sent successfully');
    } else {
      toast.error(data.message);
    }
  } catch (error) {}
};

export const getOrgAdminAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getAdmin(id);
    return data;
  } catch (error) {}
};

//contact type
export const getContactTypeByOrgAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getContactTypeByOrg(id);
    return data;
  } catch (error) {}
};

// user notes
export const getUserNotesAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUserNotes(id);
    return data.data;
  } catch (error) {}
};

export const createUserNotesAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createUserNotes(payload);
    toast.success('Note created successfully');
    return dispatch(getUserNotesAction(payload.belongsTo));
  } catch (error) {}
};
export const updateUserNotesAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateUserNotes(id, payload);
    toast.success('Note updated successfully');
    return dispatch(getUserNotesAction(payload.belongsTo));
  } catch (error) {}
};

//update user
export const updateUserDetailsAction = (userId, payload, orgId) => async (dispatch) => {
  try {
    const { data } = await api.updateUserDetails(userId, payload);
    toast.success('User updated successfully');
    return dispatch(getOrgByIdAction(orgId));
  } catch (error) {}
};
export const updateLocationNameAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.updateLocationName(payload);
    toast.success('Location updated successfully');
    return dispatch(getOrgByIdAction(payload.organizationId));
  } catch (error) {}
};
export const getSuperAdminAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSuperAdminDetails(id);
    return data
    
  } catch (error) {}
};
export const getUserByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getuserById(id);
    return data
    
  } catch (error) {}
};

// local storage
export const getLocalStorageAction = (token) => async (dispatch) => {
  try {
    const {data} = await api.getLocalStorage(token)
    if(data.success && data.success===true){
      const ls = data.data.storage;
      if(ls.organization){
        localStorage.setItem("organization",JSON.stringify(ls.organization))
      }
      else{
        localStorage.removeItem("organization")
      }
      if(ls.expire){
        localStorage.setItem("expire",JSON.stringify(ls.expire))
      }
      if(ls.sId){
        localStorage.setItem("sId",ls.sId)
      }
      localStorage.setItem("accessToken",JSON.stringify(ls.accessToken))
      localStorage.setItem("refreshToken",JSON.stringify(ls.refreshToken))
      localStorage.setItem("userData",JSON.stringify(ls.userData))
      return true
    }
    else{
      return false
    }

  } catch (error) {}
};
export const addUpdateLocalStorageAction = (payload) => async (dispatch) => {
  try {
    const {data} = await api.addUpdateLocalStorage(payload)
    return data
  } catch (error) {
    console.log(error)
  }
};
