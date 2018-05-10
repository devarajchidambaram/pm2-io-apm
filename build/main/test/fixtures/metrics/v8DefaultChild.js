"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../../../src/features/metrics");
const metric = new metrics_1.default();
metric.init({ v8: true }, true);
process.on('SIGINT', function () {
    metric.destroy();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjhEZWZhdWx0Q2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL21ldHJpY3MvdjhEZWZhdWx0Q2hpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyREFBa0Q7QUFFbEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBTSxFQUFFLENBQUE7QUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUU3QixPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDbEIsQ0FBQyxDQUFDLENBQUEifQ==