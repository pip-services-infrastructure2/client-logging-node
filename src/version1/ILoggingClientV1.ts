import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { LogMessageV1 } from './LogMessageV1';

export interface ILoggingClientV1 {
    readMessages(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>>;

    readErrors(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>>;

    writeMessage(correlationId: string, message: LogMessageV1): Promise<LogMessageV1>;

    writeMessages(correlationId: string, messages: LogMessageV1[]): Promise<void>;

    clear(correlationId: string): Promise<void>;
}
