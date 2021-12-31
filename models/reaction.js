const { Schema } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema({
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
    ref: "User.username", // user ref?
  },
  createdAt: {
    type: Date,
    default: `${moment(Date.now()).format("MMM Do YYYY")} at ${moment(
      Date.now()
    ).format("hh a")}`, // format date helper Jun 10th, 2020 at 01:38pm
  },
});

module.exports = reactionSchema;
