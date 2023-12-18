// model
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");
const {
  WebSiteRole,
  WebSiteInvite,
} = require("../models/index/index");
const { response } = require("express");

exports.createRole = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const payload = req.body; //websiteId, name, description, permissions
  const websiteId = payload.websiteId;

  try {
    const newRole = await WebSiteRole.create({
      ...payload,
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId: mongoose.Types.ObjectId(websiteId),
    });
    res.status(200).json({ success: true, data: newRole });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.updateRole = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const payload = req.body;

  try {
    const updatedRole = await WebSiteRole.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, payload, {new: true});
    res.status(200).json({ success: true, data: updatedRole });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.deleteRole = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const roleToDelete = await WebSiteRole.findByIdAndUpdate(id, { isDelete: true }, {new: true});

    res.status(200).json({ success: true, data: roleToDelete });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getRolesByWebsite = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let userId = req.user._id;
  const { organization } = req.headers;
  try {
    websiteId = mongoose.Types.ObjectId(id);
    const roles = await WebSiteRole.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId,
      isDelete: false,
    });
    res.status(200).json({ success: true, data: roles });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.createInvite = asyncHandler(async (req, res) => {
  let userId = req.user._id;
  const { organization } = req.headers;
  const payload = req.body;
  const websiteId = payload.websiteId;

  try {
    const newInvite = await WebSiteInvite.create({
      ...payload,
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId: mongoose.Types.ObjectId(websiteId),
    });
    res.status(200).json({ success: true, data: newInvite });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.getInvitesByWebsite = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let userId = req.user._id;
  const { organization } = req.headers;
  try {
    websiteId = mongoose.Types.ObjectId(id);
    const invites = await WebSiteInvite.find({
      userId: mongoose.Types.ObjectId(userId),
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      websiteId,
      isDelete: false,
    });
    res.status(200).json({ success: true, data: invites });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.deleteInvite = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    id = mongoose.Types.ObjectId(id);
    const inviteToDelete = await WebSiteInvite.findByIdAndUpdate(id, { isDelete: true }, {new: true});

    res.status(200).json({ success: true, data: inviteToDelete });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});

exports.updateInvite = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const payload = req.body;

  try {
    const updatedInvite = await WebSiteInvite.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, payload, {new: true});
    res.status(200).json({ success: true, data: updatedInvite });
  } catch (err) {
    res.send({ msg: err.message.replace(/\'/g, ""), success: false });
  }
});