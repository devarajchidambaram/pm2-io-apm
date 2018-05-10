import { Feature } from './featureTypes';
export declare class NotifyOptions {
    level: string;
}
export declare const NotifyOptionsDefault: {
    level: string;
};
export interface ErrorMetadata {
    type: String;
    subtype: String;
    className: String;
    description: String;
    objectId: String;
    uncaught: Boolean;
}
export declare class NotifyFeature implements Feature {
    private options;
    private transport;
    private levels;
    constructor();
    init(options?: NotifyOptions): Object;
    notifyError(err: Error, level?: string): any;
    catchAll(opts?: any): Boolean | void;
    private _interpretError(err);
}
