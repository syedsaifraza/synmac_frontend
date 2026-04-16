export async function GET(req: Request, { params }: any) {
  const { id } = await params;

  try {
    const res = await fetch(
      "https://synmac-backend.serverscripts.in/api/v1/user/industry/view",
      {
        // next: { revalidate: 300 },
        cache: "no-store"
      }
    );

    const data = await res.json();

   
    const industry = data.data.find((item: any) => item.id == id);

    if (!industry) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      industry, 
    });

  } catch (error) {
    return Response.json(
      { message: "Error fetching industry" },
      { status: 500 }
    );
  }
}