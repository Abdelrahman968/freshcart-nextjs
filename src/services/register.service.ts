'use server';

import { RegisterFormData, RegisterResponse } from '../types/register.type';

export const registerUser = async (
  data: RegisterFormData
): Promise<RegisterResponse | null> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;

    const response: Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const result: RegisterResponse = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Registration failed', { cause: error });
  }
};
