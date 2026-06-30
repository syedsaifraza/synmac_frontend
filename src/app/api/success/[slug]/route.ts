import Industory from "@/components/component/Industory";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `https://synmac-backend.serverscripts.in/api/v1/user/success-stories/view/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
        cache: "no-store"
      }
    );

    const data = await res.json();


 

    
       if(!data.success){
          return NextResponse.json(data)
        }




    return Response.json({
      success: true,
      SuccDaat : data.data,
    });

  } catch (error) {
    return Response.json(
      { message: "Error fetching industry" },
      { status: 500 }
    );
  }
}