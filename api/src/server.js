const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 7893;

app.use(cors());
app.use(bodyParser.json());

const destinations = [
  {name: 'Spain', categories: ['hot', 'beach']},
  {name: 'LA', categories: ['city']},
  {name: 'Gothenburg', categories: ['city', 'nordic', 'capital']},
  {name: 'Oslo', categories: ['city', 'nordic', 'capital']},
  {name: 'Bergen', categories: ['city', 'nordic']},
  {name: 'Stavanger', categories: ['city', 'nordic']},
].map((name, index) => ({id: `${index}`, name}));

const users = [
  {id: '0', username: 'andreas', name: 'Andreas', destinations: [1, 2, 3]},
  {id: '1', username: 'martin', name: 'Martin', destinations: [1, 2]},
  {id: '2', username: 'håkon', name: 'Håkon', destinations: [3, 2]},
];

const friendships = [
  {left: 'andreas', right: 'martin'},
  {left: 'andreas', right: 'håkon'},
  {left: 'håkon', right: 'martin'},
];

app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
  return res.status(501).send();
});

const userByUsername = username => users.find(user => user.username === username);

app.get('/users/:username', (req, res) => {
  res.send(userByUsername(req.params.username));
});

app.get('/destinations', (req, res) => {
  res.send(destinations);
});

app.post('/destinations', (req, res) => {
  res.status(501).send();
});

const destinationById = id => destinations[id];

app.get('/users/:username/destinations', (req, res) => {
  res.send(userByUsername(req.params.username).destinations
      .map(id => destinationById(id)));
});

app.post('/users/:username/destinations', (req, res) => {
  res.status(501).send();
});

app.get('/friendships', (req, res) => {
  res.send(friendships);
});

app.post('/friendships', (req, res) => {
  res.status(501).send();
});

const friendshipsByUsername = username => friendships
    .filter(friendship => friendship.left === username || friendship.right === username)
    .map(friendship => friendship.left === username ? friendship.right : friendship.left);

app.get('/friendships/:username', (req, res) => {
  res.send(friendshipsByUsername(req.params.username));
});

app.get('/users/:username/friendships', (req, res) => {
  res.send(friendshipsByUsername(req.params.username));
});

// Potential TODO: save "matches" separately, and just create one when adding one
const matchesByUserByFriend = user => friendshipsByUsername(user.username)
    .map(friendUsername => userByUsername(friendUsername).destinations
        .filter(friendDestination => user.destinations
            .filter(destination => destination === friendDestination))
        .map(destination => ({
          friend: userByUsername(friendUsername),
          destination: destinationById(destination),
        })));

const matchesByUser = user => [].concat.apply([], matchesByUserByFriend(user));

app.get('/users/:username/matches', (req, res) => {
  const username = req.params.username;

  if (req.query.groupByFriend === 'true') {
    res.send(matchesByUserByFriend(userByUsername(username)));
  } else {
    res.send(matchesByUser(userByUsername(username)));
  }
});

app.post('/users/:username/matches', (req, res) => {
  res.status(501).send();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
