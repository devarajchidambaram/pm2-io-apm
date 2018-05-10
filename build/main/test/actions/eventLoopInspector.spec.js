"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../fixtures/utils");
const chai_1 = require("chai");
const child_process_1 = require("child_process");
const eventLoopInspector_1 = require("../../src/actions/eventLoopInspector");
const actions_1 = require("../../src/features/actions");
const MODULE = 'event-loop-inspector';
describe('EventLoopInspector', function () {
    this.timeout(50000);
    describe('Event loop inspector module', function () {
        before(function (done) {
            child_process_1.exec('npm install ' + MODULE, function (err) {
                chai_1.expect(err).to.equal(null);
                setTimeout(done, 1000);
            });
        });
        after(function (done) {
            child_process_1.exec('npm uninstall ' + MODULE, done);
        });
        it('should get event loop data', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/actions/eventLoopInspectorChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.return.success).to.equal(true);
                    chai_1.expect(typeof res.data.return.dump).to.equal('object');
                    child.kill('SIGINT');
                    done();
                }
            });
            setTimeout(function () {
                child.send('km:event-loop-dump');
            }, 2000);
        });
    });
    describe('Event loop inspector module not install', function () {
        before(function (done) {
            child_process_1.exec('npm uninstall ' + MODULE, done);
        });
        it('should return false cause module is not present', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const action = new actions_1.default();
            action.init();
            const eventLoopInspector = new eventLoopInspector_1.default(action);
            yield eventLoopInspector.init().catch((e) => {
                chai_1.expect(e.message).to.equal('event-loop-inspector not found');
            });
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRMb29wSW5zcGVjdG9yLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2FjdGlvbnMvZXZlbnRMb29wSW5zcGVjdG9yLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlDO0FBQ3pDLCtCQUE2QjtBQUM3QixpREFBMEM7QUFDMUMsNkVBQTREO0FBQzVELHdEQUErQztBQUUvQyxNQUFNLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQTtBQUVyQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7SUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVuQixRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFDdEMsTUFBTSxDQUFDLFVBQVUsSUFBSTtZQUNuQixvQkFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLEVBQUUsVUFBVSxHQUFHO2dCQUN6QyxhQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDMUIsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUN4QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsS0FBSyxDQUFDLFVBQVUsSUFBSTtZQUNsQixvQkFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN2QyxDQUFDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hDLE1BQU0sS0FBSyxHQUFHLG9CQUFJLENBQUMsZUFBUyxDQUFDLGFBQWEsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDLENBQUE7WUFFMUYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBRXhCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7b0JBRTVCLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUM5QyxhQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUV0RCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUNwQixJQUFJLEVBQUUsQ0FBQTtpQkFDUDtZQUNILENBQUMsQ0FBQyxDQUFBO1lBRUYsVUFBVSxDQUFDO2dCQUNULEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtZQUNsQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUSxDQUFDLHlDQUF5QyxFQUFFO1FBRWxELE1BQU0sQ0FBQyxVQUFVLElBQUk7WUFDbkIsb0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDLENBQUE7UUFFRixFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBUyxFQUFFO1lBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sRUFBRSxDQUFBO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUViLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSw0QkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRWhELE1BQU0sa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLGFBQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1lBQzlELENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==