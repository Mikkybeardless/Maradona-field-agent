import apiClient from "../apiClient.server";

interface InspectionResultData {
  approval_status: "approved" | "rejected";
  condition: "matched" | "mismatched";
  documents_in_order: number;
  notes: string;
}

interface InspectionData {
  product_id: number;
  field_agent_id: number;
  scheduled_at: string;
}
type updateInspectionData = Partial<InspectionData>;

const inspectionService = {
  getInspections: (params?: Record<string, string | number>) =>
    apiClient.get("/agent/inspection/my-requests", { params }),
  getInspection: (id: number) =>
    apiClient.get(`/agent/inspection/requests/${id}`),
  createInspection: (id: string, data: InspectionData) =>
    apiClient.post(`/agent/inspection/requests/${id}/schedule`, data),
  updateInspection: (id: number, data: updateInspectionData) =>
    apiClient.put(`/agent/inspection/requests/${id}/update-status`, data),
  deleteInspection: (id: number) => apiClient.delete(`/agent/inspection/${id}`),
};

export type { InspectionResultData, InspectionData, updateInspectionData };
export default inspectionService;
