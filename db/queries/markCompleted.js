const db = require('../connection');

// mark task as done
const markCompleted = (id) => {
  return db.query(`UPDATE tasks
                   SET completed = TRUE
                   WHERE id = $1`, id)
    .then(data => {
      return data.rows;
    });
};

module.exports = { markCompleted };
