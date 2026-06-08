import Industory from "@/components/component/Industory";

export async function GET(req: Request, { params }: any) {
  const { id } = await params;




  try {
    const res = await fetch(
      `https://synmac-backend.serverscripts.in/api/v1/user/industry/view/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
        cache: "no-store"
      }
    );

    const data = await res.json();
  



    if (!data.success) {
      return Response.json(data);
    }

    return Response.json({
      success: true,
      industry : data.data,
    });

  } catch (error) {
    return Response.json(
      { message: "Error fetching industry" },
      { status: 500 }
    );
  }
}