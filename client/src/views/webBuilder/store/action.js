import {
  setLinkUrlReducer,
  setAllFormsReducer,
  setFormContacts,
  setFormReducer,
  setFormThemeReducer,
  setChildFormReducer,
  setChildFormsReducer,
  setFormsCountReducer,
  setFormRuleReducer,
  setTemplatesReducer,
  setImageLibraryReducer,
  setFormCategoriesReducer,
  setFormOrderElementsReducer,
  setFormProductsReducer,
  setWebElementsReducer,
  setWebCollectionsReducer,
  setWebDatasetsReducer,
  setWebBlogsReducer,
  setWebStoreReducer,
  setCartProductsReducer,
  setWebConnectionsReducer,
  setSelectedProductReducer,
  setThankyouProductsReducer,
  setWebRolesReducer,
  setCategoriesReducer
} from './reducer';
import * as api from './api';
import { toast } from 'react-toastify';
import { getUserData } from '../../../auth/utils';

export const createChildFormAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createChildForm(payload);
    dispatch(setChildFormReducer(data.data));
    if (data?.success === true) {
      toast.success('Form created successfully');
      return data.data;
    } else {
      toast.error('Something went wrong! please try again');
    }

    return data.data
  } catch (error) { }
};

export const editChildFormAction =(id, payload) =>async(dispatch) =>{
  try {
    const { data } = await api.updateChildForm(id, payload);
    dispatch(setChildFormReducer(data.data));
    if (data?.success === true) {
      toast.success('Form saved successfully');
      return data
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) { }
}

export const getChildFormsAction=(id) =>async(dispatch) =>{
  try{
    const {data}=await api.getChildForms(id);
    dispatch(setChildFormsReducer(data.data));
    return data.data
  }
  catch(error){
  }
}

export const getChildFormAction=(id) =>async(dispatch) =>{
  try{
    const {data}=await api.getChildForm(id);
    dispatch(setChildFormReducer(data.data));
    return data.data
  }
  catch(error){
  }
}

export const deleteChildFormAction=(id)=>async(dispatch)=>{
  try{
    const {data}=await api.deleteChildForm(id);
    if(data?.success===true){
      toast.success('Form deleted successfully');
      return true;
    }
  }
  catch(error){

  }
}

export const getChildFormPageAction =(id, payload) =>async(dispatch) =>{
  try {
    const {data} = await api.getChildFormPage(id, payload);
    if (data?.success === true) {
      return data.page
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) { }

}

export const getChildPreviewFormPageAction =(payload) =>async(dispatch) =>{
  try{
    const {data} = await api.getChildFormPreviewPage(payload);
    if(data?.success === true){
      return data.page
    }
    else{
      toast.error('Something went wrong! please try again');
    }
  }
  catch(error){
  }
} 

export const createFormRuleAction =(payload) =>async(dispatch) =>{
  try {
    const { data } = await api.createFormRule(payload);
    if (data?.success === true) {
      toast.success('Rule created successfully');
      return data.data
    } else {
      toast.error('Something went wrong! please try again');
    }
    
  } catch (error) { 

  }
}

export const deleteFormRuleAction =(id) =>async(dispatch) =>{
  const {data} = await api.deleteFormRule(id);
  if (data?.success === true) {
    toast.success('Rule deleted successfully');
    return true
  } else {
    toast.error('Something went wrong! please try again');
    return false
  }
}

export const updateFormRuleAction =(id, payload) =>async(dispatch) =>{
  const {data} = await api.updateFormRule(id, payload);
  if (data?.success === true) {
    toast.success('Page updated successfully');
    return data.data
  } else {
    toast.error('Something went wrong! please try again');
  }
}

export const createDatasetAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createDataset(payload);
    if (data?.success === true) {
      toast.success('Data created successfully');
      return data.data;
    } else {
      toast.error('Something went wrong! please try again');
    }

    return data.data
  } catch (error) { }
};

export const createFormAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createForm(payload);
    dispatch(setFormReducer(data.data));
    if (data?.success === true) {
      toast.success('Form created successfully');
      return true;
    } else {
      toast.error('Something went wrong! please try again');
      return false;
    }
  } catch (error) { }
};

export const uploadFileAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.uploadFile(payload);
    dispatch(setFormReducer(data.data));
    if (data?.success === true) {
      toast.success('File uploaded successfully');
      return data.data;
    } else {
      toast.error('Something went wrong! please try again');
      return false;
    }
  } catch (error) { }
};

