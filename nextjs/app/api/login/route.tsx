import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';
import argon2 from 'argon2';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Query the user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = result.rows[0];

    // Verify the password
    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Respond with success
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Error querying database' }, { status: 500 });
  }
}




