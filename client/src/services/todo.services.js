import { requestAdapter } from "../utils/axios-adapter";

export const fetchTodo = () =>{
    return requestAdapter.get("/");
};

export const addTodo = (todo) => {
    return requestAdapter.post("/", {
        status: "draft",
        todo,
        completed: false,
        isEditing: false
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const deleteTodo = (id) => {
    return requestAdapter.delete(`/${id}`);
};

export const editTask = (task, id) =>{
    return requestAdapter.patch(`/${id}`,{
        todo: task.todo,
        status: task.status,
        completed: task.completed,
        isEditing: task.isEditing
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};