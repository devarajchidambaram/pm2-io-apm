"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notify_1 = require("./features/notify");
const metrics_1 = require("./features/metrics");
const actions_1 = require("./features/actions");
const events_1 = require("./features/events");
const merge = require("deepmerge");
const configuration_1 = require("./configuration");
class PMX {
    constructor() {
        this.notifyFeature = new notify_1.NotifyFeature();
        this.metricsFeature = new metrics_1.default();
        this.actionsFeature = new actions_1.default();
        this.eventsFeature = new events_1.default();
    }
    init(config) {
        let notifyOptions = notify_1.NotifyOptionsDefault;
        let configMetrics = {};
        if (!config) {
            config = {};
        }
        if (config.level) {
            notifyOptions = {
                level: config.level
            };
        }
        if (config.metrics) {
            configMetrics = config.metrics;
        }
        this.backwardConfigConversion(config);
        this.notifyFeature.init(notifyOptions);
        this.metricsFeature.init(config.metrics);
        this.actionsFeature.init(config.actions);
        new configuration_1.default().init(config);
        return this;
    }
    destroy() {
        if (this.metricsFeature)
            this.metricsFeature.destroy();
        if (this.actionsFeature)
            this.actionsFeature.destroy();
    }
    notifyError(err, context) {
        let level = 'info';
        if (context && context.level) {
            level = context.level;
        }
        this.notifyFeature.notifyError(err, level);
    }
    metric(metrics) {
        const res = {};
        let allMetrics = [];
        if (!Array.isArray(metrics)) {
            allMetrics[0] = metrics;
        }
        else {
            allMetrics = metrics;
        }
        for (let i = 0; i < allMetrics.length; i++) {
            const currentMetric = allMetrics[i];
            if (!currentMetric || !currentMetric.hasOwnProperty('name') || !currentMetric.hasOwnProperty('type')) {
                console.warn(`Metric can't be initialized : missing some properties !`);
                console.warn('name => required');
                console.warn('type => required');
                console.warn('id => optional');
                console.warn('unit => optional');
                console.warn('value => optional');
                console.warn('historic => optional');
                console.warn('agg_type => optional');
                console.warn('measurement => optional');
                continue;
            }
            // escape spaces and special characters from metric's name
            const metricKey = currentMetric.name.replace(/ /g, '_').replace(/[^\w\s]/gi, '');
            const type = currentMetric.type;
            currentMetric.type = currentMetric.id;
            delete currentMetric.id;
            if (typeof this.metricsFeature[type] !== 'function') {
                console.warn(`Metric ${currentMetric.name} cant be initialized : unknown type ${type} !`);
                continue;
            }
            res[metricKey] = this.metricsFeature[type](currentMetric);
        }
        return res;
    }
    action(name, opts, fn) {
        if (typeof name === 'object') {
            opts = name.opts;
            fn = name.action;
            name = name.name;
        }
        this.actionsFeature.action(name, opts, fn);
    }
    scopedAction(name, fn) {
        this.actionsFeature.scopedAction(name, fn);
    }
    transpose(variableName, reporter) {
        this.metricsFeature.transpose(variableName, reporter);
    }
    onExit(callback) {
        if (callback && typeof callback === 'function') {
            const onExit = require('signal-exit');
            return onExit(callback());
        }
    }
    // -----------------------------------------------------------
    // Retro compatibility
    // -----------------------------------------------------------
    probe() {
        console.warn('Deprecated : you should use pmx instead of pmx.probe() !');
        return {
            histogram: (histogram) => {
                return this.genericBackwardConversion(histogram, 'histogram');
            },
            meter: (meter) => {
                return this.genericBackwardConversion(meter, 'meter');
            },
            metric: (metric) => {
                return this.genericBackwardConversion(metric, 'metric');
            },
            counter: (counter) => {
                return this.genericBackwardConversion(counter, 'counter');
            }
        };
    }
    emit(name, data) {
        console.warn('Deprecated : emit() method will be removed in next major release !');
        this.eventsFeature.emit(name, data);
    }
    notify(notification) {
        console.warn('Deprecated : you should use pmx.notifyError() !');
        if (!(notification instanceof Error)) {
            notification = new Error(notification);
        }
        this.notifyFeature.notifyError(notification);
    }
    initModule(opts, cb) {
        if (!opts)
            opts = {};
        opts = merge({
            alert_enabled: true,
            widget: {}
        }, opts);
        opts.widget = merge({
            type: 'generic',
            logo: 'https://app.keymetrics.io/img/logo/keymetrics-300.png',
            theme: ['#111111', '#1B2228', '#807C7C', '#807C7C']
        }, opts.widget);
        opts.isModule = true;
        opts = new configuration_1.default().init(opts);
        if (cb && typeof (cb) === 'function')
            return cb(null, opts);
        return opts;
    }
    genericBackwardConversion(object, type) {
        if (typeof object !== 'object') {
            console.error('Parameter should be an object');
            return null;
        }
        object.type = type;
        return this.metric(object)[object.name];
    }
    backwardConfigConversion(config) {
        // ------------------------------------------
        // Network
        // ------------------------------------------
        if (config.hasOwnProperty('network') || config.hasOwnProperty('ports')) {
            const networkConf = {};
            if (config.hasOwnProperty('network')) {
                networkConf.traffic = Boolean(config.network);
                delete config.network;
            }
            if (config.hasOwnProperty('ports')) {
                networkConf.ports = Boolean(config.ports);
                delete config.ports;
            }
            this.initMetricsConf(config);
            config.metrics.network = networkConf;
        }
        // ------------------------------------------
        // V8
        // ------------------------------------------
        if (config.hasOwnProperty('v8')) {
            this.initMetricsConf(config);
            config.metrics.v8 = config.v8;
            delete config.v8;
        }
        // ------------------------------------------
        // transactions
        // ------------------------------------------
        if (config.hasOwnProperty('transactions') || config.hasOwnProperty('http')) {
            this.initMetricsConf(config);
            config.metrics.transaction = {};
            if (config.hasOwnProperty('transactions')) {
                config.metrics.transaction.tracing = config.transactions;
                delete config.transactions;
            }
            if (config.hasOwnProperty('http')) {
                config.metrics.transaction.http = config.http;
                delete config.http;
            }
        }
        // ------------------------------------------
        // Deep metrics
        // ------------------------------------------
        if (config.hasOwnProperty('deep_metrics')) {
            this.initMetricsConf(config);
            config.metrics.deepMetrics = config.deep_metrics;
            delete config.deep_metrics;
        }
        // ------------------------------------------
        // Event Loop action
        // ------------------------------------------
        if (config.hasOwnProperty('event_loop_dump')) {
            this.initActionsConf(config);
            config.actions.eventLoopDump = config.event_loop_dump;
            delete config.event_loop_dump;
        }
        // ------------------------------------------
        // Profiling action
        // ------------------------------------------
        if (config.hasOwnProperty('profiling')) {
            this.initActionsConf(config);
            config.actions = {
                profilingCpu: config.profiling,
                profilingHeap: config.profiling
            };
            delete config.profiling;
        }
    }
    initMetricsConf(config) {
        if (!config.metrics) {
            config.metrics = {};
        }
    }
    initActionsConf(config) {
        if (!config.actions) {
            config.actions = {};
        }
    }
}
module.exports = new PMX();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBc0Y7QUFDdEYsZ0RBQStDO0FBQy9DLGdEQUErQztBQUMvQyw4Q0FBNEM7QUFFNUMsbUNBQWtDO0FBQ2xDLG1EQUEyQztBQUUzQztJQU9FO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHNCQUFhLEVBQUUsQ0FBQTtRQUN4QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksaUJBQWMsRUFBRSxDQUFBO1FBQzFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQkFBYyxFQUFFLENBQUE7UUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGdCQUFZLEVBQUUsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsSUFBSSxDQUFFLE1BQU87UUFDWCxJQUFJLGFBQWEsR0FBa0IsNkJBQW9CLENBQUE7UUFDdkQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFBO1FBRXRCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLEdBQUcsRUFBRSxDQUFBO1NBQ1o7UUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsYUFBYSxHQUFHO2dCQUNkLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSzthQUNwQixDQUFBO1NBQ0Y7UUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUE7U0FDL0I7UUFFRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBRXhDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxP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