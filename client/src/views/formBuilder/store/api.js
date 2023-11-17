import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

//create form
export const createForm = (payload) => {
  return API.post('/form-builder/create', payload);
};

//save
export const updateForm = (id, payload) => {
  return API.put('/form-builder/edit/' + id, payload);
};
export const updateFormData = (id, payload) => {
  return API.put('/form-builder/edit/' + id, payload);
};

//redirect to live link
export const getForm = (id) => {
  return API.get('/form-builder/preview/' + id);
};

export const deleteForm = (id) => {
  return API.delete(`/form-builder/delete/${id}`);
};

export const getForms = (payload) => {
  return API.get('/form-builder/forms/',{params:payload});
};

export const addLeads = (id, payload) => {
  return API.post('/form-builder/addleads/' + id, payload);
};

export const addToImageLibrary = (payload) => {
  return API.post('/image-library/', payload);
};
export const getImageLibrary = () => {
  return API.get('/image-library/');
};
export const getFormsCount = () => {
  return API.get('/form-builder/get-user-forms-count');
};

//save form entry

export const addFormEntry =(id,payload) =>{
    return API.post('/form-builder/details/' + id,payload);
}
export const updateFormEntry =(id,payload) =>{
    return API.put('/form-builder/details/' + id,payload);
}
export const updateFormEntryContactArray =(id,payload) =>{
    return API.put('/form-builder/update-contact/' + id,payload);
}
export const getFormEntries =(id) =>{
    return API.get('/form-builder/details/'+ id);
}
export const getFormEntriesById =(id) =>{
    return API.get('/form-builder/contact-details/'+ id);
}
export const deleteFormEntry =(id) =>{
    return API.delete('/form-builder/details/' + id);
}

// get templates 
export const getTemplates = () =>{
  return API.get('/form-builder/templates');
}

//form categories
export async function getFormCategories() {
  const { data } = await API.get('/form-categories');
  return data;
}

export async function createFormCategory(payload) {
  return API.post('/form-categories', payload);
  
}

export async function updateFormCategory(payload) {
  return API.put(`/form-categories/`, payload);
  
}

export async function deleteFormCategory(id) {
  return API.delete(`/form-categories/${id}`);
  
}

//send emails 
export async function sendInvoice(payload) {
  return API.post(`/form-builder/send-invoice`,payload);
}
export async function sendEmailToUser(payload) {
  return API.post(`/form-builder/send-email-user`,payload);
}

// search domain
export const searchDomain = (domain) =>{
  return API.get(`/form-builder/search/domain/${domain}`);
}

// get Categories
export const getCategoriesByMenu = (payload) =>{
  return API.post(`/web-builder-element/categories`, payload);
}

export const createWebElement = (payload) => {
  return API.post(`/web-builder-element/create`, payload);
}

export const getWebElements = () => {
  return API.get(`/web-builder-element/elements`);
}