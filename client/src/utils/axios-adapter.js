import axios from 'axios';

class RequestAdapter {
    constructor(props = {}) {
        const { baseURL = process.env.REACT_APP_API_URL, ...rest } = props;
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

    get(url, config = {}) {
        return this.adapter.get(url, config);
    }

    post(url, data, config = {}) {
        return this.adapter.post(url, data, config);
    }

    delete(url, config = {}) {
        return this.adapter.delete(url, config);
    }

    patch(url, data, config = {}) {
        return this.adapter.patch(url, data, config);
    }
}

export const requestAdapter = new RequestAdapter();