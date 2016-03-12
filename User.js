const util = require('./util.js');

const users = [{
  username: 'andreas',
  name: 'Andreas',
  profilePicture: 'https://scontent-arn2-1.xx.fbcdn.net/hphotos-xfl1/v/t1.0-9/10479542_10152575819385491_7575197136310777683_n.jpg?oh=1cfaaee6833efd2235acb74b42bccbf5&oe=5757DC22',
  friends: ['håkon', 'martin'],
  destinations: ['Amsterdam', 'Madrid', 'Oslo', 'Bergen'],
}, {
  username: 'martin',
  name: 'Martin',
  profilePicture: 'https://scontent-arn2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10351759_10152203958431517_379246105981390468_n.jpg?oh=65657f9ba8415a8f2eea6727fbe85a35&oe=574B4317',
  friends: ['håkon', 'andreas'],
  destinations: ['Madrid', 'Amsterdam', 'LA', 'Oslo'],

}, {
  username: 'håkon',
  name: 'Håkon',
  profilePicture: 'https://scontent-arn2-1.xx.fbcdn.net/hphotos-xtp1/t31.0-8/12401909_10153467542424285_1408498897537394327_o.jpg',
  friends: ['andreas', 'martin'],
  destinations: ['Oslo', 'Amsterdam', 'Bergen']
}];

module.exports = {
  all: () => users.slice(),
  byUsername: username => users.find(user => user.username.toLowerCase() === username.toLowerCase()),
  byDestination: destination => users
      .filter(user => util.arrayContains(
          user.destinations.map(destination => destination.toLowerCase()),
          destination.toLowerCase())),
};
