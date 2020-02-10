const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const list = require('./list');

const route = Router();

route.use(/^\/(?!login|refresh-token).*/, (req, res, next) => {
  if (req.headers.authorization === undefined) return res.sendStatus(401);
  const token = req.headers.authorization.split(' ')[1];
  if (token === undefined) return res.sendStatus(401);
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) res.sendStatus(401);
    else {
      res.locals.user = decoded;
      next();
    }
  });
});

route.use('/list', list);


route.get('/refresh-token', function (req, res) {
  if (req.headers.authorization === undefined) return res.sendStatus(401);
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret-refresh', function(err, decoded) {
    if (err) return res.sendStatus(401);
    const accessToken = jwt.sign(decoded, 'secret', { expiresIn: '3h' });
    const refreshToken = jwt.sign(decoded, 'secret-refresh');
    res.json({ accessToken, refreshToken });
  });
});

route.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username == null || password == null) {
    return res.sendStatus(401);
  }
  const accessToken = jwt.sign({ id: 333, login: 'admin' }, 'secret', { expiresIn: '3h' });
  const refreshToken = jwt.sign({ id: 333, login: 'admin' }, 'secret-refresh');
  return res.json({ accessToken, refreshToken });
});

module.exports = route;
