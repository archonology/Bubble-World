const { User, Thought } = require('../models');

// aggregate function to get reactionCount
const reactionCount = async () =>
  Thought.aggregate().count('reactionCount')
    .then((numberOfReactions) => numberOfReactions);

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          reactionCount: await reactionCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params._id })
      .select('-__v')
      //research lean function further
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
            thought,
            reactionCount: await reactionCount(),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought and update it to the User.
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Thought created, but found no thought with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // create a new reaction -- this needs work
  createReaction(req, res) {
    console.log('You are adding a reaction');
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction ? res.status(404).json({ message: "No reaction found!" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    console.log('You are updating a thought')
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and delete it's reactions -- needs figuring
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params._id })
      .then((thought) =>
        !thought
          ? res.status(404).json({
            message: 'no thought found with that id!',
          })
          : res.json({ message: 'thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete a reaction
  deleteReaction(req, res) {
    console.log('You are deleting a reaction');
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought ? res.status(404).json({ message: "No reaction found by that id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
}