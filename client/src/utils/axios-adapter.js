import axios from 'axios';

class RequestAdapter {
    constructor(props = {}) {
        const { baseURL = 'http://localhost:8055/items/todolist', ...rest } = props;
        this.adapter = axios.create({
            baseURL,
            ...rest,
        });

        this.adapter.interceptors.request.use(this.interceptRequest);
        this.adapter.interceptors.response.use(
            this.interceptResponse,
            this.handleError
        );
    }

    async interceptRequest(config) {
        return config;
    }

    async interceptResponse(response) {
        return response.data.data;
    }

    handleError(error) {
        console.error("API Error:", error);
        throw error;
    }

    fetchTodo() {
        return this.adapter.get("/");
    }

    addTodo(todo){
        return this.adapter.post("/",{
            status: "draft",
            todo,
            completed: false,
            isEditing: false
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    deleteTodo(id) {
        return this.adapter.delete(`/${id}`);
    }

    editTask(task, id) {
        return this.adapter.patch(`/${id}`, {
            todo: task
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}

export const requestAdapter = new RequestAdapter();