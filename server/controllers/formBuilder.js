// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  FormBuilder,
  FormEntry,
  User,
  Authenticate,
  //Income,
  //Contact,
} = require("../models/index/index");

const whois = require("whois");
const { getFinanceCategoty, generateInvoiceNo } = require("../helper/finance");
//const Invoice = require("../models/Invoice");
const { userNotifyFormEmail, invoiceEmailTemplate } = require("../constants/emailTemplates");
const { SendMail } = require("../service/sendMail");
const { getContactTypesHelper } = require("../helper/contacts");

/**
 *
 * @desc Create formBuilder Controller
 * @route POST /api/formBuilder/create
 * @returns 201: {msg: "success", data:{}}, 500  {errors: { common: { msg: err.message } }},
 */
// eslint-disable-next-line consistent-return
exports.createForm = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const payload = {
      ...req.body,
      userId: mongoose.Types.ObjectId(req.user._id),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    const data = await FormBuilder.create(payload);

    return res.send({
      success: true,
      message: "Form created successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getForm = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const data = await FormBuilder.findById(id);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.getForms = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const { template, categoryId, isDelete } = req.query;

    let query = [
      {
        userId: user._id,
        organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        isTemplate: template === "true" ? true : false,
        isDelete: false,
        //isDelete: isDelete === "true" ? true : false,
      },
      //template === "true" && { isTemplate: true, creatorType: "super-admin" },
    ];
    // if (organization) {
    //   query = [
    //     {
    //       userId: user._id,
    //       organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
    //       isTemplate: template === "true" ? true : false,
    //       //isDelete: isDelete === "true" ? true : false,
    //       isDelete: false,
    //     },
    //     // template === "true" && {
    //     //   isTemplate: true,
    //     //   creatorType: "super-admin",
    //     //   isDelete: isDelete === "true" ? true : false,
    //     // },
    //     // template === "true" && {
    //     //   isTemplate: true,
    //     //   organizationId: mongoose.Types.ObjectId(organization),
    //     //   creatorType: "admin",
    //     //   isDelete: isDelete === "true" ? true : false,
    //     // },
    //   ];
    // }
    query = query.filter((x) => x !== false);

    const data = await FormBuilder.find({
      $or: query,
    });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

exports.getFormCounts = asyncHandler(async(req,res)=>{
  try {
    const user = req.user
    const {organization} = req.headers
    const data = await FormBuilder.find({
      userId: user._id,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      isDelete: false,
    });
    const count = {
      forms:data.filter(x=>x.isTemplate===false).length,
      templates:data.filter(x=>x.isTemplate===true).length
    }
    return res.status(200).json({ success: true, data:count });
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: error.message });
  }
})

exports.getTemplates = asyncHandler(async (req, res) => {
  try {
    let id = req.user._id;
    let { organization } = req.headers;

    //get all templates that should show to user
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(id),
            organizationId: mongoose.Types.ObjectId(organization),
            isTemplate: true,
            isDelete: false,
          },
          { isTemplate: true, creatorType: "super-admin", isDelete: false },
          {
            isTemplate: true,
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDelete: false,
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(id),
            organizationId: null,
            isTemplate: true,
            isDelete: false,
          },
          { isTemplate: true, creatorType: "super-admin", organizationId: null, isDelete: false },
        ],
      };
    }
    const userData = await FormBuilder.find(q);
    return res.status(200).json({ success: true, data: userData });
  } catch (err) {
    res.send({ msg: "error" });
  }
});

exports.deleteForm = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    await FormBuilder.findByIdAndUpdate(id, { isDelete: true });
    res.status(200).json({ success: true });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.editForm = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const data = await FormBuilder.findByIdAndUpdate(id, req.body, { new: true });
    if (data) {
      return res.send({ success: true, data });
    }
    return res.status(404).json({ success: false, message: `Form with id: ${id} not found` });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

