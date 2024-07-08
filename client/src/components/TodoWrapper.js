import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import {v4 as uuidv4} from 'uuid'
import { EditTodoForm } from './EditTodoForm';

uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = async () =>{
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8055/items/todolist');
            setTodos(response.data.data);
        } catch (error) {
            setError("Error fetching todos");
            console.error("Error fetching todos:", error);
        } finally {
            setLoading(false);
        }
    }

    const addTodo = async (todo) => {
        try {
            await axios.post('http://localhost:8055/items/todolist', {
                status: "draft",
                todo: todo,
                completed: false,
                isEditing: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            //setTodos([...todos, response.data.data]);
            fetchTodo();
        } catch (error) {
            setError("Error adding todo");
            console.error("Error adding todo:", error);
        }
    }

    const toogleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8055/items/todolist/${id}`);
            fetchTodo();
            //setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            setError("Error deleting todo");
            console.error("Error deleting todo:", error);
        }
    }

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing}: todo))
    }

    const editTask = async (task, id)=>{
        try {
            await axios.patch(`http://localhost:8055/items/todolist/${id}`, {
                todo: task
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            fetchTodo();
            //setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing}: todo));
        } catch (error) {
            setError("Error updating todo");
            console.log("Error updating todo: ", error)
        }
    }

    return (
        <div className='TodoWrapper'>
            <h1>To Do List App</h1>
            {loading && <p>Loading...</p>}
            {error && <p className='error'>{error}</p>}
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) =>(
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index}/>
                ): (
                <Todo 
                    task={todo} 
                    key={index} 
                    toogleComplete={toogleComplete}
                    deleteTodo={deleteTodo} 
                    editTodo={editTodo}
                />
                )
                
            ))}
        </div>
    )
}
