import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// DELETE /api/reviews/auth/[reviewId]/delete
export async function DELETE(
  _req: Request,
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

    if (!reviewId) {
      return NextResponse.json(
        { status: 'fail', message: 'Review ID is required' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });

    if (res.status === 204 || res.headers.get('content-length') === '0') {
      return new NextResponse(null, { status: 204 });
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        {
          message: 'fail',
          errors: {
            msg:
              data?.errors?.msg || data?.message || 'Failed to delete review',
          },
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[DELETE /api/reviews/auth/[reviewId]/delete]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
