const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const queueController = require('./controllers/queueController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
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
