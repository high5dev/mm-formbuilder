// ** Reducers Imports
import navbar from './navbar';
import layout from './layout';
import auth from './authentication';
// import todo from '@src/views/apps/todo/store';
// import chat from '@src/views/apps/chat/store';
import users from '@src/views/apps/user/store';
// import email from '@src/views/apps/email/store';
// import invoice from '@src/views/apps/invoice/store';
// import calendar from '@src/views/calendar/store';
// import kanban from '@src/views/apps/kanban/store';
// import workspace from '@src/views/apps/workspace/store';
// import label from '@src/views/tasks/label-management/store';
// import qrcode from '@src/views/tasks/setting/store';
// import ecommerce from '@src/views/apps/ecommerce/store';
// import dataTables from '@src/views/tables/data-tables/store';
// import permissions from '@src/views/apps/roles-permissions/store';
//import attendance from '../views/calendar/attendance/store';
import appNotifications from '../layouts/components/navbar/notifications/store/reducer'
// custom
// import clientContact from '../views/contacts/store/reducer';
// import employeeSchedule from '../views/contacts/schedule/store/reducer';

// import leadContact from '../views/contacts/store/reducer';
// import relationshipContact from '../views/contacts/store/reducer';
// import vendorContact from '../views/contacts/store/reducer';

// import event from '../views/calendar/event/store';
// import filemanager from '../views/apps/filemanager/store';
// import book from '../views/calendar/book/store'; // should remove
// import bookings from '../views/calendar/bookings/store/reducer';

// import ticket from '../views/apps/ticket/store';
// import tournament from '../views/calendar/tournament/store';

// import tasks from '../views/contacts/employee/task-reporting/store/reducer';
// import { EmailMarketing } from '../views/apps/email/store/emailMarketing';
// import documents from '../views/documents/store';
import totalContacts from '../views/contacts/store/reducer';

// import smartList from '../views/settings/tabs/advancesettings/store';
// // text
// import text from '../views/apps/text/store';
// import texts from '../views/marketing/text/store/reducer';
// // deposit
// import deposit from '../views/depositfunds/store';
// import progression from '../views/settings/tabs/progressiontab/store/reducer';
// import roles from '../views/contacts/settings/view/rolesPermission/store/reducer';
// import course from '../views/mycma/usercourses/store/reducer';
// import projectManagement from '../views/business/projects/store/reducer';
import formEditor from '../views/formBuilder/store/reducer';
import websiteEditor from '../views/webBuilder/store/reducer';
// import employeeTasks from '../views/contacts/tasks/view/rolesPermission/store/employee/reducer';
// import userSignatureStampInitial from '../views/contacts/settings/view/rolesPermission/store/signsAndStamps/reducer';
//import myGoals from '../views/goals/store/reducer';
// import goals from '../views/taskngoalsMain/taskngoals/store/reducer';
// import mobileGoals from '../views/taskngoalsMain/taskngoalsMobile/store/reducer';
//import notificationSet from '../views/settings/tabs/advancesettings/tabs/notification/store/reducer';
// import goals from '../views/taskngoals/store/reducer';
// import chatWidgetSettings from '../views/settings/store/reducer';
// import finance from '../views/finance/store/reducer';
import organizations from '../views/organizations/store/reducer';
// import automation from '../views/marketing/automation/store/reducer';
// import retention from '../views/settings/tabs/advancesettings/tabs/retention/store/reducer';
// import userInvoice from '../views/finance/invoice/store/reducer';
//import shops from './../views/shops/store/reducer';
// import settings from './../views/settings/store/reducer';
// import journal from './../views/apps/newjournal/store/reducer';

//import OnBoarding from '../views/onboarding/store/reducer';
//social proof
//import socialproof from '../views/socialproof/store/reducer';

// import tasksTemplates  from '../views/tasks/task-list/store/reducer';

//import tasksTemplates from '../views/tasks/task-list/store/reducer';

const rootReducer = {
  //notificationSet,
  auth,
  // todo,
  // chat,
  // email,
  //shop,
  users,
  // kanban,
  // workspace,
  // label,
  // qrcode,
  navbar,
  layout,
  // invoice,
  // calendar,
  // ecommerce,
  // dataTables,
  // permissions,
  // projectManagement,
  // clientContact,
  // employeeSchedule,
  // leadContact,
  // relationshipContact,
  // vendorContact,
  // memberContact,
  // tasks,
  // filemanager,
  // book,
  // event,
  // //attendance,
  // ticket,
  // EmailMarketing: EmailMarketing,
  // documents,
   totalContacts,
  // smartList,
  // text,
  // texts,
  // deposit,
  // roles,
  // progression,
  // course,
  formEditor,
  websiteEditor,
  // employeeTasks,
  // userSignatureStampInitial,
  // myGoals,
  // finance,
  organizations,
  // automation,
  // goals,
  // retention,
  // userInvoice,
  //shops,
  //settings,
  //socialproof,
  // journal,
  // OnBoarding,
  // tasksTemplates,
  // tournament,
  appNotifications,
  //bookings
};

export default rootReducer;
