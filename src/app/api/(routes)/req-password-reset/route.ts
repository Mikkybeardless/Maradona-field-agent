import { NextResponse, NextRequest } from "next/server";
import authService from "../../services/auth.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await authService.reqPasswordReset(body);
    console.log("request password rest response:", response.data);
    return NextResponse.json(
      { message: "request password rest  successful", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("request password rest error:", error);
    return new Response(
      JSON.stringify({ error: "request password rest failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
