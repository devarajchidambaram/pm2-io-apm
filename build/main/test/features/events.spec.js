"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const events_1 = require("../../src/features/events");
describe('EventsFeature', () => {
    describe('emit', () => {
        it('should emit an event', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/eventsChild.js'));
            child.on('message', res => {
                if (res.type === 'human:event') {
                    chai_1.expect(res.data.__name).to.equal('myEvent');
                    chai_1.expect(res.data.prop1).to.equal('value1');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should emit an event with non object data', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/eventsStringChild.js'));
            child.on('message', res => {
                if (res.type === 'human:event') {
                    chai_1.expect(res.data.__name).to.equal('myEvent');
                    chai_1.expect(res.data.data).to.equal('myValue');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should not emit event (no name or no data)', () => {
            const events = new events_1.default();
            events.init().then(() => {
                let res = events.emit(null, {});
                chai_1.expect(res).to.equal(undefined);
                res = events.emit('myEvent', null);
                chai_1.expect(res).to.equal(undefined);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2ZlYXR1cmVzL2V2ZW50cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQW9DO0FBQ3BDLCtCQUFxQztBQUNyQyxpQkFBYztBQUNkLDZDQUF5QztBQUN6QyxzREFBcUQ7QUFFckQsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7SUFDN0IsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7UUFFcEIsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEMsTUFBTSxLQUFLLEdBQUcsb0JBQUksQ0FBQyxlQUFTLENBQUMsYUFBYSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQTtZQUMvRSxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtvQkFDOUIsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDM0MsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDcEIsSUFBSSxFQUFFLENBQUE7aUJBQ1A7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLDJDQUEyQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkQsTUFBTSxLQUFLLEdBQUcsb0JBQUksQ0FBQyxlQUFTLENBQUMsYUFBYSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQTtZQUNyRixLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtvQkFDOUIsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDM0MsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtvQkFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDcEIsSUFBSSxFQUFFLENBQUE7aUJBQ1A7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFhLEVBQUUsQ0FBQTtZQUVsQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQy9CLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUUvQixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ2xDLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=