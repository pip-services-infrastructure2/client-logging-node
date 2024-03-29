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
exports.LoggingCommandableLambdaClientV1 = void 0;
let os = require('os');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
class LoggingCommandableLambdaClientV1 extends pip_services3_aws_nodex_1.CommandableLambdaClient {
    constructor(config) {
        super('logging');
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    readMessages(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('read_messages', correlationId, {
                filter: filter,
                paging: paging
            });
        });
    }
    readErrors(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('read_errors', correlationId, {
                filter: filter,
                paging: paging
            });
        });
    }
    writeMessage(correlationId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            message.time = message.time || new Date();
            message.correlation_id = message.correlation_id || correlationId;
            message.source = message.source || os.hostname();
            return yield this.callCommand('write_message', correlationId, {
                message: message
            });
        });
    }
    writeMessages(correlationId, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let message of messages) {
                message.time = message.time || new Date();
                message.correlation_id = message.correlation_id || correlationId;
                message.source = message.source || os.hostname();
            }
            return yield this.callCommand('write_messages', correlationId, {
                messages: messages
            });
        });
    }
    clear(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('clear', correlationId, null);
        });
    }
}
exports.LoggingCommandableLambdaClientV1 = LoggingCommandableLambdaClientV1;
//# sourceMappingURL=LoggingCommandableLambdaClientV1.js.map