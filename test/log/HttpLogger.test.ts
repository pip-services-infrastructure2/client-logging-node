const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { LoggingMemoryPersistence } from 'service-logging-node';
import { LoggingController } from 'service-logging-node';
import { LoggingHttpServiceV1 } from 'service-logging-node';
import { HttpLogger } from '../../src/log/HttpLogger';
import { LoggerFixture } from './LoggerFixture';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('LoggingHttpClientV1', ()=> {
    let service: LoggingHttpServiceV1;
    let logger: HttpLogger;
    let fixture: LoggerFixture;

    suiteSetup(async () => {
        let consoleLogger = new ConsoleLogger();
        let messagesPersistence = new LoggingMemoryPersistence();
        let errorsPersistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        service = new LoggingHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), consoleLogger,
            new Descriptor('service-logging', 'persistence-messages', 'memory', 'default', '1.0'), messagesPersistence,
            new Descriptor('service-logging', 'persistence-errors', 'memory', 'default', '1.0'), errorsPersistence,
            new Descriptor('service-logging', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-logging', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        logger = new HttpLogger();
        logger.configure(httpConfig);

        fixture = new LoggerFixture(logger, controller);

        await service.open(null);
        await logger.open(null);
    });
    
    suiteTeardown(async () => {
        await logger.close(null);
        await service.close(null);
    });

    test('Simple logging', async () => {
        await fixture.testSimpleLogging();
    });

});
