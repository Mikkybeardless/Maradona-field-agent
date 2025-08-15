import apiClient from "../apiClient.server";

const bidService = {
  getBids: (params?: string) =>
    apiClient.get("/agent/auction-bids", { params }),
  getBid: (id: number) => apiClient.get(`/agent/bids/${id}`),
  createBid: (data: Record<string, string>) =>
    apiClient.post("/agent/auction-bids", data),
  updateBidStatus: (id: number, data: { status: string }) =>
    apiClient.put(`/agent/auction-bids/${id}/update-status`, data),
  deleteBid: (id: number) => apiClient.delete(`/agent/auction-bids/${id}`),
};

export default bidService;
