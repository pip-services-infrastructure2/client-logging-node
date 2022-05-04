let os = require('os');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableLambdaClient } from 'pip-services3-aws-nodex';

import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';

export class LoggingLambdaClientV1 extends CommandableLambdaClient implements ILoggingClientV1 {

    constructor(config?: any) {
        super('logging');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public async readMessages(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>> {
        let timing = this.instrument(correlationId, 'logging.read_messages');

        try {
            return await this.callCommand(
                'read_messages',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async readErrors(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>> {
        let timing = this.instrument(correlationId, 'logging.read_errors');

        try {
            return await this.callCommand(
                'read_errors',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async writeMessage(correlationId: string, message: LogMessageV1): Promise<LogMessageV1> {
        message.time = message.time || new Date();
        message.correlation_id = message.correlation_id || correlationId;
        message.source = message.source || os.hostname(); 

        let timing = this.instrument(correlationId, 'logging.write_message');

        try {
            return await this.callCommand(
                'write_message',
                correlationId,
                {
                    message: message
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async writeMessages(correlationId: string, messages: LogMessageV1[]): Promise<void> {

        for (let message of messages) {
            message.time = message.time || new Date();
            message.correlation_id = message.correlation_id || correlationId;
            message.source = message.source || os.hostname(); 
        }
        
        let timing = this.instrument(correlationId, 'logging.write_messages');

        try {
            return await this.callCommand(
                'write_messages',
                correlationId,
                {
                    messages: messages
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async clear(correlationId: string): Promise<void> {
        
        let timing = this.instrument(correlationId, 'logging.clear');

        try {
            return await this.callCommand(
                'clear',
                correlationId,
                null
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}
