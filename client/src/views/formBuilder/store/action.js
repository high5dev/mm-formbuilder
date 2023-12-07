import {
  setLinkUrlReducer,
  setAllFormsReducer,
  setFormContacts,
  setFormReducer,
  setTemplatesReducer,
  setImageLibraryReducer,
  setFormCategoriesReducer,
  setFormOrderElementsReducer,
  setFormProductsReducer,
  setWebElementsReducer,
  setWebCollectionsReducer,
  setWebDatasetsReducer,
  setWebBlogsReducer,
  setWebConnectionsReducer,
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

export const createWebBuilderAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createWebBuilder(payload);
    const {websiteData, formData}=data.data;
    let _form_data=[];
    _form_data.push(JSON.parse(JSON.stringify(formData)));
    const form_data={
      ...websiteData,
      formData:_form_data
    };
    dispatch(setFormReducer(form_data));
    if (data?.success === true) {
      toast.success('Form created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return form_data
  } catch (error) { }
};

export const getWebsiteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getWebBuilder(id);
    const {websiteData, formData}=data.data;
    const form_data={
      ...websiteData,
      formData:formData
    };
    dispatch(setFormReducer(form_data));
    if (data?.success === true) {
      return formData
    } else {
      toast.error('Something went wrong! please try again');
    }
    
  } catch (error) { }
};

