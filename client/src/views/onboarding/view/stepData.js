// ** Icons
import {
  BsChat,
  BsGear,
  BsGem,
  BsGraphUp,
  BsJournalRichtext,
  BsMailbox,
  BsMailbox2,
  BsPrinter,
  BsQrCode,
  BsRocket,
  BsTicket
} from 'react-icons/bs';
import {
  MdCardMembership,
  MdNotificationsNone,
  MdOutlineLeaderboard,
  MdOutlineShoppingCart,
  MdSecurity
} from 'react-icons/md';
import { CiShop } from 'react-icons/ci';
import {
  AiOutlineOrderedList,
  AiOutlineSchedule,
  AiOutlineShop,
  AiOutlineUser
} from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';
import { GoGraph, GoMail } from 'react-icons/go';
import { GrNotification } from 'react-icons/gr';
import { TiContacts } from 'react-icons/ti';
import { FaDollyFlatbed, FaUserFriends, FaUsers, FaTasks, FaMoneyCheck } from 'react-icons/fa';
import { GiReceiveMoney, GiStairsGoal, GiSettingsKnobs } from 'react-icons/gi';
import { Users } from 'react-feather';
import {
  RiCouponLine,
  RiMoneyDollarBoxLine,
  RiBillFill,
  RiLuggageDepositLine,
  RiHistoryFill
} from 'react-icons/ri';
import { BiMoney } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import { VscReport } from 'react-icons/vsc';

export const step1 = [
  {
    id: 1000, // do not change this id
    title: 'Gym Programs, level and ranks',
    icon: <Users size={24} />,
    url: '/contacts/clients/list',
    checked: false,
    className: 'tour-step-1'
  },
  {
    id: 1001,
    title: 'Set up billing and payment processing',
    icon: <FaDollyFlatbed size={24} />,
    url: '/contacts/employee/list',
    checked: false,
    className: 'tour-step-2'
  }
];

// ** Contacts
export const step2 = [
  {
    id: 2001,
    title: 'Add New Contact',
    subTitle: 'Experience creating new contacts.',
    url: '/client',
    icon: <IoCreateOutline size={24} />,
    checked: false,
    className: 'contact-step-2001'
  },
  {
    id: 2002,
    title: 'Progression & Promote',
    subTitle: 'Contact members can be promoted based on their contributions.',
    url: '/client',
    icon: <BsGraphUp size={24} />,
    checked: false,
    className: 'contact-step-2002'
  },
  {
    id: 2003,
    title: 'Print',
    subTitle: 'Print your contact list',
    url: '/client',
    icon: <BsPrinter size={24} />,
    checked: false,
    className: 'contact-step-2003'
  },
  {
    id: 2004,
    title: 'Shift & Schedule',
    subTitle: 'Employee shift work and schedule management',
    url: '/employee',
    icon: <AiOutlineSchedule size={24} />,
    checked: false,
    className: 'contact-step-2004'
  },
  {
    id: 2005,
    title: 'Roles & Permissions',
    subTitle: 'You can set employee roles and permissions',
    url: '/employee',
    icon: <BsGem size={24} />,
    checked: false,
    className: 'contact-step-2005'
  },
  {
    id: 2006,
    title: 'Work History',
    subTitle: "A powerful tracking tool for an employee's work history",
    url: '/employee',
    icon: <RiHistoryFill size={24} />,
    checked: false,
    className: 'contact-step-2006'
  },
  {
    id: 2007,
    title: 'Reporting',
    subTitle: "Task reporting for the results of the employee's work",
    url: '/employee',
    icon: <VscReport size={24} />,
    checked: false,
    className: 'contact-step-2007'
  },
  {
    id: 2008,
    title: 'Lead stage upgrade win & lost',
    subTitle: 'Lead member stage management',
    url: '/lead',
    icon: <MdOutlineLeaderboard size={24} />,
    checked: false,
    className: 'contact-step-2008'
  }
];

