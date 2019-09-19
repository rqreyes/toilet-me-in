const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'codesmith',
  host: 'localhost',
  database: 'queues',
  password: 'codesmith',
  port: 5432
});

const getQueue = (req, res, next) => {
  pool.query('SELECT * FROM bathroom ORDER BY id', (error, queue) => {
    if (error) {
      res.json(error);
    } else {
      res.locals.queue = queue.rows;
      return next();
    }
  });
};

const addPerson = (req, res, next) => {
  const { name, urgency } = req.body;
  pool.query(
    'INSERT INTO bathroom (name, urgency) VALUES ($1, $2)',
    [name, urgency],
    error => {
      if (error) {
        res.json(error);
      } else {
        return next();
      }
    }
  );
};

const removePerson = (req, res, next) => {
  const id = req.params.id;
  pool.query('DELETE FROM bathroom WHERE id = ($1)', [id], (error, queue) => {
    if (error) {
      res.json(error);
    } else {
      return next();
    }
  });
};

module.exports = {
  getQueue,
  addPerson,
  removePerson
};
