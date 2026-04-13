const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RULE_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const PASSWORD_RULE_MESSAGE =
  "must be at least 8 characters and include 1 number, 1 uppercase letter, and 1 lowercase letter.";

export function isValidEmailFormat(email: string) {
  return EMAIL_REGEX.test(email.trim());
}

export function passesPasswordRule(password: string) {
  return PASSWORD_RULE_REGEX.test(password);
}
