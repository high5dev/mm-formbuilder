import { createSlice } from '@reduxjs/toolkit';


//form data
export const formEditor = createSlice({
  name: 'formEditor',
  initialState: {
    form: {

      name: '',
      memberType: '',
      smartList: '',
      subCategory: null,
      formType: 'leads',
      formData: [{ id: '', step: '1', name: '', css: '', html: '', path: '' }],
      automateEntry: false,
      status: '',
      isTemplate: false
    },
    formOrderElements:{},
    formSalesType:'',
    formProducts:[],
    formContacts: [],
    funnels: [],
    templates: [],
    imageLibrary: [],
    formCategories: [],
    categories: [],
    webProducts: {},
    cartProducts: [],
    selectedProduct: {},
    thankyouProducts: []
  },
  reducers: {
    setFormReducer: (state, action) => {
      state.form = action?.payload;
    },
    setCategoriesReducer: (state, action) => {
      state.categories = action?.payload;
    },
    setWebStoreReducer: (state, action) => {
      state.webProducts = action?.payload;
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
    setFormCategoriesReducer:(state,action) =>{
      state.formCategories = action?.payload
    }
  }
});

export const {
  setFormReducer,
  setToDefaultReducer,
  setAllFormsReducer,
  setFormCategoriesReducer,
  setTemplatesReducer,
  setFormContacts,
  setImageLibraryReducer,
  setFormOrderElementsReducer,
  setFormProductsReducer,
  setFormSalesTypeReducer,
  setCategoriesReducer,
  setWebStoreReducer,
  setCartProductsReducer,
  setSelectedProductReducer,
  setThankyouProductsReducer
} = formEditor.actions;
export default formEditor.reducer;
