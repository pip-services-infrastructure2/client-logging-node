const assert = require('chai').assert;

import { LogLevel } from 'pip-services3-components-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';

import { LogMessageV1 } from '../../src/version1/LogMessageV1';
import { ILoggingClientV1 } from '../../src/version1/ILoggingClientV1';

export class LoggingClientFixtureV1 {
    private _client: ILoggingClientV1;
    
    constructor(client: ILoggingClientV1) {
        this._client = client;
    }
        
    public async testCrudOperations() {
        let message = await this._client.writeMessage(null, new LogMessageV1(LogLevel.Info, null, "123", null, "AAA"));

        assert.isObject(message);

        let message1 = new LogMessageV1(LogLevel.Debug, null, "123", null, "BBB");
        let message2 = new LogMessageV1(LogLevel.Error, null, "123", ErrorDescriptionFactory.create(new Error()), "AAB");
        message2.time = new Date(1975, 1, 1, 0, 0, 0, 0);

        await this._client.writeMessages(null, [message1, message2]);

        let page = await this._client.readMessages(null, FilterParams.fromTuples("search", "AA"), null);

        assert.lengthOf(page.data, 2);
        
        page = await this._client.readErrors(null, null, null);

        assert.lengthOf(page.data, 1);
    }
}
