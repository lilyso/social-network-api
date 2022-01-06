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
      default: Date.now, // format date helper Jun 10th, 2020 at 01:38pm
      get: (createdAtVal) => formatDate(createdAtVal),
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

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
