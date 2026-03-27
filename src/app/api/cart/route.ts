import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// GET /api/cart
export async function GET() {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${API_URL}/cart`, {
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
        { status: 'fail', message: data.message || 'Failed to fetch cart' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/cart]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart
export async function DELETE() {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { status: 'fail', message: data.message || 'Failed to delete cart' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[DELETE /api/cart]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
