import { NextResponse } from "next/server";

import { AxiosError } from "axios";
import statsService from "../../services/stats.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: Record<string, string> = {};
  for (const [key, value] of Array.from(searchParams.entries())) {
    params[key] = value;
  }
  try {
    const [
      enquiryResult,
      bidResult,
      inspectionResult,
      conversionResult,
      performanceResult,
    ] = await Promise.all([
      statsService.getAssignedEnquiries(params),
      statsService.getAssignedBids(params),
      statsService.getInspectionSummary(params),
      statsService.getConversionRate(params),
      statsService.getMonthlyPerformance(params),
    ]);

    return NextResponse.json(
      {
        message: "statistics retrieved successfully",
        data: {
          enquiries: enquiryResult.data,
          bids: bidResult.data,
          inspections: inspectionResult.data,
          conversions: conversionResult.data,
          performance: performanceResult.data,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("fetch statistics error:", error.response?.data);
      return NextResponse.json(
        { message: error.response?.statusText || "Axios request failed" },
        { status: error.response?.status || 500 }
      );
    }

    // Fallback for non-Axios errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
