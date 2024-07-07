import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import {v4 as uuidv4} from 'uuid'
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8055/items/todolist')
            .then((response) => {
                setTodos(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
            });
    }, []);

    const addTodo = async (todo) => {
        try {
            const response = await axios.post('http://localhost:8055/items/todolist', {
                status: "draft",
                todo: todo,
                completed: false,
                isEditing: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setTodos([...todos, response.data.data]);
            console.log("Todo added successfully");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    const getTodo = async () =>{
        await axios.get('http://localhost:8055/items/todolist')
        .then((response) => {
            setTodos(response.data.data);
        })
        .catch((error) => {
            console.error("Error fetching todos:", error);
        });
    }

    const toogleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:8055/items/todolist/${id}`)
        .then(() => {
            getTodo();
        });
        setTodos(todos.filter(todo => todo.id !== id))
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
            }).then(() => {
                getTodo();
            });
            setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing}: todo))
        } catch (error) {
            console.log("Error updating todo: ", error)
        }
    }

    return (
        <div className='TodoWrapper'>
            <h1>Rapi To Do List!</h1>
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
