import Header from './components/Header';
import TodoManagement from './components/TodoManagement';
import TodoList from './components/TodoList';

import TodosContextProvider from './store/todos-context';

function App() {

  return (
    <TodosContextProvider>
      <Header />
      <TodoManagement />
      <TodoList />
    </TodosContextProvider>
  );
}

export default App;
