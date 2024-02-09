/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  const id = req.session.user_id;
  if (!id) {
    return res.status(401).send("You are not logged in!");
  };
  userQueries.getUser(id)
    .then(user => {
      firstName = user[0].first_name;
      lastName = user[0].last_name;
      email = user[0].email;
      const templateVars = { firstName, lastName, email};
      res.render("user", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
