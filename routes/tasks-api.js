// routes for tasks data

const express = require('express');
const router = express.Router();
const taskQueries = require('../db/queries/tasks');
const apiCall = require('../getAllCategory');

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

router.post("/add", (req, res) => {

  const task_content = req.body.content;

  apiCall.getOrganicResultsForTask(task_content)
    .then((results) => {
      // Analyze keywords and categorize
      let keywords = task_content.toLowerCase().split(" ");

      results.forEach((result, index) => {
        keywords += result.title + result.snippet;
      });
      keywords = keywords.toLowerCase().split(" ");
      const category_id = apiCall.categorizeKeywords(keywords);

      console.log(category_id);

      // returns the appropriate category
      return category_id;
    })
    .then(category_id => {
      const task = {
        user_id: req.body.user_id,
        category_id: category_id,
        content: req.body.content,
        completed: req.body.completed
      };

      return taskQueries.addTask(task);
    })
    .then(task => {
      return res.json({ task });
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    });
});

router.put('/:id/modify', (req, res) => {
  const task = {
    id: req.params.id,
    category_id: req.body.category_id,
    content: req.body.content,
    completed: req.body.completed
  }
  if (task.completed === true) {
    return taskQueries.markCompleted(task)
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
