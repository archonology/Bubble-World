const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// aggregate function to get friendCount
const friendCount = async () =>
  User.aggregate().count('friendCount')
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
          ? res.status(404).json({ message: 'No user with that ID' })
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
  // Add a friend to a user
  addFriend(req, res) {
    console.log('You are adding a friend');
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    console.log('You are updating a user');
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and delete their thoughts
  deleteUser(req, res) {
    console.log('You are deleting a user');
    User.findOneAndRemove({ _id: req.params._id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          // all thoughts that belong to user will be deleted upon deleting user
          : Thought.deleteMany(
            { thoughts: [] },
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
  },

  // Remove assignment from a student
  deleteFriend(req, res) {
    console.log('You are removing a friend');
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json({ message: 'Friend successfully removed!' })
      )
      .catch((err) => res.status(500).json(err));
  },
}