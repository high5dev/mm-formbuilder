const mongoose = require("mongoose");
// const ClientRanks = require("./ClientRanks");
// const Automation = require("./Automation");
// const Auth = require("./Authenticate");
// const moment = require("moment");
// const Kanban = require("./Kanban");
const { SendMail } = require("../service/sendMail");

const ContactSchema = new mongoose.Schema(
  {
    contactType: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "contact-types",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      index: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      default: null,
      index: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    phoneSecondary: { type: String, default: "" },
    photo: { type: String, default: "" },

    gender: {
      type: String,
      enum: ["male", "female", "transgender", ""],
      default: "",
    },
    address: {
      zipCode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
    },
    socialLinks: [
      {
        //logo: String,
        name: String,
        link: String,
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
    note: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
    },

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags",
        default: null,
      },
    ],

    company: { type: String, default: "" },
    companyPhone: {
      type: String,
      default: "",
    },
    companyEmail: {
      type: String,
      default: "",
    },
    companyAddress: {
      zipCode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
    },
    type: {
      type: String,
      default: "", //individual, company
    },
    workType: {
      type: String,
      default: "", //remote,inhouse
    },
    //automation

    automation: [
      {
        automationId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        currentActionId: {
          type: String,
        },
        fireTime: {
          type: Number,
        },
        isView: {
          type: Boolean,
          default: false,
        },
        isCustomTime: {
          type: Boolean,
          default: false,
        },
      },
    ],
    files: [
      {
        fileId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        file: String,
        createdAt: Date,
      },
    ],

    //
    others: [
      {
        address: {
          type: String,
          // required: true,
        },
        phone: {
          type: String,
          // required: true,
        },
        startDate: { type: Date, default: Date.now() },
        endDate: Date,
        file: String,
      },
    ],

    // Billing Address
    billingAddress: {
      country: {
        type: String,
        default: "",
      },
      street: {
        type: String,
        default: "",
      }, // ** New Field
      city: {
        type: String,
        default: "",
      },
      zipCode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
    },
    // s
    stripe: {
      customerId: String,
    },
    payments:[// payments other than stripe
      {
        paymentType:String,
        customerId:String
      }
    ],

    leadSource: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lead-sources",
        default: null,
      },
    ],

    isFormer: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    //------------ Employee ----------------------------------------------------------------
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: "roles", required: false }],
    shift: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee-shift" }],
    salary: {
      type: Number,
    },
    hourlyRate: {
      type: Number,
      default: 0,
    },
    punchId: {
      type: String,
      index: true,
    },
    outletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "outlets",
      default: null,
    },

    punchState: {
      type: Boolean,
      default: false,
    },
    isAddCalendar: { type: Boolean, default: false },
    isInternship: { type: Boolean, default: false },
    //------------ Lead ----------------------------------------------------------------
    stage: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    stageResult: {
      type: String,
      enum: ["win", "lose", null],
      default: null,
    },
    resultChangeDate: {
      type: Date,
      default: null,
    },
    //------------New ------------------------------------------------------------------
    weight: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    family: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "contacts",
        },
        relation: {
          type: String,
        },
      },
    ],
    fields: [
      {
        fieldId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "contact-fields",
        },
        value: {
          type: mongoose.Schema.Types.Mixed,
          default: null,
        },
      },
    ],
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "contacts",
    },
    isBuyer: {
      type: Boolean,
      default: false,
    },
    oldId: { type: mongoose.Schema.Types.ObjectId },
    oldIdString: { type: String },
    //--------------- analysis
    lastAttended: { type: Date, default: null },
    lastContacted: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const calculateTime = (startTime, actionDelay, setCustomtime, time) => {
  let startAutomationTime = 0;
  let startActionTime = 0;
  if (
    !startTime.isImmediately &&
    (startTime.unit == "minutes" || startTime.unit == "hours" || startTime.unit == "days")
  ) {
    startAutomationTime =
      startAutomationTime + moment.duration(startTime.time, startTime.unit).asSeconds();
  }
  if (setCustomtime) {
    let fourDaysLater = moment().hours(time).minutes(0).seconds(0);
    let timestamp = 0;
    let now = 0;
    if (actionDelay.unit == "days" || actionDelay.unit == "weeks" || actionDelay.unit == "months") {
      fourDaysLater.add(actionDelay.time, actionDelay.unit);
      timestamp = fourDaysLater.valueOf();
      now = moment().valueOf();
      startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
    }
  } else {
    if (actionDelay.unit == "days" || actionDelay.unit == "weeks" || actionDelay.unit == "months") {
      startActionTime =
        startActionTime + moment.duration(actionDelay.time, actionDelay.unit).asSeconds();
    }
  }
  return startAutomationTime + startActionTime;
};

