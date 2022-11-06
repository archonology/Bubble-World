const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //check Mongoose docs to match email address
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],
          friends: [
            {
              type: Schema.Types.ObjectId,
              //make sure this is the proper way to do a self reference
              ref: 'User',
            },
          ],
        toJSON: {
            virtuals: true,
        },
    }
);

//virtual to get user's total friend count
userSchema
    .virtual('friendCount')
     // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('thought', userSchema);
module.exports = User;

