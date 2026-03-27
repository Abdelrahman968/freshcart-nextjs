import { NextRequest, NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// POST /api/cart/add
export async function POST(req: NextRequest) {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { status: 'fail', message: 'productId is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { status: 'fail', message: data.message || 'Failed to add to cart' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[POST /api/cart/add]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
