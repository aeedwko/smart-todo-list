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

// add a task
const addTask = (task) => {
  const values = [task.content, task.category_id, task.user_id, task.completed];

  return db.query(`INSERT INTO tasks
                   (content, category_id, user_id, completed)
                   VALUES ($1, $2, $3, $4)`, values);
};

// edit a task
const editTask = (task) => {

  const values = [task.content, task.category_id, task.completed, task.id];

  return db.query(`UPDATE tasks
                   SET content = $1, category_id = $2, completed = $3
                   WHERE id = $4`, values);
};

module.exports = { getTasks, editTask, addTask };

