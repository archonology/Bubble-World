const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const {} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');


  await User.deleteMany({});
  await Thought.deleteMany({});
  await Reaction.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the user array
  for (let i = 0; i < 20; i++) {
    // Get some random thought objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(20);
    const reactions = getRandomReactions(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const bubbleWorld = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      first,
      last,
      bubbleWorld,
      thoughts,
      reactions,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: 'I love Bubble World forever.',
    username: fullName,
    users: [...users],
  });

  // Add reactions to the collection and await the results
  await Reaction.collection.insertOne({
    reactionBody: 'me, too.',
    username: fullName,
    users: [...users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
