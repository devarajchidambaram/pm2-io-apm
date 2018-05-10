import { Feature } from './featureTypes';
export default class Events implements Feature {
    private transport;
    constructor();
    init(): Promise<Object>;
    emit(name: any, data: any): false | void;
}
