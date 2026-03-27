import { NextRequest, NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// PUT /api/cart/promo
export async function PUT(req: NextRequest) {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { couponName } = body;

    if (!couponName) {
      return NextResponse.json(
        { status: 'fail', message: 'couponName is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/cart/applyCoupon`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ couponName }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'fail',
          message: data.message || 'Coupon is invalid or has expired',
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[PUT /api/cart/promo]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
