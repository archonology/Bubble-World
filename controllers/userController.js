const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// aggregate functino to get friendCount
const friendCount = async () =>
  Student.aggregate().count('friendCount')
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
    // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          friendCount: await friendCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getOneUser(req, res) {
    User.findOne({ _id: req.params._id })
      .select('-__v')
      //research lean function further
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No student with that ID' })
          : res.json({
            user,
            friendCount: await friendCount(),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and delete their thoughts -- needs figuring
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params._id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          // this is a proxy for now -- to have thoughts deleted when their user is deleted.
          : Thought.findOneAndUpdate(
            { users: req.params._id },
            { $pull: { users: req.params._id } },
            { new: true }
          )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
            message: 'thoughts deleted, but no thoughts found',
          })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    }
}