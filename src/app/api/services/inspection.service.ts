import apiClient from "../apiClient";

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
  getInspections: (params?: string | number) =>
    apiClient.get("/agent/inspections", { params }),
  getInspection: (id: number) => apiClient.get(`/agent/inspections/${id}`),
  submitResult: (id: number, data: InspectionResultData) =>
    apiClient.post(`/admin/inspections/${id}/result`, data),
  createInspection: (data: InspectionData) =>
    apiClient.post("/agent/inspections", data),
  updateInspection: (id: number, data: updateInspectionData) =>
    apiClient.put(`/admin/inspections/${id}/update`, data),
  deleteInspection: (id: number) =>
    apiClient.delete(`/admin/inspections/${id}`),
};

export type { InspectionResultData, InspectionData, updateInspectionData };
export default inspectionService;
