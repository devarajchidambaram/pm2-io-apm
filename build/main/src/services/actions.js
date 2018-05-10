"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const eventLoopInspector_1 = require("../actions/eventLoopInspector");
const profilingHeap_1 = require("../actions/profilingHeap");
const profilingCpu_1 = require("../actions/profilingCpu");
const metricConfig_1 = require("../utils/metricConfig");
debug_1.default('axm:actionsService');
class ActionsService {
    constructor(actionsFeature) {
        this.defaultConf = {
            profilingCpu: true,
            profilingHeap: true
        };
        this.services = new Map();
        this.services.set('eventLoopDump', new eventLoopInspector_1.default(actionsFeature));
        this.services.set('profilingCpu', new profilingCpu_1.default(actionsFeature));
        this.services.set('profilingHeap', new profilingHeap_1.default(actionsFeature));
    }
    init(config, force) {
        if (!force) {
            config = metricConfig_1.default.getConfig(config, this.defaultConf);
        }
        // init actions only if they are enabled in config
        for (let property in config) {
            if (config.hasOwnProperty(property) && config[property] !== false) {
                if (!this.services.has(property)) {
                    console.error(`Action ${property} does not exist`);
                    continue;
                }
                this.services.get(property).init();
            }
        }
    }
    destroy() {
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
exports.default = ActionsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQXlCO0FBRXpCLHNFQUE4RDtBQUM5RCw0REFBMEQ7QUFDMUQsMERBQXdEO0FBQ3hELHdEQUFnRDtBQUVoRCxlQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtBQUUzQjtJQVNFLFlBQWEsY0FBOEI7UUFQbkMsZ0JBQVcsR0FBRztZQUNwQixZQUFZLEVBQUUsSUFBSTtZQUNsQixhQUFhLEVBQUUsSUFBSTtTQUNwQixDQUFBO1FBS0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLDRCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksc0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSx1QkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFBO0lBQzdFLENBQUM7SUFFRCxJQUFJLENBQUUsTUFBTyxFQUFFLEtBQU07UUFFbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQzFEO1FBRUQsa0RBQWtEO1FBQ2xELEtBQUssSUFBSSxRQUFRLElBQUksTUFBTSxFQUFFO1lBQzNCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFO2dCQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxRQUFRLGlCQUFpQixDQUFDLENBQUE7b0JBQ2xELFNBQVE7aUJBQ1Q7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7YUFDbkM7U0FDRjtJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQzVELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTthQUNsQjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEdBQUcsQ0FBRSxJQUFZO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLGVBQUssQ0FBQyxXQUFXLElBQUksY0FBYyxDQUFDLENBQUE7WUFDcEMsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsQ0FBQztDQUNGO0FBbkRELGlDQW1EQyJ9