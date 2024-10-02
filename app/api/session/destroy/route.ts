// app/api/session/destroy/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Use cookies from next/headers

function destroySession() {
  const cookieStore = cookies();
  cookieStore.set('session', '', { path: '/', expires: new Date(0) }); // Set an expired date to delete the cookie
}

export async function POST(request: Request) {
  const cookieStore = cookies(); // Get the cookie store
  const sessionCookie = cookieStore.get('session')?.value; // Access the session cookie

  if (!sessionCookie) {
    return NextResponse.json({ message: 'No session cookie found' }, { status: 400 });
  }

  try {
    // Destroy the session by clearing the cookie
    destroySession();
    return NextResponse.json({ message: 'Session destroyed successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to destroy session' }, { status: 500 });
  }
}