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
exports.AbstractLogger = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const LogMessageV1_1 = require("../version1/LogMessageV1");
class AbstractLogger extends pip_services3_components_nodex_1.Logger {
    constructor(client) {
        super();
        this._cache = [];
        this._interval = AbstractLogger._defaultInterval;
        this._client = client;
        this._dumpCurl = this.debounce(() => { this.dump(); }, this._interval);
    }
    debounce(func, wait, immediate = null) {
        var timeout;
        return () => __awaiter(this, arguments, void 0, function* () {
            let context = this, args = arguments;
            let later = () => __awaiter(this, void 0, void 0, function* () {
                timeout = null;
                if (!immediate)
                    yield func.apply(context, args);
            });
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                yield func.apply(context, args);
        });
    }
    ;
    configure(config) {
        super.configure(config);
        this._client.configure(config);
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._source = config.getAsStringWithDefault("source", this._source);
        this._dumpCurl = this.debounce(() => { this.dump(); }, this._interval);
    }
    setReferences(references) {
        this._client.setReferences(references);
        let contextInfo = references.getOneOptional(new pip_services3_commons_nodex_2.Descriptor("pip-services", "context-info", "default", "*", "1.0"));
        if (contextInfo != null && this._source == null)
            this._source = contextInfo.name;
    }
    isOpen() {
        return this._client.isOpened();
    }
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.open(correlationId);
        });
    }
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._client.close(correlationId);
            yield this.dump();
        });
    }
    write(level, correlationId, ex, message) {
        if (this._level < level) {
            return;
        }
        let error = ex != null ? pip_services3_commons_nodex_1.ErrorDescriptionFactory.create(ex) : null;
        // let source: string = os.hostname(); // Todo: add current module name name
        let source = this._source || "unknown";
        let logMessage = new LogMessageV1_1.LogMessageV1(level, source, correlationId, error, message);
        this._cache.push(logMessage);
        this._dumpCurl();
    }
    clear() {
        this._cache = [];
    }
    dump() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cache.length == 0)
                return;
            yield this._client.writeMessages('logger', this._cache);
            this._cache = [];
        });
    }
}
exports.AbstractLogger = AbstractLogger;
AbstractLogger._defaultInterval = 1000;
//# sourceMappingURL=AbstractLogger.js.map