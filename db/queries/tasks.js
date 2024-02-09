const db = require('../connection');

// retrieve all tasks with category_id
const getTasks = (user_id) => {
  const values = [user_id];
  return db.query(`SELECT tasks.id, content, category_id, completed
                   FROM tasks
                   JOIN categories
                   ON category_id = categories.id
                   WHERE user_id = $1`, values)
    .then(data => {
      return data.rows;
    });
};

// edit a task
const editTask = (task) => {

  const values = [task.content, task.category_id, task.completed, task.id];

  return db.query(`UPDATE tasks
                   SET content = $1, category_id = $2, completed = $3
                   WHERE id = $4`, values);
}

module.exports = { getTasks, editTask };
