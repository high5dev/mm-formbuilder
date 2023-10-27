const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocialProofCampaign = new Schema(
  {
    campaignName: {
      type: String,
    },
    status: {
      type: String,
      default: "inactive",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    notification:{
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
        type: String,
        default: 'Rounded',
      },
      delay_first_noti: {
        type: Number,
        default:0
      },
      display_each_noti: {
        type: Number,
        default:7
      },
      space_each_noti: {
        type: Number,
        default:3
      },
      recent_activity:{
          type:{
            type:String,
            default:'recent_activity'
          },
          msg: {
              type: String,
          },
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
         type:{
          type:String,
          default:'live_visitors'
         },
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
        type:{
          type:String,
          default:'hot_stake'
        },
        category:{
          type:String,
          default:'visitors'
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
          default:7
         },
         status:{
          type:Boolean,
          default:false
        },
        message_visitors:{
          type:Number,
          default:7
         },
         action_visitors:{
          type:Number,
          default:7
         }
      }
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("socialproof-campaign", SocialProofCampaign);
