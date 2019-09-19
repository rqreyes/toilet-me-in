const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const queueController = require('./controllers/queueController');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../login.html'));
});

app.post(
  '/login',
  userController.findUser,
  userController.createToken,
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/', userController.verifyToken, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/bathroom', queueController.getQueue, (req, res) => {
  res.status(200).json(res.locals.queue);
});

app.post(
  '/bathroom',
  queueController.addPerson,
  queueController.getQueue,
  (req, res) => {
    res.status(200).json(res.locals.queue);
  }
);

app.delete('/bathroom/:id', queueController.removePerson, (req, res) => {
  res.status(200).json('Removed person');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
