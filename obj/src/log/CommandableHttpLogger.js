"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandableHttpLogger = void 0;
const AbstractLogger_1 = require("./AbstractLogger");
const LoggingCommandableHttpClientV1_1 = require("../version1/LoggingCommandableHttpClientV1");
class CommandableHttpLogger extends AbstractLogger_1.AbstractLogger {
    constructor() {
        super(new LoggingCommandableHttpClientV1_1.LoggingCommandableHttpClientV1());
    }
}
exports.CommandableHttpLogger = CommandableHttpLogger;
//# sourceMappingURL=CommandableHttpLogger.js.map