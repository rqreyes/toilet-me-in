const path = require('path');
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'codesmith',
  host: 'localhost',
  database: 'queues',
  password: 'codesmith',
  port: 5432
});

const findUser = (req, res, next) => {
  pool.query(
    `SELECT password FROM users WHERE username = '${req.body.username}'`,
    (error, dbPassword) => {
      if (error) {
        res.json(error);
      } else {
        if (!dbPassword.rows[0]) {
          res.redirect('/login');
        } else {
          if (req.body.password !== dbPassword.rows[0].password) {
            res.redirect('/login');
          } else {
            res.locals.username = req.body.username;
            res.locals.password = req.body.password;
            return next();
          }
        }
      }
    }
  );
};

const createToken = (req, res, next) => {
  jwt.sign(
    { username: res.locals.username },
    'secretKey',
    { expiresIn: '3600000s' },
    (error, token) => {
      res.cookie('token', token);
      return next();
    }
  );
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  jwt.verify(token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendFile(path.resolve(__dirname, '../../login.html'));
    } else {
      return next();
    }
  });
};

module.exports = {
  findUser,
  createToken,
  verifyToken
};
