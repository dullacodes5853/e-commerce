const Route = require('express').Router();
const routeapi = require('./api');

Route.use('/api', routeapi);

Route.use((req, res) => {
  res.send("<h1>This is Wrong Route</h1>")
});

module.exports = Route;