import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GET /api/address/[addressId]
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { addressId } = await params;

    const res = await fetch(`${API_URL}/addresses/${addressId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'fail',
          message: data.message || 'Failed to fetch address',
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/address/[addressId]]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}

// PUT /api/address/[addressId]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  const token = await decodeAuthUserToken();
  if (!token) {
    return NextResponse.json(
      { status: 'fail', message: 'User is not authenticated' },
      { status: 401 }
    );
  }

  const body = await req.json();

  const { name, details, phone, city } = body;

  if (!name || !details || !phone || !city) {
    return NextResponse.json(
      { status: 'fail', message: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    const { addressId } = await params;

    const res = await fetch(`${API_URL}/addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'fail',
          message: data.message || 'Failed to update address',
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[PUT /api/address/[addressId]]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
