const { Schema, model } = require("mongoose");
const { reactionSchema } = require("./Reaction.js");

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
      ref: "User.username", // user ref?
    },
    reactions: [
      {
        reactionSchema,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("reactionCount", {
  ref: "Reaction",
  localField: "reactions",
  foreignField: "_id",
  count: true,
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
