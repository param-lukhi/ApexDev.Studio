import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { db } from './db';
import { User, UserRole } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_agency_webdev_2026';
const AUTH_COOKIE_NAME = 'aura_agency_session';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export function getSessionUser(): User | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    const payload = verifyToken(token);
    if (!payload?.userId) return null;
    const user = db.findUserById(payload.userId);
    return user || null;
  } catch (err) {
    return null;
  }
}

export { AUTH_COOKIE_NAME };
