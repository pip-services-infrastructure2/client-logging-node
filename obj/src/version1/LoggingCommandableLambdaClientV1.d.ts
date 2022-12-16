import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableLambdaClient } from 'pip-services3-aws-nodex';
import { LogMessageV1 } from './LogMessageV1';
import { ILoggingClientV1 } from './ILoggingClientV1';
export declare class LoggingCommandableLambdaClientV1 extends CommandableLambdaClient implements ILoggingClientV1 {
    constructor(config?: any);
    readMessages(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>>;
    readErrors(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>>;
    writeMessage(correlationId: string, message: LogMessageV1): Promise<LogMessageV1>;
    writeMessages(correlationId: string, messages: LogMessageV1[]): Promise<void>;
    clear(correlationId: string): Promise<void>;
}
