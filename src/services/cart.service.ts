'use server';
import { AddToCartResponse } from '../types/cart.type';
import { decodeAuthUserToken } from '../utils/decodeAuthUserToken';

// POST : Add product to cart
export async function addToCart(id: string): Promise<AddToCartResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V2}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: (await decodeAuthUserToken()) || '',
      },
      body: JSON.stringify({
        productId: id,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to add product to cart');
    }

    const data: AddToCartResponse = await res.json();

    if (!data.numOfCartItems || !data.cartId) {
      throw new Error('Invalid API response');
    }

    return data;
  } catch (error) {
    console.error('AddToCart service error:', error);
    throw error;
  }
}

// GET : Get user cart
export async function getUserCart(): Promise<AddToCartResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V2}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: (await decodeAuthUserToken()) || '',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to get user cart');
    }

    const data: AddToCartResponse = await res.json();

    if (!data.numOfCartItems || !data.cartId) {
      throw new Error('Invalid API response');
    }

    return data;
  } catch (error) {
    console.error('AddToCart service error:', error);
    throw error;
  }
}
