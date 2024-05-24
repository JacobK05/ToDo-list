
export default function Todo ({todo, toggleTodo}) {
    function handelTodoClick() {
        toggleTodo(todo.id)
    }

  return (
    <div>
      <label className="todo">
        <input type="checkbox" checked={todo.complete} onChange={handelTodoClick}/>    
        {todo.name}
     </label>
    </div>
    )
}