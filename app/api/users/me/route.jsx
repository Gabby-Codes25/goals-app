import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/config/db';
import { usersTable } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = user.id;
    const rows = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    if (!rows.length) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const u = rows[0];
    return NextResponse.json({
      success: true,
      user: {
        id: u.id,
        email: u.email,
        firstName: u.first_name,
        lastName: u.last_name,
        fullName: u.full_name,
        xp: u.xp || 0,
      }
    });
  } catch (e) {
    console.error('Error in /api/user/me:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


