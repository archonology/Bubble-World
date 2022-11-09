const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            //set a custom format for date
            default: Date.now,
        }

    },
    {
        toJSON: {
            getters: true,
        },
    }
);


//this is a subdocument of 'Thought' model
module.exports = reactionSchema;