const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            //set a custom format for date
            default: Date.now,
        },
        username: {
            type: String,
            require: true,
        },
        //this should return an array of nested reactions created with the reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);

    //this will customize the createdAt date format
    thoughtSchema
    .virtual('formatDate')
    // Getter
    .get(function () {
        return this.createdAt;
    });
//this will get the length of reactions that go with each thought.
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);
module.exports = Thought;