export async function GET() {
  try {
    return Response.json({ success: true, time: new Date().toISOString() }, { status: 200 });
  } catch (err) {
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