//add form entry details
exports.addFormEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const form = await FormBuilder.findById(mongoose.Types.ObjectId(id));
    let contacts = [];
    if (form.automateEntry === true) {
      for (const contact of req.body.contacts) {
        contacts.push({ ...contact, isAddedToLead: true });
      }
    } else {
      contacts = req.body.contacts;
    }
    const payload = {
      ...req.body,
      contacts: contacts,
      formId: mongoose.Types.ObjectId(id),
      userId: form.userId,
      organizationId: form.organizationId,
    };

    const data = await FormEntry.create(payload);
    if (data._id) {
      //send Email to user
    }
    return res.send({
      success: true,
      message: "Form data saved successfully",
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});
exports.updateFormEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const data = await FormEntry.findByIdAndUpdate(mongoose.Types.ObjectId(id), req.body, {
      new: true,
    });

    return res.send({
      success: true,
      message: "Form data updated successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});
exports.updateContactArray = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { contactId, contactTypeId, isAddedToLead } = req.body;
    const data = await FormEntry.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id), "contacts._id": mongoose.Types.ObjectId(contactId) },
      {
        $set: {
          "contacts.$.contactType": mongoose.Types.ObjectId(contactTypeId),
          "contacts.$.isAddedToLead": isAddedToLead,
        },
      }
    );

    return res.send({
      success: true,
      message: "Contact updated successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.deleteFormEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const data = await FormEntry.findByIdAndDelete(mongoose.Types.ObjectId(id));
    return res.send({
      success: true,
      message: "Form data deleted successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.getFormEntryByFormId = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const formData = await FormEntry.find({ formId: mongoose.Types.ObjectId(id) });

    if (formData.length > 0) {
      return res.send({
        success: true,

        data: formData,
      });
    } else {
      return res.send({
        success: false,

        message: "FORM NOT FOUND",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.getFormEntryById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    let data = await FormEntry.findById(mongoose.Types.ObjectId(id));

    if (data) {
      return res.send({
        success: true,

        data: data,
      });
    } else {
      return res.send({
        success: false,

        message: "FORM NOT FOUND",
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
});

// exports.createInvoice = asyncHandler(async (req, res) => {
//   try {
//     const { payment, formId } = req.body;
//     const formEntry = await FormEntry.findById(mongoose.Types.ObjectId(formId));
//     const itemTypes = await getFinanceCategoty(formEntry.organizationId, formEntry.userId);
//     const user = await User.findOne({ userId: formEntry.userId });
//     const no = await generateInvoiceNo(formEntry.organizationId, formEntry.userId);
//     let items = [];
//     for (const p of formEntry.order.products) {
//       items.push({
//         itemId: p.productId,
//         name: p.name,
//         rate: p.price,
//         quantity: p.qty,
//       });
//     }
//     const itemType = itemTypes.find((x) => x.itemType === "forms")._id;
//     const payload = {
//       userId: formEntry.userId,
//       organizationId: formEntry.organizationId,
//       itemType: itemType,
//       no: no,
//       phone: user.company && user.company.phone ? user.company.phone : null,
//       alternatePhone:
//         user.company && user.company.alternativePhone ? user.company.alternativePhone : null,
//       companyAddress: user.company && user.company.address ? user.company.address : null,
//       internalPaymentNote: "Generated Automatically on purchase on the form",
//       companyName: user.company && user.company.title ? user.company.title : null,
//       date: new Date(),
//       dueDate: null,
//       items: items,
//       totalAmount: formEntry.order.total,
//       paidAmount: payment.amount,
//       logoUrl: user.company && user.company.logo ? user.company.logo : null,
//       status: "PAID",
//       salesperson: user.firstName + " " + user.lastName,
//       note: "Generated Automatically on purchase on the form",
//       payments: payment,
//       payNow: 0,
//       formEntryId: formEntry._id,
//     };

//     const invoice = await Invoice.create(payload);
//     const form = await FormBuilder.findById(formEntry.formId);
//     await FormEntry.findByIdAndUpdate(formEntry._id, { invoiceId: invoice._id });
//     //add to income
//     const incomePayload = {
//       userId: formEntry.userId,
//       organizationId: formEntry.organizationId,
//       name: "From Form " + form.name,
//       amount: payment.amount,
//       date: new Date(),
//       categoryId: itemType,
//       invoiceId: invoice._id,
//     };
//     await Income.create(incomePayload);

//     const userAuth = await Authenticate.findById(formEntry.userId);
//     //send invoice
//     const emailBody = invoiceEmailTemplate({
//       invoiceNo: invoice.no,
//       dueDate: null,
//       pay: invoice.payNow,
//       message: "Thank for your purchase! Please click bellow to view your invoice",
//       address: user.company && user.company.address ? user.company.address : null,
//       email: userAuth.email,
//       logo: invoice.logoUrl === "" || invoice.logoUrl === undefined ? null : invoice.logoUrl,
//       invoiceId: invoice._id,
//       invoiceLink:
//         formEntry.organizationId !== undefined && formEntry.organizationId !== null
//           ? `https://${org.path}.mymanager.com/invoice-preview/${invoice._id}`
//           : `https://me.mymanager.com/invoice-preview/${invoice._id}`,
//     });
//     //await Invoice.findByIdAndUpdate(invoice._id, { status: "SENT" });
//     SendMail({
//       from: `${
//         user.company && user.company.title ? user.company.title : "via MyManager"
//       } <hello@mymanager.com>`,
//       recipient: formEntry?.billingAddress?.email
//         ? formEntry?.billingAddress?.email
//         : formEntry?.contacts[0]?.email,
//       subject: `Invoice #${invoice.no} | ${invoice.companyName ? invoice.companyName : ""}`,
//       body: emailBody,
//       replyTo: userAuth.email,
//     });
//     return res.send({
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       errors: { common: { msg: error.message } },
//     });
//   }
// });

exports.sendUserEmail = asyncHandler(async (req, res) => {
  try {
    const { id, type } = req.body;
    console.log("sendUserEmail", req.body);
    const formEntry = await FormEntry.findById(
      mongoose.Types.ObjectId(mongoose.Types.ObjectId(id))
    );
    const form = await FormBuilder.findById(mongoose.Types.ObjectId(formEntry.formId));
    const user = await User.findOne({ userId: mongoose.Types.ObjectId(form.userId) });
    const auth = await Authenticate.findById(user.userId);
    let data = {
      title: type === "sales" ? `New sales on ${form.name}` : `New lead on ${form.name}`,
      message:
        type === "sales"
          ? `You sold a new product from ${form.name}! `
          : `Here is a new lead that claimed ${form.name}. Please contact them in 24-48 hours.`,
      name: `${user.firstName} ${user.lastName}`,
      buyerInfo: {
        name: formEntry?.contacts?.length > 0 ? formEntry?.contacts[0]?.fullName : "",
        phone: formEntry?.contacts?.length > 0 ? formEntry?.contacts[0]?.phone : "",
        email: formEntry?.contacts?.length > 0 ? formEntry?.contacts[0]?.email : "",
      },
    };

    if (type === "sales") {
      const sales = ` <div>
      <tr>
        <td align="center" class="es-m-p-2" style="padding-top: 30px;">
          Products
        </td>
      </tr>
      ${formEntry.order.products.map((x) => {
        return `<tr>
          <td align="center" class="es-m-p-2">
            ${x.name}
          </td>
          <td align="center" class="es-m-p-2">
            ${x.qty}
          </td>
          <td align="center" class="es-m-p-2">
            ${x.price}
          </td>
        </tr>`;
      })}
      <tr>
        <td align="center" class="es-m-p-2" style="padding-bottom: 20px;padding-top: 10px;">
          total
        </td>
        <td align="center" class="es-m-p-2" style="padding-bottom: 20px;padding-top: 10px;">
          ${formEntry.order.total}
        </td>
      </tr>
    </div>`;
      data = {
        ...data,
        sales: sales,
        // orderInfo: {
        //   products: formEntry.order.products,
        //   total: formEntry.order.total,
        // },
      };
    }

    const emailBody = userNotifyFormEmail(data);
    SendMail({
      from: `via MyManager <hello@mymanager.com>`,
      recipient: auth.email,
      subject: `${data.title}`,
      body: emailBody,
    });
    return res.send({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      errors: { common: { msg: error.message } },
    });
  }
});

exports.searchDomain = asyncHandler(async (req, res) => {
  try {
    const { domain } = req.params;
    const data = whois.lookup(domain, function (req, res) {
      return res;
    });
    return res.send({
      success: true,

      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      errors: { common: { msg: error.message } },
    });
  }
});

// exports.addToLeadAutomation = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const formEntry = req.body;
//     const contacts = formEntry.contacts;
//     const form = await FormBuilder.findById(mongoose.Types.ObjectId(id));
//     let buyer = null;
//     const contactTypes = await getContactTypesHelper(form.organizationId, form.userId);
//     const leadContact = contactTypes.find((x) => x.type === "lead");
//     let contactTypeId = leadContact._id;
//     if (formEntry.contactType !== undefined && formEntry.contactType !== null) {
//       contactTypeId = mongoose.Types.ObjectId(formEntry.contactType);
//     }
//     if (formEntry.billingAddress.fullName && formEntry.billingAddress.fullName !== "") {
//       //create buyer
//       buyer = await Contact.create({
//         ...formEntry.billingAddress,
//         isBuyer: true,
//         userId: form.userId,
//         organizationId: form.organizationId,
//         contactType: [contactTypeId],
//       });
//     }
//     let families = [];
//     for (const c of contacts) {
//       let payload = { ...c };
//       if (buyer !== null) {
//         payload = {
//           ...payload,
//           buyerId: buyer._id,
//           contactType: [contactTypeId],
//           userId: form.userId,
//           organizationId: form.organizationId,
//         };
//         const createdContact = await Contact.create(payload);
//         families.push({ id: createdContact._id });
//       } else {
//         payload = {
//           ...payload,
//           contactType: [contactTypeId],
//           userId: form.userId,
//           organizationId: form.organizationId,
//         };
//         const createdContact = await Contact.create(payload);
//         families.push({ id: createdContact._id });
//       }
//     }
//     if (families.length > 1) {
//       for (const f of families) {
//         const p = families.filter((x) => !x.id.equals(f.id));
//         await Contact.findByIdAndUpdate(f, { family: p });
//       }
//     }
//     return res.send({
//       success: true,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       errors: { common: { msg: error.message } },
//     });
//   }
// });
