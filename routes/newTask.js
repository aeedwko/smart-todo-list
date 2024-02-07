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
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["thisisalongsecretkey"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.get('/', (req, res) => {
  const id = req.session.user_id;
  const templateVars = { user_id: id };
  res.render("newTask", templateVars);
});

router.post('/', (req, res) => {

});

module.exports = router;

// const templateVars = { user: users[id] };
// res.render("login", templateVars);
