const db = require('../connection');

// retrieve all tasks with category_id
const getTasks = () => {
  return db.query(`SELECT content, category_id
                   FROM tasks
                   JOIN categories
                   ON category_id = categories.id`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTasks };
