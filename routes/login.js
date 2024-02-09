/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  const id = req.session.user_id;
  if (id) {
    return res.redirect("/tasks");
  };
  const firstName = req.session.firstName;
  const lastName = req.session.lastName;
  const templateVars = { firstName, lastName };
  res.render("login", templateVars);
});

router.post('/', (req, res) => {
  userQueries.getLogin(req.body.email)
    .then(user => {
      if (user.length === 0) { // if no matching email is returned, account does not exist
        return res.status(403).send("Account does not exist");
      };
      if (user && (user[0].password !== req.body.password)) {
        return res.status(403).send("Incorrect password");
      };
      // set cookie properties
      req.session.firstName = user[0].first_name;
      req.session.lastName = user[0].last_name;
      req.session.login = user[0].email;
      req.session.user_id = user[0].id;
      console.log(req.session);
      res.redirect("/tasks");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
