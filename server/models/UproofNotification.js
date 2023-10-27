const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnotificationSchema = new Schema(
  {
    hide_noti_mobile: {
      type: Boolean,
      default: false,
    },
    show_on_top: {
      type: Boolean,
      default: false,
    },
    position_noti: {
      type: Boolean,
      default: false,
    },
    noti_theme: {
      type: Boolean,
      default: false,
    },
    delay_first_noti: {
      type: String,
    },
    display_each_noti: {
      type: String,
    },
    space_each_noti: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "campaign",
      required: true,
    },
    recent_activity:{
        msg: {
            type: String,
        },

        image: { type: String },
        display_last_convo: {
            type: Number,
            default: 20
        },
        convo_from_last: {
            type: Number,
            default:7
        },
        at_least_one: {
            type: Number,
            default:1
        },
        loop_notification: {
            type: Boolean,
            default: false
        },
        status:{
          type:Boolean,
          default:false
        }
    },
    live_visitor_activity:{
       display_live_visitors:{
        type:Boolean,
        default:false
       },
       active_visitors:{
        type:Number,
        default:7
       },
       loop_notification: {
        type: Boolean,
        default: false
       },
       message_visitors:{
        type:Number,
        default:7
       },
       status:{
        type:Boolean,
        default:false
      }
    },
    hot_stake_activity:{
      category:{
        type:String,
        default:'conversions'
      },
      display_live_visitors:{
        type:Boolean,
        default:false
       },
       loop_notification: {
        type: Boolean,
        default: false
       },
       min_tracked_visitors:{
        type:Number,
        default:7,
        status:false
       }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("uproofNotification", UnotificationSchema);
