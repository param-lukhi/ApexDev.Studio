import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const faqs = db.getFAQs();
  return NextResponse.json({ faqs });
}

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { question, answer, category, sortOrder } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required.' }, { status: 400 });
    }

    const newFaq = db.createFAQ({
      question,
      answer,
      category: category || 'General',
      sortOrder: Number(sortOrder) || 10,
    });

    return NextResponse.json({ success: true, faq: newFaq }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
