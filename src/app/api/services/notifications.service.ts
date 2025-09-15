import apiClient from "../apiClient.server";

const notificationService = {
  getAll: (params?: Record<string, string | number>) =>
    apiClient.get("/notifications", { params }),
  getUnRead: (params?: Record<string, string | number>) =>
    apiClient.get("/notifications/unread", { params }),
  getStats: (params?: Record<string, string | number>) =>
    apiClient.get("/notifications/stats", { params }),
  readAll: () => apiClient.post("/notifications"),
  readOne: (id: number) => apiClient.post(`/notifications/${id}`),
  delete: (id: number) => apiClient.delete(`/notifications/${id}`),
};

export default notificationService;
