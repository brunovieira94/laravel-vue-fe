import http from "../http-common";
import authHeader from "./auth-header";

class TaskDataService {
    getAll(params) {
        return http.get("/tasks", { headers: authHeader(), params });
    }

    get(id) {
        return http.get(`/tasks/${id}`, { headers: authHeader() });
    }

    create(data) {
        return http.post("/tasks", data, { headers: authHeader() });
    }

    update(id, data) {
        return http.put(`/tasks/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return http.delete(`/tasks/${id}`, { headers: authHeader() });
    }
}

export default new TaskDataService();