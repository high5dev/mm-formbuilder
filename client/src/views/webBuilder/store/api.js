import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

//create form
export const createForm = (payload) => {
  return API.post('/form-builder/create', payload);
};
//create child form

export const createChildForm=(payload) => {
  return API.post('/form/create', payload)
}

export const updateChildForm =(id, payload) =>{
  return API.put('/form/edit/'+id, payload)
}

export const getChildFormPage=(id, payload)=>{
  return API.get('/form/page/'+id, {params:payload})
}

export const getChildForms =(id) =>{
  return API.get(`/form/forms/${id}`);
}
export const getChildFormPreviewPage =(payload) =>{
  return API.get('/form/preview-page/',{params:payload});
}

export const uploadFile =(payload) =>{
  return API.post('/form/fileupload', payload);
}

export const createFormPage =(payload) =>{
  return API.post('/form/create-page', payload);
}

export const deleteFormPage =(id) =>{
  return API.delete(`/form/delete-page/${id}`)
}

export const getFormPage =(id) =>{
  return API.get(`/form/page/${id}`)
}

//create form rule

export const createFormRule =(payload) =>{
  return API.post('/form-rule/create', payload)
}

export const deleteFormRule=(id) =>{
  return API.delete(`/form-rule/delete/${id}`)
}

export const updateFormRule =(id, payload) =>{
  return API.put('/form-rule/edit/' + id, payload);
}

export const createDataset=(payload)=>{
  return API.post('/form-dataset/create', payload);
}
//create webbuilder

export const createWebBuilder=(payload) => {
  return API.post('/web-builder/create', payload)
}

export const duplicateWebsite =(payload) => {
  return API.post('/web-builder/duplicate', payload)
}

//save
export const updateForm = (id, payload) => {
  return API.put('/web-builder/edit/' + id, payload);
};

export const renameWebsite =(id, payload) => {
  return API.put('/web-builder/rename/' + id, payload);
}

export const createPage=(payload) => {
  return API.post('/web-builder/create-page', payload);
}

export const createShopPages=(payload) => {
  return API.post('/web-builder/create-shop-pages', payload);
}

export const getPage = (id) => {
  return API.get('/web-builder/page/' + id);  
};


export const getPublishPage = (payload) => {
  return API.get('/web-builder/publish-page/', {params:payload});
};

export const getPreviewPage = (payload) => {
  return API.get('/web-builder/preview-page/', {params:payload});
}

export const updateFormData = (id, payload) => {
  return API.put('/form-builder/edit/' + id, payload);
};

export const updatePage =(id, payload) => {
  return API.put('/web-builder/update/' + id, payload);
}

export const publishWebsite =(id, payload) =>{
  return API.put('/web-builder/publish/' + id, payload);
}

export const updatePageName =(id, payload) =>{
  return API.put('/web-builder/update-page/' + id, payload);
}

export const deletePage =(id) =>{
  return API.delete(`/web-builder/delete-page/${id}`)
}
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

//Get Websites

export const getWebBuilders =(payload) => {
  return API.get('/web-builder/websites/',{params:payload});
}

export const getWebBuilder =(id) =>{
  return API.get(`/web-builder/website/${id}`);
}

export const addLeads = (id, payload) => {
  return API.post('/form-builder/addleads/' + id, payload);
};

//blog

export const createBlog =(payload) =>{
  return API.post('/web-blog/create', payload);
}

export const deleteBlog =(id) =>{
  return API.delete(`/web-blog/delete/${id}`)
}

export const updateBlog =(id,payload) =>{
  return API.put(`/web-blog/update/${id}`,payload);
}

export const getWebBlogs =() =>{
  return API.get('/web-blog/blogs')
}

export const getPreviewBlogPage =(payload)=>{
  return API.get('/web-blog/preview', {params:{...payload}})
}

export const getPublishBlogPage =(payload) =>{
  return API.get('/web-blog/publish', {params:{...payload}})
}

export const addToImageLibrary = (payload) => {
  return API.post('/image-library/', payload);
};

export const getImageLibrary = (payload) => {
  return API.get('/image-library',{ params: { ...payload }});
};

export const delImageFromLibrary =(id) =>{
  return API.delete('/image-library/' + id);
}

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

export const createWebCollection = (payload) => {
  return API.post(`/web-builder-cms/collection/create`, payload);
}

export const updateWebCollection = (id, payload) => {
  return API.post(`/web-builder-cms/collection/update/${id}`, payload);
}

export const deleteWebCollection = (id, payload) => {
  return API.delete(`/web-builder-cms/collection/delete/${id}`);
}

export const getWebCollection = (id) => {
  return API.get(`/web-builder-cms/collection/${id}`);
}

export const createWebDataset = (payload) => {
  return API.post(`/web-builder-cms/dataset/create`, payload);
}

export const updateWebDataset = (id, payload) => {
  return API.post(`/web-builder-cms/dataset/update/${id}`, payload);
}

export const deleteWebDataset = (id) => {
  return API.delete(`/web-builder-cms/dataset/update/${id}`);
}

export const getWebDataset = (id) => {
  return API.get(`/web-builder-cms/dataset/${id}`);
}

export const getWebAllDataset = (id) => {
  return API.get(`/web-builder-cms/all-datasets/${id}`);
}

export const getWebsiteRoles = (id) => {
  return API.get(`/web-builder-role/role/${id}`);
}

export const createWebsiteRole = (payload) => {
  return API.post(`/web-builder-role/create`, payload);
}
export const updateWebsiteRole = (id, payload) => {
  return API.post(`/web-builder-role/update/${id}`, payload);
}
export const deleteWebsiteRole = (id) => {
  return API.delete(`/web-builder-role/delete/${id}`);
}
export const createWebsiteInvitationRole = (payload) => {
  return API.post(`/web-builder-role/create-invite`, payload);
}

export const getConnectsByWebsite = (id) => {
  return API.get(`/web-builder-cms/connections-of-website/${id}`);
}

export const createOrUpdateConnect = (payload) => {
  return API.post(`/web-builder-cms/connection/create-update`, payload);
}

export const deleteConnect = (id) => {
  return API.delete(`/web-builder-cms/connection/delete/${id}`);
}

export const deleteMultipleConnects = (payload) => {
  return API.post(`/web-builder-cms/connection/multiple-delete`, payload);
}

export const getProductDataset = (id) => {
  return API.get(`/web-builder-store/dataset/${id}`);
}

export const updateProductDataset = (id, payload) => {
  return API.post(`/web-builder-store/dataset/update/${id}`, payload);
}