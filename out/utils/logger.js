"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const console_1 = require("./reporters/console");
class Logger {
    constructor(reporters) {
        this.reporters = reporters;
    }
    static buildConsoleLogger() {
        return new Logger([new console_1.ConsoleReporter()]);
    }
    log(message, level) {
        this.reporters.forEach((reporter) => reporter.log(message, level));
    }
    trace(message) {
        this.reporters.forEach((reporter) => reporter.log(message, 1 /* trace */));
    }
    debug(message) {
        this.reporters.forEach((reporter) => reporter.log(message, 2 /* debug */));
    }
    info(message) {
        this.reporters.forEach((reporter) => reporter.log(message, 3 /* info */));
    }
    warn(message) {
        this.reporters.forEach((reporter) => reporter.log(message, 4 /* warn */));
    }
    error(message) {
        this.reporters.forEach((reporter) => reporter.log(message, 5 /* error */));
    }
}
exports.Logger = Logger;
