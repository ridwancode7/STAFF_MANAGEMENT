// app/api/session/create/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

function getKey() {
  const key = process.env.NEXT_PUBLIC_APP_SECRET_KEY || 'default_secret_key';
  return crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
}

function encrypt(text: string): string {
  const algorithm = 'aes-256-ctr';
  const secretKey = getKey();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export async function POST(request: Request) {
  let sessionData = await request.json();

  console.log(sessionData); // Verify if sessionData is received correctly

  // Ensure sessionData is a string
  if (typeof sessionData !== 'string') {
    sessionData = JSON.stringify(sessionData); // Convert to JSON string if it's an object
  }

  if (!sessionData) {
    return NextResponse.json({ message: 'No session data provided!' }, { status: 400 });
  }

  const encryptedSessionData = encrypt(sessionData);

  const cookie = `session=${encryptedSessionData}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`;

  const response = NextResponse.json({ message: 'Successfully set cookie!' });
  response.headers.set('Set-Cookie', cookie);
  return response;
}
