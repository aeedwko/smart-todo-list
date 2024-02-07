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

  const values = [task.content, task.category_id, task.id];

  return db.query(`UPDATE tasks
                   SET content = $1, category_id = $2
                   WHERE id = $3`, values);
}

module.exports = { getTasks, editTask };
// mark task as done
const markCompleted = (id) => {
  return db.query(`UPDATE tasks
                   SET completed = TRUE
                   WHERE id = $1`, id)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTasks, markCompleted };
