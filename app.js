const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Data Store
const items = [];

// Create Operation: POST /items
app.post('/items', (req, res) => {
  const item = { id: items.length + 1, ...req.body };
  items.push(item);
  res.status(201).send(item);
});

// Read Operation: GET /items
app.get('/items', (req, res) => {
  res.send(items);
});

// Read Operation: GET /items/:id
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.send(item);
});

// Update Operation: PUT /items/:id
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  Object.assign(item, req.body);
  res.send(item);
});

// Delete Operation: DELETE /items/:id
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Item not found');

  const deletedItem = items.splice(index, 1);
  res.send(deletedItem);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
