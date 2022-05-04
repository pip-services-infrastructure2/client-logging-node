import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReconfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { LogLevel } from 'pip-services3-components-nodex';
import { Logger } from 'pip-services3-components-nodex';
import { LogMessageV1 } from '../version1/LogMessageV1';
import { ILoggingClientV1 } from '../version1/ILoggingClientV1';
export declare abstract class AbstractLogger extends Logger implements IReconfigurable, IReferenceable, IOpenable {
    private static readonly _defaultInterval;
    protected _client: ILoggingClientV1;
    protected _cache: LogMessageV1[];
    protected _interval: number;
    protected _dumpCurl: any;
    protected _source: string;
    constructor(client: ILoggingClientV1);
    private debounce;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    isOpen(): boolean;
    open(correlationId: string): Promise<void>;
    close(correlationId: string): Promise<void>;
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
    clear(): void;
    dump(): Promise<void>;
}
