const jwt = require('jsonwebtoken');
const { JWTAccessSecret, JWTRefreshSecret } = require('../../../configs/JWT');
const Users = require('./modelsAuthentication');

const getTokensForUser = (user) => {
  const accessToken = jwt.sign(user, JWTAccessSecret, { expiresIn: '3h' });
  const refreshToken = jwt.sign(user, JWTRefreshSecret);
  return { accessToken, refreshToken };
}

const login = (username, password) => {
  const user = Users.find(u => u.username === username && u.password === password);
  if (user === undefined) {
    return Promise.reject('not found user');
  }
  return Promise.resolve(getTokensForUser(user));
};

const refreshToken = (refreshToken) => new Promise((resolve, reject) => {
  jwt.verify(refreshToken, JWTRefreshSecret, (err, decoded) => {
    if (err) return reject(err);
    const user = Users.find(u => u.id === decoded.id);
    if (user === undefined) return reject('not found user');

    resolve(getTokensForUser(user));
  });
});

module.exports = {
  login: login,
  refreshToken: refreshToken
};