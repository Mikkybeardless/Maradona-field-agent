import apiClient from "../apiClient.server";

interface InspectionResultData {
  status: "passed" | "failed";
  notes: string;
}

interface InspectionData {
  scheduled_at: string;
}

const inspectionService = {
  getInspections: (params?: Record<string, string | number>) =>
    apiClient.get("/agent/inspection/my-requests", { params }),
  getInspection: (id: number) => apiClient.get(`/inspection/requests/${id}`),
  createInspection: (id: number, data: InspectionData) =>
    apiClient.post(`/agent/inspection/requests/${id}/schedule`, data),
  updateInspection: (id: number, data: InspectionResultData) =>
    apiClient.post(`/agent/inspection/requests/${id}/update-status`, data),
};

export type { InspectionResultData, InspectionData };
export default inspectionService;
