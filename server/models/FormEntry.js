const FormAutomation = require("./FormAutomation");
const Auth = require("./Authenticate");
const FormBuilder = require("./FormBuilder");
const { default: mongoose } = require("mongoose");
const moment = require("moment");
const { SendBulkMail, SendMail } = require("../service/sendMail");

const FormEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "auths",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      default: null,
      ref: "organizations",
    },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "form-builders",
    },
    contacts: [
      {
        fullName: {
          type: String,
          trim: true,
        },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        type: { type: String, default: "" },
        dob: {
          type: Date,
        },
        address: {
          zipCode: String,
          state: String,
          street: String,
          city: String,
          country: String,
        },
        isAddedToLead: {
          type: Boolean,
          default: false,
        },
        contactType:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"contact-types"
        }
      },
    ],

    note: {
      type: String,
      default: "",
    },
    inputData: {
      type: Object,
    },
    shippingAddress: {
      zipCode: String,
      state: String,
      address: String,
      city: String,
      country: String,
    },
    billingAddress: {
      fullName: String,
      phone: String,
      email: String,
      dob: String,
      zipCode: String,
      state: String,
      address: String,
      city: String,
      country: String,
    },
    sms: {
      type: String,
    },
    survey: {
      type: Object,
    },
    payment: {
      paymentIntentId: String,
      amount: Number,
      status: {
        type: String,
        default: "due",
        enum: ["due", "past due", "paid", "refund", "forfeit", "failed"],
      },
      currency: { type: String, default: "usd" },
      paymentMethod: String,
      customerId: String,
      date: Date,
      accountId: String,
    },
    signature: {
      type: Object,
    },
    order: {
      products: [
        { productId: mongoose.Schema.Types.ObjectId, qty: Number, name: String, price: Number },
      ],
      total: Number,
    },
    booking: {
      type: Object,
    },

    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "invoices",
    },
  },
  { timestamps: true }
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

const actionProcess = (automation, currentAction, startAutomationTime) => {
  const nextAction = automation.actions.find((action) => action.parentId == currentAction.id);
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
    currentActionId: currentAction.id,
    fireTime: _currentSecond + nextActionDelay,
  };
  return res;
};

const startEvent = async (currentAction, contact, user, automation, startTime) => {
  let currentDate = new Date();
  let currentSecond = currentDate.getTime() / 1000;
  switch (currentAction.actionType) {
    case "email":
      SendMail({
        recipient: contact.email,
        from: `via MyManager <admin@mymanager.com>`,
        replyTo: `admin@mymanager.com`,
        subject: currentAction.subject,
        body: currentAction.content,
      });
      actionProcess(automation, currentAction, startTime);
      break;
    case "text":
      let accountSid = process.env.TWILIO_ACCOUNT_SID;
      let authToken = process.env.TWILIO_AUTH_TOKEN;
      const smsClient = require("twilio")(accountSid, authToken);
      smsClient.messages.create({
        body: currentAction.content,
        from: process.env.FROM_NUMBER,
        to: contact.phone,
      });

      actionProcess(automation, currentAction, startTime);
      break;
    case "notification":
      if (currentAction.to.type == "ME") {
        // let manager = Contact.find({
        //   _id: mongoose.Types.ObjectId(req.contact.userId),
        // });
        switch (currentAction.method) {
          case "EMAIL":
            SendMail({
              recipient: user.email,
              from: `admin@mymanager.com`,
              replyTo: `admin@mymanager.com`,
              subject: currentAction.subject,
              body: currentAction.content,
            });
            break;
          case "TEXT":
            let accountSid = process.env.TWILIO_ACCOUNT_SID;
            let authToken = process.env.TWILIO_AUTH_TOKEN;
            const smsClient = require("twilio")(accountSid, authToken);
            smsClient.messages.create({
              body: currentAction.content,
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
                notification: currentAction.content,
              });
            }
            break;
          default:
            break;
        }
      } else if (currentAction.to.type == "CONTACT") {
        let contactsForNotification = [];
        currentAction.to.contacts.map((contact) => {
          ContactType.findOne({ name: contact }).then((contact_type) => {
            Contact.find({
              contactType: mongoose.Types.ObjectId(contact_type._id),
            }).then((noteContacts) => contactsForNotification.push(noteContacts));
          });
        });
        switch (currentAction.method) {
          case "EMAIL":
            contactsForNotification.map(async (item) => {
              try {
                const sendmail = await SendMail({
                  recipient: item.email,
                  from: `admin@mymanager.com`,
                  replyTo: `admin@mymanager.com`,
                  subject: currentAction.subject,
                  body: currentAction.content,
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
                  body: currentAction.content,
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
                  notification: currentAction.content,
                });
              }
            });
            break;
          default:
            break;
        }
      }
      actionProcess(automation, currentAction, startTime);
      break;

    case "task":
      const { taskContent } = currentAction;
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
        subject: currentAction.subject,
        body: currentAction.content,
      });

      actionProcess(automation, currentAction, startTime);
      break;
  }
};

