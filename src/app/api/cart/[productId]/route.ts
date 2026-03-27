import { NextRequest, NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL_V2;

// DELETE /api/cart/[productId]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  const { productId } = await params;
  // console.log('DELETE : ', productId);

  try {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });

    const data = await res.json();
    // console.log('response:', res.status, data);
    if (!res.ok) {
      return NextResponse.json(
        { status: 'fail', message: data.message || 'Failed to remove product' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[DELETE /api/cart/[productId]]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}

// PUT /api/cart/[productId]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  const { productId } = await params;

  try {
    const body = await req.json();
    const { count } = body;

    if (count === undefined || count < 1) {
      return NextResponse.json(
        { status: 'fail', message: 'count must be >= 1' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify({ count }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'fail',
          message: data.message || 'Failed to update quantity',
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[PUT /api/cart/[productId]]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
