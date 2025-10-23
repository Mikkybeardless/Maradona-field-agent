import apiClient from "../apiClient.server";

const notificationService = {
  getAll: (params?: Record<string, string | number>) =>
    apiClient.get("/notifications", { params }),
  getUnRead: (params?: Record<string, string | number>) =>
    apiClient.get("/notifications/unread", { params }),
  getStats: (params?: Record<string, string | number>) =>
    apiClient.get("/notifications/stats", { params }),
  readAll: () => apiClient.post("/notifications/mark-all-read"),
  readOne: (id: string) => apiClient.post(`/notifications/${id}/read`),
  delete: (id: string) => apiClient.delete(`/notifications/${id}`),
};

export default notificationService;
