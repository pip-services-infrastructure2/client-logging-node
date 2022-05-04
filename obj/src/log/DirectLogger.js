"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectLogger = void 0;
const AbstractLogger_1 = require("./AbstractLogger");
const LoggingDirectClientV1_1 = require("../version1/LoggingDirectClientV1");
class DirectLogger extends AbstractLogger_1.AbstractLogger {
    constructor() {
        super(new LoggingDirectClientV1_1.LoggingDirectClientV1());
    }
}
exports.DirectLogger = DirectLogger;
//# sourceMappingURL=DirectLogger.js.map