const { Thought } = require("../models");

module.exports = {
  // Get all thoughts
  gethoughts(req, res) {
    Thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          user,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create({
      thoughText: req.body.thoughtText,
      userName: req.body.userName,
    })
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Reaction.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: "Thought and Reactions deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
