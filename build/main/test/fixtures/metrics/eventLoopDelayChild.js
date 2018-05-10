"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../../../src/features/metrics");
const metric = new metrics_1.default();
metric.init({ eventLoopDelay: true }, true);
process.on('SIGINT', function () {
    metric.destroy();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRMb29wRGVsYXlDaGlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rlc3QvZml4dHVyZXMvbWV0cmljcy9ldmVudExvb3BEZWxheUNoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQWtEO0FBRWxELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sRUFBRSxDQUFBO0FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxjQUFjLEVBQUUsSUFBSSxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFFekMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ2xCLENBQUMsQ0FBQyxDQUFBIn0=