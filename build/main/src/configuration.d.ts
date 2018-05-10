export default class Configuration {
    private transport;
    constructor();
    configureModule(opts: any): void;
    findPackageJson(): string | null | undefined;
    init(conf: any, doNotTellPm2?: any): any;
    private getMain();
}
