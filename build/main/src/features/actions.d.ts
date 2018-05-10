import { Feature } from './featureTypes';
export default class ActionsFeature implements Feature {
    private transport;
    private actionsService;
    constructor();
    init(conf?: any, force?: any): Object;
    destroy(): void;
    action(actionName: any, opts?: any, fn?: any): false | void;
    scopedAction(actionName: any, fn: any): false | void;
    private check(actionName, fn);
}
