import { NextResponse } from "next/server";

export async function GET(
  req: Request, { params }: any
) {
  try {
  

    const res = await fetch(
      `https://synmac-backend.serverscripts.in/api/v1/user/product/view`,
      { method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        cache: "no-store",
      }
    );

    const data = await res.json();



    return NextResponse.json({
      success: true,
      data: data.data,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching users",
    });
  }
}