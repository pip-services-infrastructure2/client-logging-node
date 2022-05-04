"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpLogger = void 0;
const AbstractLogger_1 = require("./AbstractLogger");
const LoggingHttpClientV1_1 = require("../version1/LoggingHttpClientV1");
class HttpLogger extends AbstractLogger_1.AbstractLogger {
    constructor() {
        super(new LoggingHttpClientV1_1.LoggingHttpClientV1());
    }
}
exports.HttpLogger = HttpLogger;
//# sourceMappingURL=HttpLogger.js.map