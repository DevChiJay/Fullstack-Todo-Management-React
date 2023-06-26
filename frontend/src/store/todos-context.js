import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const TodosContext = React.createContext({
  items: [],
  updateId: null,
  updateText: null,
  addTodo: () => {},
  removeTodo: (id) => {},
  editButton: (id) => {},
  editTodo: (text)=> {}
});

const TodosContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);
  const [todoText, setTodoText] = useState(null);

  // Fetch All Todos
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await axios.get('http://localhost:5000/todos');

        setTodos(response.data.todos);
      } catch (error) {
        if (error.message) {
          console.log('Something went wrong', error.message);
        }
      }
    }
    fetchTodos();
  }, []);

  const addTodoHandler = (todoText) => {
    const newTodo = { text: todoText };
      const storeTodo = async () => {
        let response;

        try {
          response = await axios.post('http://localhost:5000/todos', newTodo);
        } catch (error) {
          if (error.message) {
            console.log('Something went wrong', error.message);
          }
        }
        setTodos((prevTodos) => {
          return prevTodos.concat({...newTodo, id: response.data.createdTodo.id});
        });
      };
      storeTodo();
    };

  const removeTodoHandler = async (todoId) => {  
    try {
      await axios.delete('http://localhost:5000/todos/' + todoId);
    } catch (error) {
      if (error.message) {
        console.log('Something went wrong', error.message);
      }
    }
  
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  }  

  const editButtonHandler = (todoId, todoText) => {
    setTodoId(todoId);
    setTodoText(todoText);
  }

  const editTodoHandler = (updateText) => {
    const newTodo = { newText: updateText };
      const updateTodo = async () => {
        let response;

        try {
          response = await axios.patch('http://localhost:5000/todos/' + todoId, newTodo);
          console.log(response);
        } catch (error) {
          if (error.message) {
            console.log('Something went wrong', error.message);
          }
        }
        const update = todos.map((todo)=>todo.id === todoId ? {text: updateText, id: todoId} : todo);
        setTodos(update);
        setTodoId(null);
      };
      updateTodo();

  }

  const contextValue = {
    items: todos,
    updateId: todoId,
    updateText: todoText,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    editButton: editButtonHandler,
    editTodo: editTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
