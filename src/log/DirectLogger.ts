import { AbstractLogger } from './AbstractLogger';
import { LoggingDirectClientV1 } from '../version1/LoggingDirectClientV1';

export class DirectLogger extends AbstractLogger {
    public constructor() {
        super(new LoggingDirectClientV1());
    }
}