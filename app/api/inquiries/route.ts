import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role === 'ADMIN') {
      const inquiries = db.getInquiries();
      return NextResponse.json({ inquiries });
    } else {
      const inquiries = db.getInquiriesByClientId(user.id);
      return NextResponse.json({ inquiries });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = getSessionUser();

    const {
      clientName,
      email,
      phone,
      businessName,
      websiteType,
      selectedPackageId,
      packageName,
      requiredPages,
      requiredFeatures,
      preferredDesign,
      referenceWebsite,
      domainAvailable,
      hostingAvailable,
      additionalRequirements,
      budget,
      message,
    } = body;

    if (!clientName || !email) {
      return NextResponse.json(
        { error: 'Name and email are required to submit an inquiry.' },
        { status: 400 }
      );
    }

    const inquiry = db.createInquiry({
      clientName,
      email,
      phone: phone || '',
      businessName: businessName || '',
      websiteType: websiteType || 'Business Website',
      selectedPackageId: selectedPackageId || 'pkg-pro',
      packageName: packageName || 'PROFESSIONAL',
      requiredPages: requiredPages || [],
      requiredFeatures: requiredFeatures || [],
      preferredDesign: preferredDesign || '',
      referenceWebsite: referenceWebsite || '',
      domainAvailable: Boolean(domainAvailable),
      hostingAvailable: Boolean(hostingAvailable),
      additionalRequirements: additionalRequirements || '',
      budget: budget || 'Standard',
      message: message || '',
      status: 'New',
      clientId: user ? user.id : undefined,
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}
