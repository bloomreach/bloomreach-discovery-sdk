export const generateRequestId = (): number =>
  Math.floor(Math.pow(10, 12) + Math.random() * Math.pow(10, 13))

export const formatAsCurrency = (
  cents: number,
  currencySign = '$',
  onFront = true
): string =>
  `${onFront ? currencySign : ''}${(cents / 100.0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}${!onFront ? ` ${currencySign}` : ''}`

export const escapeSpecialCharacters = (value: string): string =>
  value.replace(/"/g, '&quot;').replace(/,/g, '%%-COMMA-%%')

export const decodeSpecialCharacters = (value: string): string =>
  value.replace(/%%-COMMA-%%/g, ',').replace(/&quot;/g, '"')
