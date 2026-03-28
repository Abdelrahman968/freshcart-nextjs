import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// POST /api/address/add
export async function POST(req: Request) {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    if (!body.name || !body.details || !body.phone || !body.city) {
      return NextResponse.json(
        { status: 'fail', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/addresses`, {
      method: 'POST',
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
          message: data.message || 'Failed to add address',
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[POST /api/address/add]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
