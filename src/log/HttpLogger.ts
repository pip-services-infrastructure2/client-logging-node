import { AbstractLogger } from './AbstractLogger';
import { LoggingHttpClientV1 } from '../version1/LoggingHttpClientV1';

export class HttpLogger extends AbstractLogger {
    public constructor() {
        super(new LoggingHttpClientV1());
    }
}