const actionProcess = (automation, firstAction, startAutomationTime) => {
  const nextAction = automation.actions.find((action) => action.parentId == firstAction.id);
  let nextActionDelay = 0;
  if (nextAction?.duration?.unit) {
    if (nextAction.setCustomTime) {
      let fourDaysLater = moment().hours(time).minutes(0).seconds(0);
      let timestamp = 0;
      let now = 0;
      if (
        nextAction.duration.unit == "days" ||
        nextAction.duration.unit == "weeks" ||
        nextAction.duration.unit == "months"
      ) {
        fourDaysLater.add(nextAction.duration.time, nextAction.duration.unit);
        timestamp = fourDaysLater.valueOf();
        now = moment().valueOf();
        nextActionDelay = timestamp / 1000 + startAutomationTime - now / 1000;
      }
    } else {
      if (
        nextAction.duration.unit == "days" ||
        nextAction.duration.unit == "weeks" ||
        nextAction.duration.unit == "months"
      ) {
        nextActionDelay =
          nextActionDelay +
          moment.duration(nextAction.duration.time, nextAction.duration.unit).asSeconds();
      }
    }
  }

  let _currentDate = new Date();
  let _currentSecond = _currentDate.getTime() / 1000;
  const res = {
    automationId: automation._id,
    currentActionId: firstAction.id,
    fireTime: _currentSecond + nextActionDelay,
  };
  return res;
};

const startEvent = async (firstAction, contact, user, automation, startTime) => {
  let currentDate = new Date();
  let currentSecond = currentDate.getTime() / 1000;
  switch (firstAction.actionType) {
    case "email":
      SendMail({
        recipient: contact.email,
        from: `via MyManager <admin@mymanager.com>`,
        replyTo: `admin@mymanager.com`,
        subject: firstAction.subject,
        body: firstAction.content,
      });
      actionProcess(automation, firstAction, startTime);
      break;
    case "text":
      let accountSid = process.env.TWILIO_ACCOUNT_SID;
      let authToken = process.env.TWILIO_AUTH_TOKEN;
      const smsClient = require("twilio")(accountSid, authToken);
      smsClient.messages.create({
        body: firstAction.content,
        from: process.env.FROM_NUMBER,
        to: contact.phone,
      });

      actionProcess(automation, firstAction, startTime);
      break;
    case "notification":
      if (firstAction.to.type == "ME") {
        // let manager = Contact.find({
        //   _id: mongoose.Types.ObjectId(req.contact.userId),
        // });
        switch (firstAction.method) {
          case "EMAIL":
            SendMail({
              recipient: user.email,
              from: `admin@mymanager.com`,
              replyTo: `admin@mymanager.com`,
              subject: firstAction.subject,
              body: firstAction.content,
            });
            break;
          case "TEXT":
            let accountSid = process.env.TWILIO_ACCOUNT_SID;
            let authToken = process.env.TWILIO_AUTH_TOKEN;
            const smsClient = require("twilio")(accountSid, authToken);
            smsClient.messages.create({
              body: firstAction.content,
              from: process.env.FROM_NUMBER,
              to: user.phone,
            });

            break;
          case "TOOLBAR":
            const managerSocket = socket_connections.find(
              (item) => item.adminId === contact.userId
            );
            if (!managerSocket) {
              managerSocket.socket.emit("newNotification", {
                notification: firstAction.content,
              });
            }
            break;
          default:
            break;
        }
      } else if (firstAction.to.type == "CONTACT") {
        let contactsForNotification = [];
        firstAction.to.contacts.map((contact) => {
          ContactType.findOne({ name: contact }).then((contact_type) => {
            Contact.find({
              contactType: mongoose.Types.ObjectId(contact_type._id),
            }).then((noteContacts) => contactsForNotification.push(noteContacts));
          });
        });
        switch (firstAction.method) {
          case "EMAIL":
            contactsForNotification.map(async (item) => {
              try {
                const sendmail = await SendMail({
                  recipient: item.email,
                  from: `admin@mymanager.com`,
                  replyTo: `admin@mymanager.com`,
                  subject: firstAction.subject,
                  body: firstAction.content,
                });
              } catch (error) {
                return res.status(400).json({
                  errors: { common: { msg: error.message } },
                });
              }
            });
            break;
          case "TEXT":
            let accountSid = process.env.TWILIO_ACCOUNT_SID;
            let authToken = process.env.TWILIO_AUTH_TOKEN;
            const smsClient = require("twilio")(accountSid, authToken);
            contactsForNotification.map(async (item) => {
              try {
                const sendsms = await smsClient.messages.create({
                  body: firstAction.content,
                  from: process.env.FROM_NUMBER,
                  to: item.phone,
                });
              } catch (error) {
                return res.status(400).json({
                  errors: { common: { msg: error.message } },
                });
              }
            });
          case "TOOLBAR":
            contactsForNotification.map((item) => {
              const managerSocket = socket_connections.find((i) => i.adminId == item._id);
              if (!managerSocket) {
                managerSocket.socket.emit("newNotification", {
                  notification: firstAction.content,
                });
              }
            });
            break;
          default:
            break;
        }
      }
      actionProcess(automation, firstAction, startTime);
      break;

    case "task":
      const { taskContent } = firstAction;
      let bodyData = {
        title: taskContent?.title,
        boardId: taskContent?.statusId,
        description: taskContent?.description,
        labels: taskContent?.labels?.map((x) => x.label),
        coverImage: taskContent?.coverImage,
      };
      bodyData = {
        ...bodyData,
        organizationId: automation?.organizationId ? automation?.organizationId : null,
        // creatorType: organization
        //   ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        //   : user.userType,
        userId: user._id,
      };

      const lastId = await Kanban.findOne(
        {
          organizationId: automation?.organizationId ? automation?.organizationId : null,
          userId: user._id,
        },
        {},
        { sort: { id: -1 } }
      );
      bodyData.id = lastId?.id + 1;
      const newKanban = new Kanban(bodyData);
      await newKanban.save();

      // send email
      SendMail({
        recipient: contact.email,
        from: `via MyManager <admin@mymanager.com>`,
        replyTo: `admin@mymanager.com`,
        subject: firstAction.subject,
        body: firstAction.content,
      });

      actionProcess(automation, firstAction, startTime);
      break;
  }
};

