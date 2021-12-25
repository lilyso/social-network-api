const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true, // 280 max char
  },
  createdAt: {
    type: Date,
    default: Date.now(), // format date helper
  },
});

module.exports = reactionSchema;
