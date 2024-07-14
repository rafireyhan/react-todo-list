import React, { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm';
import { fetchTodo, addTodo, editTask, deleteTodo} from '../services/todo.services';

uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadTodos = async () => {
            setIsLoading(true);
            try {
                const data = await fetchTodo();
                setTodos(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadTodos();
    }, []);

    const handleAddTodo = async (todo) => {
        try {
            await addTodo(todo);
            const data = await fetchTodo();
            setTodos(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            const data = await fetchTodo();
            setTodos(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const handleEditTask = async (task, id) => {
        try {
            await editTask(task, id);
            const data = await fetchTodo();
            setTodos(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    }

    return (
        <div className='TodoWrapper'>
            <h1>To Do List App</h1>
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <TodoForm addTodo={handleAddTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={handleEditTask} task={todo} key={index} />
                ) : (
                    <Todo
                        task={todo}
                        key={index}
                        toggleComplete={toggleComplete}
                        deleteTodo={handleDeleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}
        </div>
    );
}