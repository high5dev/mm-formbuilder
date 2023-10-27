const { FinanceCategory, Invoice } = require("../models/index");
const { default: mongoose } = require("mongoose");
const moment = require("moment");

module.exports.calculateMembershipPayments = async (startDate, amount, noOfPayments, frequency) => {
  let allPayments = [];
  for (let index = 0; index < noOfPayments; index++) {
    const t = {
      amount: amount,
      currency: "usd",
      status: "due",
      date: moment(startDate).add(index, frequency),
    };
    allPayments.push(t);
  }
  return allPayments;
};
module.exports.generateInvoiceNo = async (organization, userId) => {
  try {
    let q = {};
    if (organization!==undefined && organization!==null) {
      q = { organizationId: mongoose.Types.ObjectId(organization) };
    } else {
      q = { userId: mongoose.Types.ObjectId(userId) };
    }
    const lastInvoice = await Invoice.aggregate(
      [{
        $match:q
      },
      { $sort: { createdAt: -1 } }]
    );
    if (lastInvoice.length>0) {
      return (Number(lastInvoice[0].no) + 1).toString();
    }
    else{
      return 1
    }
    
  } catch (error) {
    return error;
  }
};
module.exports.getFinanceCategoty = async (organization, userId) => {
  try {
    let fcQ = {};
    if (organization) {
      fcQ = {
        $or: [
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
            userId: mongoose.Types.ObjectId(userId),
          },
        ],
      };
    } else {
      fcQ = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(userId),
            organizationId: null,
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }

    const financeCats = await FinanceCategory.find(fcQ);
    return financeCats;
  } catch (error) {
    return error;
  }
};
const getFinanceCategories = async (organization, userId) => {
  try {
    let fcQ = {};
    if (organization) {
      fcQ = {
        $or: [
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
            userId: mongoose.Types.ObjectId(userId),
          },
        ],
      };
    } else {
      fcQ = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(userId),
            organizationId: null,
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }

    const financeCats = await FinanceCategory.find(fcQ);
    return financeCats;
  } catch (error) {
    return error;
  }
};
module.exports.createInvoiceForMemberships = async (
  payments,
  membership,
  userId,
  organization,
  shop
) => {
  //create invoice
  try {
    let paymentsPayload = payments.map((x) => {
      return { ...x, date: moment(x.date).add(12, "hours") };
    });
    let q = {};
    if (organization && organization !== null) {
      q = { organizationId: mongoose.Types.ObjectId(organization) };
    } else {
      q = { userId: mongoose.Types.ObjectId(userId), organizationId: null };
    }

    const lastInvoice = await Invoice.findOne(q, {}, { sort: { createdAt: -1 } });
    let no = 1;
    if (lastInvoice) {
      no = (Number(lastInvoice.no) + 1).toString();
    }

    const financeCats = await getFinanceCategories(organization, userId);
    let fc = financeCats.find((x) => x.itemType === "membership");
    //calculate paid amount, payNow

    const regFee = membership.regFee === undefined ? 0 : membership.regFee;

    let invoice = {
      userId: userId,
      customerId: mongoose.Types.ObjectId(membership.buyerId),
      itemType: fc._id,
      no: no,
      internalPaymentNote: "Generate automatically on activation of your membership",
      companyName: shop.name,
      date: new Date(),
      dueDate: moment(payments[0].date).add(12, "hours"),
      items: [
        {
          itemId: mongoose.Types.ObjectId(membership._id),
          rate: Number(membership.total) + Number(regFee),
          quantity: 1,
          name: membership.name,
        },
      ],
      totalAmount: Number(membership.total) + Number(regFee),
      paidAmount: 0,
      status: payments?.length > 1 ? "SENT" : "PARTIAL PAYMENT",
      payments: paymentsPayload,
      payNow: payments[0].amount,
      logoUrl: shop.logoUrl || null,
      paymentType: membership.payInOut,
      isSubscription: membership.isSubscription !== undefined ? membership.isSubscription : false,
      isRecurring: membership.isRecurring !== undefined ? membership.isRecurring : false,
      organizationId:
        organization && organization !== null ? mongoose.Types.ObjectId(organization) : null,
    };
    invoiceCreated = await Invoice.create(invoice);
    return invoiceCreated;
  } catch (error) {
    console.log(error);
  }
};
const createDocumentContract = async (
  templateId,
  shop,
  organization,
  user,
  contact,
  membership
) => {
  console.log("CREATE CONTRACT", {
    templateId: templateId,
    shop: shop,
    organization: organization,
    user: user,
    contact: contact,
    membership: membership,
  });
  const document = await DocumentRecipient.findById(templateId);
  const rec1 = Date.now();
  const rec2 = Date.now() + 1;
  let org;
  if (organization !== undefined && organization !== null) {
    org = await Organization.findById(mongoose.Types.ObjectId(organization));
  }

  let props = document.properties.map((x) => {
    let temp = x;
    if (temp.recipient.email === "firstparty") {
      temp = {
        ...temp,
        recipient: {
          name: contact.fullName,
          email: contact.email,
          hashCode: rec1.toString(),
          url: organization
            ? `https://${org?.path}.mymanager.com/document/email-link/${rec1}`
            : `https://me.mymanager.com/document/email-link/${rec1}`,
          color: "#afcbff",
          active: true,
          roleOption: "sign",
          id: rec1.toString(),
        },
      };
    } else {
      temp = {
        ...temp,
        recipient: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
          hashCode: rec2.toString(),
          url: organization
            ? `https://${org?.path}.mymanager.com/document/email-link/${rec2}`
            : `https://me.mymanager.com/document/email-link/${rec2}`,
          color: "#c4faf8",
          active: true,
          roleOption: "sign",
          id: rec2.toString(),
        },
      };
    }
    return temp;
  });

  const contractPayload = {
    documentId: document.documentId,
    documentUrl: document.documentUrl,
    sender: user.email,
    recipients: [
      {
        name: contact.fullName,
        email: contact.email,
        hashCode: rec1.toString(),
        url: organization
          ? `https://${org?.path}.mymanager.com/document/email-link/${rec1}`
          : `https://me.mymanager.com/document/email-link/${rec1}`,
        color: "#afcbff",
        active: true,
        roleOption: "sign",
        id: rec1.toString(),
      },
      {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        hashCode: rec2.toString(),
        url: organization
          ? `https://${org?.path}.mymanager.com/document/email-link/${rec2}`
          : `https://me.mymanager.com/document/email-link/${rec2}`,
        color: "#c4faf8",
        active: true,
        roleOption: "sign",
        id: rec2.toString(),
      },
    ],
    properties: props,
    isDone: false,
    userId: user._id,
    title: `Contract for membership ${membership.name}`,
    docType: "contract",
    isTemplate: false,
    organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
    // creatorType: organization
    //   ? req.user.organizations.find((x) => x.organizationId.toString() === organization).userType
    //   : req.user.userType,
    docMessage: document.docMessage,
    relateTo: membership._id,
    isSent: true,
  };

  const customerContract = await DocumentRecipient.create(contractPayload);
  return customerContract;
};
