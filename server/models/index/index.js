const Temp = require("../Temp");
const UserToken = require("../UserToken");
const Authenticate = require("../Authenticate");

const User = require("../User");
const Contact = require("../Contact");
const ContactType = require("../ContactType");
// const ContactField = require("../ContactField");
// const TextMessages = require("../TextMessages");
// const MembershipType = require("../MembershipType");
// const Project = require("../Project");
// const TaskReporting = require("../TaskReporting");
// const FreezeTask = require("../FreezeTask");
// const EmployeeShift = require("../EmployeeShift");
// const EmployeeSchedule = require("../EmployeeSchedule");
// const RescheduleReq = require("../RescheduleReq");
// const TimeOffReq = require("../TimeOffReq");
// const EmployeeBudget = require("../EmployeeBudget");
// const Member = require("../Member");

// const EmployeeAttendance = require("../EmployeeAttendance");
// const CheckList = require("../CheckList");
// const BuyMembership = require("../BuyMembership");
// const BuyProduct = require("../BuyProduct");
// const BuyCourse = require("../BuyCourse");
// const { ScheduleCheckList, ScheduleTask } = require("../CheckListAns");
const ResetPass = require("../resetPass");
// const Document = require("../Document");
// const DocumentRecipient = require("../DocumentRecipient");
// const DocumentCustomFields = require("../DocumentCustomFields");
// const DocumentSignature = require("../DocumentSignature");
// const Course = require("../Course");
// const CourseLesson = require("../CourseLesson");
// const CourseAssignment = require("../CourseAssignment");
// const CourseAssignmentSolution = require("../CourseAssignmentSolution");
// const CourseQuiz = require("../CourseQuiz");
// const CourseQuizSolution = require("../CourseQuizSolution");
// const Membership = require("../Membership");
// const Invoice = require("../Invoice");
// const Roles = require("../Roles");
// const Cart = require("../Cart");
// const Program = require("../Program");
// const EmailComposeCategory = require("../EmailComposeCategory");
// const EmailComposeFolder = require("../EmailComposeFolder");
// const EmailKey = require("../EmailKey");
// const EmailLibraryCategory = require("../EmailLibraryCategory");
// const EmailLibraryFolder = require("../EmailLibraryFolder");
// const EmailNurturingCategory = require("../EmailNurturingCategory");
// const EmailNurturingFolder = require("../EmailNurturingFolder");
// const EmailSentSave = require("../EmailSentSave");
// const EmailSystemCategory = require("../EmailSystemCategory");
// const EmailSystemFolder = require("../EmailSystemFolder");
// const EmailTemplates = require("../EmailTemplates");
// const EmployeeCategory = require("../EmployeeCategory");
// const MarketingEmail = require("../MarketingEmail");
// const EmailCampaign = require("../EmailCampaign");
// const TextCampaign = require("../TextCampaign");
// const Kanban = require("../Kanban");
// const KanbanTaskActivity = require("../KanbanActivity");
// const KanbanLastSeen = require("../KanbanLastSeen");
// const Label = require("../Label");
// const Board = require("../Board");
// const Workspace = require("../Workspace");
// const QRCodeLibrary = require("../QRCodeLibrary");
// const Appointment = require("../Appointment");
// const Notes = require("../Notes");
// const Progression = require("../Progression");
// const Category = require("../Category");
// const RankCategory = require("../RankCategory");
const Organization = require("../Organization");
// const EmployeeTask = require("../EmployeeTask");
// const SmartListFolder = require("../SmartListFolder");
// const SmartListItem = require("../SmartListItem");
// const EmployeeTaskRecipient = require("../EmployeeTaskRecipient");
// const File = require("../File");
// const Folder = require("../Folder");
// const Income = require("../Income");
// const FinanceCategory = require("../FinanceCategory");
// const UserGoal = require("../UserGoal");
// const ActionPlans = require("../ActionPlans");
// const TemplateFolder = require("../TemplateFolder");
// const TemplateSubfolder = require("../TemplateSubfolder");
// const Template = require("../Template");
const Notification = require("../Notification");
// const NotificationCriteria = require("../NotificationCriteria");
// const Ticket = require("../Ticket");
// const LivechatContact = require("../LivechatContact");
// const TextContact = require("../Text_contact");
const FormBuilder = require("../FormBuilder");
const FormAutomation = require("../FormAutomation");
// const ClientRanks = require("../ClientRanks");
// const RecentActvity = require("../RecentActvity");
// const Automation = require("../Automation");
const UproofLabel = require("../UproofLabel");
// const BillingHistory = require("../BillingHistory");
// const Class = require("../Class");
//const Attendance = require("../Attendance");
// const ClassBooking = require("../ClassBooking");
// const WorkHistory = require("../workHistory");
// const Event = require("../Event");
// const Deposit = require("../Deposit");
// const DepositPrice = require("../DepositPrice");

