import { createSlice } from '@reduxjs/toolkit';

export const totalContacts = createSlice({
  name: 'totalContacts',
  initialState: {
    //contact
    contactList: {},
    contactTypeList: [],
    totalNotes: [],
    selectedContact: {},
    totalContactCounts: {},
    chunkContacts: [],
    contactsPagination: [],
    retentionTab: {},
    retentionContacts: {},
    birthdayTab: {},
    birthdayContacts: {},
    progressionTab: {},
    progressionTabCategorySidebar: {},
    progressionContacts: {},
    //contact note
    notes: [],
    contracts: [],
    //promotedlist
    promotedClientList: [],
    //progression
    progressionListClientData: [],
    //get all contact
    contactRankList: [],
    // Contact Fields By Type
    contactField: [],
    activities: [],
    tags: [],
    stages: [],
    leadSource: [],
    progressionMessage: [],
    progressionHistoryData: [],
    allProgressionData: [],
    allProgressionDataWithPagination: {},
    fetchProgressionData: [],
    removeIdDataPro: [],
    allRanks: [],
    contactsLoading: false,
    notificationList: [],
    notificationEventList :[],
    notificationTaskList : [],
    notificationRenewalList :[],
    // ================Client Reducers==================

    contactUpload: {
      contacts: [],
      fileProcessing: false,
      processingError: null,
      importing: false,
      uploadState: 'idle'
    },

    promotedClientList: [],
    programStatistics : [],
    contactUpdate: {
      loading: false,
      success: false,
      error: null
    },
    notification: 'today',

    // ** WorkHistory
    workHistory: {
      isStart: false,
      interval: 15,
      duration: 0
    },

    // all work history data
    workAllHistory: {
      allHistory: []
    },

    // all employee labor data by week
    allEmployeeLabor: {
      totalLabor: 0,
      totalHours: 0,
      totalLastWeekLabor: 0,
      weeklyLabors: [],
      personalLabors: [],
      personalHistoryToday: [],
      weeklyHours: [],
    },

    // employee labor
    employeeLabor: {
      weeklyReport: [],
      totalWeekLabor: 0,
      totalMonthLabor: 0,
      dailyhistories: [],
      weeklyHours: [
        {startTime: 0, endTime: 0},
        {startTime: 0, endTime: 0},
        {startTime: 0, endTime: 0},
        {startTime: 0, endTime: 0},
        {startTime: 0, endTime: 0},
        {startTime: 0, endTime: 0},
        {startTime: 0, endTime: 0},
      ],
    },

    // category
    employeeCategory: {
      loading: false,
      success: false,
      data: []
    },

    // Work Attendance
    employeeAttance: {
      loading: false,
      success: false,
      data: []
    },

    selectContact: {
      selected: null,
      isSelected: false
    },
    positions: [],
    positionsByCategory: [],
    changedRanks: []
  },
  reducers: {
    //Contact
    contactsReducer: (state, action) => {
      state.contactList = action?.payload;
    },
    notificationReducer: (state, action) => {
      state.notificationList = action?.payload;
    },
    notificationEventReducer: (state, action) => {
      state.notificationEventList = action?.payload;
    },
    notificationTaskReducer: (state, action) => {
      state.notificationTaskList = action?.payload;
    },
    notificationRenewalReducer :  (state, action) => {
      state.notificationRenewalList = action?.payload;
    },
    setFilteredNotice : (state, action) => {
      state.notification = action?.payload;
    },
    chunkContactsReducer: (state, action) => {
      state.chunkContacts = action?.payload;
    },
    contactsPaginationReducer: (state, action) => {
      state.contactsPagination = action?.payload;
    },
    contactsLoadingReducer: (state, action) => {
      state.contactsLoading = action?.payload;
    },
    totalContactsCountReducer: (state, action) => {
      state.totalContactCounts = action?.payload;
    },
    contactsTypeReducer: (state, action) => {
      state.contactTypeList = action?.payload;
    },
    selectContactReducer: (state, action) => {
      state.selectedContact = action.payload;
    },
    contractsReducer: (state, action) => {
      state.contracts = action.payload;
    },
    retentionTabReducer: (state, action) => {
      state.retentionTab = action?.payload;
    },
    retentionContactsReducer: (state, action) => {
      state.retentionContacts = action?.payload;
    },
    birthdayTabReducer: (state, action) => {
      state.birthdayTab = action?.payload;
    },
    birthdayContactsReducer: (state, action) => {
      state.birthdayContacts = action?.payload;
    },
    progressionTabReducer: (state, action) => {
      state.progressionTab = action?.payload;
    },
    progressionTabCategorySidebarReducer: (state, action) => {
      state.progressionTabCategorySidebar = action?.payload;
    },
    progressionContactsReducer: (state, action) => {
      state.progressionContacts = action?.payload;
    },

    // Contact Fields
    getContactFieldSuccess: (state, action) => {
      state.contactField = action?.payload;
    },
    // Contact Notes
    contactNoteFetch: (state, action) => {
      state.notes = action?.payload;
    },
    getProgramStatisticsReducer : (state, action) => {
      state.programStatistics = action?.payload;
    },

    // Contact Notes
    allNotesReducer: (state, action) => {
      state.totalNotes = action?.payload;
    },

    // ** All contact rank data
    contactRankListSuccess: (state, action) => {
      state.contactRankList = action?.payload;
    },
    setTagsReducer: (state, action) => {
      state.tags = action.payload;
    },
    setStagesReducer: (state, action) => {
      state.stages = action.payload;
    },
    setLeadsReducer: (state, action) => {
      state.leadSource = action.payload;
    },

    //----------- SHOULD TEST PROGRESSION

    getProgressionHistoryData: (state, action) => {
      state.progressionHistoryData = action.payload;
    },
    getProgressionAllData: (state, action) => {
      state.allProgressionData = action.payload;
    },
    getProgressionAllDataWithPagination: (state, action) => {
      state.allProgressionDataWithPagination = action.payload;
    },
    progressionFetchData: (state, action) => {
      state.fetchProgressionData = action.payload;
    },
    removeIdReducer: (state, action) => {
      state.removeIdDataPro = action.payload;
    },
    setAllRanks: (state, action) => {
      state.allRanks = action.payload;
    },
    // ===================Client Reducers================

    // import handler
    importProcessingFinish: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'success';
    },
    setAllChatContact: (state, action) => {
      state.allChat = action.payload;
    },

    importProcessingReset: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'idle';
    },

    //promoted client data
    promotedClientData: (state, action) => {
      state.promotedClientList = action?.payload;
    },
    //progression List
    progressionListClient: (state, action) => {
      state.progressionListClientData = action.payload;
    },
    employeeUpdateIdSuccess: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = null;
    },
    employeeUpdateIdError: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = action.payload;
    },
    employeeUpdateIdReset: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = false;
      state.contactUpdate.error = null;
    },

    // set all work history
    setAllWorkHistory: (state, action) => {
      state.workAllHistory.allHistory = action.payload;
    },

    // WorkHistory
    setWorkHistory: (state, action) => {
      state.workHistory.duration = action.payload.duration;
      state.workHistory.isStart = action.payload.isStart;
    },

    // WorkHistoryDuration
    setDuration: (state) => {
      state.workHistory.duration += 1;
    },

    // Snapshot interval
    setSnapshotInterval: (state, action) => {
      state.workHistory.interval = action.payload;
    },

    // GetAllCategory
    getAllCategorySuccess: (state, action) => {
      state.employeeCategory.loading = false;
      state.employeeCategory.success = true;
      state.employeeCategory.data = action.payload;
    },
    getAttendEmployeeStart: (state) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.saveSuccess = false;
    },
    getAttendEmployeeSuccess: (state, action) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.data = action.payload;
      state.employeeAttance.saveSuccess = true;
    },

    selectContactLead: (state, action) => {
      (state.selectContact.selected = action.payload), (state.selectContact.isSelected = true);
    },
    setPositionsReducer: (state, action) => {
      state.positions = action.payload;
    },
    setPositionsByCategoryReducer: (state, action) => {
      state.positionsByCategory = action.payload;
    },
    getActivityReducer: (state, action) => {
      state.activities = action.payload;
    },
    getClientRankReducer: (state, action) => {
      state.changedRanks = action.payload;
    },
    getAllEmployeeLaborReducer: (state, action) => {
      state.allEmployeeLabor = action.payload;
    },
    getEmployeeLaborByContactIdReducer: (state, action) => {
      state.employeeLabor = action.payload;
    },
  }
});
export const {
  contactsReducer,
  chunkContactsReducer,
  totalContactsCountReducer,
  selectContactReducer,
  retentionTabReducer,
  retentionContactsReducer,
  birthdayTabReducer,
  birthdayContactsReducer,
  progressionTabReducer,
  progressionTabCategorySidebarReducer,
  progressionContactsReducer,

  contactNoteFetch,
  allNotesReducer,
  contactsTypeReducer,
  contractsReducer,
  promotedClientData,
  progressionListClient,
  contactRankListSuccess,
  contactsLoadingReducer,
  setTagsReducer,
  setStagesReducer,
  setLeadsReducer,
  getProgressionHistoryData,
  getProgressionAllData,
  getProgressionAllDataWithPagination,
  progressionFetchData,
  removeIdReducer,
  setAllRanks,

  // =============Contact Field============

  getContactFieldSuccess,

  // import start
  importProcessingFinish,
  promotClientProgression,

  // Single employee contact Update
  employeeUpdateIdSuccess,
  employeeUpdateIdError,
  employeeUpdateIdReset,

  // WorkHistory
  setWorkHistory,
  setSnapshotInterval,
  // set all work history
  setAllWorkHistory,

  // WorkHistoryDuration
  setDuration,

  // Category
  getAllCategorySuccess,

  // Work Attendance
  getAttendEmployeeStart,
  getAttendEmployeeSuccess,

  selectContactLead,

  //** CONTACT POSITION */
  setPositionsReducer,
  setPositionsByCategoryReducer,
  getActivityReducer,
  getClientRankReducer,
  notificationReducer,
  setAllChatContact,
  setFilteredNotice,
  notificationEventReducer,
  notificationTaskReducer,
  notificationRenewalReducer,
  contactsPaginationReducer,
  getProgramStatisticsReducer,
  getAllEmployeeLaborReducer,
  getEmployeeLaborByContactIdReducer
} = totalContacts.actions;

export default totalContacts.reducer;
