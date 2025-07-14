import { NextResponse, NextRequest } from "next/server";
import authService from "../../services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await authService.login(body);
    console.log("Login response:", response.data);
    return NextResponse.json(
      { message: "Login successful", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
