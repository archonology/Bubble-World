const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {

    })

const Reaction = model('thought', reactionSchema);
module.exports = Reaction;