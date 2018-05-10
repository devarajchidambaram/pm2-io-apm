"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const metrics_1 = require("../../src/services/metrics");
const metrics_2 = require("../../src/features/metrics");
const v8_1 = require("../../src/metrics/v8");
const eventLoopDelay_1 = require("../../src/metrics/eventLoopDelay");
describe('MetricsService', () => {
    describe('init', () => {
        it('Should not fail if unknown service is found in conf', () => {
            const metricFeature = new metrics_2.default();
            const service = new metrics_1.default(metricFeature);
            service.init({
                v8: true,
                toto: true,
                transaction: false
            });
            chai_1.expect(service.get('v8') instanceof v8_1.default).to.equal(true);
            chai_1.expect(service.get('eventLoopDelay') instanceof eventLoopDelay_1.default).to.equal(true);
            chai_1.expect(service.get('toto')).to.equal(null);
            service.destroyAll();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9zZXJ2aWNlcy9tZXRyaWNzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBNkI7QUFFN0Isd0RBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCw2Q0FBMkM7QUFDM0MscUVBQW1FO0FBRW5FLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7SUFFOUIsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7UUFDcEIsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEdBQUcsRUFBRTtZQUM3RCxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFjLEVBQUUsQ0FBQTtZQUMxQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFjLENBQUMsYUFBYSxDQUFDLENBQUE7WUFFakQsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDWCxFQUFFLEVBQUUsSUFBSTtnQkFDUixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUE7WUFFRixhQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxZQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVELGFBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksd0JBQW9CLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3BGLGFBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUUxQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDdEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=