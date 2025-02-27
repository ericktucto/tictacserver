import * as jose from 'jose';
import { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE, JWT_EXPIRATION } from '@/config';
interface IAuth {
  name: string;
  id: string;
}
const secret = new TextEncoder().encode(JWT_SECRET);
export async function encode(data: IAuth): Promise<string> {
  const jwt = await new jose.SignJWT({ name: data.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(JWT_EXPIRATION)
    .sign(secret);
  return jwt;
}

export function decode() {
  return true;
}
