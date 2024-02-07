/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const taskQueries = require('../db/queries/tasks');

router.get('/', (req, res) => {
  taskQueries.getTasks()
  .then(tasks => {
    const templateVars = { tasks: tasks};
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
