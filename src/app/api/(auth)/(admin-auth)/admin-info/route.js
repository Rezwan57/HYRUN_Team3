import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const name = cookieStore.get('admin_name')?.value;
  const email = cookieStore.get('admin_email')?.value;

  if (!name || !email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  return NextResponse.json({ name, email });
}