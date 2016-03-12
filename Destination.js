const util = require('./util.js');

const destinations = [{
  name: 'Madrid',
  description: 'A Spanish city',
  images: [{
    title: 'Madrid City at Night',
    url: 'http://madride.net/wp-content/uploads/2015/04/Madrid-City-at-Night.jpg',
  }, {
    title: 'Gothenburg 1',
    url: 'http://www.accommodationengine.co.uk/files/cityguide/full/gothenburg1.jpg',
  }]
}, {
  name: 'LA',
  description: 'A big city in California',
  images: [{
    title: 'Los Angeles City 01',
    url: 'http://archpaper.com/uploads/image/los_angeles_city_01.jpg',
  }],
}, {
  name: 'Gothenburg',
  description: "Denmark's capital",
  images: [{
    title: 'Gothenburg 1',
    url: 'http://www.accommodationengine.co.uk/files/cityguide/full/gothenburg1.jpg',
  }],
}, {
  name: 'Oslo',
  description: 'The capital of Norway',
  images: [{
    title: 'Oslo C',
    url: 'http://www.casayego.com/europeancities/oslo/oslo-c.jpg',
  }],
}, {
  name: 'Bergen',
  description: 'A city on the west coast of Norway',
  images:[{
    title: 'Zachariasbryggen',
    url: 'https://res-1.cloudinary.com/simpleview/image/upload/c_fill,f_auto,q_65,w_768/v1/clients/norway/zachariasbryggen-bergen-norway_315f239b-9f2a-4bd2-b9db-e9fe510f5449.jpg'
  }],
}];

module.exports = {
  all: () => destinations,
  byName: name => destinations.find(destination => destination.name.toLowerCase() === name.toLowerCase()),
  sample: (count) => util.shuffleArray(destinations.slice()).slice(0, Math.min(count, destinations.length - 1)),
};
