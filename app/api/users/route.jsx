import { db } from "@/config/db";
import { usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm"; 
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    // Check if user already exists
    const existingUsers = await db.select().from(usersTable)
      .where(eq(usersTable.email, email));

    // If user doesn't exist, insert new user
    if (existingUsers?.length === 0) {
      const result = await db.insert(usersTable).values({
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
        email: email,
        password: password || null,
        
      }).returning();

      return NextResponse.json(result[0]);
    }

    return NextResponse.json(existingUsers[0]);
  } catch (error) {
    console.error('Error in /api/users:', error);
    return NextResponse.json(
      { error: 'Failed to create/fetch user' },
      { status: 500 }
    );
  }
}