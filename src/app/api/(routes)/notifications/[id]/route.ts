import notificationService from "@/app/api/services/notifications.service";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const body = await req.json();
    const id = (await params).id;
    const response = await notificationService.readOne(id);
    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      );
    }
    return NextResponse.json(
      { message: "read one notification successfully", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("read one notification error:", error.response?.data);
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

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const body = await req.json();
    const id = (await params).id;
    const response = await notificationService.delete(id);
    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.statusText },
        { status: response.status }
      );
    }
    return NextResponse.json(
      { message: "deleted notification successfully", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("delete notification error:", error.response?.data);
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
