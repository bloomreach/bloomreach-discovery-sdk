export const enum LogLevel {
  trace = 1,
  debug = 2,
  info = 3,
  warn = 4,
  error = 5
}

export interface Reporter {
  log(message: string, level?: LogLevel): void
}
