const jwt = require('jsonwebtoken');
const Users = require('./modelsAuthentication');

const login = (username, password) => {
  const user = Users.find(u => u.username === username && u.password === password);
  if (user === undefined) {
    return Promise.reject('not found user');
  }
  const accessToken = jwt.sign(user, 'secret', { expiresIn: '3h' });
  const refreshToken = jwt.sign(user, 'secret-refresh');
  return Promise.resolve({ accessToken, refreshToken });
};

const refreshToken = (refreshToken) => new Promise((resolve, reject) => {
  jwt.verify(refreshToken, 'secret-refresh', (err, decoded) => {
    if (err) return reject(err);
    const user = Users.find(u => u.username === decoded.username && u.password === decoded.password);
    if (user === undefined) return reject('not found user');

    const accessToken = jwt.sign(user, 'secret', { expiresIn: '3h' });
    const refreshToken = jwt.sign(user, 'secret-refresh');
    resolve({ accessToken, refreshToken });
  });
});

module.exports = {
  login: login,
  refreshToken: refreshToken
};