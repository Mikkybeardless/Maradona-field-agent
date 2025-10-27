import { NextResponse } from "next/server";
import authService from "../../../services/auth.service";
import { AxiosError } from "axios";

export async function POST() {
  try {
    const response = await authService.logout();

    // Create a response object
    const res = NextResponse.json(
      { message: response.statusText || "Logout successful" },
      { status: response.status || 200 }
    );

    // ✅ Clear the buyer_token cookie
    res.cookies.set("buyer_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: new Date(0), // immediately expire
    });

    return res;
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
