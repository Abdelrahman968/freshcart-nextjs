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

    return data;
  } catch (error) {
    console.error('AddToCart service error:', error);
    throw error;
  }
}

// Apply promo code
export async function applyPromoCode(code: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V2}/cart/applyCoupon`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: (await decodeAuthUserToken()) || '',
        },
        body: JSON.stringify({
          couponName: code,
        }),
      }
    );

    if (!res.ok) {
      return {
        statusMsg: 'fail',
        message: 'Coupon is invalid or has expired',
      };
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('ApplyPromoCode service error:', error);
    throw error;
  }
}

// DELETE User Cart
export async function deleteUserCart() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V2}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: (await decodeAuthUserToken()) || '',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete user cart');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('DeleteUserCart service error:', error);
    throw error;
  }
}

// Remove Product From Cart (v2)
export async function deleteProductFromCart(productId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V2}/cart/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: (await decodeAuthUserToken()) || '',
        },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to delete user cart');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('DeleteUserCart service error:', error);
    throw error;
  }
}

// Update Cart Product Quantity (v2)
export async function updateProductQuantity(productId: string, count: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V2}/cart/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: (await decodeAuthUserToken()) || '',
        },
        body: JSON.stringify({
          count: count,
        }),
      }
    );

    if (!res.ok) {
      throw new Error('Failed to update product quantity');
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('UpdateProductQuantity service error:', error);
    throw error;
  }
}
