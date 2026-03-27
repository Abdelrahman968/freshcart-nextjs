import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// POST /api/forgotPassword
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await fetch(`${API_URL}/auth/forgotPasswords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'fail',
          message: data.message || 'Failed to send reset code',
        },
        { status: res.status }
      );
    }
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[POST /api/forgotPassword]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
