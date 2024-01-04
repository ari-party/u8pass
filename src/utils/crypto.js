/**
 * Generate a truly random number using the Crypto api
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 *
 * @returns {Promise.<number>}
 */
export async function randomFloat() {
  const array = new Uint32Array(1);

  crypto.getRandomValues(array);

  return array[0] / 2 ** 32; // Mathematical operation converts the random value to a float between 0 and 1
}
