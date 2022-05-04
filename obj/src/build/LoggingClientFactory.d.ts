import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';
export declare class LoggingClientFactory extends Factory {
    static Descriptor: Descriptor;
    static DirectLoggerDescriptor: Descriptor;
    static HttpLoggerDescriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static HttpClientV1Descriptor: Descriptor;
    constructor();
}
