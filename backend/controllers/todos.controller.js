const Todo = require('../models/todo.model');

async function getAllTodos(req, res, next) {
  let todos;
  try {
    todos = await Todo.find().sort({ _id: -1 });
  } catch (error) {
    next(error);
    return;
  }
  res.json({
    todos: todos,
  });
}

async function addTodo(req, res, next) {
  const todo = new Todo({ text: req.body.text });
  
  let insertedId;
  
  try {
    const result = await todo.save();
    insertedId = result.id;
  } catch (error) {
    next(error);
  }
  
  todo.id = insertedId.toString();

  res.json({ message: 'Added todo successfully!', createdTodo: todo });
}

async function updateTodo(req, res, next) {
  const todoId = req.params.id;
  const newTodoText = req.body.newText;

  try {
    await Todo.updateOne({ _id: todoId }, { $set: { text: newTodoText } });
  } catch (error) {
    next(error);
    return;
  }

  res.json({
    message: 'Todo updated',
    updatedTodo: { id: todoId, text: newTodoText },
  });
}

async function deleteTodo(req, res, next) {
  const todoId = req.params.id;

  try {
    await Todo.deleteOne({ _id: todoId });
  } catch (error) {
    next(error);
  }

  res.json({ message: 'Todo deleted' });
}

module.exports = {
  getAllTodos: getAllTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
