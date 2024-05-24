import TodoList from "./TodoList";
import { useState, useRef, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import "./app.css"


const LOCAL_STORAGE_KEY  = 'todo.App.todos'

function App() {
  const [todos, setTodos ] =  useState([])
  const todoNameRef = useRef()


useEffect(() => {
  const storedTodo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if(storedTodo) setTodos(storedTodo)
}, [])


useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
},[todos])

function handleClearTodo() {
  const newTodo = todos.filter(todo => !todo.complete)
  setTodos(newTodo)
}

function toggleTodo(id) {
  const newTodo = [...todos]
  const todo = newTodo.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodo)
}

function handleAddTodo(e) {
  const name = todoNameRef.current.value
  if(name === '') return
  setTodos(prevTodos => {
    return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
  })
  todoNameRef.current.value = null
}

  return (
    <>
    <h1 className="text">Todo list</h1>
    <input className="text-input" placeholder="Todo" ref={todoNameRef} type="text" />
    <button className="btn" onClick={handleAddTodo}> add Todo </button>
    <button className="btn" onClick={handleClearTodo}> clear Todo </button>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <div className="text"> {todos.filter(todo => !todo.complete).length} todos left </div>
    </>
  )
    
  
}

export default App;
