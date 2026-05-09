/**
 * Validates a honeypot field.
 * If the field has a value, it means a bot filled it out, and we should reject the submission.
 */
export function isBot(honeypotValue: string | undefined | null): boolean {
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return true;
  }
  return false;
}
