import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReconfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { LogLevel } from 'pip-services3-components-nodex';
import { Logger } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { ContextInfo } from 'pip-services3-components-nodex';

import { LogMessageV1 } from '../version1/LogMessageV1';
import { ILoggingClientV1 } from '../version1/ILoggingClientV1';

export abstract class AbstractLogger extends Logger implements IReconfigurable, IReferenceable, IOpenable {
	private static readonly _defaultInterval: number = 1000;
	
    protected _client: ILoggingClientV1;
    protected _cache: LogMessageV1[] = [];
    protected _interval: number = AbstractLogger._defaultInterval;
    protected _dumpCurl: any;
    protected _source: string;

    public constructor(client: ILoggingClientV1) {
        super();
        this._client = client;
        this._dumpCurl = this.debounce(() => { this.dump() }, this._interval);
    }

    private debounce(func: any, wait: number, immediate=null) {
        var timeout;
        return async () => {
            let context = this, args = arguments;
            let later = async () => {
                timeout = null;
                if (!immediate) await func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) await func.apply(context, args);
    };
};

    public configure(config: ConfigParams): void {
        super.configure(config);
        (this._client as any).configure(config);
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._source = config.getAsStringWithDefault("source", this._source);
        this._dumpCurl = this.debounce(() => { this.dump() }, this._interval);
    }
	
    public setReferences(references: IReferences): void {
        (this._client as any).setReferences(references);
        let contextInfo = references.getOneOptional<ContextInfo>(
            new Descriptor("pip-services", "context-info", "default", "*", "1.0"));
        if (contextInfo != null && this._source == null)
            this._source = contextInfo.name;
    }

    public isOpen(): boolean {
        return (this._client as any).isOpened();
    }

    public async open(correlationId: string): Promise<void> {
        await (this._client as any).open(correlationId);
    }

    public async close(correlationId: string): Promise<void> {
        await (this._client as any).close(correlationId);
        await this.dump();
    }

	protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void {
        if (this._level < level) {
            return;
        }

		let error: ErrorDescription = ex != null ? ErrorDescriptionFactory.create(ex) : null;
        // let source: string = os.hostname(); // Todo: add current module name name
        let source: string = this._source || "unknown";
		let logMessage: LogMessageV1 = new LogMessageV1(level, source, correlationId, error, message);
		
        this._cache.push(logMessage);
		
        this._dumpCurl();
	}
    
    public clear(): void {
        this._cache = [];
    }

    public async dump(): Promise<void> {
        if (this._cache.length == 0) return;

        await this._client.writeMessages('logger', this._cache);

        this._cache = [];
    }

}
