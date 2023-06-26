import { useContext, useRef } from 'react';
import { TodosContext } from '../store/todos-context';

import classes from './TodoManagement.module.css';

const TodoManagement = () => {
  const todosCtx = useContext(TodosContext);
  const todoInputRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredText = todoInputRef.current.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }
    
    if(!todosCtx.updateId) {
      todosCtx.addTodo(enteredText);
    } else {
      todosCtx.editTodo(enteredText);
    }
    todoInputRef.current.value = '';


  }
  return (
    <section id={classes['todo-management']}>
      <form onSubmit={submitHandler}>
        <label htmlFor='text'>Todo text</label>
        {todosCtx.updateId ? <input ref={todoInputRef} type='text' id='text' name='text' defaultValue={todosCtx.updateText} required /> : <input ref={todoInputRef} type='text' id='text' name='text' required />}
        <button>Save</button>
      </form>
    </section>
  );
};

export default TodoManagement;
