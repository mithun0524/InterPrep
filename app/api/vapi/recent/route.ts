import { db } from '@/firebase/admin';

export async function GET() {
  try {
    const snapshot = await db.collection('interviews').orderBy('createdAt','desc').limit(10).get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return Response.json({ success: true, items }, { status: 200 });
  } catch (err) {
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
