'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const util = require('./util.js');

const Destination = require('./Destination.js');
const User = require('./User.js');

const app = express();
const port = process.env.PORT || 7893;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send({
  links: [
    {rel: 'self', method: 'get', href: '/'},
    {rel: 'users', method: 'get', href: '/users'},
    {rel: 'user', method: 'get', href: '/users/:username'},
    {rel: 'destinations by user', method: 'get', href: '/users/:username/destinations'},
    {
      rel: 'add destination to user',
      method: 'post',
      href: '/users/:username/destinations',
      payload: '{destinationName}'
    },
    {rel: 'destinations', method: 'get', href: '/destinations'},
    {rel: 'random destination', method: 'get', href: '/destinations/random'},
    {rel: 'destination by name', method: 'get', href: '/destinations/:name'},
    {rel: 'users who liked destination', method: 'get', href: '/destinations/:name/users'},
  ],
}));

app.get('/users', (req, res) => res.send(User.all()));

app.get('/users/:username', (req, res) => res.send(User.byUsername(req.params.username)));

app.get('/users/:username/destinations', (req, res) => res.send(User.byUsername(req.params.username).destinations));

app.post('/users/:username/destinations', (req, res) => {
  const destination = req.body.destination;

  if (!destination || !Destination.byName(destination)) {
    return res.status(400).send('body must be a destination name');
  }

  const user = User.byUsername(req.params.username);

  if (util.arrayContains(user.destinations, destination)) {
    return res.status(400).send('user has already added that destination');
  }

  user.destinations.push(destination);

  // TODO: Send socket message

  res.status(201).send(user);
});

app.get('/destinations', (req, res) => res.send(Destination.all()));

const withFriends = (destinations, username) => {
  const user = User.byUsername(username);

  return destinations.map(destination => ({
    destination,
    friends: User.byDestination(destination.name)
        .filter(potentialFriend => util.arrayContains(potentialFriend.friends, user.username)),
  }));
};

app.get('/destinations/random', (req, res) => {
  const count = parseInt(req.query.count);
  const sample = Destination.sample(isNaN(count) ? 5 : count);

  const username = req.header('X-Name');

  if (username) {
    res.send(withFriends(sample, username));
  } else {
    res.send(sample.map(destination => ({
      destination,
      friends: [],
    })));
  }
});

app.get('/destinations/:name', (req, res) => res.send(Destination.byName(req.params.name) || 'no such destination'));

app.get('/destinations/:name/users', (req, res) => res.send(User.byDestination(req.params.name)
    .filter(user => req.query.friendsWith
        ? util.arrayContains(user.friends.map(friend => friend.toLowerCase()), req.query.friendsWith.toLowerCase())
        : true)));

const sockets = [];
const ws = require('ws');
let server;
const connect = httpServer => {
  server = new ws.Server({server: httpServer});

  server.on('connection', socket => {
    const username = socket.upgradeReq.headers['x-name'];

    if (!username) {
      socket.send('cannot connect without being logged in (identify via x-user header)');
      socket.close();
    }

    sockets.push({
      socket,
      username,
    });

    socket.on('close', () => {
      sockets.splice(sockets.findIndex(s => s.socket === socket), 1);
    });
  })
};

app.post('/travel-requests', (req, res) => {
  const user = req.header('X-Name');

  console.log('user', user, 'body', req.body);

  if (!user) {
    return res.status(401).send('cannot send requests without being logged in (identify via X-Name header');
  }

  const destination = req.body.destination;

  if (!destination) {
    return res.status(400).send('destination must exist');
  }

  const usernames = req.body.usernames;

  console.log('blah');

  if (!usernames || !(usernames instanceof Array)) {
    return res.status(400).send('usernames must be an array of strings');
  }

  const payload = {
    topic: 'new travel request',
    data: {destination, sender: user},
  };

  sockets
      .filter(socket => util.arrayContains(usernames, socket.username))
      .forEach(socket => socket.socket.send(JSON.stringify(payload)));

  res.status(201).send();
});

const httpServer = app.listen(port, () => console.log(`Listening on port ${port}`));
connect(httpServer);
