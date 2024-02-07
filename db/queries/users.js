const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getLogin = (email) => {
  return db.query('SELECT email, password FROM users WHERE email = $1;', email)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getLogin };


