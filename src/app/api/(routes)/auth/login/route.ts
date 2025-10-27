import { NextResponse, NextRequest } from "next/server";
import authService from "../../../services/auth.service";
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await authService.login(body);

    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      );
    }

    // ✅ Extract token
    const token = response.data.token;
    const res = NextResponse.json(
      { message: "Login successful", data: response.data },
      { status: 200 }
    );

    // ✅ Properly set the cookie on the *response instance*
    if (token) {
      res.cookies.set("buyer_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
      });
    }

    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Login error:", error.response?.data);
      return NextResponse.json(
        { message: error.response?.statusText || "Axios request failed" },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
