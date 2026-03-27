import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/wishlist/add
export async function POST(req: Request) {
  const token = (await decodeAuthUserToken()) || req.headers.get('token');
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { productId } = body;

    const res = await fetch(`${API_URL}/wishlist`, {
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
        { status: 'fail', message: data.message || 'Failed to add product' },
        { status: res.status }
      );
    }

    const items = Array.isArray(data.data) ? data.data : [];

    const finalData = {
      status: data.status,
      count: items.length,
      data: items.map((id: string) => ({
        id,
      })),
    };

    return NextResponse.json(finalData);
  } catch (error) {
    console.error('[POST /api/wishlist/add]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
