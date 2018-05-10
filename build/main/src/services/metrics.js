"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const v8_1 = require("../metrics/v8");
const deepMetrics_1 = require("../metrics/deepMetrics");
const eventLoopDelay_1 = require("../metrics/eventLoopDelay");
const metricConfig_1 = require("../utils/metricConfig");
const eventLoopHandlesRequests_1 = require("../metrics/eventLoopHandlesRequests");
const transaction_1 = require("../metrics/transaction");
const network_1 = require("../metrics/network");
debug_1.default('axm:metricService');
class MetricsService {
    constructor(metricsFeature) {
        this.defaultConf = {
            eventLoopDelay: true,
            eventLoopActive: true,
            transaction: { http: true }
        };
        this.services = new Map();
        this.services.set('v8', new v8_1.default(metricsFeature));
        this.services.set('deepMetrics', new deepMetrics_1.default(metricsFeature));
        this.services.set('eventLoopDelay', new eventLoopDelay_1.default(metricsFeature));
        this.services.set('eventLoopActive', new eventLoopHandlesRequests_1.default(metricsFeature));
        this.services.set('transaction', new transaction_1.default(metricsFeature));
        this.services.set('network', new network_1.default(metricsFeature));
    }
    init(config, force) {
        if (!force) {
            config = metricConfig_1.default.getConfig(config, this.defaultConf);
        }
        // init metrics only if they are enabled in config
        for (let property in config) {
            if (config.hasOwnProperty(property) && config[property] !== false) {
                if (!this.services.has(property)) {
                    console.error(`Metric ${property} does not exist`);
                    continue;
                }
                const subConf = config[property];
                this.services.get(property).init(subConf);
            }
        }
    }
    destroyAll() {
        this.services.forEach((service, serviceName) => {
            if (service.destroy && typeof service.destroy === 'function') {
                service.destroy();
            }
        });
    }
    get(name) {
        if (!this.services.has(name)) {
            debug_1.default(`Service ${name} not found !`);
            return null;
        }
        return this.services.get(name);
    }
}
exports.default = MetricsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9tZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQXlCO0FBQ3pCLHNDQUE4QjtBQUU5Qix3REFBZ0Q7QUFDaEQsOERBQTREO0FBQzVELHdEQUFnRDtBQUNoRCxrRkFBZ0Y7QUFDaEYsd0RBQWdEO0FBQ2hELGdEQUE4QztBQUU5QyxlQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtBQUUxQjtJQVVFLFlBQWEsY0FBOEI7UUFObkMsZ0JBQVcsR0FBRztZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixlQUFlLEVBQUUsSUFBSTtZQUNyQixXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1NBQzVCLENBQUE7UUFHQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksWUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUkscUJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksd0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLGtDQUE4QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7UUFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUkscUJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLGlCQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUNqRSxDQUFDO0lBRUQsSUFBSSxDQUFFLE1BQU8sRUFBRSxLQUFNO1FBRW5CLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLEdBQUcsc0JBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUMxRDtRQUVELGtEQUFrRDtRQUNsRCxLQUFLLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRTtZQUMzQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsUUFBUSxpQkFBaUIsQ0FBQyxDQUFBO29CQUNsRCxTQUFRO2lCQUNUO2dCQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQzFDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQzlDLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUM1RCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7YUFDbEI7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxHQUFHLENBQUUsSUFBWTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixlQUFLLENBQUMsV0FBVyxJQUFJLGNBQWMsQ0FBQyxDQUFBO1lBQ3BDLE9BQU8sSUFBSSxDQUFBO1NBQ1o7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7Q0FDRjtBQXhERCxpQ0F3REMifQ==