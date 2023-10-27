export const ENDPOINTS = {
  // Auth
  SEND_PASS_RESET_OTP: 'auth/send-reset-pass-otp',
  RESET_PASS: '/auth/reset-password',

  // Onboarding Status
  GET_ONBOARDING_STATUS: '/onboarding/status',

  // // Contacts

  // Contacts --> employee
  ALL_EMPLOYEE_SHIFT: '/employee-shifts/',
  EMPLOYEE_SHIFT: '/employee-shifts/',

  // Roles --> role
  ALL_ROLES: '/role/',

  // Contacts --> Leads
  LEAD_CONTACT: '/lead-contact/',

  //Document
  UPLOAD_DOCUMENT: '/document/upload',
  ADD_RECIPIENTS: '/document-recipient/',
  EDIT_RECIPIENTS: '/document-recipient/recipient/',
  GET_DOC_BY_HASH: '/document/email-link?hashCode=',
  GET_DOC_BY_TOKEN: '/document/email-link?token=',
  Get_DOCUMENT_BY_ID: '/document/documentId/',
  GET_USER_DOCS: '/document/',
  GET_RECEIVED_DOCS: '/document/received',
  DELETE_DOCUMENTS: '/document/delete',
  DOCUMENT_RESEND: 'document-recipient/email/resend',

  //custome fields
  ADD_CUSTOM_FIELD: '/document-custome-fields/add',
  DELETE_CUSTOM_FIELD: '/document-custome-fields/delete?id=',
  GET_CUSTOM_FIELDS_BY_USER: '/document-custome-fields/getbyuser',
  // get user
  GET_USER: '/user',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  //Document- Signature & stamps & initials
  SIGNATURE_AND_INITIAL: '/document-signature/signatures',
  UPLOAD_SIGNATURES: '/document-signature/upload',

  // Marketing Emails
  COMPOSE_EMAIL: 'marketing/compose-email',
  GET_ALL_EMAILS: 'marketing/emails',
  GET_EMAIL_BY_ID: 'marketing/emails/',
  DELETE_EMAILS: 'marketing/emails/',
  MARK_EMAILS_AS_SPAM: 'marketing/emails/mark-as-spam',
  LABEL_EMAILS: 'marketing/emails/label',
  STAR_EMAILS: 'marketing/emails/star',
  SEND_SCHEDULED_EMAIL_NOW: 'marketing/emails/send-scheduled-email-now',

  // Form Builder
  CREATE_FORM: 'formBuilder/create',
  GET_FORM: 'formBuilder/get',
  DELETE_FORM: 'formBuilder/delete',

  // Projects Management
  CREATE_PROJECT: '/project-manager/createProject',
  GET_PROJECTS: '/project-manager/getprojects?id=',
  DELETE_PROJECT: '/project-manager/deleteProject?id=',
  UPDATE_PROJECT: '/project-manager/updateProject',

  GET_TABLES: '/project-manager/get?id=',
  CREATE_NEW_TABLE: '/project-manager/createTable',
  DELETE_TABLE: '/project-manager/deleteTable',
  ADD_ROW: '/project-manager/addRow',
  DELETE_ROW: '/project-manager/deleteRow',
  ADD_COLUMN: '/project-manager/addColumn',
  UPDATE_COLUMN: '/project-manager/updateColumn',
  DELETE_COLUMN: '/project-manager/deleteColumn',
  UPDATE: '/project-manager/update',
  GET_ACTIVITY_LAST_SEEN: '/project-manager/getActivity?id=',

  //socialproof tab
  CREATE_ADD_CAMPAIGN: '/social-proof-campaign/add-Campaign',
  CREATE_ADD_GOAL: '/social-proof-goal/create-goal',
  GET_GOALLIST: '/social-proof-goal/get-goal/',
  GET_CATEGORY: 'camp_category/cmp_getallCategory',
  ADD_NOTIFICATION: '/uProof-notification/add-uproof_noti',
  ADD_DISPLAY_URL: '/social-display-url/add-social-display-url',
  DISPLAY_URLLIST: '/social-display-url/get-display-url_list/',
  UPDATE_URLLIST: '/social-display-url/update-display-url_list',
  DELETE_DISPLAY: '/social-display-url/del-social-display-url/',
  DELETE_MANY_DISPLAY: '/social-display-url/del-many-social-display-url',
  DISPLAY_URL_VIEW_ONE: '/social-display-url/get-one-display-url/',
  GET_SOCIAL_PROOF_CAMPAIGN_LIST: '/social-proof-campaign/get-Campaign',
  DELETE_CAMPAIGN: '/social-proof-campaign/del-campign/',
  EDIT_CAMPAIGN_ACTIVITY: '/social-proof-campaign/update-campaign/update-activity',
  EDIT_CAMPAIGN_NOTIFICATION: '/social-proof-campaign/update-notification',
  EDIT_CAMPAIGN: '/social-proof-campaign/update-campaign/',
  DELETE_GOAL: '/social-proof-goal/del-goal/',
  DELETE_MANY_GOAL: '/social-proof-goal/del-many-goal',
  GOAL_VIEW_ONE: '/social-proof-goal/getone-goal/',
  UPDATE_GOAL: '/social-proof-goal/update-goal/',
  ADD_RECENTLY_ACTIVITY: '/recent_activity/add_recent_actvty',

  //category tab
  GET_CATEGORY_DETAILS: '/category/categoryDetails',

  //myjournal tab
  GET_MYJOURNAL_LIST: '/myjournalCategory/get_journal_Category',
  GET_JOURNAL_LIST_BY_ID: '/myjournal/get_Journal_bycategory',
  CREATE_MY_JOURNAL: '/myjournalCategory/create_journal_category',
  CREATE_MY_JOURNAL_BY_ID: '/myJournal/add_MyJournal/',
  UPDATE_MY_JOURNAL: '/myJournal/update_MyJournal/',
  UPDATE_COLUMN_ORDER: '/project-manager/updateColumnOrder',
  UPDATE_DYNAMIC_FIELDS: '/project-manager/updateDynamicColumnFields',
  GET_ACTIVITY_LAST_SEEN: '/project-manager/getActivity?id=',
  GET_ONE_MY_JOURNAL: 'myjournal/getone_myJournal',
  CREATE_PAGE_POST: '/facebook/facebook/create-page-posts',
  DELETE_JOURNAL: '/myjournal/dltMyJournal',
  DELETE_JOURNAL_CATEGORY: '/myjournalCategory/del_category',
  UPDATE_JOURNAL_CATEGORY: '/myjournalCategory/update',
  CALENDER_JOURNAL: '/myjournal/journalList_by_date',
  CALENDER_LIST: '/myJournal/myJournal_list',
  JOURNALEDIT: '/myJournal/update_myjournal',

  //Email Template Category
  FORM_CATEGORY: '/form-categories',

  // Planable api
  WORKSPACE_LIST: '/planable_workspace/workSpace_list',
  CREATE_WORK_SPACE: '/planable_workspace/createWorkSpace',
  VIEW_ONE_WORKSPACE: '/planable_workspace/viewone_workspace/',
  DELETE_ONE_WORKSPACE: '/planable_workspace/dlt_workspace/',
  EDIT_WORKSPACE: '/planable_workspace/update_planable_myWorkSpace/',
  ADD_COMMENT: '/comment/add_comment',
  DELETE_COMMENT: '/comment/del_comment/',
  COMMENT_BY_POST: '/comment/comment_by_post/',
  ADD_COMPOSE: '/compose/add_compose',
  EDIT_COMPOSE: '/compose/update_compose/',
  DELETE_COMPOSE: '/compose/del_compose/',
  GET_COMPOSE: '/compose/get_compose',
  GET_COMPOS_BY_ID: '/compose/get_compose/',
  FACEBOOK_GET_PAGES: '/facebook/facebook/get-pages/',
  FACEBOOK_SCHEDULE_POST: '/facebook/schedule-post',
  FACEBOOKPAGE_REFRESH_TOKEN: '/facebook/refresh-token',
  FACEBOOK_USER_LOGIN_LONG_TOKEN: '/facebook/facebook_short_token', // It would go form userlogin
  FACEBOOK_LONG_TOKEN_USER: '/facebook/facebook_long_token' //
};
