const nodemailer = require("nodemailer");
const amqp = require("amqplib");
require("dotenv").config();

const pemKey = process.env.NODEMAILER_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/"+/g, "");
const nodemailerOptions = {
  host: process.env.NODEMAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  use_authentication: true,
  replyTo: "postmaster@mymanager.com",
  dkim: {
    domainName: "mymanager.com",
    keySelector: "postal",
    privateKey: pemKey,
  },
};

const SendMail = async ({
  from = `"My Manager" <hello@mymanager.com>`,
  recipient,
  subject = ``,
  text = ``,
  body = ``,
  attachments = [],
  replyTo = "postmaster@mymanager.com",
}) => {
  const transporter = nodemailer.createTransport(nodemailerOptions);
  const mailOptions = {
    from,
    to: recipient,
    subject,
    text,
    html: body,
    attachments,
    replyTo,
  };
  if (process.env.MAILSERVER === "postal") {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log("Email Sending failed", error);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Email sent successfully`);
    }
  });
  // sendData(mailOptions);
  };
}
const SendBulkMail = async ({
  from = `"My Manager" <hello@mymanager.com>`,
  recipient,
  subject = ``,
  text = ``,
  body = ``,

  attachments = [],
  replyTo = "postmaster@mymanager.com",
}) => {
  // const transporter = nodemailer.createTransport(nodemailerOptions);
  const mailOptions = {
    from,
    recipient: recipient,
    subject,
    text,
    html: body,
    attachments,
    replyTo,
  };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     // eslint-disable-next-line no-console
  //     console.log("Email Sending failed", error);
  //   } else {
  //     // eslint-disable-next-line no-console
  //     console.log(`Email sent successfully ${info.response} ${subject}`);
  //   }
  // });
  sendData(mailOptions);
};

var channel, connection; //global variables
connectQueue();
async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://mymanager:rabbitmq@me.mymanager.com:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("email-queue");
  } catch (error) {
    console.log(error);
  }
}

async function sendData(data) {
  // send data to queue
  // await connectQueue();
  if (channel) await channel.sendToQueue("email-queue", Buffer.from(JSON.stringify(data)));

  // close the channel and connection
  // await channel.close();
  // await connection.close();
}

module.exports = { SendMail, SendBulkMail };
