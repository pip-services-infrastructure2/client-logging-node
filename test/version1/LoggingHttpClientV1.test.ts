import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { LoggingMemoryPersistence } from 'service-logging-node';
import { LoggingController } from 'service-logging-node';
import { LoggingHttpServiceV1 } from 'service-logging-node';
import { LoggingHttpClientV1 } from '../../src/version1/LoggingHttpClientV1';
import { LoggingClientFixtureV1 } from './LoggingClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('LoggingHttpClientV1', ()=> {
    let service: LoggingHttpServiceV1;
    let client: LoggingHttpClientV1;
    let fixture: LoggingClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let messagesPersistence = new LoggingMemoryPersistence();
        let errorsPersistence = new LoggingMemoryPersistence();
        let controller = new LoggingController();

        service = new LoggingHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-logging', 'persistence-messages', 'memory', 'default', '1.0'), messagesPersistence,
            new Descriptor('service-logging', 'persistence-errors', 'memory', 'default', '1.0'), errorsPersistence,
            new Descriptor('service-logging', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-logging', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new LoggingHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new LoggingClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});
