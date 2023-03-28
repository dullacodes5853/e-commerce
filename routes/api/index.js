const Router = require('express').Router();
const cate_Route = require('./cate_route_api');
const prod_Route = require('./prod_route_api');
const tag_Route = require('./tag_route_api');

Router.use('/categories', cate_Route);
Router.use('/products', prod_Route);
Router.use('/tags', tag_Route);

module.exports = Router;
