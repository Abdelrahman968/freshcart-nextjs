import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// PUT /api/settings/auth/changeMyPassword
export async function PUT(req: Request) {
  const token = await decodeAuthUserToken();

  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    if (!body.currentPassword || !body.password || !body.rePassword) {
      return NextResponse.json(
        { status: 'fail', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (body.password !== body.rePassword) {
      return NextResponse.json(
        { status: 'fail', message: 'Passwords do not match' },
        { status: 400 }
      );
    }
    if (body.password === body.currentPassword) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'New password must be different from current password',
        },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/users/changeMyPassword`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'fail',
          message: data.message || 'Failed to change password',
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[PUT /api/settings/auth/changeMyPassword]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
