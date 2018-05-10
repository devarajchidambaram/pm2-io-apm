"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const child_process_1 = require("child_process");
describe('DeepMetrics', function () {
    this.timeout(10000);
    it('should send info about all metrics', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/metrics/deepMetricsChild.js'));
        child.on('message', pck => {
            if (pck.type === 'axm:monitor') {
                chai_1.expect(pck.data['HTTP out: Response time'].agg_type).to.equal('avg');
                chai_1.expect(pck.data['HTTP out: Response time'].historic).to.equal(true);
                chai_1.expect(pck.data['HTTP out: Response time'].type).to.equal('http/outbound/latency');
                chai_1.expect(pck.data['HTTP out: Response time'].unit).to.equal('ms');
                chai_1.expect(pck.data['HTTP out: Throughput'].agg_type).to.equal('avg');
                chai_1.expect(pck.data['HTTP out: Throughput'].historic).to.equal(true);
                chai_1.expect(pck.data['HTTP out: Throughput'].type).to.equal('http/outbound/throughput');
                chai_1.expect(pck.data['HTTP out: Throughput'].unit).to.equal('req/min');
                child.kill('SIGINT');
                done();
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1ldHJpY3Muc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvbWV0cmljcy9kZWVwTWV0cmljcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXFDO0FBQ3JDLGlCQUFjO0FBRWQsNkNBQXlDO0FBQ3pDLGlEQUEwQztBQUUxQyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkIsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxLQUFLLEdBQUcsb0JBQUksQ0FBQyxlQUFTLENBQUMsYUFBYSxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQTtRQUVuRixLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUV4QixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUM5QixhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BFLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbkUsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUE7Z0JBQ2xGLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFFL0QsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNqRSxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2hFLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO2dCQUNsRixhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBRWpFLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3BCLElBQUksRUFBRSxDQUFBO2FBQ1A7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==