import axios from 'axios';

export const fetchTodo = async () =>{
    try {
        const response = await axios.get('http://localhost:8055/items/todolist');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw new Error("Error fetching todos");
    }
}

export const addTodo = async (todo) => {
    try {
        await axios.post('http://localhost:8055/items/todolist',{
            status: "draft",
            todo: todo,
            completed: false,
            isEditing: false
        },{
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error("Error adding todo:", error);
        throw new Error ("Error adding todo");
    }
}

export const deleteTodo = async (id) =>{
    try {
        await axios.delete(`http://localhost:8055/items/todolist/${id}`);
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw new Error("Error deleting todo");
    }
}

export const editTask = async (task, id) => {
    try {
        await axios.patch(`http://localhost:8055/items/todolist/${id}`,{
            todo: task
        },{
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.log("Error updating todo:", error);
        throw new Error("Error updating todo");
    }
}