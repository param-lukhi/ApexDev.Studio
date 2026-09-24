import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
    }

    const { name, size, type, url } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 });
    }

    const updated = db.addProjectFile(params.id, {
      name,
      size: size || '1.5 MB',
      type: type || 'Document',
      url: url || '#',
    });

    if (!updated) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, clientProject: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
