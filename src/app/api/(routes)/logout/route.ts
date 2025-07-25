import { NextResponse } from "next/server";
import authService from "../../services/auth.service";

export async function GET() {
  try {
    const response = await authService.logout();
    if (response.status !== 200) {
      throw new Error("Logout failed");
    }
    return NextResponse.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return new Response(JSON.stringify({ error: "Logout failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
