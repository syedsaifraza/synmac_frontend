import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; 

    console.log("API ID:", id);

    const res = await fetch(
      `https://synmac-backend.serverscripts.in/api/v1/user/industry/view/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    console.log("Actual data", data)


    return NextResponse.json({
      success: true,
      users: data.data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching users",
    });
  }
}