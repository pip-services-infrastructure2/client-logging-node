import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { DirectLogger } from '../log/DirectLogger';
import { CommandableHttpLogger } from '../log/CommandableHttpLogger';

import { LoggingNullClientV1 } from '../version1/LoggingNullClientV1';
import { LoggingDirectClientV1 } from '../version1/LoggingDirectClientV1';
import { LoggingCommandableHttpClientV1 } from '../version1/LoggingCommandableHttpClientV1';

export class LoggingClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-logging', 'factory', 'default', 'default', '1.0');
	public static DirectLoggerDescriptor = new Descriptor('service-logging', 'logger', 'direct', 'default', '1.0');
	public static HttpLoggerDescriptor = new Descriptor('service-logging', 'logger', 'commandable-http', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('service-logging', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-logging', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-logging', 'client', 'commandable-http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(LoggingClientFactory.DirectLoggerDescriptor, DirectLogger);
		this.registerAsType(LoggingClientFactory.HttpLoggerDescriptor, CommandableHttpLogger);

		this.registerAsType(LoggingClientFactory.NullClientV1Descriptor, LoggingNullClientV1);
		this.registerAsType(LoggingClientFactory.DirectClientV1Descriptor, LoggingDirectClientV1);
		this.registerAsType(LoggingClientFactory.HttpClientV1Descriptor, LoggingCommandableHttpClientV1);
	}
	
}
