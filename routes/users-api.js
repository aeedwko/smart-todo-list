/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUser(req.session.user_id)
    .then(user => {
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.put('/', (req, res) => {
  const user = {
    id: req.session.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }

  userQueries.editUser(user)
  .then(task => {
    res.json({ task });
  })
  .catch(err => {
    res
      .status(500)
      .json({error: err.message });
  });
});

module.exports = router;
