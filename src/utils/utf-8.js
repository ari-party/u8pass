import punycode from 'punycode.js';

import { randomFloat } from './crypto';

export const codePoints = 1_114_112; // Amount of code points available in the range 0x0 and 0x10FFFF

/**
 * Generate a random code point
 *
 * @returns {Promise.<number>}
 */
export async function randomCodePoint() {
  const float = await randomFloat();
  return Math.floor(float * codePoints);
}

/**
 * Keep generating code points until one is within the BMP (Basic Multilingual Plane) and return the encoded character
 *
 * @returns {Promise.<string>}
 */
export async function randomBMP() {
  let encoded;

  while (!encoded) {
    const codePoint = await randomCodePoint();

    if (codePoint < 0xd800 || (codePoint >= 0xe000 && codePoint <= 0xffff))
      encoded = punycode.ucs2.encode([codePoint]);
  }

  return encoded;
}
