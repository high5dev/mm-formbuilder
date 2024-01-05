import { createSlice } from '@reduxjs/toolkit';


//form data
export const formEditor = createSlice({
  name: 'websiteEditor',
  initialState: {
    form: {
      name: '',
      memberType: '',
      smartList: '',
      subCategory: null,
      formType: 'leads',
      formData: [{ id: '', step: '1', name: 'Home', css: '', html: '', path: 'Home' }],
      automateEntry: false,
      status: '',
      isTemplate: false
    },
    childForm:{
    },
    childForms:[],
    formRules:[],
    formDataset:[],
    formsCount:{},
    linkUrl:'website',
    formOrderElements:{},
    formSalesType:'',
    formProducts:[],
    formContacts: [],
    funnels: [],
    templates: [],
    imageLibrary: [],
    formCategories: [],
    webElements: [],
    webCollections: [],
    webDatasets: [],
    webBlogs:[],
    webConnections: [],
    categories: [],
    webProducts: {},
    cartProducts: [],
    selectedProduct: {},
    thankyouProducts: [],
    webRoles: [],
    currentPage: {},
    customerCollect: {},
    waitingClients: []
  },
  reducers: {
    setLinkUrlReducer: (state, action) => {
      state.linkUrl = action?.payload;
    },
    setFormReducer: (state, action) => {
      state.form = action?.payload;
    },
    setChildFormReducer: (state,action) =>{
      state.childForm=action?.payload;
    },
    setChildFormsReducer:(state,action) =>{
      state.childForms=action?.payload;
    },
    setFormsCountReducer: (state, action) =>{
      state.formsCount=action?.payload;
    },
    setCategoriesReducer: (state, action) => {
      state.categories = action?.payload;
    },
    setWebStoreReducer: (state, action) => {
      state.webProducts = action?.payload;
    },
    setFormRuleReducer: (state,action) =>{
      state.formRules=action?.payload;
    },
    setFormDatasetReducer:(state, action) =>{
      state.formDataset=action?.payload;
    },
    setWebBlogsReducer: (state, action) =>{
      state.webBlogs= action?.payload;
    },
    setFormSalesTypeReducer: (state, action) => {
      state.formSalesType = action?.payload;
    },
    setFormOrderElementsReducer: (state, action) => {
      state.formOrderElements = action?.payload;
    },

    setToDefaultReducer: (state, action) => {
      if (action?.payload?.isTemplate && action?.payload?.isTemplate === true) {
        state.form = {

          name: '',
          memberType: '',
          smartList: '',
          subCategory: '',
          formType: 'leads',
          formData: [{ id: '', step: '1', name: '', css: '', html: '', path: '' }],
          automateEntry: false,
          status: '',
          isTemplate: true
        };
      } else {
        state.form = {

          name: '',
          memberType: '',
          smartList: '',
          subCategory: '',
          formType: 'leads',
          formData: [{ id: '', step: '1', name: '', css: '', html: '', path: '' }],
          automateEntry: false,
          status: '',
          isTemplate: false
        };
      }
    },

    setAllFormsReducer: (state, action) => {
      state.funnels = action?.payload;
    },
    setFormProductsReducer: (state, action) => {
      state.formProducts = action?.payload;
    },

    setTemplatesReducer: (state, action) => {
      state.templates = action?.payload;
    },
    setFormContacts: (state, action) => {
      state.formContacts = action?.payload;
    },
    setImageLibraryReducer: (state, action) => {
      state.imageLibrary = action?.payload;
    },
    setFormCategoriesReducer: (state, action) => {
      state.formCategories = action?.payload
    },
    setWebElementsReducer: (state, action) => {
      state.webElements = action?.payload;
    },
    setWebCollectionsReducer: (state, action) => {
      state.webCollections = action?.payload;
    },
    setWebDatasetsReducer: (state, action) => {
      state.webDatasets = action?.payload;
    },
    setWebRolesReducer: (state, action) => {
      state.webRoles = action?.payload;
    },
    setWebConnectionsReducer: (state, action) => {
      state.webConnections = action?.payload;
    },
    setCartProductsReducer: (state, action) => {
      state.cartProducts = action?.payload;
    },
    setSelectedProductReducer: (state, action) => {
      state.selectedProduct = action?.payload;
    },
    setThankyouProductsReducer: (state, action) => {
      state.thankyouProducts = action?.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action?.payload;
    },
    setCustomerCollectReducer: (state, action) => {
      state.customerCollect = action?.payload;
    },
    setWaitingClientsReducer: (state, action) => {
      state.waitingClients = action?.payload;
    }
  }
});

export const {
  setLinkUrlReducer,
  setFormReducer,
  setFormRuleReducer,
  setChildFormReducer,
  setChildFormsReducer,
  setFormsCountReducer,
  setFormDatasetReducer,
  setToDefaultReducer,
  setAllFormsReducer,
  setFormCategoriesReducer,
  setTemplatesReducer,
  setFormContacts,
  setImageLibraryReducer,
  setFormOrderElementsReducer,
  setFormProductsReducer,
  setFormSalesTypeReducer,
  setWebElementsReducer,
  setWebCollectionsReducer,
  setWebDatasetsReducer,
  setWebRolesReducer,
  setWebBlogsReducer,
  setWebConnectionsReducer,
  setCategoriesReducer,
  setWebStoreReducer,
  setCartProductsReducer,
  setSelectedProductReducer,
  setThankyouProductsReducer,
  setCurrentPage,
  setCustomerCollectReducer,
  setWaitingClientsReducer
} = formEditor.actions;
export default formEditor.reducer;
