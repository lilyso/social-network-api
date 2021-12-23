const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true }, // trimmed
    email: { type: String, unique: true, required: true }, // validate
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Friends",
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

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return; // sum of friends;
  })
  // Setter to set the first and last name
  .set(function (friend) {
    // set friends count
  });

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
