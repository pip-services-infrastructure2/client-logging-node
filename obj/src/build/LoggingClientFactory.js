"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const DirectLogger_1 = require("../log/DirectLogger");
const CommandableHttpLogger_1 = require("../log/CommandableHttpLogger");
const LoggingNullClientV1_1 = require("../version1/LoggingNullClientV1");
const LoggingDirectClientV1_1 = require("../version1/LoggingDirectClientV1");
const LoggingCommandableHttpClientV1_1 = require("../version1/LoggingCommandableHttpClientV1");
class LoggingClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(LoggingClientFactory.DirectLoggerDescriptor, DirectLogger_1.DirectLogger);
        this.registerAsType(LoggingClientFactory.HttpLoggerDescriptor, CommandableHttpLogger_1.CommandableHttpLogger);
        this.registerAsType(LoggingClientFactory.NullClientV1Descriptor, LoggingNullClientV1_1.LoggingNullClientV1);
        this.registerAsType(LoggingClientFactory.DirectClientV1Descriptor, LoggingDirectClientV1_1.LoggingDirectClientV1);
        this.registerAsType(LoggingClientFactory.HttpClientV1Descriptor, LoggingCommandableHttpClientV1_1.LoggingCommandableHttpClientV1);
    }
}
exports.LoggingClientFactory = LoggingClientFactory;
LoggingClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'factory', 'default', 'default', '1.0');
LoggingClientFactory.DirectLoggerDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'logger', 'direct', 'default', '1.0');
LoggingClientFactory.HttpLoggerDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'logger', 'commandable-http', 'default', '1.0');
LoggingClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'client', 'null', 'default', '1.0');
LoggingClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'client', 'direct', 'default', '1.0');
LoggingClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-logging', 'client', 'commandable-http', 'default', '1.0');
//# sourceMappingURL=LoggingClientFactory.js.map