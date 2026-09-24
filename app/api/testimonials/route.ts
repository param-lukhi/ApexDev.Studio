import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const testimonials = db.getTestimonials();
  return NextResponse.json({ testimonials });
}

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { clientName, company, role, projectType, review, rating, avatar, verified, sortOrder } = body;

    if (!clientName || !review) {
      return NextResponse.json({ error: 'Client name and review are required.' }, { status: 400 });
    }

    const newTest = db.createTestimonial({
      clientName,
      company: company || 'Company',
      role: role || 'Founder',
      projectType: projectType || 'Website Development',
      review,
      rating: Number(rating) || 5,
      avatar,
      verified: verified !== undefined ? Boolean(verified) : true,
      sortOrder: Number(sortOrder) || 10,
    });

    return NextResponse.json({ success: true, testimonial: newTest }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
