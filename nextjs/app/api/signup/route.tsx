// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await pool.query('INSERT INTO users (email) VALUES ($1) RETURNING *', [email]);
    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Database insertion error:', error);
    return NextResponse.json({ error: 'Error saving to database' }, { status: 500 });
  }
}
