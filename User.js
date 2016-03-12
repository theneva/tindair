const util = require('./util.js');

const users = [{
  username: 'andreas',
  name: 'Andreas',
  profilePicture: 'http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png',
  friends: ['håkon'],
  destinations: ['Spain', 'Oslo', 'Bergen']
}, {
  username: 'martin',
  name: 'Martin',
  profilePicture: 'http://askfedoratest-anuradhaw.rhcloud.com/static/askfedoratheme/images/man.png',
  friends: ['håkon'],
  destinations: ['Spain', 'LA', 'Oslo']
}, {
  username: 'håkon',
  name: 'Håkon',
  profilePicture: 'http://www.cbc.ca/smartestperson/content/image/avatar-placeholder.png',
  friends: ['andreas', 'martin'],
  destinations: ['Oslo', 'Bergen']
}];

module.exports = {
  all: () => users.slice(),
  byUsername: username => users.find(user => user.username.toLowerCase() === username.toLowerCase()),
  byDestination: destination => users
      .filter(user => util.arrayContains(
          user.destinations.map(destination => destination.toLowerCase()),
          destination.toLowerCase())),
};
