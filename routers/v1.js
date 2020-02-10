const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const { JWTAccessSecret } = require('../configs/JWT');
const { controllersList } = require('../modules/v1/list');
const { controllersAuthentication } = require('../modules/v1/authentication');

const route = Router();

route.use(/^\/(?!login|refresh-token).*/, (req, res, next) => {
  if (req.headers.authorization === undefined) return res.sendStatus(401);
  const token = req.headers.authorization.split(' ')[1];
  if (token === undefined) return res.sendStatus(401);
  jwt.verify(token, JWTAccessSecret, (err, decoded) => {
    if (err) return res.sendStatus(401);
    res.locals.user = decoded;
    next();
  });
});

route.use(controllersAuthentication);
route.use('/list', controllersList);

module.exports = route;
