import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import argon2 from 'argon2';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Database insertion error:', error);
    return NextResponse.json({ error: 'Error saving to database' }, { status: 500 });
  }
}

