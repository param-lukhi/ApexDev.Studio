import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/', req.url));
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}
