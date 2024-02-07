/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const taskQueries = require('../db/queries/tasks');
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ["thisisalongsecretkey"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.get('/', (req, res) => {
  taskQueries.getTasks()
  .then(tasks => {
    const id = req.session.user_id;
    if (!id) {
      return res.status(401).send("You are not logged in!");
    }
    const templateVars = { tasks: tasks, user_id: id};
    res.render('tasks', templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.post('/', (req, res) => {
  res.render('task');
});

module.exports = router;

