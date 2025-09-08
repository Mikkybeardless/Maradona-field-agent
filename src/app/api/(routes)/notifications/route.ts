import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import notificationService from "../../services/notifications.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params: Record<string, string> = {};
  for (const [key, value] of Array.from(searchParams.entries())) {
    params[key] = value;
  }

  try {
    const response = await notificationService.getAll(params);
    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      );
    }
    return NextResponse.json(
      { message: "notifications retrieved successfully", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("fetch notifications error:", error.response?.data);
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

export async function POST() {
  try {
    // const body = await req.json();

    const response = await notificationService.readAll();
    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      );
    }
    return NextResponse.json(
      { message: "read all successfully", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("read all error:", error.response?.data);
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
