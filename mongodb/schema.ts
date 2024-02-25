import mongoose, { Schema } from "mongoose";


const phoneDetailSchema = new Schema(
  {
    phoneNumber: String,
    countryCode: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const lastSchema = new Schema(
    {
        role: {
            type: String,
            enum: {
                values: ["", "business", "private"],
                message: "Role is not supported",
            },
            default: "",
        },
        emailAddress: {
          type: String,
        },
        businessDetails: {
          businessEntityType: {
            type: String,
            default: "",
          },
           businessName: {
            type: String,
            default: "",
           },
           name: {
            type: String,
            default: "",
           },
           city: {
            type: String,
            default: "",
           },
           state: {
            type: String,
            default: "",
           },
           cityId: {
            type: String,
            default: "",
           },
           established: {
            type: String,
            default: "",
           },
           description: {
            type: String,
            default: "",
           },
           businessLogo: {
            type: String,
           },
           default: {},
        },
        emailInvite: {
            type: [{
                email: String,
                otp: Number,
                optCount: Number,
                otpSentTime: Date,
                invalidAttempts: {
                  type: Boolean,
                  default: false,
                }
              }],
              default: [],
        },
        phoneDetails: {
          type: [phoneDetailSchema],
          default: [],
        },
    
        previousMail: {
          type: [{
            email: String
          }],
          default: [],
        },
        status: {
            type: String,
            enum: {
                values: ["active", "inActive"],
                message: "Status is not supported",
            },
            default: "active",
         },
         verified: {
            type: Boolean,
            default: false,
         },
    },
    {
        timestamps: true,
    }
)





export default lastSchema
