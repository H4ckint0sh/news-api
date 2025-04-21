/**
 * Checks if an input object has at least one valid member based on a provided type shape.
 *
 * @template T The type shape to check against.
 * @param {unknown} input The input object to validate.
 * @param {T} typeShape An object representing the desired type shape.
 * @returns {input is Partial<T>} True if the input has at least one valid member, false otherwise.
 */
export function hasValidMember<T extends object>(input: unknown, typeShape: T): input is Partial<T> {
  console.log(input);
  if (typeof input !== "object" || input === null) return false;
  console.log(typeShape);

  for (const key in typeShape) {
    console.log(key);
    const expectedType = typeof typeShape[key];
    if (key in input && typeof (input as Record<string, unknown>)[key] === expectedType) {
      return true;
    }
  }

  return false;
}
