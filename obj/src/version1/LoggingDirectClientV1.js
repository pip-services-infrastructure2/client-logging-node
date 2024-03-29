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
exports.LoggingDirectClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class LoggingDirectClientV1 extends pip_services3_rpc_nodex_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-logging", "controller", "*", "*", "*"));
    }
    readMessages(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.read_messages');
            try {
                let res = yield this._controller.readMessages(correlationId, filter, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    readErrors(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.read_errors');
            try {
                let res = yield this._controller.readErrors(correlationId, filter, paging);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    writeMessage(correlationId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.write_message');
            try {
                let res = yield this._controller.writeMessage(correlationId, message);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    writeMessages(correlationId, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.write_messages');
            try {
                let res = yield this._controller.writeMessages(correlationId, messages);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
    clear(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'logging.clear');
            try {
                let res = yield this._controller.clear(correlationId);
                timing.endTiming();
                return res;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
        });
    }
}
exports.LoggingDirectClientV1 = LoggingDirectClientV1;
//# sourceMappingURL=LoggingDirectClientV1.js.map