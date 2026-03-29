import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/reviews/[productId]/get
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { status: 'fail', message: 'Product ID is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: 'GET',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { status: 'fail', message: data.message || 'Failed to add review' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/reviews/[productId]/get]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
