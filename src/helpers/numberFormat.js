/* eslint-disable space-before-function-paren */
export default function numberFormat(value) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat().format(value)
  }
  return null
}
