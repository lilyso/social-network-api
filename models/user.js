const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter an email address."],
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address.",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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

userSchema.virtual("friendCount", {
  ref: "user",
  localField: "friends",
  foreignField: "_id",
  count: true,
});

// userSchema.virtual("Thoughts", {
//   ref: "User",
//   localField: "thoughts",
//   foreignField: "userName",
//   justOne: false, // for many-to-1 relationships
// });

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
