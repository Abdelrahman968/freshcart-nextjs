import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// POST /api/pay/cash/[cartId]
export async function POST(
  req: Request,
  { params }: { params: Promise<{ cartId: string }> }
) {
  const token = await decodeAuthUserToken();

  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { cartId } = await params;

    if (!cartId) {
      return NextResponse.json(
        { status: 'fail', message: 'Cart ID is required' },
        { status: 400 }
      );
    }

    const { shippingAddress } = body;

    const { details, phone, city, postalCode } = shippingAddress;

    if (!details || !phone || !city || !postalCode) {
      return NextResponse.json(
        { status: 'fail', message: 'Shipping address is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/orders/${cartId}`, {
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
          status: data.message,
          message: data.errors.msg || 'Failed to place order',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[POST /api/pay/cash/[cartId]]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
