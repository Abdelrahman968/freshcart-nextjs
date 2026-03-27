'use server';

export async function forgotPasswords(params: { email: string }) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  return {
    status: data.statusMsg || data.status || 'fail',
  };
}

export async function verifyResetCode(params: { resetCode: string }) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/forgotPassword/verifyResetCode`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  );
  const data = await res.json();
  console.log('data', data);
  return {
    status: data.statusMsg || data.status || 'fail',
  };
}

export async function resetPassword(params: {
  email: string;
  newPassword: string;
}) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/forgotPassword/resetPassword`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }
  );
  const data = await res.json();
  return {
    status: data.statusMsg || data.status || 'fail',
  };
}