// Booking
// const Booking = require("../Booking");
// const BookingType = require("../BookingType");
// const CourseVideo = require("../CourseVideo");
// const Video = require("../Video");
//Form builder entry
const FormEntry = require("../FormEntry");
const Form = require("../Form");
const FormRule=require("../FormRule");
const FormPage=require("../FormPage");
const WebsiteEntry=require("../WebsiteEntry");
const ImageLibrary = require("../ImageLibrary");

// const Tag = require("../Tag");
// const Stage = require("../Stage");
// const ContactLeadSource = require("../ContactLeadSource");
// const Retention = require("../Retention");
const SubscriptionPlan = require("../SubscriptionPlan");
//const Permission = require("../Permission");
// const myJournalCat = require("../MyjournalCategory");
// const Compose = require("../Compose");
// const Comment = require("../Comment");
const PlnableWrkspace = require("../PlanableWorkspace");
const SocialProofCampaign = require("../SocialProofCampaign");
const FormCategory = require("../FormCategory");
const UprrofNotification = require("../UproofNotification");
const SubscriptionBought = require("../SubscriptionBought");
const DefaultElement = require("../DefaultElement");
//const Myjournal = require("../Myjournal");

// ** Shop
// const Shop = require("../Shop");
// const Product = require("../Product");
// const ProductBrand = require("../ProductBrand");
// const ProductCategory = require("../ProductCategory");
// const ProductUnit = require("../ProductUnit");
// const ProductColor = require("../productColor");
// const ProductSize = require("../productSize");
// const ProductFavorite = require("../ProductFavorite");
// const ProductRating = require("../ProductRating");
// const Inventory = require("../Inventory");
// const StockHistory = require("../StockHistory");
// const ProductWaste = require("../ProductWaste");
// const PosSale = require("../PosSale");
// const PosRefund = require("../PosRefund");

// const GoalWorkspace = require("../GoalWorkspace");
// const TaskCategory = require("../TaskCategory");
// const ContactPosition = require("../ContactPosition");
// const Onboarding = require("../Onboarding");
// const UserNote = require("../UserNote");
const LocalStorage = require("../LocalStorage");
//const Activity = require("../Activity");
// const Attendence = require("../Attendance");
//const ClassAttendance = require("../ClassAttendance");

//social
const SocialProofGoal = require("../SocialProofGoal");
const SocialProofDisplayUrl = require("../SocialProofDisplayUrl");
// const Printful = require("../Printful");

// //digitalContractMembership
// const MembershipDigitalContractTemplate = require("../MembershipDigitalContractTemplate");
// const MembershipDigitalContract = require("../MembershipDigitalContract");

// //tournament
// const Sport = require("../Sport");
// const TournamentEvent = require("../TournamentEvent");
// const Division = require("../Division");
// const Tournament = require("../Tournament");
// //employeeActivityLog
// const EmployeeActivityLog = require("../EmployeeActivityLog");

