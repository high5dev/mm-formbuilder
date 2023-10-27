const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;
const NotificationSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "auth",
    },
    category: {
      type: String,
      enum: ["Task", "Goal", "Event", "Birthday", "Finance", "Retention", "MissYouCall","Booking","MyBuilder"],
      // required: true,
    },
    categoryId: {
      type: ObjectId,
      // required: true,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    contactId: {
      type: ObjectId,
      ref: "contacts",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref: "organizations",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", NotificationSchema);
