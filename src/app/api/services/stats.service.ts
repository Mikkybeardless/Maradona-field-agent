import apiClient from "../apiClient.server";

const statsService = {
  getAssignedEnquiries: (params?: Record<string, string | number>) =>
    apiClient.get(
      `/agent/stats/assigned-enquiries${params ? "" : "?all_time=1"}`,
      { params }
    ),
  getAssignedBids: (params?: Record<string, string | number>) =>
    apiClient.get(`/agent/stats/assigned-bids${params ? "" : "?all_time=1"}`, {
      params,
    }),
  getInspectionSummary: (params?: Record<string, string | number>) =>
    apiClient.get(
      `/agent/stats/inspections-summary${params ? "" : "?all_time=1"}`,
      {
        params,
      }
    ),
  getConversionRate: (params?: Record<string, string | number>) =>
    apiClient.get(
      `/agent/stats/conversion-rates${params ? "" : "?all_time=1"}`,
      {
        params,
      }
    ),
  getMonthlyPerformance: (params?: Record<string, string | number>) =>
    apiClient.get(
      `/agent/stats/monthly-performance${params ? "" : "?all_time=1"}`,
      {
        params,
      }
    ),
};

export default statsService;
