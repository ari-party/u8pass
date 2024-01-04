/**
 * Code extracted from https://www.passwordmonster.com
 */

/**
 * @param {number} number
 * @param {boolean} twoDP
 * @returns {string}
 */
function getNumberWords(number, twoDecimalPoints) {
  let numberWords = '';
  let decimalPoint;

  const trillion = 10 ** 12;
  const billion = 10 ** 9;
  const million = 10 ** 6;
  const thousand = 10 ** 4;
  const hundred = 10 ** 3;

  while (number / trillion >= 1) {
    numberWords = ` trillion ${numberWords}`;
    number /= trillion;
  }

  while (number / billion >= 1) {
    numberWords = ` billion ${numberWords}`;
    number /= billion;
  }

  while (number / million >= 1) {
    numberWords = ` million ${numberWords}`;
    number /= million;
  }

  while (number / thousand >= 1) {
    numberWords = ` thousand ${numberWords}`;
    number /= thousand;
  }

  while (number / hundred >= 1) {
    numberWords = ` hundred ${numberWords}`;
    number /= hundred;
  }

  if (twoDecimalPoints) {
    decimalPoint = 100;
  } else {
    decimalPoint = 1;
  }

  number = Math.round(number * decimalPoint) / decimalPoint;
  numberWords = number + numberWords;
  return numberWords;
}

/**
 * Convert seconds to time phrase
 *
 * @param {number} time Seconds
 * @returns {string}
 */
export function toWords(time) {
  if (time < 120) {
    return `${getNumberWords(time, true)} seconds`;
  }

  let hours = 60 * 60;
  let minutes;
  if (time < hours) {
    minutes = time / 60;
    return `${getNumberWords(minutes, true)} minutes`;
  }

  let days = hours * 24;
  if (time < 2 * days) {
    hours = time / hours;
    return `${getNumberWords(hours)} hours`;
  }

  let months = days * 30;
  if (time < months) {
    days = time / days;
    return `${getNumberWords(days)} days`;
  }

  let years = days * 365;
  if (time < years) {
    months = time / months;
    return `${getNumberWords(months)} months`;
  }

  let centuries = years * 100;
  if (time < centuries * 10) {
    years = time / years;
    return `${getNumberWords(years)} years`;
  }

  if (time < centuries * 100) {
    centuries = time / centuries;
    return `${getNumberWords(centuries)} centuries`;
  }

  years = time / years;
  return `${getNumberWords(years)} years`
    .split(' ')
    .filter((v) => v)
    .join(' ');
}
