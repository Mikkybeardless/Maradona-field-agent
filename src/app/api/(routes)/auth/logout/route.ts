import { NextResponse } from "next/server";
import authService from "../../../services/auth.service";
import { AxiosError } from "axios";

export async function POST() {
  try {
    const response = await authService.logout();
    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      );
    }
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Logout error:", error.response?.data);
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
