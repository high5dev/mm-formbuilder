const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  organizations: [
    {
      organizationId: {
        type: mongoose.Types.ObjectId,
        ref: "organization",
      },
      userType: {
        type: String,
      },
      locationName: {
        type: String,
        default:""
      },
    },
  ],
  roles: [
    {
      organizationId: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: "organizations",
      },
      contactTypeId: {
        type: mongoose.Types.ObjectId,
        ref: "contact-types",
      },
      assignerId: {
        type: mongoose.Types.ObjectId,
        ref: "auths",
      },
      contactId: {
        type: mongoose.Types.ObjectId,
        ref: "contacts",
      },
    },
  ],
  gender: {
    type: String,
    enum: ["male", "female", "others", ""],
    default: "",
  },
  dob: {
    type: Date,
  },
  businessType: {
    type: String,
    trim: true,
    default: "",
  },

  address: {
    zipCode: String,
    state: String,
    street: String,
    city: String,
    country: String,
  },

  company: {
    title: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
    },
    headerPhoto: {
      type: String,
    },
    address: {
      zipCode: String,
      state: String,
      street: String,
      city: String,
      country: String,
    },
    phone: {
      type: String,
      default: "",
    },
    alternativePhone: {
      type: String,
      default: "",
    },
    coorporateName:{
      type:String,
      default:""
    },
    taxId:{
      type:String,
      default:""
    }
  },
  position: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // location: {
  //   type: String,
  //   value: "",
  // },
  stripe: {
    accountId: String,
    customerId: String,
  },
  defaultPayment: {
    type: String,
    default: ""
  },
  payments: {
    type: Array,
    default: []
  },
  language: {
    type: String,
  },
  currency: {
    type: String,
  },
  timeZone: {
    type: String,
  },
  oldId:{
    type:mongoose.Schema.Types.ObjectId
  }
},{timestamps:true});

module.exports = mongoose.model("users", userSchema);
