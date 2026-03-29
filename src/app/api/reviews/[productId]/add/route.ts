import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// POST /api/reviews/[productId]/add
export async function POST(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
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
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { status: 'fail', message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const { review, rating } = body;

    if (!review || !rating) {
      return NextResponse.json(
        { status: 'fail', message: 'Review and rating are required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
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
          message: data.errors.msg || 'Failed to add review',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[POST /api/reviews/[productId]/add]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
