import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { LoggingMemoryPersistence } from 'service-logging-node';
import { LoggingController } from 'service-logging-node';
import { LoggingDirectClientV1 } from '../../src/version1/LoggingDirectClientV1';
import { LoggingClientFixtureV1 } from './LoggingClientFixtureV1';

suite('LoggingDirectClientV1', ()=> {
    let client: LoggingDirectClientV1;
    let fixture: LoggingClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let messagesPersistence = new LoggingMemoryPersistence();
        let errorsPersistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-logging', 'persistence-messages', 'memory', 'default', '1.0'), messagesPersistence,
            new Descriptor('service-logging', 'persistence-errors', 'memory', 'default', '1.0'), errorsPersistence,
            new Descriptor('service-logging', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new LoggingDirectClientV1();
        client.setReferences(references);

        fixture = new LoggingClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
