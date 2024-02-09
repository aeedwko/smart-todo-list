// routes for tasks data

const express = require('express');
const router = express.Router();
const taskQueries = require('../db/queries/tasks');

router.get('/', (req, res) => {
  taskQueries.getTasks(req.session.user_id)
  .then(tasks => {
    res.json({ tasks });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.put('/:id/modify', (req, res) => {
  const task = {
    id: req.params.id,
    category_id: req.body.category_id,
    content: req.body.content,
    completed: req.body.completed
  }
  taskQueries.editTask(task)
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
