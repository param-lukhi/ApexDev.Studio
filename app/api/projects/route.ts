import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const projects = db.getProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      category,
      client,
      timeline,
      year,
      summary,
      requirement,
      challenge,
      solution,
      features,
      technologies,
      heroImage,
      screenshots,
      liveUrl,
      featured,
      sortOrder,
    } = body;

    if (!title || !category || !summary) {
      return NextResponse.json({ error: 'Title, category, and summary are required.' }, { status: 400 });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProject = db.createProject({
      title,
      slug: generatedSlug,
      category: category || 'Business',
      client: client || 'Private Client',
      timeline: timeline || '2-3 Weeks',
      year: year || new Date().getFullYear().toString(),
      summary,
      requirement: requirement || summary,
      challenge: challenge || 'High performance and modern UX requirements.',
      solution: solution || 'Custom Next.js web development and cloud deployment.',
      features: Array.isArray(features) ? features : [features].filter(Boolean),
      technologies: Array.isArray(technologies) ? technologies : ['Next.js', 'React', 'Tailwind CSS'],
      heroImage: heroImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
      screenshots: Array.isArray(screenshots) ? screenshots : [heroImage],
      liveUrl: liveUrl || 'https://example.com',
      featured: Boolean(featured),
      sortOrder: Number(sortOrder) || 10,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