export const renameWebsiteAction = (id, payload) => async(dispatch) =>{
  try{
    const {data} =await api.renameWebsite(id, payload);
    if(data?.success === true) {
      toast.success('Website renamed successfully');
      return data.data
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){
  }
}
 
export const duplicateWebsiteAction = (payload) =>async(dispatch) =>{
  try{
    const {data} =await api.duplicateWebsite(payload);
    const {websiteData, formData}=data.data;
    let _form_data=[];
    _form_data.push(JSON.parse(JSON.stringify(formData)));
    const form_data={
      ...websiteData,
      formData:_form_data
    };
    dispatch(setFormReducer(form_data));
    if(data?.success === true){
      toast.success('Website duplicated successfully');
      return form_data
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){

  }
}

export const createPageAction = (payload) => async (dispatch) => {
  try {
    const {data} = await api.createPage(payload);
    if (data?.success === true) {
      toast.success('Page created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return data.data; 
  } catch (error) { }
};

export const deletePageAction =(id) =>async(dispatch) =>{
  try{
    const {data} = await api.deletePage(id);
    if (data?.success === true) {
      toast.success('Page deleted successfully');
      return data.data
    } else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){

  }
}

export const getPageAction =(id) =>async(dispatch) =>{
  try{
    const {data} = await api.getPage(id);
    if(data?.success === true){
      return data.data;
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  
  }
  catch(error){

  }
} 

export const getPublishPageAction =(payload) =>async(dispatch) =>{
  try{
    const {data} = await api.getPublishPage(payload);
    console.log('data.data', data.data);
    if(data?.success === true){
      return data.data
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){
  }
} 

export const getPreviewBlogPageAction =(payload) =>async(dispatch) =>{
  try{
    const {data} = await api.getPreviewBlogPage(payload);
    if(data?.success === true){
      return data.data
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){
  }
}

export const getPublishBlogPageAction =(payload) =>async(dispatch) =>{
  try{
    const {data} = await api.getPublishBlogPage(payload);
    if(data?.success === true){
      return data.data
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){
  }
}

export const getPreviewPageAction =(payload) =>async(dispatch) =>{
  try{
    const {data} = await api.getPreviewPage(payload);
    if(data?.success === true){
      return data.data
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){
  }
} 

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


export const updatePageAction =(id, payload) =>async(dispatch) =>{
  try{
    const res=await api.updatePage(id, payload);
    const {data}=res;
    if(data?.success===true){
      return data?.url;
    }
  }
  catch(error){
  }
}

export const updatePageNameAction =(id, payload) =>async(dispatch) =>{
  try{
    const res=await api.updatePageName(id, payload);
    const {data}=res;
    if(data?.success===true){
      return true;
    }
  }
  catch(error){

  }
}

export const publishWebsiteAction =(id, payload) =>async(dispatch) =>{
  try{
    const res=await api.publishWebsite(id, payload);
    const {data}=res;
    if(data?.success===true){
      return data.data;
    }
  }
  catch(error){

  }
}

export const updateFormAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateForm(id, payload);
    if (data) {
      toast.success('Form updated successfully');
      dispatch(setFormReducer(data.data));
      return data
    }
  } catch (error) { }
};

export const getFormDataAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getForm(id);

    // dispatch(setFormReducer(data.data));

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

//Get Website

export const getWebBuildersAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getWebBuilders(payload);
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


//blog actions

export const getBlogsAction= () =>async(dispatch) =>{
  try{
    const {data} = await api.getWebBlogs();
    if(data){
      dispatch(setWebBlogsReducer(data.data));
      return data.data;
    }
  }
  catch(error)
  { 
  } 
}

export const createBlogAction =(payload) =>async (dispatch) => {
 try{
   const {data}= await api.createBlog(payload);
   if (data?.success) {
    toast.success('Blog created successfully!');
    return data.data;
  } else {
    toast.error('Something went wrong! Please try again!');
  }
 }
 catch(error){

 }
}

export const deleteBlogAction =(id) =>async (dispatch) =>{
  try {
    const { data } = await api.deleteBlog(id);;
    if (data?.success) {
      toast.success('Blog deleted successfully');
      return id;
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) { }
}

export const updateBlogAction= (id, payload) =>async(dispatch) =>{
  try{
    const {data} =await api.updateBlog(id, payload);
    if(data?.success){
      toast.success('Blog updated successfully');
      return data.data;
    }
    else{
      toast.error('Something went wrong! Please try again!');
    }
  }
  catch(error){

  }
}


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

export const delImageAction =(id) =>async(dispatch) => {
  try{
    const {data}=await api.delImageFromLibrary(id);
    dispatch(getToImageLibraryAction());
    if (data?.success) {
      toast.success('Contact deleted successfully');
    } else {
      toast.error('Something went wrong! Please try again!');
    }

  }
  catch(error){
  }
}


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
  // try {
  //   const { data } = await api.getFormEntries(id);
  //   console.log("form data", data)
  //   dispatch(setFormContacts(data?.data));
  // } catch (error) { }
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

export const getWebCollectionsAction = (websiteId) => async (dispatch) => {
  try {
    const { data } = await api.getWebCollection(websiteId);
    dispatch(setWebCollectionsReducer(data.data));
    return data;
  } catch (error) { }
};

export const createWebCollectionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createWebCollection(payload);
    if (data.success)
      dispatch(getWebCollectionsAction(data.data.websiteId));
    return data;
  } catch (error) { }
};

export const updateWebCollectionAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateWebCollection(id, payload);
    if (data.success)
      dispatch(getWebCollectionsAction(data.data.websiteId));
    return data;
  } catch (error) { }
};

export const getWebDatasetsAction = (collectionId) => async (dispatch) => {
  try {
    const { data } = await api.getWebDataset(collectionId);
    dispatch(setWebDatasetsReducer(data.data));
    return data;
  } catch (error) { }
};

export const getWebsiteAllDatasetsAction = (websiteId) => async (dispatch) => {
  try {
    const { data } = await api.getWebAllDataset(websiteId);
    dispatch(setWebDatasetsReducer(data.data));
    return data;
  } catch (error) { }
};

export const createWebDatasetAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createWebDataset(payload);
    if (data.success)
      dispatch(getWebDatasetsAction(data.data.collectionId));
    return data;
  } catch (error) { }
};

export const getConnectionsByWebsiteAction = (websiteId) => async (dispatch) => {
  try {
    const { data } = await api.getConnectsByWebsite(websiteId);
    dispatch(setWebConnectionsReducer(data.data));
    return data;
  } catch (error) { }
};

export const createOrUpdateConnectionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createOrUpdateConnect(payload);
    dispatch(getConnectionsByWebsiteAction(data.data.websiteId));
    return data;
  } catch (error) { }
};

export const deleteWebConnectionAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteConnect(id);
    dispatch(getConnectionsByWebsiteAction(data.data.websiteId));
    return data;
  } catch (error) { }
};

export const deleteMultipleWebConnectionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteMultipleConnects(payload);
    dispatch(getConnectionsByWebsiteAction(data.data.websiteId));
    return data;
  } catch (error) { }
};

