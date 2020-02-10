const request  = require('request-promise');

const getList = () => (
  request({
    url: 'https://my-json-server.typicode.com/typicode/demo/db',
    method: 'GET',
    timeout: 5000,
    json: true
  })
);

module.exports = {
  getList: getList
}
