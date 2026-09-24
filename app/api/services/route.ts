import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const services = db.getServices();
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { title, slug, shortDesc, fullDesc, iconName, deliverables, turnaround, sortOrder } = body;

    if (!title || !shortDesc) {
      return NextResponse.json({ error: 'Title and short description are required.' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newSrv = db.createService({
      title,
      slug: generatedSlug,
      shortDesc,
      fullDesc: fullDesc || shortDesc,
      iconName: iconName || 'Code2',
      deliverables: Array.isArray(deliverables) ? deliverables : [deliverables].filter(Boolean),
      turnaround: turnaround || '2-3 Weeks',
      sortOrder: Number(sortOrder) || 10,
    });

    return NextResponse.json({ success: true, service: newSrv }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
