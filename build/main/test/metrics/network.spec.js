"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const child_process_1 = require("child_process");
describe('Network', function () {
    this.timeout(5000);
    it('should send network data', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/metrics/networkChild.js'));
        child.on('message', pck => {
            if (pck.type === 'axm:monitor' && pck.data['Network Download'].value !== '0 B/sec') {
                chai_1.expect(pck.data.hasOwnProperty('Network Download')).to.equal(true);
                chai_1.expect(pck.data['Network Download'].agg_type).to.equal('sum');
                chai_1.expect(pck.data['Network Download'].historic).to.equal(true);
                chai_1.expect(pck.data['Network Download'].type).to.equal('Network Download');
                chai_1.expect(pck.data.hasOwnProperty('Network Upload')).to.equal(true);
                chai_1.expect(pck.data['Network Upload'].agg_type).to.equal('sum');
                chai_1.expect(pck.data['Network Upload'].historic).to.equal(true);
                chai_1.expect(pck.data['Network Upload'].type).to.equal('Network Upload');
                chai_1.expect(pck.data.hasOwnProperty('Open ports')).to.equal(true);
                chai_1.expect(pck.data['Open ports'].value).to.equal('3002');
                chai_1.expect(pck.data['Open ports'].agg_type).to.equal('avg');
                chai_1.expect(pck.data['Open ports'].historic).to.equal(true);
                chai_1.expect(pck.data['Open ports'].type).to.equal('Open ports');
                child.kill('SIGINT');
                done();
            }
        });
    });
    it('should only send upload data', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/metrics/networkWithoutDownloadChild.js'));
        child.on('message', pck => {
            if (pck.type === 'axm:monitor' && pck.data['Network Upload'].value !== '0 B/sec') {
                chai_1.expect(pck.data.hasOwnProperty('Network Download')).to.equal(false);
                chai_1.expect(pck.data.hasOwnProperty('Network Upload')).to.equal(true);
                chai_1.expect(pck.data['Network Upload'].agg_type).to.equal('sum');
                chai_1.expect(pck.data['Network Upload'].historic).to.equal(true);
                chai_1.expect(pck.data['Network Upload'].type).to.equal('Network Upload');
                chai_1.expect(pck.data.hasOwnProperty('Open ports')).to.equal(false);
                child.kill('SIGINT');
                done();
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9tZXRyaWNzL25ldHdvcmsuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFxQztBQUNyQyxpQkFBYztBQUVkLDZDQUF5QztBQUN6QyxpREFBMEM7QUFFMUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtJQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRWxCLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLG9CQUFJLENBQUMsZUFBUyxDQUFDLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUE7UUFFL0UsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFFeEIsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGFBQWEsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFFbEYsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNsRSxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzdELGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDNUQsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FB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