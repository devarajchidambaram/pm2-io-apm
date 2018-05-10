import MetricsFeature from '../features/metrics';
import MetricsInterface from './metricsInterface';
export default class Transaction implements MetricsInterface {
    private transport;
    private metricFeature;
    private configurationModule;
    private tracer;
    private defaultConf;
    constructor(metricFeature: MetricsFeature);
    init(config?: any): void;
    destroy(): void;
    tracing(opts: any): void;
    http(opts: any): void;
}
