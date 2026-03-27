import { NextRequest, NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// DELETE /api/wishlist/[productId]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const token = (await decodeAuthUserToken()) || req.headers.get('token');

  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { status: 'fail', message: 'productId is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/wishlist/${productId}`, {
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
        { status: 'fail', message: data.message || 'Failed to remove product' },
        { status: res.status }
      );
    }

    const items = Array.isArray(data.data) ? data.data : [];

    const finalData = {
      status: data.status,
      message: data.message,
      count: items.length,
      data: items.map((id: string) => ({
        id,
      })),
    };

    return NextResponse.json(finalData);
  } catch (error) {
    console.error('[DELETE /api/wishlist/[productId]]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
