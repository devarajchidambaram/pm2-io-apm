"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const child_process_1 = require("child_process");
describe('EventLoopDelay', function () {
    this.timeout(7000);
    it('should send event loop delay', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/metrics/eventLoopDelayChild.js'));
        child.on('message', pck => {
            if (pck.type === 'axm:monitor' && pck.data['Loop delay'].value !== '0ms') {
                chai_1.expect(pck.data['Loop delay'].agg_type).to.equal('avg');
                chai_1.expect(pck.data['Loop delay'].historic).to.equal(true);
                chai_1.expect(pck.data['Loop delay'].type).to.equal('libuv/latency');
                chai_1.expect(pck.data['Loop delay'].unit).to.equal('ms');
                child.kill('SIGINT');
                child.on('exit', function () {
                    done();
                });
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRMb29wRGVsYXkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvbWV0cmljcy9ldmVudExvb3BEZWxheS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXFDO0FBQ3JDLGlCQUFjO0FBRWQsNkNBQXlDO0FBQ3pDLGlEQUEwQztBQUUxQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQixFQUFFLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQyxNQUFNLEtBQUssR0FBRyxvQkFBSSxDQUFDLGVBQVMsQ0FBQyxhQUFhLENBQUMseUNBQXlDLENBQUMsQ0FBQyxDQUFBO1FBRXRGLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBRXhCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxhQUFhLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUN4RSxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUN2RCxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUN0RCxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUM3RCxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUVsRCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUVwQixLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRTtvQkFDZixJQUFJLEVBQUUsQ0FBQTtnQkFDUixDQUFDLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=