import { NextResponse, NextRequest } from "next/server";
import authService from "../../services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await authService.doPassReset(body);
    console.log("reset password response:", response.data);
    return NextResponse.json(
      { message: "password reset successful", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("password reset:", error);
    return new Response(JSON.stringify({ error: "password reset failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
