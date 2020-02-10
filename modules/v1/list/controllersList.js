const Router = require('express').Router;
const { getList } = require('./servicesList');

const route = Router();

route.get('/', async (_, res) => {
  getList().then(
    (response) => res.send(response),
    () => res.statusCode(500)
  );
});

module.exports = route;