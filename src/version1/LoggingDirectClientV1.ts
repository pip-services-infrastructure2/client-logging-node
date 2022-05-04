import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { ILoggingClientV1 } from './ILoggingClientV1';
//import { ILoggingController } from 'service-logging-node';
import { LogMessageV1 } from './LogMessageV1';

export class LoggingDirectClientV1 extends DirectClient<any> implements ILoggingClientV1 {
            
    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-logging", "controller", "*", "*", "*"))
    }

    public async readMessages(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<LogMessageV1>> {
        let timing = this.instrument(correlationId, 'logging.read_messages');
        
        try {
            return await this._controller.readMessages(correlationId, filter, paging);
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
            return await this._controller.readErrors(correlationId, filter, paging);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async writeMessage(correlationId: string, message: LogMessageV1): Promise<LogMessageV1> {
        let timing = this.instrument(correlationId, 'logging.write_message');
        
        try {
            return await this._controller.writeMessage(correlationId, message);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async writeMessages(correlationId: string, messages: LogMessageV1[]): Promise<void> {
        let timing = this.instrument(correlationId, 'logging.write_messages');
        
        try {
            return await this._controller.writeMessages(correlationId, messages);
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
            return await this._controller.clear(correlationId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}