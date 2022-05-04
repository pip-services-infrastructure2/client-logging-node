"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingLambdaClientV1 = void 0;
let os = require('os');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
class LoggingLambdaClientV1 extends pip_services3_aws_nodex_1.CommandableLambdaClient {
    constructor(config) {
        super('logging');
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    readMessages(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.read_messages');
            try {
                return yield this.callCommand('read_messages', correlationId, {
                    filter: filter,
                    paging: paging
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    readErrors(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.read_errors');
            try {
                return yield this.callCommand('read_errors', correlationId, {
                    filter: filter,
                    paging: paging
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    writeMessage(correlationId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            message.time = message.time || new Date();
            message.correlation_id = message.correlation_id || correlationId;
            message.source = message.source || os.hostname();
            let timing = this.instrument(correlationId, 'logging.write_message');
            try {
                return yield this.callCommand('write_message', correlationId, {
                    message: message
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    writeMessages(correlationId, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let message of messages) {
                message.time = message.time || new Date();
                message.correlation_id = message.correlation_id || correlationId;
                message.source = message.source || os.hostname();
            }
            let timing = this.instrument(correlationId, 'logging.write_messages');
            try {
                return yield this.callCommand('write_messages', correlationId, {
                    messages: messages
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    clear(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.clear');
            try {
                return yield this.callCommand('clear', correlationId, null);
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
}
exports.LoggingLambdaClientV1 = LoggingLambdaClientV1;
//# sourceMappingURL=LoggingLambdaClientV1.js.map