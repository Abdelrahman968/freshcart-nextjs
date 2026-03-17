import { cookies } from 'next/headers';

export const mainToken = {
  async get(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get('fresh-cart.session-token')?.value;
  },

  async set(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set('fresh-cart.session-token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  },

  async delete(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('fresh-cart.session-token');
  },
};
