/**
 * Extremely simple in-memory rate limiting for Next.js Server Actions.
 * Note: In a true multi-instance deployment (like Vercel serverless), 
 * memory is not shared across instances. For a truly robust rate limit,
 * use Redis (Upstash) or a Supabase table. This prevents basic brute-forcing
 * on a single instance.
 */

interface RateLimitInfo {
  count: number;
  lastReset: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();

const LIMIT = 5; // max 5 submissions
const WINDOW_MS = 60 * 1000; // per minute

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const info = rateLimitMap.get(identifier);

  if (!info) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return false;
  }

  // Reset if window has passed
  if (now - info.lastReset > WINDOW_MS) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return false;
  }

  // Increment and check
  info.count += 1;
  if (info.count > LIMIT) {
    return true; // Rate limited
  }

  return false;
}
