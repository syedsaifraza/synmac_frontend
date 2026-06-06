export async function GET() {
  try {
    const res = await fetch(
      "https://synmac-backend.serverscripts.in/api/v1/user/success-stories/view",
      { method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        // next: { revalidate: 300 },
        cache: "no-store"
      }
    );

    const data = await res.json();

    return Response.json({
      success: true,
      stories: data.data,
    });

  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching industries" },
      { status: 500 }
    );
  }
}