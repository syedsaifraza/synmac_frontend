

export async function GET() {
  try {
    const res = await fetch("https://synmac-backend.serverscripts.in/api/v1/user/industry/view", {
      cache: "no-store",
    });

    const data = await res.json();


    return Response.json({
      success: true,
      users: data,
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "Error fetching users",
    });
  }
}