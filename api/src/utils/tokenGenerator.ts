import crypto from 'crypto';

export function generateToken(length = 16): string {
  return crypto.randomBytes(length).toString('hex');
}
