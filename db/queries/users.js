const db = require('../connection');

const getUser = (id) => {
  id = [id];
  return db.query('SELECT * FROM users WHERE id = $1;', id)
    .then(data => {
      return data.rows;
    });
};

const getLogin = (email) => {
  email = [email];
  return db.query('SELECT id, first_name, last_name, email, password FROM users WHERE email = $1;', email)
    .then(data => {
      return data.rows;
    });
};

const editUser = (userData) => {
  const values = [userData.first_name, userData.last_name, userData.email, userData.password, userData.id];
  return db.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, password= $4 WHERE id = $5;', values);
};

module.exports = { getUser, getLogin, editUser };
