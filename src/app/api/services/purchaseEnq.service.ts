import apiClient from "../apiClient.server";

interface ScheduleData {
  scheduled_at: string;
}
interface CompletedData {
  notes: string;
}

const purchaseEnqService = {
  getEnquiries: (params?: Record<string, string | number>) =>
    apiClient.get("agent/purchase-inspection-requests", { params }),
  getEnquiry: (id: number) =>
    apiClient.get(`/agent/purchase-inspection-requests/${id}`),
  scheduleMeeting: (id: number, data: ScheduleData) =>
    apiClient.post(`/agent/purchase-inspection-requests/${id}/schedule`, data),
  updateCompleted: (id: number, data: CompletedData) =>
    apiClient.post(`/agent/purchase-inspection-requests/${id}/complete`, data),
  deleteEnquiry: (id: number) =>
    apiClient.delete(`/agent/purchase-enquiry/${id}`),
};

export type { ScheduleData, CompletedData };
export default purchaseEnqService;
