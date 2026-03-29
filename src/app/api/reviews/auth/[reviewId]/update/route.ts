import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// PUT /api/reviews/auth/[reviewId]/update
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  const token = await decodeAuthUserToken();

  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { reviewId } = await params;
    const body = await req.json();

    const { review, rating } = body;

    if (!review || !rating) {
      return NextResponse.json(
        { status: 'fail', message: 'Review and rating are required' },
        { status: 400 }
      );
    }

    if (!reviewId) {
      return NextResponse.json(
        { status: 'fail', message: 'Review ID is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { status: 'fail', message: data.message || 'Failed to update review' },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[PUT /api/reviews/auth/[reviewId]/update]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
