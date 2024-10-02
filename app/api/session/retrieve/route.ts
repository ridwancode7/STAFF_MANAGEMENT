// app/api/session/retrieve/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Use cookies from next/headers
import crypto from 'crypto';
// import moment from 'moment-timezone';

function getKey() {
  const key = process.env.NEXT_PUBLIC_APP_SECRET_KEY || 'default_secret_key';
  return crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
}

function decrypt(text: string): string {
  const [iv, encryptedText] = text.split(':');
  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedBuffer = Buffer.from(encryptedText, 'hex');
  const algorithm = 'aes-256-ctr';
  const secretKey = getKey();

  const decipher = crypto.createDecipheriv(algorithm, secretKey, ivBuffer);
  const decrypted = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);

  return decrypted.toString();
}

function destroySession() {
  const cookieStore = cookies();
  cookieStore.set('session', '', { path: '/', expires: new Date(0) }); // Set an expired date to delete the cookie
}

export async function POST(request: Request) {
  const cookieStore = cookies(); // Get the cookie store
  const encryptedSessionData = cookieStore.get('session')?.value; // Access the session cookie

  if (!encryptedSessionData) {
    return NextResponse.json({ message: 'No session cookie found' }, { status: 400 });
  }

  try {
    const decryptedSessionData = decrypt(encryptedSessionData);
    const session = JSON.parse(decryptedSessionData);
    let expired = false;
    
    // if (!session.tokenExpiresAt) {
    //   destroySession();
    //   return NextResponse.json({ message: 'Session cookie expiry do not exist' }, { status: 400 });
    // }

    // var d = new Date(session.tokenExpiresAt);
    // var currentDate = new Date();
    // expired = d.getTime() < currentDate.getTime();

    // if (expired) {
    //   destroySession();
    //   return NextResponse.json({ message: 'Session cookie expired' }, { status: 400 });
    // }
    return NextResponse.json({ session });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to decrypt session data' }, { status: 500 });
  }
}
