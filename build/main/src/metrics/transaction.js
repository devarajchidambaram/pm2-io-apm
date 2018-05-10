"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const proxy_1 = require("../utils/proxy");
const httpWrapper_1 = require("../wrapper/httpWrapper");
const debug_1 = require("debug");
debug_1.default('axm:tracing');
const serviceManager_1 = require("../serviceManager");
const configuration_1 = require("../configuration");
const metricConfig_1 = require("../utils/metricConfig");
class Transaction {
    constructor(metricFeature) {
        this.defaultConf = {
            http: true
        };
        this.metricFeature = metricFeature;
        this.transport = serviceManager_1.ServiceManager.get('transport');
        this.configurationModule = new configuration_1.default();
    }
    init(config) {
        config = metricConfig_1.default.getConfig(config, this.defaultConf);
        if (config.http) {
            const opts = typeof config.http === 'object' ? config.http : {};
            this.http(opts);
        }
        if (config.tracing) {
            const opts = typeof config.tracing === 'object' ? config.tracing : {};
            this.tracing(opts);
        }
    }
    destroy() {
        debug_1.default('Transaction destroyed !');
    }
    tracing(opts) {
        if (Array.isArray(opts.ignore_routes) && opts.ignore_routes.length > 0) {
            opts.ignoreFilter = { url: opts.ignore_routes };
        }
        // we should never enable tracing agent two time
        if (require('vxx').get().isActive())
            return;
        this.tracer = require('vxx').start(opts);
        this.configurationModule.configureModule({
            tracing_enabled: true
        });
        // broadcast to pm2 aggregator
        this.tracer.getBus().on('transaction', (data) => {
            this.transport.send({
                type: 'axm:trace',
                data: data
            });
        });
    }
    http(opts) {
        const Module = require('module');
        debug_1.default('Wrapping HTTP routes');
        if (Array.isArray(opts)) {
            const routes = JSON.parse(JSON.stringify(opts));
            opts = {
                http: true,
                http_latency: 200,
                http_code: 500,
                ignore_routes: routes
            };
        }
        opts = util['_extend']({
            http: true,
            http_latency: 200,
            http_code: 500,
            ignore_routes: []
        }, opts);
        const self = this;
        proxy_1.default.wrap(Module, '_load', (load) => {
            if (load.__axm_original) {
                debug_1.default('HTTP routes have already been wrapped before');
                this.configurationModule.configureModule({
                    latency: opts.http
                });
                if (opts.http === false) {
                    return function (file) {
                        return load.__axm_original.apply(this, arguments);
                    };
                }
                else {
                    return function (file) {
                        if (file === 'http' || file === 'https') {
                            return new httpWrapper_1.default(self.metricFeature).init(opts, load.__axm_original.apply(this, arguments));
                        }
                        else {
                            return load.__axm_original.apply(this, arguments);
                        }
                    };
                }
            }
            return function (file) {
                if (opts.http &&
                    (file === 'http' || file === 'https')) {
                    debug_1.default('http module being required');
                    self.configurationModule.configureModule({
                        latency: true
                    });
                    return new httpWrapper_1.default(self.metricFeature).init(opts, load.apply(this, arguments));
                }
                else {
                    return load.apply(this, arguments);
                }
            };
        });
    }
}
exports.default = Transaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWV0cmljcy90cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZCQUE0QjtBQUM1QiwwQ0FBa0M7QUFDbEMsd0RBQW1EO0FBQ25ELGlDQUF5QjtBQUN6QixlQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7QUFFcEIsc0RBQWtEO0FBQ2xELG9EQUE0QztBQUU1Qyx3REFBZ0Q7QUFFaEQ7SUFXRSxZQUFhLGFBQTZCO1FBSmxDLGdCQUFXLEdBQUc7WUFDcEIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFBO1FBR0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNoRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSx1QkFBYSxFQUFFLENBQUE7SUFDaEQsQ0FBQztJQUVELElBQUksQ0FBRSxNQUFPO1FBQ1gsTUFBTSxHQUFHLHNCQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFekQsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsTUFBTSxJQUFJLEdBQUcsT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDaEI7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1lBQ3JFLElBQUks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