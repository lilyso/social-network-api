const { Schema } = require("mongoose");
const moment = require("moment");
const formatDate = require("./utils/helpers/formatDate.js");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    userName: {
      type: String,
      required: true,
      ref: "User", // user ref?
    },
    createdAt: {
      type: Date,
      default: Date.now, // format date helper Jun 10th, 2020 at 01:38pm
      get: (createdAtVal) => formatDate(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