const WebBlog = require("../WebBlog");
const WebBuilder = require("../WebBuilder");
const WebPage = require("../WebPage");
const WebBuilderElement = require("../WebBuilderElement");
const WebBuilderElementCategory = require("../WebElementCategory");
const WebSiteCollection = require("../WebSiteCollection");
const WebSiteDataSet = require("../WebSiteDataSet");
const WebSiteConnection = require("../WebSiteConnection");
const ProductDataSet = require("../ProductDataSet");
const ProductCategory = require("../ProductCategory");
const WebSiteRole = require("../WebSiteRole");
const WebSiteInvite = require("../WebSiteInvite");
const models = {
  Authenticate,
  User,
  Temp,
  Contact,
  ContactType,
  // ContactField,
  // Course,
  // CourseLesson,
  // CourseVideo,
  // CourseAssignment,
  // CourseAssignmentSolution,
  // CourseQuiz,
  // CourseQuizSolution,
  // Member,
  // TextMessages,
  UserToken,
  // Project,
  // TaskReporting,
  // FreezeTask,
  // Roles,
  // CheckList,
  // ScheduleCheckList,
  // ScheduleTask,
  ResetPass,
  // Document,
  // DocumentRecipient,
  // DocumentCustomFields,
  // DocumentSignature,
  // Shop,
  // Invoice,
  // Membership,
  // Product,
  // MarketingEmail,
  // EmailCampaign,
  // TextCampaign,
  // EmailComposeCategory,
  // EmailComposeFolder,
  // EmailKey,
  // EmailLibraryCategory,
  // EmailLibraryFolder,
  // EmailNurturingCategory,
  // EmailNurturingFolder,
  // EmailSentSave,
  // EmailSystemCategory,
  // EmailSystemFolder,
  // EmployeeShift,
  // EmployeeSchedule,
  // RescheduleReq,
  // TimeOffReq,
  // EmployeeBudget,
  // EmployeeCategory,
  // EmailTemplates,
  // EmployeeAttendance,
  // Program,
  // //New
  // Cart,
  // Kanban,
  // KanbanTaskActivity,
  // KanbanLastSeen,
  // Label,
  // Board,
  // Workspace,
  // QRCodeLibrary,
  // Appointment,
  // Notes,
  // Progression,
  // Category,
  // RankCategory,
  Organization,
  // SmartListFolder,
  // SmartListItem,
  // EmployeeTask,
  // BuyMembership,
  // MembershipType,
  // BuyProduct,
  // Automation,
  // Booking,
  // BookingType,
  // EmployeeTaskRecipient,
  // File,
  // Folder,
  // //Attendence,
  // Income,
  // FinanceCategory,
  // UserGoal,
  Form,
  FormRule,
  FormPage,
  FormEntry,
  WebsiteEntry,
  ImageLibrary,
  // ActionPlans,
  // Video,
  // TemplateFolder,
  // TemplateSubfolder,
  // Template,
  // Tag,
  // Stage,
  // ContactLeadSource,
  Notification,
  // NotificationCriteria,
  // Ticket,
  // LivechatContact,
  // TextContact,
  FormBuilder,
  FormAutomation,
  // Retention,
  // ClientRanks,
  SubscriptionPlan,
  //Permission,
  // myJournalCat,
  // Compose,
  // Comment,
  PlnableWrkspace,
  SocialProofCampaign,
  FormCategory,
  UprrofNotification,
  SubscriptionBought,
  DefaultElement,
  // Myjournal,
  // RecentActvity,
  // ProductBrand,
  // ProductCategory,
  // ProductUnit,
  // ProductColor,
  // ProductSize,
  // ProductFavorite,
  // ProductRating,
  // Inventory,
  // StockHistory,
  // ProductWaste,
  // PosSale,
  // PosRefund,
  UproofLabel,
  // BillingHistory,
  // Class,
  // //Attendance,
  // ClassBooking,
  // Event,
  // Deposit,
  // DepositPrice,
  // WorkHistory,
  // GoalWorkspace,
  // TaskCategory,
  // BuyCourse,
  // ContactPosition,
  // Onboarding,
  // UserNote,
  LocalStorage,
  //Activity,
  SocialProofGoal,
  SocialProofDisplayUrl,
  // ClassAttendance,
  // MembershipDigitalContractTemplate,
  // MembershipDigitalContract,
  // Printful,
  // EmployeeActivityLog,
  // Sport,
  // TournamentEvent,
  // Division,
  // Tournament,
  WebBlog,
  WebBuilder,
  WebPage,
  WebBuilderElement,
  WebBuilderElementCategory,
  WebSiteCollection,
  WebSiteDataSet,
  WebSiteConnection,
  ProductDataSet,
  ProductCategory,
  WebSiteRole,
  WebSiteInvite,
};

module.exports = models;
