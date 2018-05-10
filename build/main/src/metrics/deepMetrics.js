"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metricConfig_1 = require("../utils/metricConfig");
const deepMetricsTracer_1 = require("./deepMetricsTracer");
const deepmetrics = require("deep-metrics");
const debug_1 = require("debug");
debug_1.default('axm:deepMetrics');
class DeepMetrics {
    constructor(metricFeature) {
        this.allPossibleMetrics = {};
        this.defaultConf = {
            mongo: true,
            mysql: true,
            mqtt: true,
            socketio: true,
            redis: true,
            http: true,
            https: true,
            'http-outbound': true,
            'https-outbound': true
        };
        this.metricFeature = metricFeature;
        deepmetrics.start();
        // instantiate all metrics
        for (let probeName in this.defaultConf) {
            if (this.defaultConf.hasOwnProperty(probeName)) {
                this.allPossibleMetrics[probeName] = new deepMetricsTracer_1.default(this.metricFeature, deepmetrics.ee, probeName);
            }
        }
    }
    init(config) {
        config = metricConfig_1.default.getConfig(config, this.defaultConf);
        // initialize only metrics found in config
        for (let probeName in this.allPossibleMetrics) {
            if (this.allPossibleMetrics.hasOwnProperty(probeName) && (config === 'all' || config[probeName] === true)) {
                this.allPossibleMetrics[probeName].init();
            }
        }
    }
    destroy() {
        deepmetrics.stop();
        // clean children
        for (let probeName in this.allPossibleMetrics) {
            if (this.allPossibleMetrics.hasOwnProperty(probeName)) {
                this.allPossibleMetrics[probeName].destroy();
            }
        }
        this.allPossibleMetrics = {};
        debug_1.default('Deep metrics detroyed !');
    }
}
exports.default = DeepMetrics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1ldHJpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWV0cmljcy9kZWVwTWV0cmljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHdEQUFnRDtBQUNoRCwyREFBbUQ7QUFDbkQsNENBQTJDO0FBRTNDLGlDQUF5QjtBQUN6QixlQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUV4QjtJQWlCRSxZQUFhLGFBQTZCO1FBZGxDLHVCQUFrQixHQUFHLEVBQUUsQ0FBQTtRQUV2QixnQkFBVyxHQUFHO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsZUFBZSxFQUFFLElBQUk7WUFDckIsZ0JBQWdCLEVBQUUsSUFBSTtTQUN2QixDQUFBO1FBR0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7UUFFbEMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBRW5CLDBCQUEwQjtRQUMxQixLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksMkJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFBO2FBQzFHO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFFLE1BQXNCO1FBQzFCLE1BQU0sR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRXpELDBDQUEwQztRQUMxQyxLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUM3QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDekcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO2FBQzFDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUVMLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUVsQixpQkFBaUI7UUFDakIsS0FBSyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDN0MsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7YUFDN0M7U0FDRjtRQUVELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUE7UUFDNUIsZUFBSyxDQUFDLHlCQUF5QixDQUFDLENBQUE7SUFDbEMsQ0FBQztDQUNGO0FBdkRELDhCQXVEQyJ9