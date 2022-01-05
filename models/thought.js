const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction.js");
const moment = require("moment");
const User = require("./User.js");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: `${moment(Date.now()).format("MMM Do YYYY")} at ${moment(
        Date.now()
      ).format("hh a")}`,
    },
    userName: {
      type: String,
      required: true,
      ref: "User", // user ref?
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount", {
  ref: "Reaction",
  localField: "reactions",
  foreignField: "_id",
  count: true,
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
