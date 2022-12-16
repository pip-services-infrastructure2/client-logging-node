import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';
import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';
export declare class LoggingCommandableHttpClientV1 extends CommandableHttpClient implements ILoggingClientV1 {
    constructor(config?: any);
    readMessages(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>>;
    readErrors(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>>;
    writeMessage(correlationId: string, message: LogMessageV1): Promise<LogMessageV1>;
    writeMessages(correlationId: string, messages: LogMessageV1[]): Promise<void>;
    clear(correlationId: string): Promise<void>;
}
