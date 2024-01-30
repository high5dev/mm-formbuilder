// ** Routes Imports
import DashboardRoutes from './Dashboards';
import AffiliateRoutes from './Affiliate';
//import ContactRoutes from './Contacts';
//import AppRoutes from './Apps';
// import TaskRoutes from './Task';
// import CalendarRoutes from './Calendar';
 import BusinessRoutes from './Business';
// import ShopRoutes from './Shop';
// import FinanceRoutes from './Finance';
// import DocumentRoutes from './Documents';

// import FormRoutes from './Forms';
import PagesRoutes from './Pages';
// import TablesRoutes from './Tables';
// import ChartsRoutes from './Charts';
// import UiElementRoutes from './UiElements';
// import ExtensionsRoutes from './Extensions';
import PageLayoutsRoutes from './PageLayouts';
//import Myforms from './myforms';
// import SettingRoute from './Setting';
// import FileManagerRoutes from './FileManager';
// import MyCMARoutes from './MyCMA';
// import LiveChatSettingRoute from './liveChatSetting';
// import WebToolRoutes from './WebTools';
// import MarketingRoutes from './Marketing';
// import MySocialRoutes from './MySocial';
// import FormBuilderRoutes from './FormBuilder';
import FormBuilderRoutes from './WebBuilder';
//import OrganizationRoutes from './Organizations';
//import MembershipDigital from './MembershipDigital';

// ** Document title
const TemplateTitle = '%s - MyManager React Admin Template';

// ** Default Route
const DefaultRoute = '/dashboard/analytics';

// ** Merge Routess
const Routes = [
   ...DashboardRoutes,
   ...AffiliateRoutes,
  // ...ContactRoutes,
  // ...AppRoutes,
  // ...TaskRoutes,
  // ...CalendarRoutes,
   ...BusinessRoutes,
  // ...ShopRoutes,
  // ...FinanceRoutes,
  // ...DocumentRoutes,
  ...FormBuilderRoutes,
   ...PagesRoutes,
  // ...SettingRoute,
  // ...FileManagerRoutes,
  // ...MyCMARoutes,
  // ...LiveChatSettingRoute,
  // ...WebToolRoutes,
  // ...MarketingRoutes,
  // ...MySocialRoutes,
  // ...OrganizationRoutes,
  // ...MembershipDigital
];

export { DefaultRoute, TemplateTitle, Routes };
