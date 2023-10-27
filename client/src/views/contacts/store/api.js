import { customInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();
import { toast } from 'react-toastify';

// ** Contacts
export const getContacts = (params) => {
  return API.get('contact/get', { params: { ...params } });
};

export const getContactsPagination = (params) => {
  return API.get('contact/contactWithoutPagination', { params: { ...params } });
};

export const getTotalContactsCounts = (params) => {
  return API.get('contact/get-total', { params: params });
};
export const getContactsByName = (params) => {
  return API.get('contact/get/search-name', { params: params });
};

export const getRetentionStatisticsData = (params) => {
  return API.get('contact/getRetentionStatisticsData', { params: params });
};
export const getContactsByRetention = (params) => {
  return API.get('contact/getContactsByRetention', { params: params });
};

export const getBirthdayStatisticsData = (params) => {
  return API.get('contact/getBirthdayStatisticsData', { params: params });
};
export const getContactsByBirthday = (params) => {
  return API.get('contact/getContactsByBirthday', { params: params });
};

export const getProgressionStatisticsData = (params) => {
  return API.get('contact/getProgressionStatisticsData', { params: params });
};
export const getProgressionStatisticsCategorySidebarData = (params) => {
  return API.get('contact/getProgressionStatisticsCategorySidebarData', { params: params });
};
export const getContactsByProgression = (params) => {
  return API.get('contact/getContactsByProgression', { params: params });
};

export const getContactById = (id) => {
  return API.get(`contact/getById/${id}`);
};

export const getStatistics = (id) => {
  return API.get(`contact/statistics/${id}`);
};

export const addContact = (payload) => {
  return API.post('/contact/add', payload);
};
export const addContactFromEvent = (payload) => {
  return API.post('/contact/save-contact', payload);
};
export const addBulkContact = (payload) => {
  return API.post('/contact/addBulk', payload);
};
export const addBulkFamily = (contactId, payload) => {
  return API.post(`/contact/family-bulk/${contactId}`, payload);
};
export const addBuyer = (payload) => {
  return API.post('/contact/add-buyer', payload);
};
export const addUpdateBuyer = (contactId, payload) => {
  return API.put(`/contact/add-buyer/${contactId}`, payload);
};
export const getFamilyMembers = (contactId) => {
  return API.get(`/contact/family/${contactId}`);
};

export const updateContact = (payload) => {
  return API.put(`/contact/update/${payload?._id}`, payload);
};

export const updateEmployeesRole = (payload) => {
  return API.put('/contact/update-role/', payload);
};

export const updateFieldValueContact = (payload) => {
  return API.post(`/contact/update-field-value/${payload?.contactId}`, payload);
};

export const deleteContact = (payload) => {
  return API.delete(`/contact/delete`, {
    data: { source: payload }
  });
};

export const importContactReqeust = (data) => {
  return API.post('/contact/import-contact-array', data);
};

// ** Invoice
export const getInvoiceByContactId = (id) => {
  return API.get(`contact/invoices/${id}`);
};

// ** Stripe Cards
export const getContactStripeCards = (customerId) => {
  //id is customerId of stripe
  return API.get(`payment/stripe/cards/${customerId}`);
};
export const insertContactStripeCards = (customerId, payload) => {
  //id is customerId of stripe
  return API.post(`payment/stripe/cards/${customerId}`, payload);
};
export const updateContactStripeCards = (paymentMethodId, payload) => {
  //id is customerId of stripe
  return API.put(`payment/stripe/cards/${paymentMethodId}`, payload);
};

// ** Contact Notes API
export const contactNoteList = () => {
  return API.get('notes/followup_note/get_client_notes');
};

export const contactNoteById = (id) => {
  return API.get('notes/followup_note/get_client_notes/' + id);
};
export const contactNoteAdd = (newnote, id) => {
  return API.post('notes/followup_note/add_note/' + id, newnote);
};
export const contactNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const contactNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

// ** Membership contracts for contacts
export const getContactContractsApi = (id) => {
  return API.get(`/membership-buy/contact/${id}`);
};

// ** tags
export const getTags = () => {
  return API.get('/tags/');
};

export const createTag = (payload) => {
  return API.post('/tags/', payload);
};

export const deleteTag = (id) => {
  return API.put(`/tags/delete/${id}`);
};

export const updateTag = (id, payload) => {
  return API.put(`/tags/update/${id}`, payload);
};

// ** stages
export const getStages = () => {
  return API.get('/stage/');
};

export const createStage = (payload) => {
  return API.post('/stage/', payload);
};

export const deleteStage = (id) => {
  return API.put(`/stage/delete/${id}`);
};

export const updateStage = (id, payload) => {
  return API.put(`/stage/update/${id}`, payload);
};

export const reorderStage = (oldIndex, newIndex) => {
  return API.put(`/stage/reorder/${oldIndex}/${newIndex}`);
};
// ** lead source
export const getLeadSource = () => {
  return API.get('/lead-source');
};
export const updateLeadSource = (id, payload) => {
  return API.put(`/lead-source/update/${id}`, payload);
};
export const deleteLeadSource = (id) => {
  return API.put(`/lead-source/delete/${id}`);
};
export const addLeadSource = (payload) => {
  return API.post('/lead-source', payload);
};

// ** Progression

export const fetchProgression = () => {
  return API.get('/progression/get/progression_details');
};

export const activity = (clientId) => {
  const queryParams = {
    contactOrUserId: clientId
  };
  return API.get(`/notes/followup_note/get_activity`, {
    params: queryParams
  });
};

//====================Contact Progressions ============
export const deleteRankHistory = (id) => {
  return API.delete(`/client-ranks/${id}`);
};
export const getRankByContactId = (id) => {
  return API.get(`/client-ranks/${id}`);
};
export const updateRank = (id, payload) => {
  return API.put(`/client-ranks/${id}`, payload);
};
export const insertBulkRank = (payload) => {
  return API.post(`/client-ranks/insert-bulk`, payload);
};
export const insertRank = (payload) => {
  return API.post(`/client-ranks`, payload);
};
export const getRanksByCategoryAndContactIds = (payload) => {
  // {contactIds:[],categoryId(optional)}
  return API.get(`/client-ranks/`, { params: { ...payload } });
};
export const getRanksByCategoryAndContactIdsWithPagination = (payload) => {
  return API.get(`/client-ranks/pagination`, { params: { ...payload } });
};
export const getAllRanks = () => {
  return API.get(`rank-category/all-ranks`);
};

//=====================contact types====================
export const getContactTypes = () => {
  return API.get('contact-type/getByUserId');
};
export const addContactType = (payload) => {
  return API.post(`/contact-type/`, payload);
};
export const updateContactType = (id, payload) => {
  return API.put(`/contact-type/${id}`, payload);
};
export const deleteContactType = (id, payload) => {
  return API.put(`/contact-type/delete/${id}`, payload);
};

// ====================contact fields====================
export const addContactField = (payload) => {
  return API.post('/contact-field/', payload);
};

export const addContactFieldValue = (payload) => {
  return API.post('/contact-field/update-value', payload);
};

export const getContactFieldByType = (contactTypeId) => {
  return API.get(`/contact-field/${contactTypeId}`);
};
export const getProgramStatistics = (payload) => {
  return API.get(`/program/getProgramStatistics?program=${payload.program}`);
};

export const deleteContactFieldByType = ({ contactType, fieldId }) => {
  return API.delete(`/contact-field/${contactType}/${fieldId}`);
};

export const updateContactFieldByType = (payload) => {
  return API.put(`/contact-field/update`, payload);
};

export const updateContactFieldOrder = (payload) => {
  return API.post('/contact-field/order', payload);
};
export const updateContactFieldWidth = (payload) => {
  return API.post('/contact-field/width', payload);
};

// ** merge documents
export const mergeDocument = ({ url, replaceFields }) => {
  return API.post('/file-manager/merge-file', {
    fileUrl: url,
    replaceFields
  });
};

// ** workHistory
export const getAllWorkHistory = (payload) => {
  return API.get('/contact/workhistory/getallworkhisotry', {
    params: payload
  });
};

export const apiStartWork = async (userId, userType, contactId, description) => {
  const response = await API.post('/contact/workhistory/startwork', {
    userId,
    userType,
    contactId,
    description
  });
  localStorage.setItem('currentWork', JSON.stringify(response?.data));
  return response;
};

export const apiStartShiftWork = async (
  userId,
  userType,
  contactId,
  description,
  shiftId,
  shiftName
) => {
  const response = await API.post('/contact/workhistory/startShiftWork', {
    userId,
    userType,
    contactId,
    description,
    shiftId,
    shiftName
  });
  return response;
};

export const apiUpdateWork = async (historyId, screenshot, screenshot_sm) => {
  const response = await API.post('/contact/workhistory/updatework', {
    historyId: historyId,
    screenshot: screenshot,
    screenshot_sm: screenshot_sm
  });

  return response;
};

export const apiEndWork = async (historyId) => {
  const response = await API.post('/contact/workhistory/endwork', {
    historyId: historyId
  });
  return response;
};

export const apiCheckOut = async (contactId, restDescription) => {
  const response = await API.post('/contact/workhistory/checkout', {
    contactId,
    restDescription
  });
  return response;
};

export const getWorkHistoryTimeLine = async (id) => {
  const response = await API.get(`/contact/workhistory/${id}`, { id: id });
  return response.data;
};

export const getWorkHistoryOverView = async (id) => {
  const response = await API.get(`/contact/workhistory/overview/${id}`, { id: id });
  return response.data;
};

export const getAllEmployeeLabor = async () => {
  const response = await API.get('/contact/getAllEmployeeLabor');
  return response;
};

export const getEmployeeLaborByContactId = async (id) => {
  const response = await API.get(`/contact/getEmployeeLaborByContactId/${id}`);
  return response;
};

export const getScreenshots = async (historyId) => {
  const response = await API.get(`contact/workhistory/screenshot/${historyId}`, {
    historyId: historyId
  });
  return response.data;
};

export const getScreenshotsByUserId = async (userId, startPicker) => {
  const response = await API.post(`contact/workhistory/screenshots_userId`, {
    userId: userId,
    startPicker: startPicker
  });
  if (response.status == 200) return response.data;
};

export const getDetailImage = async (workId, screenId) => {
  const response = await API.post(`contact/workhistory/get_detail_image`, {
    workId: workId,
    screenId: screenId
  });
  if (response.status == 200) return response.data;
};

//--------------EMPLOYEE CATEGORIES
export const getAllEmployeeCategory = async () => {
  return API.get(`/employee-categories/`);
};

export const createCategory = async (newCategory) => {
  API.post(`/employee-categories/`, newCategory).then((response) => {
    if (response.status == 200 || response.status == 201) {
      toast.success('Create categories successfully');
    } else {
      toast.error('Failed to save categories');
    }
  });
};
export const deleteCategory = async (id) => {
  API.delete(`/employee-categories/${id}`).then((response) => {
    if (response.status == 200 || response.status == 201) {
      toast.success('Delete category successfully');
    } else {
      toast.error('Failed to delete category');
    }
  });
};
export const updateCategory = async ({ id, category }) => {
  API.put(`/employee-categories/${id}`, { category }).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save shift');
    }
  });
};

