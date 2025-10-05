import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return NextResponse.json({ error: 'Company ID required' }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: {
        id: true,
        name: true,
        verificationStatus: true,
        verificationToken: true,
        verifiedAt: true,
      },
    });

    return NextResponse.json({ company });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}