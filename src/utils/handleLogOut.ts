import { signOut } from 'next-auth/react';

export const logout = async () => {
  try {
    const res = await signOut({
      redirect: true,
      callbackUrl: '/login',
    });

    return {
      success: true,
      url: res,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
