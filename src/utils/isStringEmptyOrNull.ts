/**
 * Checks if a string is null, undefined, empty, or contains only whitespace characters.
 * @param str The string to check.
 * @returns True if the string is null, undefined, empty, or contains only whitespace; otherwise, false.
 */
export function isEmptyOrSpaces(str: null | string | undefined): boolean {
  // Check for null or undefined first
  if (str == null) {
    // Using == null checks for both null and undefined
    return true;
  }
  // Check if the trimmed string is empty
  return str.trim() === "";
}
