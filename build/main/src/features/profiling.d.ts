import { Feature } from './featureTypes';
export default class ProfilingFeature implements Feature {
    private configurationModule;
    private profilings;
    constructor();
    init(forceFallback?: boolean): any;
    destroy(): void;
}
