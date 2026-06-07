import Industory from "@/components/component/Industory";

export async function GET(req: Request, { params }: any) {
  const { slug } = await params;


console.log("slug", slug)

  try {
    const res = await fetch(
      `https://synmac-backend.serverscripts.in/api/v1/user/new-releases/view/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
        cache: "no-store"
      }
    );

    const data = await res.json();

    



    if (!data.data) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      News : data.data,
    });

  } catch (error) {
    return Response.json(
      { message: "Error fetching industry" },
      { status: 500 }
    );
  }
}