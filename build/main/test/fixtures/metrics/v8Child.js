"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../../../src/features/metrics");
const metric = new metrics_1.default();
metric.init({ v8: 'all' }, true);
process.on('SIGINT', function () {
    metric.destroy();
});
setTimeout(function () {
    global.gc();
}, 1000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjhDaGlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rlc3QvZml4dHVyZXMvbWV0cmljcy92OENoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkRBQWtEO0FBRWxELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sRUFBRSxDQUFBO0FBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUUsS0FBSyxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFFOUIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ2xCLENBQUMsQ0FBQyxDQUFBO0FBRUYsVUFBVSxDQUFDO0lBQ1QsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFBO0FBQ2IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBIn0=