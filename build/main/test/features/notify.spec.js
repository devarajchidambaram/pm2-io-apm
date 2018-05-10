"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const notify_1 = require("../../src/features/notify");
describe('Notify', () => {
    describe('notify', () => {
        it('should send a notification', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/notifyChild.js'));
            child.on('message', msg => {
                chai_1.expect(msg).to.equal('test');
                done();
            });
        });
        it('should send a notification for specific level', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/notifyChildLevel.js'));
            let count = 0;
            child.on('message', msg => {
                count++;
                if (msg === 'info') {
                    chai_1.assert.fail();
                }
                else {
                    chai_1.expect(msg === 'warn' || msg === 'error' || msg === 'does not exist').to.equal(true);
                }
                if (count === 3) {
                    done();
                }
            });
        });
        it('should return if argument is not an error', () => {
            const notify = new notify_1.NotifyFeature();
            notify.init();
            const msg = 'test';
            const res = notify.notifyError(msg);
            chai_1.expect(res).to.equal(-1);
        });
    });
    describe('catchAll', () => {
        it('should catch exception', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/catchAllChild.js'));
            child.on('message', msg => {
                chai_1.expect(msg.type).to.equal('process:exception');
                chai_1.expect(msg.data.message).to.equal('test');
                done();
            });
        });
    });
    describe('catchAll with v8 debugger', () => {
        it('should catch exception', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/catchAllInspectorChild.js'), [], {
                env: Object.assign(process.env, {
                    CATCH_CONTEXT_ON_ERROR: 'true'
                })
            });
            child.on('message', msg => {
                chai_1.expect(msg.type).to.equal('process:exception');
                chai_1.expect(msg.data.message).to.equal('test');
                child.kill('SIGINT');
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2ZlYXR1cmVzL25vdGlmeS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQW9DO0FBQ3BDLCtCQUFxQztBQUNyQyxpQkFBYztBQUNkLDZDQUF5QztBQUN6QyxzREFBeUQ7QUFFekQsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7SUFDdEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDdEIsRUFBRSxDQUFDLDRCQUE0QixFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDeEMsTUFBTSxLQUFLLEdBQUcsb0JBQUksQ0FBQyxlQUFTLENBQUMsYUFBYSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQTtZQUMvRSxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsYUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQzVCLElBQUksRUFBRSxDQUFBO1lBQ1IsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNELE1BQU0sS0FBSyxHQUFHLG9CQUFJLENBQUMsZUFBUyxDQUFDLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLENBQUE7WUFDcEYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLEtBQUssRUFBRSxDQUFBO2dCQUVQLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtvQkFDbEIsYUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO2lCQUNkO3FCQUFNO29CQUNMLGFBQU0sQ0FBQyxHQUFHLEtBQUssTUFBTSxJ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