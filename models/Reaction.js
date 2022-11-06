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
            default: Date.now,
            //figure out a getter method to format the timestamp
            
        },
        toJSON: {
            getters: true,
        },
    }
);


//this is a subdocument of 'Thought' model, so check docs to insure proper initialization. 
module.exports = reactionSchema;