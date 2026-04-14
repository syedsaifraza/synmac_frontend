export async function POST(req: Request) {
    try {
        // Parse the incoming request body
        const body = await req.json();

        // Send the data to the backend API
        const res = await fetch("https://synmac-backend.serverscripts.in/api/v1/user/contactus/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const data = await res.json();

        return new Response(JSON.stringify({
            success: true,
            users: data,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: "Error sending contact data",
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}