"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const DirectLogger_1 = require("../log/DirectLogger");
const HttpLogger_1 = require("../log/HttpLogger");
const LoggingNullClientV1_1 = require("../version1/LoggingNullClientV1");
const LoggingDirectClientV1_1 = require("../version1/LoggingDirectClientV1");
const LoggingHttpClientV1_1 = require("../version1/LoggingHttpClientV1");
class LoggingClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(LoggingClientFactory.DirectLoggerDescriptor, DirectLogger_1.DirectLogger);
        this.registerAsType(LoggingClientFactory.HttpLoggerDescriptor, HttpLogger_1.HttpLogger);
        this.registerAsType(LoggingClientFactory.NullClientV1Descriptor, LoggingNullClientV1_1.LoggingNullClientV1);
        this.registerAsType(LoggingClientFactory.DirectClientV1Descriptor, LoggingDirectClientV1_1.LoggingDirectClientV1);
        this.registerAsType(LoggingClientFactory.HttpClientV1Descriptor, LoggingHttpClientV1_1.LoggingHttpClientV1);
    }
}
exports.LoggingClientFactory = LoggingClientFactory;
LoggingClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'factory', 'default', 'default', '1.0');
LoggingClientFactory.DirectLoggerDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'logger', 'direct', 'default', '1.0');
LoggingClientFactory.HttpLoggerDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'logger', 'http', 'default', '1.0');
LoggingClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'client', 'null', 'default', '1.0');
LoggingClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'client', 'direct', 'default', '1.0');
LoggingClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'client', 'http', 'default', '1.0');
//# sourceMappingURL=LoggingClientFactory.js.map