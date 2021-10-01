"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleReporter = void 0;
class ConsoleReporter {
    log(message, level) {
        switch (level) {
            case 2 /* debug */:
                console.debug(message);
                break;
            case 3 /* info */:
                console.info(message);
                break;
            case 4 /* warn */:
                console.warn(message);
                break;
            case 5 /* error */:
                console.error(message);
                break;
            default:
                console.info(message);
        }
    }
}
exports.ConsoleReporter = ConsoleReporter;