const startAutomation = async (contact) => {
  let automations = [];

  // ** rankCategoryId
  const rankCategoryId = await ClientRanks.findOne({
    userId: contact.userId,
    contactId: contact._id,
  })?.order;

  // ** find Contacts Automation
  const findUponAutomationWithContact = await Automation.find({
    $or: [
      {
        $and: [
          { userId: mongoose.Types.ObjectId(contact.userId) },
          { "contactInfo.contactType": "Contacts" },
          { "activationUpon.uponType": "Upon Entry" },
          { isActive: true },
          { isDelete: false },
        ],
      },
    ],
  });

  let query = [
    {
      "smartlist.contactType": {
        $elemMatch: { $in: contact.contactType.map((x) => x.toString()) },
      },
    },
    {
      "smartlist.status": {
        $elemMatch: { $in: [contact.status] },
      },
    },
  ];

  if (contact.leadSource.length) {
    query = [
      ...query,
      {
        "smartlist.leadSource": {
          $elemMatch: { $in: contact.leadSource },
        },
      },
    ];
  }

  if (contact.tags.length) {
    query = [
      ...query,
      {
        "smartlist.tag": {
          $elemMatch: { $in: contact.tags },
        },
      },
    ];
  }

  if (rankCategoryId) {
    query = {
      ...query,
      "smartlist.progression": {
        $elemMatch: { $in: [mongoose.Types.ObjectId(rankCategoryId)] },
      },
    };
  }

  const smartListAutomation = await Automation.aggregate([
    {
      $match: {
        $and: [
          { userId: mongoose.Types.ObjectId(contact.userId) },
          { "contactInfo.contactType": "SmartList" },
          { "activationUpon.uponType": "Upon Entry" },
          { isActive: true },
          { isDelete: false },
        ],
      },
    },
    {
      $unwind: "$contactInfo.smartList",
    },
    {
      $lookup: {
        from: "smartlistitems",
        localField: "contactInfo.smartList",
        foreignField: "_id",
        as: "smartlist",
      },
    },
    { $unwind: "$smartlist" },
    {
      $match: {
        $and: [...query],
      },
    },
  ]);
  const user = await Auth.findById(contact.userId);
  // ** Console
  smartListAutomation.map((automation) => {
    console.log("smartListAutomation", automation);
  });

  if (findUponAutomationWithContact.length > 0) {
    findUponAutomationWithContact.map((automation) => {
      const startTime = automation.activateTime;
      const firstAction = automation.actions.find((action) => action.parentId == "0");
      const action = actionProcess(automation, firstAction, startTime);
      automations.push(action);
      const fireTime = calculateTime(
        startTime,
        firstAction.duration,
        firstAction.setCustomTime,
        firstAction.customTime.time
      );
      console.log(`Set timeout for action in ${fireTime} seconds after.`);

      setTimeout(() => {
        startEvent(firstAction, contact, user, automation, startTime);
      }, fireTime * 1000);
    });
  }

  return automations;
};

// ContactSchema.post("save", async function (data) {
//   if (data.isBuyer !== true) {
//     const automations = await startAutomation(data);
//     if (automations.length > 0) {
//       await mongoose.model("contacts").findByIdAndUpdate(data._id, { automation: automations });
//     }
//   }
//   return data;
// });

module.exports = mongoose.model("contacts", ContactSchema);
