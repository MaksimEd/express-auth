const Router = require('express').Router;
const { login, refreshToken } = require('./servicesAuthentication');

const route = Router();

route.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') return res.sendStatus(401);

  login(username, password).then(
    r => res.json(r),
    () => res.sendStatus(401)
  );
});

route.get('/refresh-token', function (req, res) {
  if (req.headers.authorization === undefined) return res.sendStatus(401);
  const token = req.headers.authorization.split(' ')[1];
  if (token === undefined) return res.sendStatus(401);

  refreshToken(token).then(
    r => res.json(r),
    () => res.sendStatus(401)
  );
});

module.exports = route;