const { socket_connections } = require("../service/socket-sender");
const moment = require("moment");
const userSockets = {};
const organizationSockets = {};
const customerSockets = {};

const socket2userId = {};
const socket2organizationId = {};
const socket2customerId = {};

// const adminSocketArray = [];

const mongoose = require("mongoose");

const User = require("../models/User");

const { Authenticate, FormBuilder } = require("../models/index");
// const { replyMessage } = require("../controllers/ticket");

// eslint-disable-next-line func-names
const socketRoute = function (io) {
  // eslint-disable-next-line global-require
  const app = require("express");
  const router = app.Router();
  let emitSocket = [];

  router.post("/api/ticket/reply", async (req, res) => {
    const {
      // from,
      to,
      // subject,
      body,
      // date
    } = req.body;
    // Parse toEmail to get UserId
    const ticketId = to.split("@")[0].substring(6);

    const sentences = body.split("\n");
    let resMessage = "";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sentences.length; i++) {
      if (
        sentences[i].includes("On") &&
        sentences[i].includes("wrote:") &&
        sentences[i].includes("@")
      ) {
        break;
      }
      if (
        sentences[i].includes("On") &&
        sentences[i + 1].includes("wrote:") &&
        sentences[i + 1].includes("@")
      ) {
        break;
      }
      resMessage = resMessage.concat(sentences[i]);
    }

    const result = await Ticket.findByIdAndUpdate(ticketId, {
      $push: {
        messages: {
          sender: "requester_msg",
          msg: resMessage,
        },
      },
    });

    emitSocket.forEach((connection) =>
      connection.emit("newEmail", {
        reqName: result.reqName,
        message: resMessage,
      })
    );

    res.json(result);
  });

  function notifyEmail({ adminId, reqName, message }) {
    if (socket_connections.filter((connection) => connection.adminId === adminId).length > 0) {
      socket_connections.forEach((connection) => {
        connection.socket.emit("newEmail", { reqName, message });
      });
    }
  }

  function notifyStartChat(machineId, adminId, contactInfo) {
    if (userSockets[adminId]) {
      // eslint-disable-next-line guard-for-in
      for (const key in userSockets[adminId]) {
        socket.to(key).emit("startChat", { machineId, contactInfo });
      }
    }
    // Broadcast to all clients for starting chat
    if (customerSockets[adminId][machineId]) {
      for (let key in customerSockets[adminId][machineId]) {
        socket.emit("endChat", {});
      }
    }
  }

  io.of(`/${process.env.APPNAME}`).on("connection", function (socket) {
    emitSocket.push(socket);
    socket.on("client-connect", ({ adminId }) => {
      socket_connections.push({ adminId, socket });
    });

    socket.emit("ready-client", {
      message: "Wellcome from server",
    });

    // ** Chat Socket event
    socket.on("adminRegister", (adminId) => {
      if (!adminId) return;
      socket_connections.push({ adminId, socket });
      if (!adminId) return;
      if (!userSockets[adminId]) userSockets[adminId] = {};
      userSockets[adminId][socket.id] = adminId;
      socket2userId[socket.id] = adminId;
      console.log("[SOCKET] ADMIN REGISTER: ", adminId, socket.id);
    });

    socket.on("orgRegister", (organizationId, userId) => {
      if (!organizationId || !userId) return;
      socket_connections.push({ organizationId, socket });
      console.log("[SOCKET] ORGANIZATION REGISTER: ", organizationId, userId, socket.id);
      if (!organizationId || !userId) return;
      if (!organizationSockets[organizationId]) organizationSockets[organizationId] = {};
      if (!organizationSockets[organizationId][userId]) {
        organizationSockets[organizationId][userId] = {};
      }
      organizationSockets[organizationId][userId][socket.id] = organizationId;
      socket2organizationId[socket.id] = organizationId;
    });

    socket.on("disconnect", () => {
      console.log("[SOCKET] DISCONNECTED");
      emitSocket = emitSocket.filter((connection) => connection.id !== socket.id);
      if (socket2userId[socket.id]) {
        const adminId = socket2userId[socket.id];
        delete socket2userId[socket.id];
        if (userSockets[adminId] && userSockets[adminId][socket.id]) {
          delete userSockets[adminId][socket.id];
        }
      }

      if (socket2customerId[socket.id]) {
        const { adminId, machineId } = socket2customerId[socket.id];
        delete socket2customerId[socket.id];
        if (
          customerSockets[adminId] &&
          customerSockets[adminId][machineId] &&
          customerSockets[adminId][machineId][socket.id]
        ) {
          delete customerSockets[adminId][machineId][socket.id];
        }
      }
    });

    socket.on("clientRegister", ({ adminId, machineId }) => {
      console.log("[SOCKET] Client Register", { adminId, machineId });
      if (!adminId || !machineId) return;
      if (!customerSockets[machineId]) customerSockets[machineId] = {};
      customerSockets[machineId][socket.id] = socket.id;
      socket2customerId[socket.id] = { adminId, machineId };
    });

   
    socket.on("textMessage", async (userId, contactId) => {
      const data = await textMessage
        .find({
          userId: userId,
          contactId: contactId,
          // isRead: false
        })
        .populate("contactId");
      socket.emit("textMessage", data);
    });

    socket.on("endChat", async ({ machineId, userId, organizationId }) => {
      console.log("[SOCKET] End Chat: ", { machineId, userId });
      const channel = await Channel.findOne({ machineId, userId: userId, organizationId });
      if (channel) {
        await Channel.updateOne(
          { machineId, userId: userId, organizationId },
          {
            activated: false,
            $push: {
              messages: {
                type: "PostChatForm",
                msg: JSON.stringify({
                  rate: 4, // TODO: This is temp rate.
                }),
              },
            },
          }
        );
      }

      // Broadcast to all admins for ending chat
      if (userSockets[userId]) {
        for (let key in userSockets[userId]) {
          socket.to(key).emit("endChat", { machineId });
        }
      }

      // Broadcast to all clients for ending chat
      if (customerSockets[machineId]) {
        for (let key in customerSockets[machineId]) {
          socket.to(key).emit("endChat", {});
        }
      }

      // Broadcast to all clients for ending chat
      if (organizationSockets[organizationId][userId]) {
        for (let key in organizationSockets[organizationId][userId]) {
          socket.to(key).emit("endChat", {});
        }
      }
    });

   
    

    /*************** Task Proof ****************/
    socket.on("uploadProof", async (data) => {
      const { selectedTask, todo, url, employeeInfo } = data;
      if (!selectedTask) return;
      const { userId } = selectedTask;
      let toSendData = {
        taskName: selectedTask.taskName,
        subTaskName: todo.title,
        proofType: todo.proofType,
        startDate: selectedTask.startDate,
        endDate: todo.dateTime,
        employeeInfo: employeeInfo,
        photo: url,
      };
      for (let key in userSockets[userId]) {
        socket.to(key).emit("receiveWorkProof", { ...toSendData }); // sent to admin
      }
    });


   
    /************* End Task Proof **************/

    socket.on("mybuilderLeads", async({message,formId, title})=>{
      const form = await FormBuilder.findById(mongoose.Types.ObjectId(formId))
      const payload = {
        userId:form.userId,
        organizationId:form.organizationId,
        category:"MyBuilder",
        categoryId:form._id,
        title:title,
        message:message,
      }
      const dataInserted = await Notification.create(payload)
      console.log(dataInserted)
      if (userSockets[form.userId.toString()]) {
        for (let key in userSockets[form.userId.toString()]) {
          if (key) {
            socket.to(key).emit("mybuilderLeads", {message,formId,organizationId:form.organizationId});
          }
        }
      }
    })
  });

  return router;
};

module.exports = { socketRoute, userSockets, customerSockets, socket2userId, socket2customerId };
