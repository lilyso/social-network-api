const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true, // 1-280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now(), // format date helper
    },
    userName: {
      type: String,
      required: true, // user ref
    },
    reactions: [
      {
        reactionSchema, // import schema
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

const Thoughts = model("Thought", thoughtSchema);
