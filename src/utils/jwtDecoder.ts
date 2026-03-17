import jwt from 'jsonwebtoken';

export interface DecodedJwtPayload {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export function jwtDecoder(token: string): DecodedJwtPayload | null {
  try {
    const decoded = jwt.decode(token);
    if (!decoded) return null;

    return decoded as DecodedJwtPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
