import { AbstractLogger } from './AbstractLogger';
import { LoggingCommandableHttpClientV1 } from '../version1/LoggingCommandableHttpClientV1';

export class CommandableHttpLogger extends AbstractLogger {
    public constructor() {
        super(new LoggingCommandableHttpClientV1());
    }
}