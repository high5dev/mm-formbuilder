const defaultContactFields = [
  {
    title: "FullName",
    order: 0,
    isShown: true,
    defaultId: "fullName",
  },
  {
    title: "Email",
    order: 1,
    isShown: false,
    defaultId: "email",
  },
  {
    title: "Phone",
    order: 2,
    isShown: true,
    defaultId: "phone",
  },
  {
    title: "Second Phone",
    order: 3,
    isShown: false,
    defaultId: "phoneSecondary",
  },
  {
    title: "Photo",
    order: 4,
    isShown: false,
    defaultId: "photo",
  },
  {
    title: "Gender",
    order: 5,
    isShown: false,
    defaultId: "gender",
  },
  {
    title: "Address",
    order: 6,
    isShown: true,
    defaultId: "address",
  },
  {
    title: "Social Links",
    order: 7,
    isShown: false,
    defaultId: "socialLinks",
  },
  {
    title: "Status",
    order: 8,
    isShown: true,
    defaultId: "status",
  },
  {
    title: "Note",
    order: 9,
    isShown: true,
    defaultId: "note",
  },
  {
    title: "Dob",
    order: 10,
    isShown: false,
    defaultId: "dob",
  },
  {
    title: "Tag",
    order: 11,
    isShown: true,
    defaultId: "tags",
  },
  {
    title: "Company",
    order: 12,
    isShown: false,
    defaultId: "company",
  },
  {
    title: "Company Phone",
    order: 13,
    isShown: false,
    defaultId: "companyPhone",
  },
  {
    title: "Company Email",
    order: 14,
    isShown: false,
    defaultId: "companyEmail",
  },
  {
    title: "Company Address",
    order: 15,
    isShown: false,
    defaultId: "companyAddress",
  },
  {
    title: "Type",
    order: 16,
    isShown: false,
    defaultId: "type",
  },
  {
    title: "Position",
    order: 17,
    isShown: true,
    defaultId: "position",
  },
  {
    title: "Files",
    order: 18,
    isShown: false,
    defaultId: "files",
  },
  {
    title: "Others",
    order: 19,
    isShown: false,
    defaultId: "others",
  },
  {
    title: "Billing Address",
    order: 20,
    isShown: false,
    defaultId: "billingAddress",
  },
  {
    title: "Stripe",
    order: 21,
    isShown: false,
    defaultId: "stripe",
  },
  {
    title: "Lead Source",
    order: 22,
    isShown: false,
    defaultId: "leadSource",
  },
  {
    title: "IsFormer",
    order: 23,
    isShown: false,
    defaultId: "isFormer",
  },
  {
    title: "Role",
    order: 24,
    isShown: false,
    defaultId: "role",
  },
  {
    title: "Shift",
    order: 25,
    isShown: false,
    defaultId: "shift",
  },
  {
    title: "Salary",
    order: 26,
    isShown: false,
    defaultId: "salary",
  },
  {
    title: "PunchId",
    order: 27,
    isShown: false,
    defaultId: "punchId",
  },
  {
    title: "Outlet",
    order: 28,
    isShown: false,
    defaultId: "outletId",
  },
  {
    title: "Punch State",
    order: 29,
    isShown: false,
    defaultId: "punchState",
  },
  {
    title: "Stage",
    order: 30,
    isShown: false,
    defaultId: "stage",
  },
  {
    title: "Weight",
    order: 31,
    isShown: false,
    defaultId: "weight",
  },
  {
    title: "Height",
    order: 32,
    isShown: false,
    defaultId: "height",
  },
  {
    title: "Size",
    order: 33,
    isShown: false,
    defaultId: "size",
  },
  {
    title: "Family",
    order: 34,
    isShown: false,
    defaultId: "family",
  },
  {
    title: "Onboard",
    order: 35,
    isShown: false,
  },
  {
    title: "Rank",
    order: 36,
    isShown: false,
  },
];

const clientDefaultFields = [
  { 
    title: "FullName", 
    order: 0, 
    isShown: true, 
    defaultId: "fullName", 
    width:240
  },
  {
    title: "Phone",
    order: 2,
    isShown: true,
    defaultId: "phone",
    width:200
  },
  {
    title: "Status",
    order: 8,
    isShown: true,
    defaultId: "status",
    width:180
  },
  {
    title: "Tag",
    order: 11,
    isShown: true,
    defaultId: "tags",
    width:120
  },
  {
    title: "Address",
    order: 6,
    isShown: true,
    defaultId: "address",
    width:172
  },
  
];
const leadDefaultFields = [
  { 
    title: "FullName", 
    order: 0, 
    isShown: true, 
    defaultId: "fullName" 
  },
  {
    title: "Phone",
    order: 2,
    isShown: true,
    defaultId: "phone",
  },
  {
    title: "Status",
    order: 8,
    isShown: true,
    defaultId: "status",
  },
  {
    title: "Tag",
    order: 11,
    isShown: true,
    defaultId: "tags",
  },
  {
    title: "Address",
    order: 6,
    isShown: true,
    defaultId: "address",
  },
];
const employeeDefaultFields = [
  { 
    title: "FullName", 
    order: 0, 
    isShown: true, 
    defaultId: "fullName" 
  },
  {
    title: "Phone",
    order: 2,
    isShown: true,
    defaultId: "phone",
  },
  {
    title: "Status",
    order: 8,
    isShown: true,
    defaultId: "status",
  },
  {
    title: "Tag",
    order: 11,
    isShown: true,
    defaultId: "tags",
  },
  {
    title: "Address",
    order: 6,
    isShown: true,
    defaultId: "address",
  },
  {
    title: "Position",
    order: 17,
    isShown: true,
    defaultId: "position",
  },
];

module.exports = { defaultContactFields,clientDefaultFields };
