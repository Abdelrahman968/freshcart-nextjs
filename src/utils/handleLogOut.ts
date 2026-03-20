import { signOut } from 'next-auth/react';

export const logout = async () => {
  try {
    const res = await signOut({
      redirect: false,
      callbackUrl: '/login',
    });

    return {
      success: true,
      url: res?.url,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
