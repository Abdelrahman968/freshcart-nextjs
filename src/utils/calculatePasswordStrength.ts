export const calculatePasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[a-z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 15;
  if (/[@$!%*?&#]/.test(password)) score += 10;

  return score;
};
