
import { useEffect, useState } from 'react';
import './App.css'
import { TodoProvider } from './contexts/TodoContexts'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'

function App() {

  const [todos,setTodos]=useState([]);

  const addTodo = (todo) =>{
    setTodos((prev =>[{id : Date.now(), ...todo} , ...prev]))
  };

  const updateTodo = (id,todo) =>(
    setTodos((prev) => prev.map((prevTodo )=>prevTodo.id === id ? todo : prevTodo ))
  );

  const deleteTodo = (id) =>{
    setTodos((prev => prev.filter(todo =>todo.id !== id)))
  };

  const toggleComplete = (id) =>{
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed} : prevTodo ))
  };

 useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  

  return (
    <TodoProvider  value={{addTodo,deleteTodo,todos,updateTodo,toggleComplete}}>
      <div className="glass-container">
        <h1 className="app-title">Task Management</h1>
        <div className="todo-form">
          <TodoForm/>
        </div>
        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add your first task to get started.</p>
            </div>
          ) : (
            todos.map((todo)=> (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <TodoItem todo={todo}/>
              </div>
            ))
          )}
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
