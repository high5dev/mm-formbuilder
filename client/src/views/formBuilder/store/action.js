import {
  setAllFormsReducer,
  setFormContacts,
  setFormReducer,
  setTemplatesReducer,
  setImageLibraryReducer,
  setFormCategoriesReducer,
  setFormOrderElementsReducer,
  setFormProductsReducer,
  setWebElementsReducer
} from './reducer';
import * as api from './api';
import { toast } from 'react-toastify';
import { getUserData } from '../../../auth/utils';

export const createFormAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createForm(payload);

    dispatch(setFormReducer(data.data));
    if (data?.success === true) {
      toast.success('Form created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }

    return data.data
  } catch (error) { }
};
export const cloneFormAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createForm(payload);
    dispatch(setFormReducer(data.data));
    if (data?.success === true) {
      // toast.success('Form created successfully');
      return data.data._id;
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) { }
};

export const updateFormDataAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateFormData(id, payload);
    if (data) {
      toast.success('Form updated successfully');
      dispatch(setFormReducer(data.data));
    }
  } catch (error) { }
};

export const updateFormAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateForm(id, payload);
    if (data) {
      toast.success('Form updated successfully');
      dispatch(setFormReducer(data.data));
    }
  } catch (error) { }
};

export const getFormDataAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getForm(id);

    dispatch(setFormReducer(data.data));

    dispatch(setFormOrderElementsReducer(data.data?.orderElements || []))
    dispatch(setFormProductsReducer(data.data?.products || []))
  } catch (error) { }
};
export const getFormsCountAction = () => async (dispatch) => {
  try {
    const { data } = await api.getFormsCount();
    if(data && data.success===true){
      return data.data
    }
    else{
      toast.error("Something went wrong please try again")
    }
  } catch (error) { }
};

export const getFormsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getForms(payload);

    dispatch(setAllFormsReducer(data.data));
    return data?.data;
  } catch (error) { }
};

export const deleteFormAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteForm(id);

    dispatch(getFormsAction({ template: false, isDelete: false }));
    if (data?.success) {
      toast.success('Funnel deleted successfully');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) { }
};

export const addLeadAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.addLeads(id, payload);

    // if (data?.success) {
    //   toast.success('Yay your registration complete');
    // } else {
    //   toast.error('Something went wrong! Please try again!');
    // }
  } catch (error) { }
};

export const addToImageLibraryAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addToImageLibrary(payload);
    if (data?.success) {
      toast.success('Image uploaded successfully!');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) { }
};

export const getToImageLibraryAction = () => async (dispatch) => {
  try {
    const { data } = await api.getImageLibrary();
    dispatch(setImageLibraryReducer(data));
  } catch (error) { }
};

///------------- ** save data action
export const addFormEntryAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.addFormEntry(id, payload);
    // if (data?.success) {
    //   toast.success('Yay your registration complete');
    // } else {
    //   toast.error('Something went wrong! Please try again!');
    // }
    return data;
  } catch (error) { }
};

export const updateFormEntryAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateFormEntry(id, payload);
    dispatch(getFormsEntryAction(payload.formId));
    // if (data?.success) {
    //   toast.success('Yay your registration complete');
    // } else {
    //   toast.error('Something went wrong! Please try again!');
    // }
    return data;
  } catch (error) { }
};
export const updateFormEntryContactArrayAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateFormEntryContactArray(id, payload);
    dispatch(getFormsEntryAction(payload.formId));
    return data;
  } catch (error) { }
};

export const getFormsEntryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFormEntries(id);
    console.log("form data", data)
    dispatch(setFormContacts(data?.data));
  } catch (error) { }
};
export const getFormEntryDetailsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFormEntriesById(id);

    return data;
    // dispatch(setFormContacts(data?.data));
  } catch (error) { }
};
export const deleteFormEntryAction = (id, formId) => async (dispatch) => {
  try {
    const { data } = await api.deleteFormEntry(id);
    dispatch(getFormsEntryAction(formId));
    if (data?.success) {
      toast.success('Contact deleted successfully');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) { }
};

//------------ *** templates
export const getTemplatesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTemplates();
    dispatch(setTemplatesReducer(data.data));
    return data?.data
  } catch (error) { }
};

//-------------** domain connection
export const searchDomainAvailableAction = (domain) => async (dispatch) => {
  try {
    const { data } = await api.searchDomain(domain);
    return data;
  } catch (error) { }
};

// --------------** categories
export const getFormCategoriesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getFormCategories();
    dispatch(setFormCategoriesReducer(data))
    return data;
  } catch (error) { }
};
export const createFormCategoryAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createFormCategory(payload);
    dispatch(getFormCategoriesAction())
    toast.success('New category created successfully');
    return data;
  } catch (error) { }
};
export const updateFormCategoryAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.updateFormCategory(payload);
    dispatch(getFormCategoriesAction())
    toast.success('Category updated successfully');
    return data;
  } catch (error) { }
};
export const deleteFormCategoryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteFormCategory(id);
    dispatch(getFormCategoriesAction())
    toast.success('Category deleted successfully');
    return data;
  } catch (error) { }
};
// --------------------** SEND EMAILS
export const sendInvoiceAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.sendInvoice(payload);
    return data;
  } catch (error) { }
};
export const sendEmailToUserAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.sendEmailToUser(payload);
    return data;
  } catch (error) { }
};

export const getWebElementsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getWebElements();
    dispatch(setWebElementsReducer(data.data));
    return data;
  } catch (error) { }
};

export const createWebElementAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createWebElement(payload);
    if (data.success)
      dispatch(getWebElementsAction(data.data));
    return data;
  } catch (error) { }
};
