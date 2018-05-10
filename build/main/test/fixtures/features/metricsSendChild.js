"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../../../src/features/metrics");
const counter_1 = require("../../../src/utils/metrics/counter");
const metrics = new metrics_1.default();
metrics.init();
const counter = metrics.counter({ name: 'testSend' });
if (counter instanceof counter_1.default) {
    counter.inc();
}
process.on('SIGINT', function () {
    metrics.destroy();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljc1NlbmRDaGlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rlc3QvZml4dHVyZXMvZmVhdHVyZXMvbWV0cmljc1NlbmRDaGlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUFrRDtBQUVsRCxnRUFBd0Q7QUFFeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTSxFQUFFLENBQUE7QUFDNUIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO0FBQ2QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFBO0FBRW5ELElBQUksT0FBTyxZQUFZLGlCQUFPLEVBQUU7SUFDOUIsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFBO0NBQ2Q7QUFFRCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDbkIsQ0FBQyxDQUFDLENBQUEifQ==