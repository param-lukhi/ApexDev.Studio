import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const user = getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (user.role === 'ADMIN') {
    const clientProjects = db.getClientProjects();
    return NextResponse.json({ clientProjects });
  } else {
    const clientProjects = db.getClientProjectsByClientId(user.id);
    return NextResponse.json({ clientProjects });
  }
}
