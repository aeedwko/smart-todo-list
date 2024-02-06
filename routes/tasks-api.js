// routes for tasks data

const express = require('express');
const router = express.Router();
const taskQueries = require('../db/queries/tasks');

router.get('/', (req, res) => {
  taskQueries.getTasks()
  .then(tasks => {
    res.json({ tasks });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

router.post('/:id/modify', (req, res) => {
  const task = {
    id: req.params.id,
    category: req.body.category,
    content: req.body.content
  }

  taskQueries.editTask(task)
  .then((task) => {
    res.json({ task });
  })
  .catch(err => {
    res
      .status(500)
      .json({error: err.message });
  });
});

module.exports = router;
