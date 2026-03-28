import { NextResponse } from 'next/server';
import { decodeAuthUserToken } from '../../../../../utils/decodeAuthUserToken';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// DELETE /api/address/remove/[addressId]
export async function DELETE(
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
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          status: 'fail',
          message: data.message || 'Failed to remove address',
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[DELETE /api/address/remove/[addressId]]', error);
    return NextResponse.json(
      { status: 'fail', message: 'Network error' },
      { status: 500 }
    );
  }
}
