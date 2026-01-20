import React, {useState } from 'react'
import { useTodo } from '../contexts/TodoContexts';

function TodoForm() {
    const [todo,setTodo]=useState("");
    const {addTodo} = useTodo();

    const add = (e) =>{
        e.preventDefault();

        if(!todo) return 

        addTodo({todo , completed :false});
        setTodo("");
    }; 

    
    return (
        <form onSubmit={add} className="flex gap-2">
            <input
                type="text"
                placeholder="Enter a new task..."
                className="todo-input"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="add-button">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

