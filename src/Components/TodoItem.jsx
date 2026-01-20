import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContexts';

function TodoItem({ todo }) {

    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const {updateTodo, deleteTodo, toggleComplete} = useTodo();

    const editTodo = () => {
        updateTodo(todo.id , {...todo , todo: todoMsg});
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div className="flex items-center gap-3">
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className="todo-text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
           
            <button
                className={`action-button edit-button ${todo.completed ? 'disabled' : ''}`}
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "💾" : "✏️"}
            </button>
            
            <button
                className="action-button delete-button"
                onClick={() => deleteTodo(todo.id)}
            >
                🗑️
            </button>
        </div>
    );
}

export default TodoItem;

