import { NextResponse } from "next/server";

export async function GET(
  req: Request, { params }: any
) {
  try {
    const { id } = await params;

    const res = await fetch(
      `https://synmac-backend.serverscripts.in/api/v1/user/product-category/view`,
      { method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        cache: "no-store",
      }
    );

    const data = await res.json();
    const sub_industry = data.data.find((subin: any) => subin.id == id);



    return NextResponse.json({
      success: true,
      data: sub_industry,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching users",
    });
  }
}