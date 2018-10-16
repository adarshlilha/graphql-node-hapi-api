const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');

const server = hapi.server({
  port: 4000,
  host: 'localhost',
});

mongoose.connect('mongodb://admin:admintest123@ds133353.mlab.com:33353/graphql-node-hapi-api', {
  useNewUrlParser: true
});

mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        return `<h1>Home Route</h1>`
      }
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      handler: (request, reply) => {
        return Painting.find()
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (request, reply) => {
        const { name, url, techniques } = request.payload;
        const painting = new Painting({
          name,
          url,
          techniques
        });
        return painting.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server running in ${server.info.uri}`);
};

init();
