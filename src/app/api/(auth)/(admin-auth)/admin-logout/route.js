export async function GET() {
    return new Response(JSON.stringify({ message: 'Logged out' }), {
      status: 200,
      headers: {
        "Set-Cookie": "admin-auth=; Path=/; Max-Age=0",
      },
    });
  }