const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const jwt = require("jsonwebtoken");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const {
  FormAutomation,
  Contact,
  Workspace,
  Board,
  // MemberContact,
} = require("../models/index/index");
const { SendMail, SendBulkMail } = require("../service/sendMail");
const { socket_connections } = require("../service/socket-sender");
const Notification = require("../models/Notification");

const createAutomation = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const userId = mongoose.Types.ObjectId(req.user._id);

    const {
      _id,
      formId,
      automationName,
      contactInfo,
      activationUpon,
      activateTime,
      actions,
      isActive,
    } = req.body;

    if (_id == undefined || _id == "") {
      const newAutomation = new FormAutomation({
        formId: mongoose.Types.ObjectId(formId),
        automationName,
        contactInfo,
        activationUpon,
        activateTime: activateTime,
        actions,
        userId: userId,
        isActive,
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      });
      newAutomation.save((err, success) => {
        if (err) {
          if (err) {
            console.log(err);
            return res.status(400).json({
              errors: { common: { msg: err.message } },
            });
          }
        } else {
          res.status(200).json({ success: "New", data: success });
        }
      });
    } else {
      FormAutomation.findById(mongoose.Types.ObjectId(_id)).then((current) => {
        current.formId = mongoose.Types.ObjectId(formId);
        current.automationName = automationName;
        current.contactInfo = contactInfo;
        current.activationUpon = activationUpon;
        current.activateTime = activateTime;
        current.actions = actions;
        current.save().then((result) => res.status(200).json({ success: "Update", data: result }));
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      errors: { common: { msg: error.message } },
    });
  }
});

const allContacts = async (userId, organization) => {
  try {
    const currentTime = new Date();
    const contactsForUnCustomTimeActions = await Contact.find({
      "automation.fireTime": { $lte: currentTime.getTime() / 1000 },
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
    });

    return contactsForUnCustomTimeActions;
  } catch (error) {}
};

const criteriaAutomation = asyncHandler(async (req, res) => {
  try {
    const criteriaAutomations = await FormAutomation.find({
      "activationUpon.uponType": "Criteria Met",
    });
    criteriaAutomations.map();
  } catch (error) {}
});