//---------------CONTACT POSITIONS
export const getPositions = async () => {
  return await API.get('/contact-position');
};

export const getPositionsByCategory = async (id) => {
  return await API.post(`/contact-position/category/${id}`);
};

export const createPosition = async (payload) => {
  return await API.post('/contact-position', payload);
};
export const updatePosition = async (id, payload) => {
  return await API.put(`/contact-position/${id}`, payload);
};

// ** Work Attendance
// *** Save recent punch in

export const getEmployeeByPunchId = async (id) => {
  return await API.get(`/contact/getEmployeeByPunchId/${id}`);
};

export const saveAttendEmployee = async (payload) => {
  await API.post('/employee-attendance/', payload).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

export const checkOutEmployee = async (id) => {
  await API.delete(`/employee-attendance/${id}`).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

export const getAllAttendEmployee = async () => {
  return API.get('/employee-attendance/');
};

export const saveEmpArrToMap = async (payload) => {
  await API.post('/contact/save-employee-to-map', payload);
};

//ROLES
export const getEmployeeRolesAndPermissions = async (id) => {
  return API.get(`/role/employee/${id}`);
};
export const getRoles = async () => {
  return API.get('/role/');
};

// ** CONTACT LOGIN
export const sendContactLogin = async (payload) => {
  return API.post('/contact/send-login', payload);
};

// ** PUNCH ID
export const autoGeneratePunchId = async (contactId) => {
  return API.post(`/contact/punchid/${contactId}`);
};
export const updatePunchId = async (payload) => {
  return API.put(`/contact/punchid`, payload);
};

// ** STATISTICS
export const getContactClasses = async (contactId) => {
  return API.get(`/class-booking/contact-classes/${contactId}`);
};
export const getContactBookingStatus = async (payload) => {
  return API.get(`/class-booking/contact-status/`, { params: payload });
};

// Member Api
//-------------SHOULD CHANGE AND DELETE
export const checkMember = async (id) => {
  await API.post('/member-contact/attendance', { employeeId: id }).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

// Upload CSV File
export const fileUpload = async (data) => {
  const response = await API.post('utill/upload', data);
  return response;
};
