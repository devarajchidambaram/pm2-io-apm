"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../fixtures/utils");
const chai_1 = require("chai");
require("mocha");
const child_process_1 = require("child_process");
describe('Transport', () => {
    it('should not send cause no process.send function', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/utils/transportNoSendChild.js'));
        child.on('data', msg => {
            chai_1.expect(msg).to.equal(-1);
            done();
        });
        child.on('exit', () => {
            done();
        });
    });
    it('should receive data', (done) => {
        const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/utils/transportChild.js'));
        child.on('message', msg => {
            chai_1.expect(msg).to.equal('');
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L3V0aWxzL3RyYW5zcG9ydC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQXlDO0FBQ3pDLCtCQUE2QjtBQUU3QixpQkFBYztBQUVkLGlEQUFvQztBQUVwQyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUV6QixFQUFFLENBQUMsZ0RBQWdELEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM1RCxNQUFNLEtBQUssR0FBRyxvQkFBSSxDQUFDLGVBQVMsQ0FBQyxhQUFhLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFBO1FBQ3JGLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDeEIsSUFBSSxFQUFFLENBQUE7UUFDUixDQUFDLENBQUMsQ0FBQTtRQUNGLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNwQixJQUFJLEVBQUUsQ0FBQTtRQUNSLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqQyxNQUFNLEtBQUssR0FBRyxvQkFBSSxDQUFDLGVBQVMsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFBO1FBRS9FLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3hCLElBQUksRUFBRSxDQUFBO1FBQ1IsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=