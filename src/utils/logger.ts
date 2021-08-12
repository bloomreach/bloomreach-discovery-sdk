import {ConsoleReporter} from './reporters/console'
import {Reporter, LogLevel} from './reporters/interfaces'

export class Logger {
  private reporters: Reporter[]

  constructor(reporters: Reporter[]) {
    this.reporters = reporters
  }

  static buildConsoleLogger(): Logger {
    return new Logger([new ConsoleReporter()])
  }

  log(message: string, level?: LogLevel): void {
    this.reporters.forEach((reporter) => reporter.log(message, level))
  }

  trace(message: string): void {
    this.reporters.forEach((reporter) => reporter.log(message, LogLevel.trace))
  }

  debug(message: string): void {
    this.reporters.forEach((reporter) => reporter.log(message, LogLevel.debug))
  }

  info(message: string): void {
    this.reporters.forEach((reporter) => reporter.log(message, LogLevel.info))
  }

  warn(message: string): void {
    this.reporters.forEach((reporter) => reporter.log(message, LogLevel.warn))
  }

  error(message: string): void {
    this.reporters.forEach((reporter) => reporter.log(message, LogLevel.error))
  }
}
