import apiClient from "../apiClient.server";
interface ScheduleData {
  scheduled_at: string;
}

const bidService = {
  getBids: (params?: Record<string, string>) =>
    apiClient.get("/agent/auction-bids", { params }),
  getBid: (id: number) => apiClient.get(`/agent/bids/${id}`),
  scheduleMeeting: (id: number, data: ScheduleData) =>
    apiClient.post(`/agent/purchase-inspection-requests/${id}/schedule`, data),
  updateBidStatus: (id: number, data: { status: string }) =>
    apiClient.post(`/agent/auction-bids/${id}/update-status`, data),
  deleteBid: (id: number) => apiClient.delete(`/agent/auction-bids/${id}`),
};

export default bidService;