// ** Tasks and Goals
export const step3 = [
  {
    id: 3000,
    title: 'Journal',
    subTitle: 'Simplifying Journal Management with User-Friendly UI',
    url: '/tasksAndGoals',
    icon: <BsJournalRichtext size={24} />,
    checked: false,
    className: 'tour-step-61'
  },
  {
    id: 3001,
    title: 'Tasks',
    subTitle: 'Enhancing Efficiency in Task Management through',
    url: '/tasksAndGoals',
    icon: <FaTasks size={24} />,
    checked: false,
    className: 'tour-step-62'
  },
  {
    id: 3002,
    title: 'Goals',
    subTitle: 'Tracking and Visualizing Progress towards your Goals',
    url: '/tasksAndGoals',
    icon: <GiStairsGoal size={24} />,
    checked: false,
    className: 'tour-step-63'
  }
];

// ** Marketing
export const step4 = [
  {
    id: 4001,
    title: 'Email',
    subTitle:
      'Send your customized email to your clients and employees. You can use template email',
    url: '/marketing',
    icon: <GoMail size={24} />,
    checked: false,
    className: 'tour-step-4001'
  },
  {
    id: 4002,
    title: 'Text',
    subTitle: 'Communication with friendly Chat UI',
    url: '/marketing',
    icon: <BsChat size={24} />,
    checked: false,
    className: 'tour-step-4002'
  },
  {
    id: 4003,
    title: 'Automation',
    subTitle: 'Tracking and Visualizing Progress towards your Goals',
    url: '/marketing',
    icon: <AiOutlineOrderedList size={24} />,
    checked: false,
    className: 'tour-step-4003'
  }
];

export const step5 = [
  {
    id: 5000,
    title: 'Gym Programs, level and ranks',
    icon: <Users size={24} />,
    checked: false,
    className: 'tour-step-9'
  },
  {
    id: 5001,
    title: 'Set up billing and payment processing',
    icon: <FaDollyFlatbed size={24} />,
    checked: false,
    className: 'tour-step-10'
  },
  {
    id: 5002,
    title: 'Set up the membership options and pricing',
    icon: <FaUsers size={24} />,
    checked: false
  }
];

// ** Business Tools
export const step6 = [
  {
    id: 6001,
    title: 'Forms and Funnels',
    subTitle: 'Gain total control for your forms and funnels',
    url: '/business/tools',
    icon: <BsJournalRichtext size={24} />,
    checked: false,
    className: 'tour-step-6001'
  },
  {
    id: 6002,
    title: 'QR Code and Barcode',
    subTitle: 'Simplifying management of QR Code and Barcode for your business',
    url: '/business/tools',
    icon: <BsQrCode size={24} />,
    checked: false,
    className: 'tour-step-6002'
  },
  {
    id: 6003,
    title: 'Chat',
    subTitle: 'Test communication with your friends',
    url: '/business/tools',
    icon: <BsChat size={24} />,
    checked: false,
    className: 'tour-step-6003'
  },
  {
    id: 6004,
    title: 'Ticket',
    subTitle: 'Manage your tickets with User friendly UI',
    url: '/business/tools',
    icon: <BsTicket size={24} />,
    checked: false,
    className: 'tour-step-6004'
  }
];

// ** Shop
export const step7 = [
  {
    id: 7001,
    title: 'My Shop',
    subTitle: 'Gain total control for your Shop',
    url: '/ecommerce/shop',
    icon: <AiOutlineShop size={24} />,
    checked: false,
    className: 'tour-step-7001'
  },
  {
    id: 7002,
    title: 'Products',
    subTitle: 'Simplifying management of Products for your Shop',
    url: '/ecommerce/shop',
    icon: <MdOutlineShoppingCart size={24} />,
    checked: false,
    className: 'tour-step-7002'
  },
  {
    id: 7003,
    title: 'Memberships',
    subTitle: 'Get access for special products and services',
    url: '/ecommerce/shop',
    icon: <MdCardMembership size={24} />,
    checked: false,
    className: 'tour-step-7003'
  },
  {
    id: 7004,
    title: 'Courses',
    subTitle: 'Browse available courses and get essential one or more',
    url: '/ecommerce/shop',
    icon: <BsRocket size={24} />,
    checked: false,
    className: 'tour-step-7004'
  },
  {
    id: 7005,
    title: 'Coupons',
    subTitle: 'Entitles holders to discounts on specific products',
    url: '/ecommerce/shop',
    icon: <RiCouponLine size={24} />,
    checked: false,
    className: 'tour-step-7005'
  },
  {
    id: 7006,
    title: 'Setting',
    subTitle: 'You can customize and update your shop',
    url: '/ecommerce/shop',
    icon: <BsGear size={24} />,
    checked: false,
    className: 'tour-step-7006'
  }
];

