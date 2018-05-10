"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const child_process_1 = require("child_process");
describe('HttpWrapper', function () {
    this.timeout(10000);
    it('should wrap http and send basic metric', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/metrics/httpWrapperChild.js'));
        child.on('message', pck => {
            if (pck.type === 'http:transaction') {
                chai_1.expect(pck.data.url).to.equal('/');
            }
            if (pck.type === 'axm:monitor' && pck.data.HTTP.value !== '0req/min') {
                chai_1.expect(pck.data.HTTP.type).to.equal('HTTP');
                chai_1.expect(pck.data.HTTP.agg_type).to.equal('avg');
                chai_1.expect(pck.data.HTTP.unit).to.equal('req/min');
                chai_1.expect(pck.data['pmx:http:latency'].type).to.equal('pmx:http:latency');
                chai_1.expect(pck.data['pmx:http:latency'].agg_type).to.equal('avg');
                chai_1.expect(pck.data['pmx:http:latency'].unit).to.equal('ms');
                child.kill('SIGINT');
                done();
            }
        });
    });
    it('should use tracing system', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/metrics/tracingChild.js'));
        let isAlive = true;
        child.on('message', pck => {
            if (pck.type === 'axm:trace') {
                chai_1.expect(pck.data.hasOwnProperty('projectId')).to.equal(true);
                chai_1.expect(pck.data.hasOwnProperty('traceId')).to.equal(true);
                chai_1.expect(pck.data.spans[0].name).to.equal('/');
                chai_1.expect(pck.data.spans[0].labels['http/method']).to.equal('GET');
                chai_1.expect(pck.data.spans[0].labels['http/path']).to.equal('/');
                chai_1.expect(pck.data.spans[0].labels['http/url']).to.equal('http://localhost/');
                chai_1.expect(pck.data.spans[0].labels['express/request.route.path']).to.equal('/');
                chai_1.expect(pck.data.spans[0].labels['http/status_code']).to.equal('200');
                if (isAlive) {
                    child.kill('SIGINT');
                    done();
                    isAlive = false;
                }
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9tZXRyaWNzL2h0dHAuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFxQztBQUNyQyxpQkFBYztBQUVkLDZDQUF5QztBQUN6QyxpREFBMEM7QUFFMUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25CLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BELE1BQU0sS0FBSyxHQUFHLG9CQUFJLENBQUMsZUFBUyxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUE7UUFFbkYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFFeEIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFFO2dCQUNuQyxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ25DO1lBRUQsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGFBQWEsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO2dCQUNwRSxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDM0MsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzlDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxF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