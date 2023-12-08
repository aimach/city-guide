import jwt from 'jsonwebtoken';

export const generateJwt = (role: string, userId: string) => {
  return jwt.sign(
    { role, userId },
    '7nB6SRANg5vP4dqML4hLULbpcQQdn4nMXCjpbjTKEMR2SWT2McnUmqrxv2mt39XjUnfdJRRpL6RveKa7quJR7dwHUXpevQ4WHHkg'
  );
};
