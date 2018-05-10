"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const actions_1 = require("../../src/services/actions");
const actions_2 = require("../../src/features/actions");
const eventLoopInspector_1 = require("../../src/actions/eventLoopInspector");
describe('ActionsService', () => {
    describe('init', () => {
        it('Should not fail if unknown service is found in conf', () => {
            const actionsFeature = new actions_2.default();
            const service = new actions_1.default(actionsFeature);
            service.init({
                toto: true,
                eventLoopDump: true,
                titi: false
            }, true);
            chai_1.expect(service.get('toto')).to.equal(null);
            chai_1.expect(service.get('titi')).to.equal(null);
            chai_1.expect(service.get('eventLoopDump') instanceof eventLoopInspector_1.default).to.equal(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9zZXJ2aWNlcy9hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBNkI7QUFFN0Isd0RBQXVEO0FBQ3ZELHdEQUF1RDtBQUN2RCw2RUFBcUU7QUFFckUsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUU5QixRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtRQUNwQixFQUFFLENBQUMscURBQXFELEVBQUUsR0FBRyxFQUFFO1lBQzdELE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQWMsRUFBRSxDQUFBO1lBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUVsRCxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLElBQUksRUFBRSxJQUFJO2dCQUNWLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixJQUFJLEVBQUUsS0FBSzthQUNaLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFUixhQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDMUMsYUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzFDLGFBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxZQUFZLDRCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuRixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==