const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { LoggingMemoryPersistence } from 'service-logging-node';
import { LoggingController } from 'service-logging-node';
import { DirectLogger } from '../../src/log/DirectLogger';
import { LoggerFixture } from './LoggerFixture';

suite('DirectLogger', ()=> {
    let logger: DirectLogger;
    let fixture: LoggerFixture;

    suiteSetup(async () => {
        let consoleLogger = new ConsoleLogger();
        let messagesPersistence = new LoggingMemoryPersistence();
        let errorsPersistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), consoleLogger,
            new Descriptor('service-logging', 'persistence-messages', 'memory', 'default', '1.0'), messagesPersistence,
            new Descriptor('service-logging', 'persistence-errors', 'memory', 'default', '1.0'), errorsPersistence,
            new Descriptor('service-logging', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        logger = new DirectLogger();
        logger.setReferences(references);

        fixture = new LoggerFixture(logger, controller);

        await logger.open(null);
    });
    
    suiteTeardown(async () => {
        await logger.close(null);
    });

    test('Simple logging', async () => {
        await fixture.testSimpleLogging();
    });

});