export const createFormPageAction = (payload) => async (dispatch) => {
  try {
    const {data} = await api.createFormPage(payload);
    if (data?.success === true) {
      toast.success('Page created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return data.data; 
  } catch (error) { }
};

export const removeFormPageAction =(id) =>async (dispatch) =>{
  try {
    const {data} = await api.deleteFormPage(id);
    if (data?.success === true) {
      toast.success('Page deleted successfully');
      return true;
    } else {
      toast.error('Something went wrong! please try again');
      return false;
    }
    return data.data; 
  } catch (error) { }
}

export const getFormPageAction =(id) =>async(dispatch) =>{
  try {
    const {data} = await api.getFormPage(id);
    if (data?.success === true) {
      return data.data
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) { }

}

//web entry
export const getWebsiteEntryAction =(id) =>async(dispatch) =>{
  try {
    const {data} = await api.getWebsiteEntry(id);
    if (data?.success === true) {
      return data.data
    }
  } catch (error) { }
}

export const deleteWebsiteEntryAction =(id) =>async(dispatch) =>{
  try {
    const {data} = await api.deleteWebsiteEntry(id);
    if (data?.success === true) {
      toast.success('Entry deleted successfully');
      return true;
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) { }
}

export const editWebsiteEntryAction =(id, payload) =>async(dispatch) =>{
  try {
    const {data} = await api.editWebsiteEntry(id, payload);
    if (data?.success === true) {
      toast.success('Entry updated successfully');
      return true;
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) { }
}


export const createWebBuilderAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createWebBuilder(payload);
    const { websiteData, formData } = data.data;
    let _form_data = [];
    _form_data.push(JSON.parse(JSON.stringify(formData)));
    const form_data = {
      ...websiteData,
      formData: _form_data
    };
    dispatch(setFormReducer(form_data));
    return form_data
  } catch (error) { }
};

export const updateWebBuilderThemeAction =(id, payload) =>async(dispatch)=>{
  try{
    const { data } = await api.updateWebBuilderTheme(id, payload);
    if(data.data){
      dispatch(setFormThemeReducer(data.data));
    }
    return data.data
  }
  catch (error) { }
}

export const addWebBuilderThemeColorAction =(id, payload) =>async(dispatch) =>{
  try{
    const { data } = await api.addWebBuilderThemeColor(id, payload);
    if(data.data){
      dispatch(setFormThemeReducer(data.data));
    }
    return data.data
  }
  catch (error) { }
}


export const getWebsiteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getWebBuilder(id);
    const { websiteData, formData, forms, themeData} = data.data;
    const form_data = {
      ...websiteData,
      formData: formData
    };
    dispatch(setFormThemeReducer(themeData));
    dispatch(setFormReducer(form_data));
    dispatch(setChildFormsReducer(forms));
    if (data?.success === true) {
      return formData
    } else {
      toast.error('Something went wrong! please try again');
    }

  } catch (error) { }
};

export const renameWebsiteAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.renameWebsite(id, payload);
    if (data?.success === true) {
      toast.success('Website renamed successfully');
      return data.data
    }
    else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch (error) {
  }
}

export const deleteWebsiteAction =(id)=>async(dispatch) =>{
  try{
    const {data}=await api.deleteWebsite(id);
    if(data?.success === true){
      return true
    }
  }
  catch(error){

  }
}

export const duplicateWebsiteAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.duplicateWebsite(payload);
    const { websiteData, formData } = data.data;
    let _form_data = [];
    _form_data.push(JSON.parse(JSON.stringify(formData)));
    const form_data = {
      ...websiteData,
      formData: _form_data
    };
    dispatch(setFormReducer(form_data));
    if (data?.success === true) {
      toast.success('Website duplicated successfully');
      return form_data
    }
    else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch (error) {

  }
}

export const createPageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createPage(payload);
    if (data?.success === true) {
      toast.success('Page created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return data.data;
  } catch (error) { }
};

export const createDynamicPageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createDynamicPage(payload);
    if (data?.success === true) {
      toast.success('Page created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return data.data;
  } catch (error) { }
};

export const createShopPagesAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createShopPages(payload);
    if (data?.success === true) {
      await dispatch(getWebsiteAction(payload.id));
      // toast.success('Page created successfully');
    } else {
      // toast.error('Something went wrong! please try again');
    }
    // return data.data;
  } catch (error) { }
};

export const deletePageAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePage(id);
    if (data?.success === true) {
      toast.success('Page deleted successfully');
      return data.data
    } else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch (error) {

  }
}

export const getPageAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPage(id);
    if (data?.success === true) {
      return data.data;
    }
    else {
      toast.error('Something went wrong! please try again');
    }

  }
  catch (error) {

  }
}

export const getPublishPageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getPublishPage(payload);
    console.log('data.data', data.data);
    if (data?.success === true) {
      return data;
    }
    else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch (error) {
  }
}

export const getPreviewBlogPageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getPreviewBlogPage(payload);
    if (data?.success === true) {
      return data.data
    }
    else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch (error) {
  }
}

export const getPublishBlogPageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getPublishBlogPage(payload);
    if (data?.success === true) {
      return data.data
    }
    else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch (error) {
  }
}

