const mongoose = require("mongoose");

const FormAutomationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      default: null,
    },
    automationName: {
      type: String,
    },
    activationUpon: {
      uponType: {
        type: String,
        enum: ["Upon Entry", "Criteria Met", ""],
      },
      criteria: {
        criteriaType: {
          type: String,
        },
        rentingRate: {
          type: Number,
        },
      },
    },
    activateTime: {
      isImmediately: {
        type: Boolean,
      },
      time: {
        type: Number,
      },
      type: {
        type: String,
        enum: ["Before", "After", "On", ""],
      },
      unit: {
        type: String,
        enum: ["minutes", "hours", "days", "weeks", "months", ""],
      },
    },
    actions: [
      {
        id: String,
        actionType: String,
        duration: {
          time: {
            type: Number,
          },
          unit: {
            type: String,
            enum: ["minutes", "hours", "days", "weeks", "months", ""],
          },
        },
        parentId: String,
        setCustomTime: Boolean,
        useSubscriberTimeZone: Boolean,
        customTime: {
          days: [
            {
              type: String,
            },
          ],
          time: Number,
        },
        subject: String,
        content: String,
        template: Object,
        attachments: [],

        condition: {
          type: String,
          enum: ["yes", "no", ""],
          default: "",
        },

        //video condition
        confirmProgress: {
          isPercentConfirm: {
            type: Boolean,
            default: false,
          },

          percentage: {
            type: Number,
          },
        },

        //notification
        to: {
          type: {
            type: String,
            enum: ["ME", "CONTACT", ""],
            default: "",
          },
          contact: [{ type: String }],
        },
        method: {
          type: String,
          enum: ["TEXT", "EMAIL", "TOOLBAR", ""],
          default: "",
        },

        // task
        taskContent: {
          title: {
            type: String,
          },
          workspaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "workspaces",
          },
          statusId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "boards",
          },
          labels: [
            {
              value: {
                type: String,
              },
              label: {
                type: String,
              },
              color: {
                type: String,
              },
            },
          ],
          description: {
            type: String,
          },
          coverImage: {
            type: String,
          },
          dueDate: {
            type: Date,
          },
        },

        // general
        isStart: Boolean,
        isLast: Boolean,
        isCondition: Boolean,
      },
    ],

    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "form-builders",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("form-automation", FormAutomationSchema);
