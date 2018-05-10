"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const chai_1 = require("chai");
require("mocha");
const utils_1 = require("../fixtures/utils");
const actions_1 = require("../../src/features/actions");
describe('ActionsFeature', () => {
    describe('action', () => {
        it('should create an action and send basic action', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/actionsChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.type).to.equal('axm:action');
                    if (res.data.action_name === 'myAction') {
                        chai_1.expect(res.data.action_name).to.equal('myAction');
                        chai_1.expect(Object.keys(res.data.opts).length).to.equal(0);
                    }
                    else {
                        chai_1.expect(res.data.action_name).to.equal('myActionNoOpts');
                        chai_1.expect(res.data.opts).to.equal(null);
                    }
                    chai_1.expect(res.data.arity).to.equal(1);
                    child.send(res.data.action_name);
                }
                else if (res.type === 'axm:reply') {
                    chai_1.expect(res.type).to.equal('axm:reply');
                    if (res.data.action_name === 'myAction') {
                        chai_1.expect(res.data.return.data).to.equal('testActionReply');
                        chai_1.expect(res.data.action_name).to.equal('myAction');
                    }
                    else if (res.data.action_name === 'myActionNoOpts') {
                        chai_1.expect(res.data.return.data).to.equal('myActionNoOptsReply');
                        chai_1.expect(res.data.action_name).to.equal('myActionNoOpts');
                        child.kill('SIGINT');
                        done();
                    }
                }
            });
        });
        it('should create an action and send object action', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/actionsBasicChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.type).to.equal('axm:action');
                    chai_1.expect(res.data.action_name).to.equal('myAction');
                    child.send({ msg: res.data.action_name });
                }
                else if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.action_name).to.equal('myAction');
                    chai_1.expect(res.data.return.data).to.equal('myActionReply');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should create an action and send object with opts', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/actions2ArgsChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.type).to.equal('axm:action');
                    chai_1.expect(res.data.action_name).to.equal('myAction');
                    child.send({ msg: res.data.action_name, opts: { opts1: 'opts1' } });
                }
                else if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.action_name).to.equal('myAction');
                    chai_1.expect(res.data.return.data).to.equal('myActionReply');
                    chai_1.expect(res.data.return.opts.opts1).to.equal('opts1');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should create an action and send string with opts', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/actions2ArgsChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.type).to.equal('axm:action');
                    chai_1.expect(res.data.action_name).to.equal('myAction');
                    child.send(res.data.action_name);
                }
                else if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.action_name).to.equal('myAction');
                    chai_1.expect(res.data.return.data).to.equal('myActionReply');
                    chai_1.expect(Object.keys(res.data.return.opts).length).to.equal(0);
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should return error/false in case of bad arguments', () => {
            const actions = new actions_1.default();
            actions.init();
            let res = actions.action(null);
            chai_1.expect(res).to.equal(undefined);
            res = actions.action('testNoFn');
            chai_1.expect(res).to.equal(undefined);
        });
        it('should create action according to conf', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/actionsConfChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.type).to.equal('axm:action');
                    chai_1.expect(res.data.action_name).to.equal('myActionConf');
                    child.send(res.data.action_name);
                }
                else if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.action_name).to.equal('myActionConf');
                    chai_1.expect(res.data.return.data).to.equal('myActionConfReply');
                    chai_1.expect(Object.keys(res.data.return.opts).length).to.equal(0);
                    child.kill('SIGINT');
                    done();
                }
            });
        });
    });
    describe('scopedAction', () => {
        it('should create an scoped action and send basic action', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/actionsScopedBasicChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.type).to.equal('axm:action');
                    // expect(res.data.action_name).to.equal('myScopedAction')
                    chai_1.expect(res.data.action_type).to.equal('scoped');
                    child.send({ action_name: res.data.action_name, uuid: 1000 });
                }
                else if (res.type === 'axm:scoped_action:stream') {
                    chai_1.expect(res.type).to.equal('axm:scoped_action:stream');
                    chai_1.expect(res.data.uuid).to.equal(1000);
                    chai_1.expect(res.data.action_name).to.equal('myScopedAction');
                    chai_1.expect(res.data.data).to.equal('myScopedActionReply');
                }
                else if (res.type === 'axm:scoped_action:error') {
                    chai_1.expect(res.type).to.equal('axm:scoped_action:error');
                    chai_1.expect(res.data.uuid).to.equal(1000);
                    chai_1.expect(res.data.action_name).to.equal('myScopedErrorAction');
                    chai_1.expect(res.data.data).to.equal('myScopedActionReplyError');
                }
                else if (res.type === 'axm:scoped_action:end') {
                    chai_1.expect(res.type).to.equal('axm:scoped_action:end');
                    chai_1.expect(res.data.uuid).to.equal(1000);
                    chai_1.expect(res.data.action_name).to.equal('myScopedEndAction');
                    chai_1.expect(res.data.data).to.equal('myScopedActionReplyEnd');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should failed cause domain error', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/features/actionsScopedDomainErrorChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.type).to.equal('axm:action');
                    // expect(res.data.action_name).to.equal('myScopedAction')
                    chai_1.expect(res.data.action_type).to.equal('scoped');
                    child.send({ action_name: res.data.action_name, uuid: 1000 });
                }
                else if (res.type === 'axm:scoped_action:error') {
                    chai_1.expect(res.type).to.equal('axm:scoped_action:error');
                    chai_1.expect(res.data.uuid).to.equal(1000);
                    chai_1.expect(res.data.action_name).to.equal('myScopedAction');
                    child.on('exit', function () {
                        child.kill('SIGINT');
                        done();
                    });
                }
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9mZWF0dXJlcy9hY3Rpb25zLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBb0M7QUFDcEMsK0JBQXFDO0FBQ3JDLGlCQUFjO0FBQ2QsNkNBQXlDO0FBQ3pDLHdEQUF1RDtBQUV2RCxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO0lBQzlCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQ3RCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNELE1BQU0sS0FBSyxHQUFHLG9CQUFJLENBQUMsZUFBUyxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUE7WUFDaEYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7b0JBQzdCLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtvQkFDdkMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7d0JBQ3ZDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7d0JBQ2pELGFBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtxQkFDdEQ7eUJBQU07d0JBQ0wsYUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEtB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