export const getPreviewPageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getPreviewPage(payload);
    if (data?.success === true) {
      return data;
    }
    else {
      toast.error('Something went wrong! please try again');
    }
  }
  catch (error) {
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


export const updatePageAction = (id, payload) => async (dispatch) => {
  try {
    const res = await api.updatePage(id, payload);
    const { data } = res;
    if (data?.success === true) {
      return data?.url;
    }
  }
  catch (error) {
  }
}

export const updatePageNameAction = (id, payload) => async (dispatch) => {
  try {
    const res = await api.updatePageName(id, payload);
    const { data } = res;
    if (data?.success === true) {
      return true;
    }
  }
  catch (error) {

  }
}

export const publishWebsiteAction = (id, payload) => async (dispatch) => {
  try {
    const res = await api.publishWebsite(id, payload);
    const { data } = res;
    if (data?.success === true) {
      return data.data;
    }
  }
  catch (error) {

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
export const getWebsitesCountAction = () => async (dispatch) => {
  try {
    const { data } = await api.getWebsiteCount();
    if (data && data.success === true) {
      dispatch(setFormsCountReducer(data.data));
      return data.data
    }
    else {
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
    return data;
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

export const getBlogsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getWebBlogs();
    if (data) {
      dispatch(setWebBlogsReducer(data.data));
      return data.data;
    }
  }
  catch (error) {
  }
}

export const createBlogAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createBlog(payload);
    if (data?.success) {
      toast.success('Blog created successfully!');
      return data.data;
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  }
  catch (error) {

  }
}

export const deleteBlogAction = (id) => async (dispatch) => {
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

export const updateBlogAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateBlog(id, payload);
    if (data?.success) {
      toast.success('Blog updated successfully');
      return data.data;
    }
    else {
      toast.error('Something went wrong! Please try again!');
    }
  }
  catch (error) {

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

export const getToImageLibraryAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getImageLibrary(payload);
    dispatch(setImageLibraryReducer(data));
    return data;
  } catch (error) { }
};

export const delImageAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.delImageFromLibrary(id);
    dispatch(getToImageLibraryAction());
    if (data?.success) {
      toast.success('Contact deleted successfully');
    } else {
      toast.error('Something went wrong! Please try again!');
    }

  }
  catch (error) {
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
export const getWebBuilderTemplatesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getWebBuilderTemplates();
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

export const deleteWebCollectionAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteWebCollection(id);
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

export const getWebsiteRolesAction = (websiteId) => async (dispatch) => {
  try {
    const { data } = await api.getWebsiteRoles(websiteId);
    if (data.success) {
      dispatch(setWebRolesReducer(data.data));
    }
    return data;
  } catch (error) { }
};

export const createWebsiteRoleAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createWebsiteRole(payload);
    if (data.success) {
      dispatch(getWebsiteRolesAction(data.data.websiteId));
      toast.success('Website role created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return data;
  } catch (error) { }
};
export const updateWebsiteRoleAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateWebsiteRole(id, payload);
    if (data.success) {
      dispatch(getWebsiteRolesAction(data.data.websiteId));
      toast.success('Website role created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return data;
  } catch (error) { }
};
export const deleteWebsiteRoleAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteWebsiteRole(id);
    if (data.success) {
      dispatch(getWebsiteRolesAction(data.data.websiteId));
      toast.success('Website role created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
    return data;
  } catch (error) { }
};
export const createWebsiteInvitationRoleAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createWebsiteInvitationRole(payload);
    if (data.success) {
      dispatch(getWebsiteRolesAction(data.data.websiteId));
      toast.success('Website role invitation created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
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

export const createMultiConnectionsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createMultipleConnects(payload);
    if (data.success)
      dispatch(getConnectionsByWebsiteAction(data.data[0].websiteId));
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

export const getProductCategoryAction = (pageId) => async (dispatch) => {
  try {
    const { data } = await api.getProductCategory(pageId);
    if (data.success) {
      dispatch(setCategoriesReducer(data.data));
    }
    return data;
  } catch (error) {
  }
}

export const updateProductCategoryAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(id, payload);
    if (data.success) {
      dispatch(getProductCategoryAction(payload.websiteId));
    }
  } catch (error) {}
};

export const getProductDatasetAction = (pageId) => async (dispatch) => {
  try {
    const { data } = await api.getProductDataset(pageId);
    if (data.success) {
      dispatch(setWebStoreReducer(data.data[0]));
    }
    return data;
  } catch (error) {

  }
}

export const updateProductDatasetAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateProductDataset(id, payload);
    if (data.success)
      dispatch(getProductDatasetAction(data.data.websiteId));
    return data;
  } catch (error) { }
};

export const updateCartProductsAction = (payload) => async (dispatch) => {
  try {
    dispatch(setCartProductsReducer(payload));
  } catch (err) {

  }
}

export const updateSelectedProductAction = (payload) => async (dispatch) => {
  try {
    dispatch(setSelectedProductReducer(payload));
  } catch (err) {

  }
}

export const updateThankyouProductsAction = (payload) => async (dispatch) => {
  try {
    dispatch(setThankyouProductsReducer(payload));
  } catch (err) {

  }
}