import { NextResponse, NextRequest } from "next/server";
import authService from "../../services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await authService.signUp(body);
    console.log("Create user response:", response.data);
    return NextResponse.json(
      { message: "Create user successful", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create user:", error);
    return new Response(JSON.stringify({ error: "Create user failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
