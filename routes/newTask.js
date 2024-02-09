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
  const firstName = req.session.firstName;
  const lastName = req.session.lastName;
  const templateVars = { firstName, lastName };
  res.render("newTask", templateVars);
});

router.post('/', (req, res) => {

});

module.exports = router;

// const templateVars = { user: users[id] };
// res.render("login", templateVars);
