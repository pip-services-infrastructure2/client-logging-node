import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';

export class LoggingNullClientV1 implements ILoggingClientV1 {
    constructor(config?: any) {}
        
    public async readMessages(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>> {
        return new DataPage<LogMessageV1>([], 0);
    }

    public async readErrors(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>> {
        return new DataPage<LogMessageV1>([], 0);
    }

    public async writeMessage(correlationId: string, message: LogMessageV1): Promise<LogMessageV1> {
        return message;
    }

    public writeMessages(correlationId: string, messages: LogMessageV1[]): Promise<void> {
        return;
    }

    public async clear(correlationId: string): Promise<void> {
        return;
    }
}
