const { Schema, model } = require('mongoose');

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
            default: Date.now,
            //figure out a getter to format the timestamp
        },
        username: {
            type: String,
            require: true,
        },
        
        //this should return an array of nested reactions created with the reactionSchema
        reactions: [reactionSchema],

        toJSON: {
            getters: true,
        },

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