/**
 * @param {number} n Times to iterate
 * @param {function} f Function that returns a string
 * @returns {Promise.<string>}
 */
export async function ofLength(n, f) {
  let string = '';

  for (let i = 0; i < n; i += 1) string += await Promise.resolve(f());

  return string;
}
