"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meter_1 = require("../utils/metrics/meter");
const counter_1 = require("../utils/metrics/counter");
const histogram_1 = require("../utils/metrics/histogram");
const serviceManager_1 = require("../serviceManager");
const constants_1 = require("../constants");
const metrics_1 = require("../services/metrics");
class MetricsFeature {
    constructor() {
        this._var = new Map();
        this.defaultAggregation = 'avg';
        this._started = false;
        this._alreadySentData = [];
        this.AVAILABLE_MEASUREMENTS = [
            'min',
            'max',
            'sum',
            'count',
            'variance',
            'mean',
            'stddev',
            'median',
            'p75',
            'p95',
            'p99',
            'p999'
        ];
        this.transport = serviceManager_1.ServiceManager.get('transport');
        this._var = serviceManager_1.ServiceManager.get('metricsMap');
        serviceManager_1.ServiceManager.set('metricService', new metrics_1.default(this));
        this.metricService = serviceManager_1.ServiceManager.get('metricService');
    }
    init(config, force) {
        if (this._started === false) {
            this._started = true;
            const self = this;
            this.timer = setInterval(function () {
                const data = self._cookData(self._getVar());
                // don't send empty data
                if (Object.keys(data).length !== 0) {
                    self.transport.send({
                        type: 'axm:monitor',
                        data: data
                    });
                }
            }, constants_1.default.METRIC_INTERVAL);
        }
        this.metricService.init(config, force);
        return {
            histogram: this.histogram,
            meter: this.meter,
            counter: this.counter,
            metric: this.metric
        };
    }
    transpose(variableName, reporter) {
        if (typeof variableName === 'object') {
            reporter = variableName.data;
            variableName = variableName.name;
        }
        if (typeof reporter !== 'function') {
            return console.error('[PMX] reporter is not a function');
        }
        this._var.set(variableName, {
            value: reporter
        });
    }
    meter(opts) {
        if (!opts.name) {
            return console.error('[Probe][Meter] Name not defined');
        }
        opts.unit = opts.unit || '';
        const meter = new meter_1.default(opts);
        this._var.set(opts.name, {
            value: function () {
                return meter.val() + `${opts.unit}`;
            },
            type: opts.type || opts.name,
            historic: this._historicEnabled(opts.historic),
            agg_type: opts.agg_type || this.defaultAggregation,
            unit: opts.unit
        });
        return meter;
    }
    counter(opts) {
        if (!opts.name) {
            return console.error('[Probe][Counter] Name not defined');
        }
        const counter = new counter_1.default(opts);
        this._var.set(opts.name, {
            value: function () { return counter.val(); },
            type: opts.type || opts.name,
            historic: this._historicEnabled(opts.historic),
            agg_type: opts.agg_type || this.defaultAggregation,
            unit: opts.unit
        });
        return counter;
    }
    histogram(opts) {
        if (!opts.name) {
            return console.error('[Probe][Histogram] Name not defined');
        }
        opts.measurement = opts.measurement || 'mean';
        opts.unit = opts.unit || '';
        if (this.AVAILABLE_MEASUREMENTS.indexOf(opts.measurement) === -1) {
            return console.error('[Probe][Histogram] Measure type %s does not exists', opts.measurement);
        }
        const histogram = new histogram_1.default(opts);
        this._var.set(opts.name, {
            value: function () {
                return (Math.round(histogram.val() * 100) / 100) + `${opts.unit}`;
            },
            type: opts.type || opts.name,
            historic: this._historicEnabled(opts.historic),
            agg_type: opts.agg_type || this.defaultAggregation,
            unit: opts.unit
        });
        return histogram;
    }
    metric(opts) {
        if (!opts.name) {
            return console.error('[Probe][Metric] Name not defined');
        }
        this._var.set(opts.name, {
            value: opts.value || 0,
            type: opts.type || opts.name,
            historic: this._historicEnabled(opts.historic),
            agg_type: opts.agg_type || this.defaultAggregation,
            unit: opts.unit
        });
        const self = this;
        return {
            val: function () {
                let value = self._var.get(opts.name).value;
                if (typeof (value) === 'function') {
                    value = value();
                }
                return value;
            },
            set: function (dt) {
                self._var.get(opts.name).value = dt;
            }
        };
    }
    deleteMetric(name) {
        this._var.delete(name);
        this._alreadySentData.splice(this._alreadySentData.indexOf(name), 1);
    }
    destroy() {
        clearInterval(this.timer);
        this._getVar().clear();
        this._started = false;
        this.metricService.destroyAll();
    }
    /** -----------------------------------------
     * Private Methods
     * ------------------------------------------
     */
    /**
     * Check if metric is historic or not
     *
     * @param historic
     * @returns {boolean}
     * @private
     */
    _historicEnabled(historic) {
        if (historic === false) {
            return false;
        }
        if (typeof (historic) === 'undefined') {
            return true;
        }
        return true;
    }
    /**
     * Only for tests
     *
     * @returns {Object}
     */
    _getVar() {
        return this._var;
    }
    /**
     * Data that will be sent to Keymetrics
     */
    _cookData(data) {
        const cookedData = {};
        const self = this;
        data.forEach(function (probe, probeName) {
            if (typeof (data.get(probeName).value) === 'undefined') {
                return false;
            }
            const value = self._getValue(data.get(probeName).value);
            // do not send data if this is always equal to 0
            // probably an initialized metric which is not "active"
            if ((self._alreadySentData.indexOf(probeName) === -1 && value !== 0) ||
                self._alreadySentData.indexOf(probeName) > -1) {
                if (self._alreadySentData.indexOf(probeName) === -1) {
                    self._alreadySentData.push(probeName);
                }
                cookedData[probeName] = {
                    value: value
                };
                /**
                 * Attach aggregation mode
                 */
                if (data.get(probeName).agg_type &&
                    data.get(probeName).agg_type !== 'none') {
                    cookedData[probeName].agg_type = data.get(probeName).agg_type;
                }
                cookedData[probeName].historic = data.get(probeName).historic;
                cookedData[probeName].type = data.get(probeName).type;
                cookedData[probeName].unit = data.get(probeName).unit;
            }
        });
        return cookedData;
    }
    _getValue(value) {
        if (typeof (value) === 'function') {
            return value();
        }
        return value;
    }
}
exports.default = MetricsFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mZWF0dXJlcy9tZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esa0RBQTBDO0FBQzFDLHNEQUE4QztBQUM5QywwREFBa0Q7QUFDbEQsc0RBQWtEO0FBRWxELDRDQUFvQztBQUNwQyxpREFBZ0Q7QUFFaEQ7SUF3QkU7UUF0QlEsU0FBSSxHQUFxQixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2xDLHVCQUFrQixHQUFXLEtBQUssQ0FBQTtRQUNsQyxhQUFRLEdBQVksS0FBSyxDQUFBO1FBQ3pCLHFCQUFnQixHQUFrQixFQUFFLENBQUE7UUFJcEMsMkJBQXNCLEdBQWtCO1lBQzlDLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLE9BQU87WUFDUCxVQUFVO1lBQ1YsTUFBTTtZQUNOLFFBQVE7WUFDUixRQUFRO1lBQ1IsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsTUFBTTtTQUNQLENBQUE7UUFHQyxJQUFJLENBQUMsU0FBUyxHQUFHLCtCQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsK0JBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDNUMsK0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksaUJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQzdELElBQUksQ0FBQyxhQUFhLEdBQUcsK0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVELElBQUksQ0FBRSxNQUFPLEVBQUUsS0FBTTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1lBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQTtZQUVqQixJQUFJ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