const { connect, connection } = require('mongoose');

connect('mongodb://localhost/thoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
