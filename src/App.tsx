import './App.css'
import {useEffect, useState} from "react";

function App() {
    const [todos, setTodos] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputValue = e.target.elements[0].value;
        fetch("http://localhost:8080/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id:Date.now(), task: inputValue, done: false }),
        })
            .then((res) => res.json())
            .then((data) => setTodos([...todos, data]));
    }
    const deleteTodo = (id) => {
        fetch(`http://localhost:8080/todos/${id}`, {
            method: "DELETE",
        })
            .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
    }
    useEffect(
        () => {
            fetch("http://localhost:8080/todos")
                .then((res) => res.json())
                .then((data) => setTodos(data));
        },
        []
    )

  return (
    <>
        <div>
            <h1>TODO</h1>
            <form onSubmit={handleSubmit} >
                <input type="text"/>
                <button  style={{backgroundColor: 'cadetblue', color:'white', marginLeft:'10px'}}type="submit">Create</button>
            </form>
        </div>
        <ul style={{display: 'flex', flexDirection:'column', gap:'10px', justifyContent: "center"}}>
            {todos.map((todo) => (
                <li style={{display:'flex', gap:'10px', alignItems: "center"}}>
                    <input type="checkbox" checked={todo.done}/>
                <div key={todo.id}>{todo.task}</div>
                    <button style={{backgroundColor:"red", color:'white'}} onClick={()=> deleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </>
  )
}

export default App
