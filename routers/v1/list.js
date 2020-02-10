const Router = require('express').Router;
const request = require('request-promise');

const route = Router();

route.get('/', async (_, res) => {
  try {
    const response = await request({
      url: 'https://my-json-server.typicode.com/typicode/demo/db',
      method: 'GET',
      timeout: 5000,
      json: true
    });
    res.send(response);
  } catch (error) {
    res.statusCode(500);
  }
});

module.exports = route;