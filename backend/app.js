const express = require('express');

const db = require('./data/database');
const todosRoutes = require('./routes/todos.routes');
const enableCors = require('./middlewares/cors');

let port = 5000;

if (process.env.PORT) {
  port = process.env.PORT;
}

const app = express();

app.use(enableCors);
app.use(express.json());

app.use('/todos', todosRoutes);

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: 'Something went wrong!',
  });
});

db()
  .then(function () {
    app.listen(port);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });