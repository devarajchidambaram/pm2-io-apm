"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const serviceManager_1 = require("../serviceManager");
const semver = require("semver");
const json_1 = require("../utils/json");
class NotifyOptions {
}
exports.NotifyOptions = NotifyOptions;
exports.NotifyOptionsDefault = {
    level: 'fatal'
};
class NotifyFeature {
    constructor() {
        this.options = exports.NotifyOptionsDefault;
        this.levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];
        this.transport = serviceManager_1.ServiceManager.get('transport');
    }
    init(options) {
        if (options) {
            this.options = options;
        }
        if (process.env.CATCH_CONTEXT_ON_ERROR === 'true' && semver.satisfies(process.version, '< 8.0.0')) {
            console.warn(`Inspector is not available on node version ${process.version} !`);
        }
        if (process.env.CATCH_CONTEXT_ON_ERROR === 'true' && semver.satisfies(process.version, '>= 8.0.0')) {
            const NotifyInspector = require('./notifyInspector').default;
            NotifyInspector.catchAllDebugger(this.transport);
        }
        else {
            this.catchAll();
        }
        return {
            notifyError: this.notifyError
        };
    }
    notifyError(err, level) {
        if (!(err instanceof Error)) {
            console.error('You should use notify with an Error !!!');
            return -1;
        }
        if (!level || this.levels.indexOf(level) === -1) {
            return this.transport.send(err);
        }
        if (this.levels.indexOf(this.options.level) >= this.levels.indexOf(level)) {
            return this.transport.send(err);
        }
        return null;
    }
    catchAll(opts) {
        if (opts === undefined) {
            opts = { errors: true };
        }
        // Options.configureModule({
        //   error : opts.errors
        // });
        if (process.env.exec_mode === 'cluster_mode') {
            return false;
        }
        const self = this;
        function getUncaughtExceptionListener(listener) {
            return function uncaughtListener(err) {
                let error = err && err.stack ? err.stack : err;
                if (err && err.length) {
                    err._length = err.length;
                    delete err.length;
                }
                if (listener === 'unhandledRejection') {
                    console.log('You have triggered an unhandledRejection, you may have forgotten to catch a Promise rejection:');
                }
                console.error(error);
                let errObj;
                if (err) {
                    errObj = self._interpretError(err);
                }
                self.transport.send({
                    type: 'process:exception',
                    data: errObj !== undefined ? errObj : { message: 'No error but ' + listener + ' was caught!' }
                }, true);
                if (!process.listeners(listener).filter(function (listener) {
                    return listener !== uncaughtListener;
                }).length) {
                    if (listener === 'uncaughtException') {
                        process.exit(1);
                    }
                }
            };
        }
        if (opts.errors === true && util.inspect(process.listeners('uncaughtException')).length === 2) {
            process.once('uncaughtException', getUncaughtExceptionListener('uncaughtException'));
            process.once('unhandledRejection', getUncaughtExceptionListener('unhandledRejection'));
        }
        else if (opts.errors === false
            && util.inspect(process.listeners('uncaughtException')).length !== 2) {
            process.removeAllListeners('uncaughtException');
            process.removeAllListeners('unhandledRejection');
        }
    }
    _interpretError(err) {
        let sErr = {
            message: null,
            stack: null
        };
        if (err instanceof Error) {
            // Error object type processing
            sErr = err;
        }
        else {
            // JSON processing
            sErr.message = err;
            sErr.stack = err;
        }
        return json_1.default.jsonize(sErr);
    }
}
exports.NotifyFeature = NotifyFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL25vdGlmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE0QjtBQUc1QixzREFBa0Q7QUFDbEQsaUNBQWdDO0FBQ2hDLHdDQUFxQztBQUVyQztDQUVDO0FBRkQsc0NBRUM7QUFFWSxRQUFBLG9CQUFvQixHQUFHO0lBQ2xDLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQTtBQVdEO0lBTUU7UUFKUSxZQUFPLEdBQWtCLDRCQUFvQixDQUFBO1FBRTdDLFdBQU0sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBR2xGLElBQUksQ0FBQyxTQUFTLEdBQUcsK0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVELElBQUksQ0FBRSxPQUF1QjtRQUMzQixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFBO1NBQ3ZCO1FBRUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixLQUFLLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEVBQUU7WUFDakcsT0FBTyxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUE7U0FDaEY7UUFFRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEtBQUssTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtZQUNsRyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUE7WUFDNUQsZUFBZSxDQUFDLGdCQUFnQixDQUFDLElB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