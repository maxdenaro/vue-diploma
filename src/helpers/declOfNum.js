/* eslint-disable space-before-function-paren */
export default function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2]
  // eslint-disable-next-line max-len
  return `${number} ${titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`
}
