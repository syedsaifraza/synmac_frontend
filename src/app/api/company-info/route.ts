export async function GET() {
  try {
    const res = await fetch(
      "https://synmac-backend.serverscripts.in/api/v1/user/company-info/view",
      { method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        // next: { revalidate: 300 },
        cache: "no-store"
      }
    );

    const data = await res.json();

      console.log("company-info",data)

    return Response.json({
      success: true,
      data: data.data,
    });

  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching industries" },
      { status: 500 }
    );
  }
}