// ** Finance
export const step8 = [
  {
    id: 8001,
    title: 'Invoice',
    subTitle: 'Send invoice for your goods or services provided',
    url: '/finance',
    icon: <BiMoney size={24} />,
    checked: false,
    className: 'tour-step-7006'
  },
  {
    id: 8002,
    title: 'Income',
    subTitle: 'Check your income finances',
    url: '/finance',
    icon: <GiReceiveMoney size={24} />,
    checked: false,
    className: 'tour-step-7006'
  },
  {
    id: 8003,
    title: 'Expense',
    subTitle: 'How much expensed than last month?',
    url: '/finance',
    icon: <RiMoneyDollarBoxLine size={24} />,
    checked: false,
    className: 'tour-step-7006'
  },
  {
    id: 8004,
    title: 'Profit & Loss',
    subTitle: 'Check your Profit and Loss',
    url: '/finance',
    icon: <FaMoneyCheck size={24} />,
    checked: false,
    className: 'tour-step-7006'
  }
];

// ** File Manager
export const step9 = [
  {
    id: 9001,
    title: 'File Manager',
    subTitle: 'File Management for your business',
    url: '/filemanager',
    icon: <FiSave size={24} />,
    checked: false,
    className: 'filemanager-step-9001'
  }
];

// ** Setting
export const step10 = [
  {
    id: 10001,
    title: 'Account',
    subTitle: 'Setting for Account',
    url: '/setting',
    icon: <AiOutlineUser size={24} />,
    checked: false,
    className: 'settings-step-10001'
  },
  {
    id: 10002,
    title: 'Billing',
    subTitle: 'Setting for Billing',
    url: '/setting',
    icon: <RiBillFill size={24} />,
    checked: false,
    className: 'settings-step-10002'
  },
  {
    id: 10003,
    title: 'Progression',
    subTitle: 'Setting for Progression',
    url: '/setting',
    icon: <BsGraphUp size={24} />,
    checked: false,
    className: 'settings-step-10003'
  },
  {
    id: 10004,
    title: 'Advanced Settings',
    subTitle: 'Setting for Advanced Settings',
    url: '/setting',
    icon: <GiSettingsKnobs size={24} />,
    checked: false,
    className: 'settings-step-10004'
  },
  {
    id: 10005,
    title: 'Notification',
    subTitle: 'Setting for Notification',
    url: '/setting',
    icon: <MdNotificationsNone size={28} />,
    checked: false,
    className: 'settings-step-10005'
  },
  {
    id: 10006,
    title: 'Security',
    subTitle: 'Setting for Security',
    url: '/setting',
    icon: <MdSecurity size={24} />,
    checked: false,
    className: 'settings-step-10006'
  },
  {
    id: 10007,
    title: 'Deposit',
    subTitle: 'Setting for Deposit',
    url: '/setting',
    icon: <RiLuggageDepositLine size={24} />,
    checked: false,
    className: 'settings-step-10007'
  },
  {
    id: 10008,
    title: 'Contacts',
    subTitle: 'Setting for Contacts',
    url: '/setting',
    icon: <TiContacts size={24} />,
    checked: false,
    className: 'settings-step-10008'
  }
];

// ** More
export const step11 = [
  {
    id: 11000,
    title: 'Gym Programs, level and ranks',
    icon: <Users size={24} />,
    checked: false
  },
  {
    id: 11001,
    title: 'Set up billing and payment processing',
    icon: <FaDollyFlatbed size={24} />,
    checked: false
  },
  {
    id: 11002,
    title: 'Set up the membership options and pricing',
    icon: <FaUsers size={24} />,
    checked: false
  },
  {
    id: 11003,
    title: 'Add and import member data',
    icon: <FaUserFriends size={24} />,
    checked: false
  }
];
