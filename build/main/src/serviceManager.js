"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transport_1 = require("./utils/transport");
const services = {
    transport: new transport_1.default(),
    metricsMap: new Map()
};
if (require('semver').satisfies(process.version, '>= 8.0.0')) {
    services['inspector'] = require('./services/inspector');
}
class ServiceManager {
    static get(type) {
        return services[type];
    }
    static set(type, service) {
        services[type] = service;
    }
}
exports.ServiceManager = ServiceManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBeUM7QUFJekMsTUFBTSxRQUFRLEdBR1Y7SUFDRixTQUFTLEVBQUUsSUFBSSxtQkFBUyxFQUFFO0lBQzFCLFVBQVUsRUFBRSxJQUFJLEdBQUcsRUFBRTtDQUN0QixDQUFBO0FBRUQsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7SUFDNUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0NBQ3hEO0FBRUQ7SUFFUyxNQUFNLENBQUMsR0FBRyxDQUFFLElBQVk7UUFDN0IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxHQUFHLENBQUUsSUFBWSxFQUFFLE9BQU87UUFDdEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQTtJQUMxQixDQUFDO0NBQ0Y7QUFURCx3Q0FTQyJ9