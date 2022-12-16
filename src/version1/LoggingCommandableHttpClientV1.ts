let os = require('os');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';

export class LoggingCommandableHttpClientV1 extends CommandableHttpClient implements ILoggingClientV1 {

    constructor(config?: any) {
        super('v1/logging');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public async readMessages(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>> {
        return await this.callCommand(
            'read_messages',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }

    public async readErrors(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>> {
        return await this.callCommand(
            'read_errors',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }

    public async writeMessage(correlationId: string, message: LogMessageV1): Promise<LogMessageV1> {
        message.time = message.time || new Date();
        message.source = message.source || os.hostname(); 
        message.correlation_id = message.correlation_id || correlationId;
        
        return await this.callCommand(
            'write_message',
            correlationId,
            {
                message: message
            }
        );
    }

    public async writeMessages(correlationId: string, messages: LogMessageV1[]): Promise<void> {
        for (let message of messages) {
            message.time = message.time || new Date();
            message.source = message.source || os.hostname();
            message.correlation_id = message.correlation_id || correlationId;
        }

        return await this.callCommand(
            'write_messages',
            correlationId,
            {
                messages: messages
            }
        );
    }

    public async clear(correlationId: string): Promise<void> {
        await this.callCommand(
            'clear',
            correlationId,
            null
        );
    }
}
