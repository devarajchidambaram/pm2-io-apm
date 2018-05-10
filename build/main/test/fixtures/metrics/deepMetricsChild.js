"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../../../src/features/metrics");
const metric = new metrics_1.default();
metric.init({ deepMetrics: 'all' }, true);
const httpModule = require('http');
const httpsModule = require('https');
// test http outbound
httpModule.get('http://keymetrics.io');
// test https outbound
httpsModule.get('https://keymetrics.io');
process.on('SIGINT', function () {
    metric.destroy();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1ldHJpY3NDaGlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rlc3QvZml4dHVyZXMvbWV0cmljcy9kZWVwTWV0cmljc0NoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkRBQWtEO0FBRWxELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sRUFBRSxDQUFBO0FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFFdkMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ2xDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUVwQyxxQkFBcUI7QUFDckIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3RDLHNCQUFzQjtBQUN0QixXQUFXLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7QUFFeEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ2xCLENBQUMsQ0FBQyxDQUFBIn0=