const actionProceed = async (currentAction, contacts, user) => {
  console.log(currentAction?.id);
  switch (currentAction.actionType) {
    case "email":
      contacts?.map((contact) => {
        console.log("sending email --> ", contact.email, currentAction.subject);
        contacts?.length > 30
          ? SendBulkMail({
              recipient: contact.email,
              from: `via MyManager <admin@mymanager.com>`,
              replyTo: `admin@mymanager.com`,
              subject: currentAction.subject,
              body: currentAction.content,
            })
          : SendMail({
              recipient: contact.email,
              from: `via MyManager <admin@mymanager.com>`,
              replyTo: `admin@mymanager.com`,
              subject: currentAction.subject,
              body: currentAction.content,
            });
      });
      break;
    case "text":
      let accountSid = process.env.TWILIO_ACCOUNT_SID;
      let authToken = process.env.TWILIO_AUTH_TOKEN;
      const smsClient = require("twilio")(accountSid, authToken);
      smsClient.messages.create({
        body: currentAction.content,
        from: process.env.FROM_NUMBER,
        to: contact.phone,
      });

      break;
    case "notification":
      if (currentAction.to.type == "ME") {
        // let manager = Contact.find({
        //   _id: mongoose.Types.ObjectId(req.contact.userId),
        // });
        switch (currentAction.method) {
          case "EMAIL":
            contacts?.map((contact) => {
              contacts?.length > 30
                ? SendBulkMail({
                    recipient: contact.email,
                    from: `admin@mymanager.com`,
                    replyTo: `admin@mymanager.com`,
                    subject: currentAction.subject,
                    body: currentAction.content,
                  })
                : SendMail({
                    recipient: contact.email,
                    from: `admin@mymanager.com`,
                    replyTo: `admin@mymanager.com`,
                    subject: currentAction.subject,
                    body: currentAction.content,
                  });
            });
            break;
          case "TEXT":
            let accountSid = process.env.TWILIO_ACCOUNT_SID;
            let authToken = process.env.TWILIO_AUTH_TOKEN;
            const smsClient = require("twilio")(accountSid, authToken);
            smsClient.messages.create({
              body: currentAction.content,
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
                notification: currentAction.content,
              });
            }
            break;
          default:
            break;
        }
      } else if (currentAction.to.type == "CONTACT") {
        let contactsForNotification = [];
        currentAction.to.contacts.map((contact) => {
          ContactType.findOne({ name: contact }).then((contact_type) => {
            Contact.find({
              contactType: mongoose.Types.ObjectId(contact_type._id),
            }).then((noteContacts) => contactsForNotification.push(noteContacts));
          });
        });
        switch (currentAction.method) {
          case "EMAIL":
            contactsForNotification.map(async (item) => {
              try {
                contacts?.map((contact) => {
                  contacts?.length > 30
                    ? SendBulkMail({
                        recipient: contact.email,
                        from: `admin@mymanager.com`,
                        replyTo: `admin@mymanager.com`,
                        subject: currentAction.subject,
                        body: currentAction.content,
                      })
                    : SendMail({
                        recipient: contact.email,
                        from: `admin@mymanager.com`,
                        replyTo: `admin@mymanager.com`,
                        subject: currentAction.subject,
                        body: currentAction.content,
                      });
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
                  body: currentAction.content,
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
                  notification: currentAction.content,
                });
              }
            });
            break;
          default:
            break;
        }
      }
      break;
    case "task":
      const { taskContent } = currentAction;
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
      contacts?.map((contact) => {
        contacts?.length > 30
          ? SendBulkMail({
              recipient: contact.email,
              from: `via MyManager <admin@mymanager.com>`,
              replyTo: `admin@mymanager.com`,
              subject: currentAction.subject,
              body: currentAction.content,
            })
          : SendMail({
              recipient: contact.email,
              from: `via MyManager <admin@mymanager.com>`,
              replyTo: `admin@mymanager.com`,
              subject: currentAction.subject,
              body: currentAction.content,
            });
      });

      break;
  }
};

const calcNextActionFireTime = async (nextAction) => {
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
  // let _currentSecond = _currentDate.getTime() / 1000;
  let _currentSecond = 0;
  return _currentSecond + nextActionDelay;
};

const actionRun = async (automation, currentAction, contacts, user) => {
  actionProceed(currentAction, contacts, user);

  // Iterate next action
  let nextAction = automation.actions.find((action) => action.parentId == currentAction?.id);

  if (nextAction) {
    // Calculate next action fire time
    let nextActionFireTime = calcNextActionFireTime(nextAction);

    setTimeout(() => {
      actionRun(automation, nextAction, contacts, user);
    }, [nextActionFireTime * 1000]);
  } else {
    return;
  }
};

const startAutomation = async (formEntry) => {
  // ** find Contacts Automation
  const contacts = formEntry.contacts;
  // const formBuilder = await FormBuilder.findById(formEntry.formId);
  const criteriaType =
    formEntry?.payment?.status == "paid" ? "Sales" : formEntry?.survey ? "Survey" : "Entry";

  console.log({ formId: formEntry.formId, uponType: "Criteria Met", criteriaType });

  const automation = await FormAutomation.findOne({
    $or: [
      {
        $and: [
          { formId: mongoose.Types.ObjectId(formEntry.formId) },
          { "activationUpon.uponType": "Criteria Met" },
          { "activationUpon.criteria.criteriaType": criteriaType },
          { isActive: true },
          { isDelete: false },
        ],
      },
    ],
  });

  // Return if no automation
  if (!automation) return;

  // Return if no activate time
  if (!automation?.activateTime) return;

  const startTime = automation.activateTime;
  const currentAction = automation?.actions?.find((action) => action?.parentId == "0");

  const fireTime = calculateTime(
    startTime,
    currentAction.duration,
    currentAction.setCustomTime,
    currentAction.customTime.time
  );

  console.log(`Set timeout for action in ${fireTime} seconds after.`);
  const user = await Auth.findById(formEntry.userId);

  setTimeout(() => {
    // startEvent(currentAction, contact, user, automation, startTime);
    actionRun(automation, currentAction, contacts, user);
  }, fireTime * 1000);

  // return automations;
};

FormEntrySchema.post("save", async function (data) {
  await startAutomation(data);
  return data;
});

module.exports = mongoose.model("form-entry", FormEntrySchema);
