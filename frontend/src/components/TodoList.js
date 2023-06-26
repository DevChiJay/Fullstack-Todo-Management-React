import { useContext } from 'react';

import { TodosContext } from '../store/todos-context';

import classes from './TodoList.module.css';

const TodoList = () => {

  const todosCtx = useContext(TodosContext);

  return (
    <section id={classes.todos}>
      <ul id={classes['todos-list']}>
        {todosCtx.items.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
            <div>
            <button onClick={()=>todosCtx.editButton(item.id, item.text)}>Edit</button>
            <button onClick={()=>todosCtx.removeTodo(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
