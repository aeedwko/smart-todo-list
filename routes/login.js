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
  res.render("login");
});

router.post('/', (req, res) => {
  const email = [`${req.body.email}`];
  userQueries.getUser(email)
    .then(user => {
      console.log(user);
      if (user.length === 0) { // if no matching email is returned, account does not exist
        return res.status(403).send("Account does not exist");
      }
      if (user && (user[0].password !== req.body.password)) {
        return res.status(403).send("Incorrect password");
      }
      req.session.user_id = user[0].email;
      res.redirect("/tasks");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
