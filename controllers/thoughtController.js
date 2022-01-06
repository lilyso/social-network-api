const Thought = require("../models/Thought.js");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          thought,
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
    Thought.findById(req.params.thoughtId)
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
      thoughtName: req.body.thoughtName,
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
  // Update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a Reaction
  async deleteReaction(req, res) {
    console.log(req.params.reactionId);
    // Thought.Reaction.remove({ reactionId: req.params.reactionId })
    //   .then((reaction) =>
    //     !reaction res.status(404).json({ message: "No reaction with that ID" })

    //   .then(() => res.json({ message: "Reaction deleted!" }))
    //   .catch((err) => res.status(500).json(err));
    // Thought.reactions.
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    console.log(thought.reactions);
    const del = await thought.reactions.pull(req.params.reactionId);

    thought.save(function (err) {
      if (err) return console.log(err.message);
      console.log("the subdocs were removed");
    });
    res.json(true);
  },
};
