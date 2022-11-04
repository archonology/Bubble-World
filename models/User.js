const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {

    })

const User = model('thought', userSchema);
module.exports = User;