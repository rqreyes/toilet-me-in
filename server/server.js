const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const flask = [
  { id: 1, task: 'trash' },
  { id: 2, task: 'garbage' },
  { id: 3, task: 'scum' }
];

app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/api/flask', (req, res) => {
  res.json(flask);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
