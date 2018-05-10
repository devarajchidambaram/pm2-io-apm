"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const child_process_1 = require("child_process");
describe('EventLoopHandlesRequests', function () {
    it('should send event loop handles and requests counter', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/metrics/eventLoopHandlesRequestsChild.js'));
        child.on('message', pck => {
            if (pck.type === 'axm:monitor') {
                chai_1.expect(pck.data['Active handles'].agg_type).to.equal('avg');
                chai_1.expect(pck.data['Active handles'].historic).to.equal(true);
                chai_1.expect(pck.data['Active handles'].type).to.equal('Active handles');
                child.kill('SIGINT');
                done();
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRMb29wSGFuZGxlc1JlcXVlc3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L21ldHJpY3MvZXZlbnRMb29wSGFuZGxlc1JlcXVlc3RzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBcUM7QUFDckMsaUJBQWM7QUFFZCw2Q0FBeUM7QUFDekMsaURBQTBDO0FBRzFDLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtJQUVuQyxFQUFFLENBQUMscURBQXFELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqRSxNQUFNLEtBQUssR0FBRyxvQkFBSSxDQUFDLGVBQVMsQ0FBQyxhQUFhLENBQUMsbURBQW1ELENBQUMsQ0FBQyxDQUFBO1FBRWhHLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBRXhCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7Z0JBQzlCLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDM0QsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMxRCxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtnQkFFbEUsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDcEIsSUFBSSxFQUFFLENBQUE7YUFDUDtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9