export const generateRequestId = (): number =>
  Math.floor(Math.pow(10, 12) + Math.random() * Math.pow(10, 13))
