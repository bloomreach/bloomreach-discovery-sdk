import {Reporter, LogLevel} from './interfaces'

export class ConsoleReporter implements Reporter {
  log(message: string, level?: LogLevel): void {
    switch (level) {
      case LogLevel.debug:
        console.debug(message)
        break
      case LogLevel.info:
        console.info(message)
        break
      case LogLevel.warn:
        console.warn(message)
        break
      case LogLevel.error:
        console.error(message)
        break
      default:
        console.info(message)
    }
  }
}
