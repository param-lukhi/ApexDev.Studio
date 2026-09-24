import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  const packages = db.getPackages();
  return NextResponse.json({ packages });
}

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { name, tag, description, price, originalPrice, billingPeriod, features, deliveryTime, isPopular, isCustom, sortOrder } = body;

    if (!name || !price) {
      return NextResponse.json({ error: 'Package name and price are required.' }, { status: 400 });
    }

    const newPkg = db.createPackage({
      name,
      tag: tag || 'Website Package',
      description: description || '',
      price,
      originalPrice,
      billingPeriod: billingPeriod || 'one-time',
      features: Array.isArray(features) ? features : [features].filter(Boolean),
      deliveryTime: deliveryTime || '2 Weeks',
      isPopular: Boolean(isPopular),
      isCustom: Boolean(isCustom),
      sortOrder: Number(sortOrder) || 10,
    });

    return NextResponse.json({ success: true, package: newPkg }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
