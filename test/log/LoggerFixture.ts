const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { LogLevel } from 'pip-services3-components-nodex';
import { ILoggingController } from 'service-logging-node';
import { AbstractLogger } from '../../src/log/AbstractLogger';

export class LoggerFixture {
    private _logger: AbstractLogger;
    private _controller: ILoggingController;

    public constructor(logger: AbstractLogger, controller: ILoggingController) {
        this._logger = logger;
        this._controller = controller;
    }

    public async testSimpleLogging() {
        this._logger.configure(
            ConfigParams.fromTuples('interval', 100)
        );

        this._logger.setLevel(LogLevel.Trace);

        this._logger.fatal(null, null, "Fatal error message");
        this._logger.error(null, null, "Error message");
        this._logger.warn(null, "Warning message");
        this._logger.info(null, "Information message");
        this._logger.debug(null, "Debug message");
        this._logger.trace(null, "Trace message");
        
        await new Promise(resolve => setTimeout(resolve, 200));

        let page = await this._controller.readMessages(null, null, null);
        assert.lengthOf(page.data, 6);
    }
}