const calculateFireTime = (action) => {
  let nextActionDelay = 0;
  if (action.setCustomTime) {
    let fourDaysLater = new Date();
    let timestamp = 0;
    let now = 0;
    switch (action.duration.unit) {
      case "days":
        fourDaysLater.setDate(fourDaysLater.getDate() + action.duration.time);
        fourDaysLater.setHours(action.customTime.time);
        fourDaysLater.setMinutes(0);
        fourDaysLater.setSeconds(0);
        timestamp = fourDaysLater.getTime();

        // Calculate the number of milliseconds until the scheduled time
        now = new Date().getTime();
        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
        break;
      case "weeks":
        fourDaysLater = new Date();
        fourDaysLater.setDate(fourDaysLater.getDate() + action.duration.time * 7);
        fourDaysLater.setHours(action.customTime.time);
        fourDaysLater.setMinutes(0);
        fourDaysLater.setSeconds(0);
        timestamp = fourDaysLater.getTime();

        // Calculate the number of milliseconds until the scheduled time
        now = new Date().getTime();
        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
        break;
      case "months":
        fourDaysLater = new Date();
        fourDaysLater.setMonth(fourDaysLater.getMonth() + action.duration.time);
        fourDaysLater.setHours(action.customTime.time);
        fourDaysLater.setMinutes(0);
        fourDaysLater.setSeconds(0);
        timestamp = fourDaysLater.getTime();

        // Calculate the number of milliseconds until the scheduled time
        now = new Date().getTime();
        startActionTime = timestamp / 1000 + startAutomationTime - now / 1000;
        break;
      default:
        break;
    }
  } else {
    switch (action.duration.unit) {
      case "days":
        nextActionDelay = nextActionDelay + 60 * 60 * 24 * action.duration.time;
        break;
      case "weeks":
        nextActionDelay = nextActionDelay + 60 * 60 * 24 * 7 * action.duration.time;
        break;
      case "months":
        nextActionDelay = nextActionDelay + 60 * 60 * 24 * 30 * action.duration.time;
        break;
      default:
        break;
    }
  }

  let _currentDate = new Date();
  let _currentSecond = _currentDate.getTime() / 1000;
  return _currentSecond + nextActionDelay;
};
const startMarketing = (client, nextAction, isCondition, percent) => {
  switch (nextAction.actionType) {
    case "email":
      let html = nextAction.content;
      let base64 = "";
      if (nextAction.attachments.length > 0) {
        if (nextAction.attachments[0].type.startsWith("image")) {
          html += `<img src="${nextAction.attachments[0].url}" height="120px" />`;
        } else if (nextAction.attachments[0].type.startsWith("video")) {
          const userId = client._id;
          const actionId = nextAction.id;
          const url = nextAction.attachments[0].url;
          const percentage = percent;
          const secretKey = process.env.TOKEN_SECRET_KEY;
          const token = jwt.sign(
            { userId: userId, actionId: actionId, url: url, percentage: percentage },
            secretKey
          );
          const redirectUrl = "https://mymanager.com/watchVideo/" + token;
          html += `<a href="${redirectUrl}">
             VIDEO LINK
            </a>`;
        }
      }
      SendBulkMail({
        recipient: client.email,
        from: `admin@mymanager.com`,
        replyTo: `admin@mymanager.com`,
        subject: nextAction.subject,
        body: html,
      });
      break;
    case "text":
      let accountSid = process.env.TWILIO_ACCOUNT_SID;
      let authToken = process.env.TWILIO_AUTH_TOKEN;
      const smsClient = require("twilio")(accountSid, authToken);
      smsClient.messages
        .create({
          body: nextAction.content,
          from: process.env.FROM_NUMBER,
          to: client.phone,
        })
        .then((message) => console.log(message.sid));

      break;
    case "notification":
      if (nextAction.to.type == "ME") {
        const manager = Contact.find({ _id: mongoose.Types.ObjectId(req.user._id) });
        switch (nextAction.method) {
          case "EMAIL":
            SendBulkMail({
              recipient: req.user.email,
              from: `admin@mymanager.com`,
              replyTo: `admin@mymanager.com`,
              subject: nextAction.subject,
              body: nextAction.content,
            });
            break;
          case "TEXT":
            let accountSid = process.env.TWILIO_ACCOUNT_SID;
            let authToken = process.env.TWILIO_AUTH_TOKEN;
            const smsClient = require("twilio")(accountSid, authToken);
            smsClient.messages
              .create({
                body: nextAction.content,
                from: process.env.FROM_NUMBER,
                to: req.user.phone,
              })
              .then((message) => console.log(message.sid));
            break;
          case "TOOLBAR":
            const managerSocket = socket_connections.find((item) => item.adminId == req.user._id);
            if (!managerSocket) {
              managerSocket.socket.emit("newNotification", { notification: nextAction.content });
            }

            break;
          default:
            break;
        }
      } else if (nextAction.to.type == "CONTACT") {
        let contactsForNotification = [];
        nextAction.to.contacts.map((contact) => {
          ContactType.findOne({ name: contact }).then((contact_type) => {
            Contact.find({ contactType: mongoose.Types.ObjectId(contact_type._id) }).then(
              (noteContacts) => contactsForNotification.push(noteContacts)
            );
          });
        });

        switch (nextAction.method) {
          case "EMAIL":
            contactsForNotification.map(async (item) => {
              try {
                const sendmail = await SendBulkMail({
                  recipient: item.email,
                  from: `admin@mymanager.com`,
                  replyTo: `admin@mymanager.com`,
                  subject: nextAction.subject,
                  body: nextAction.content,
                });
              } catch (error) {}
            });
            break;
          case "TEXT":
            let accountSid = process.env.TWILIO_ACCOUNT_SID;
            let authToken = process.env.TWILIO_AUTH_TOKEN;
            const smsClient = require("twilio")(accountSid, authToken);
            contactsForNotification.map(async (item) => {
              try {
                const sendsms = await smsClient.messages
                  .create({
                    body: nextAction.content,
                    from: process.env.FROM_NUMBER,
                    to: item.phone,
                  })
                  .then((message) => console.log(message.sid));
              } catch (error) {}
            });
          case "TOOLBAR":
            contactsForNotification.map((item) => {
              const managerSocket = socket_connections.find((i) => i.adminId == item._id);
              if (!managerSocket) {
                managerSocket.socket.emit("newNotification", { notification: nextAction.content });
              }
            });
            break;
          default:
            break;
        }
      }
      break;
  }
};
const checkAutomation = async () => {
  try {
    const clientsUnCustomTime = await allContacts();
    clientsUnCustomTime.map((client) => {
      client.automation.map((item) => {
        const currentTime = new Date();
        if (item.fireTime < currentTime.getTime() / 1000 && item.isCustomTime == false) {
          FormAutomation.findOne({ _id: item.automationId }).then((res) => {
            const currentAction = res.actions.find((action) => action.id == item.currentActionId);
            const nextAction = res.actions.filter(
              (action) => action.parentId == item.currentActionId
            );

            const currentActionIndex = client.automation.findIndex(
              (action) => action.currentActionId == item.currentActionId
            );
            let fireTime = 0;

            switch (nextAction.length) {
              case 0:
                client.automation.splice(currentActionIndex, 1);
                client.save();
                break;
              case 1:
                client.automation.splice(currentActionIndex, 1);
                client.save().then((result) => {
                  const secondNextAction = res.actions.filter(
                    (action) => action.parentId == nextAction[0].id
                  );
                  let _fireTimeForCase1 = 0;
                  if (secondNextAction.length == 2) {
                    const yesActionCondition = secondNextAction.find(
                      (action) => action.condition == "yes"
                    );
                    const yesAction = res.actions.find(
                      (action) => action.parentId == yesActionCondition.id
                    );
                    _fireTimeForCase1 = calculateFireTime(yesAction);
                    startMarketing(
                      client,
                      nextAction[0],
                      true,
                      yesActionCondition.confirmProgress.percentage
                    );
                  } else if (secondNextAction.length == 1) {
                    _fireTimeForCase1 = calculateFireTime(secondNextAction[0]);
                    startMarketing(client, nextAction[0], false, 0);
                  }

                  const nextActionId = nextAction[0].id;

                  result.automation.push({
                    automationId: item.automationId,
                    currentActionId: nextActionId,
                    fireTime: _fireTimeForCase1,
                    isView: false,
                    isCustomTime: nextAction[0].setCustomTime,
                  });

                  result.save();
                });

                break;
              case 2:
                client.automation.splice(currentActionIndex, 1);
                if (item.isView) {
                  const yesCondition = nextAction.find((action) => action.condition == "yes");
                  const secondOfYesAction = res.actions.find(
                    (action) => action.parentId == yesCondition.id
                  );

                  const nextActionId = secondOfYesAction.id;

                  const nextAfterAction = res.actions.filter(
                    (action) => action.parentId == secondOfYesAction.id
                  );
                  if (nextAfterAction.length == 2) {
                    const yesNextAfterAction = nextAfterAction.find(
                      (action) => action.condition == "yes"
                    );
                    fireTime = calculateFireTime(yesNextAfterAction);
                    startMarketing(
                      client,
                      secondOfYesAction,
                      true,
                      yesNextAfterAction.confirmProgress.percentage
                    );
                  } else if (nextAfterAction.length == 1) {
                    fireTime = calculateFireTime(nextAfterAction[0]);
                    startMarketing(client, secondOfYesAction, false, 0);
                  }

                  client.automation.push({
                    automationId: item.automationId,
                    currentActionId: nextActionId,
                    fireTime: fireTime,
                    isView: false,
                    isCustomTime: secondOfYesAction.setCustomTime,
                  });
                  client.save();
                } else {
                  const noCondition = nextAction.find((action) => action.condition == "no");
                  const secondOfNoAction = res.actions.find(
                    (action) => action.parentId == noCondition.id
                  );

                  const nextActionId = secondOfNoAction.id;

                  const nextAfterAction = res.actions.filter(
                    (action) => action.parentId == secondOfNoAction.id
                  );
                  if (nextAfterAction.length == 2) {
                    const yesNextAfterAction = nextAfterAction.find(
                      (action) => action.condition == "yes"
                    );
                    fireTime = calculateFireTime(yesNextAfterAction);
                    startMarketing(
                      client,
                      secondOfNoAction,
                      true,
                      yesNextAfterAction.confirmProgress.percentage
                    );
                  } else if (nextAfterAction.length == 1) {
                    fireTime = calculateFireTime(nextAfterAction[0]);
                    startMarketing(client, secondOfNoAction, false, 0);
                  }
                  client.automation.push({
                    automationId: item.automationId,
                    currentActionId: nextActionId,
                    fireTime: fireTime,
                    isView: false,
                    isCustomTime: secondOfNoAction.setCustomTime,
                  });
                  client.save();
                }
                break;
              default:
                break;
            }
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = asyncHandler(async (req, res) => {
  try {
    let url = "";
    if (req.file.size) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    res.status(200).json({ success: "OK", data: url });
  } catch (error) {}
});

const getAutomations = asyncHandler(async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user._id);
    const { organization } = req.headers;
    const { formId } = req.query;
    let query = {
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      isDelete: false,
    };
    if (formId) {
      query = {
        ...query,
        formId: mongoose.Types.ObjectId(formId),
      };
    }
    const allAutomations = await FormAutomation.find(query)
      .populate({
        path: "actions.taskContent.workspaceId",
        model: Workspace,
      })
      .populate({
        path: "actions.taskContent.statusId",
        model: Board,
      });
    res.status(200).json({ success: true, data: allAutomations });
  } catch (error) {
    console.log(error);
  }
});

const changeStatus = asyncHandler(async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.body.id);
    const currentAutomation = await FormAutomation.findById(id);
    currentAutomation.isActive = !currentAutomation.isActive;
    currentAutomation
      .save()
      .then((result) => res.status(200).json({ success: "OK", data: result }));
  } catch (error) {}
});

const setVideoWatch = asyncHandler(async (req, res) => {
  try {
    const { userId, actionId } = req.body;
    const currentUser = await Contact.findById(mongoose.Types.ObjectId(userId));
    const currentAction = currentUser.automation.find((item) => item.currentActionId == actionId);
    currentAction.isView = true;
    currentUser.save();
  } catch (error) {}
});

const deleteAutomation = asyncHandler(async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.body.id);
    const currentAutomation = await FormAutomation.findById(id);
    currentAutomation.isDelete = true;
    currentAutomation
      .save()
      .then((result) => res.status(200).json({ success: "OK", data: result }));
  } catch (error) {}
});

async function birthday() {
  try {
    const contactData = await Contact.aggregate([
      {
        $project: {
          _id: 1,
          userId: 1,
        },
      },
    ]);
    // console.log(contactData);
    for (const contact of contactData) {
      contact.category = "Birthday";
      contact.contactId = contact._id;
      const userIdExists = await Notification.find({ contactId: contact._id });
      if (userIdExists.length === 0) {
        await Notification.create(contact);
      }
    }
  } catch (err) {
    return err;
  }
}

module.exports = {
  checkAutomation,
  createAutomation,
  uploadFile,
  getAutomations,
  changeStatus,
  deleteAutomation,
  setVideoWatch,
  birthday,
};
