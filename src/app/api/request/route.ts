export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch('https://synmac-backend.serverscripts.in/api/v1/user/data-sheet-request/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return Response.json(data);
}