const db = require('../connection');

// retrieve all tasks with category_id
const getTasks = () => {
  return db.query(`SELECT tasks.id, content, category_id
                   FROM tasks
                   JOIN categories
                   ON category_id = categories.id`)
    .then(data => {
      return data.rows;
    });
};

// edit a task
const editTask = (task) => {
  return db.query(`UPDATE tasks
                   SET content = ${ task.content }, category = ${ task.category }
                   WHERE id = ${ task.id }`)
}

module.exports = { getTasks };
