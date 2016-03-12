const util = require('./util.js');

const destinations = [{
  name: 'Madrid',
  description: 'A Spanish city',
  airportCode: 'MAD',
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
  airportCode: 'LAX',
  images: [{
    title: 'Los Angeles City 01',
    url: 'http://archpaper.com/uploads/image/los_angeles_city_01.jpg',
  }],
}, {
  name: 'Copenhagen',
  description: "Denmark's capital",
  airportCode: 'CPH',
  images: [{
    title: 'Gothenburg 1',
    url: 'http://www.accommodationengine.co.uk/files/cityguide/full/gothenburg1.jpg',
  }],
}, {
  name: 'Oslo',
  description: 'The capital of Norway',
  airportCode: 'OSL',
  images: [{
    title: 'Oslo C',
    url: 'http://www.casayego.com/europeancities/oslo/oslo-c.jpg',
  }],
}, {
  name: 'Bergen',
  description: 'A city on the west coast of norway',
  airportCode: 'BGO',
  images:[{
    title: 'zachariasbryggen',
    url: 'https://res-1.cloudinary.com/simpleview/image/upload/c_fill,f_auto,q_65,w_768/v1/clients/norway/zachariasbryggen-bergen-norway_315f239b-9f2a-4bd2-b9db-e9fe510f5449.jpg'
  }],
}, {
  name: 'Amsterdam',
  description: 'The best city in the northern hemisphere.',
  airportCode: 'AMS',
  images:[{
    title: 'Damrak Merjin Roubroeks',
    url: 'http://www.iamsterdam.com/media/canals/g-c-damrak-merijn-roubroeks.jpg'
  }],
}];

module.exports = {
  all: () => destinations,
  byName: name => destinations.find(destination => destination.name.toLowerCase() === name.toLowerCase()),
  sample: (count) => util.shuffleArray(destinations.slice()).slice(0, Math.min(count, destinations.length - 1)),
};
