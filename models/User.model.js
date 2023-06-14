const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    feeds: [{
      type: Schema.Types.ObjectId,
      ref: "Feed"
    }],
    feedReadDates: {
      type: Map,
      of: Schema.Types.Date,
      default: {}
    }, 
    settings: {
      group: {
        type: Boolean,
        default: true,
      },
      order: {
        type: Number,
        default: 1, // ascending
        enum: [1, -1]
      }
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
