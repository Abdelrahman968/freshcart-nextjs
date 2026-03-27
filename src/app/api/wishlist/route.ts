import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/wishlist
export async function GET() {
  const token = await decodeAuthUserToken();

  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${API_URL}/wishlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { status: 'fail', message: data.message || 'Failed to fetch wishlist' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/wishlist]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
