"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./fixtures/utils");
const chai_1 = require("chai");
require("mocha");
const child_process_1 = require("child_process");
describe('API', function () {
    this.timeout(50000);
    describe('Notify', () => {
        it('should receive data from notify', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiNotifyChild.js'));
            child.on('message', msg => {
                if (msg === 'myNotify') {
                    chai_1.expect(msg).to.equal('myNotify');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
    });
    describe('Metrics', () => {
        it('should receive data from metric', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiMetricsChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:monitor') {
                    chai_1.expect(res.data.hasOwnProperty('metric with spaces')).to.equal(true);
                    chai_1.expect(res.data.hasOwnProperty('metric wi!th special chars % ///')).to.equal(true);
                    chai_1.expect(res.data.hasOwnProperty('metricHistogram')).to.equal(true);
                    chai_1.expect(res.data.metricHistogram.value).to.equal('10');
                    chai_1.expect(res.data.metricHistogram.type).to.equal('metric/custom');
                    chai_1.expect(res.data.hasOwnProperty('Loop delay')).to.equal(true);
                    chai_1.expect(res.data.hasOwnProperty('Active handles')).to.equal(true);
                    if (res.data.hasOwnProperty('New space used size')) {
                        child.kill('SIGINT');
                        done();
                    }
                }
            });
        });
    });
    describe('Actions', () => {
        it('should receive data from action', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiActionsChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.data.action_name).to.equal('testAction');
                    child.send(res.data.action_name);
                }
                else if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.action_name).to.equal('testAction');
                    chai_1.expect(res.data.return.data).to.equal('testActionReply');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should receive data from scoped action', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiActionsScopedChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.data.action_name).to.equal('testScopedAction');
                    child.send(res.data.action_name);
                    child.send({ action_name: res.data.action_name, uuid: 1000 });
                }
                else if (res.type === 'axm:scoped_action:stream') {
                    chai_1.expect(res.data.uuid).to.equal(1000);
                    chai_1.expect(res.data.action_name).to.equal('testScopedAction');
                    chai_1.expect(res.data.data).to.equal('testScopedActionReply');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should receive data from action with conf', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiActionsJsonChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:action') {
                    chai_1.expect(res.data.action_name).to.equal('testActionWithConf');
                    child.send(res.data.action_name);
                    child.send({ action_name: res.data.action_name, uuid: 1000 });
                }
                else if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.action_name).to.equal('testActionWithConf');
                    chai_1.expect(res.data.return.data).to.equal('testActionWithConfReply');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
    });
    describe('Transpose', () => {
        it('should receive data from transpose', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiTransposeChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:monitor') {
                    chai_1.expect(res.data.hasOwnProperty('transpose')).to.equal(true);
                    chai_1.expect(res.data.transpose.value).to.equal('transposeResponse');
                    chai_1.expect(res.data.hasOwnProperty('Loop delay')).to.equal(true);
                    chai_1.expect(res.data.hasOwnProperty('Active handles')).to.equal(true);
                    child.kill('SIGINT');
                    done();
                }
            });
        });
    });
    describe('Onexit', () => {
        it('should catch signals and launch callback', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiOnExitChild.js'));
            child.on('message', res => {
                chai_1.expect(res).to.equal('callback');
                done();
            });
            setTimeout(function () {
                child.kill('SIGINT');
            }, 500);
        });
        it('should return null cause no callback provided', () => {
            const pmx = require(__dirname + '/../build/main/src/index.js');
            const fn = pmx.onExit();
            chai_1.expect(fn).to.equal(undefined);
        });
        it('should catch uncaught exception and launch callback', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiOnExitExceptionChild.js'));
            child.on('message', res => {
                chai_1.expect(res).to.equal('callback');
                done();
            });
        });
    });
    describe('Compatibility', () => {
        it('should receive data', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiBackwardChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:monitor') {
                    chai_1.expect(res.data.hasOwnProperty('metricBackward')).to.equal(true);
                    chai_1.expect(res.data.metricBackward.value).to.equal(10);
                    chai_1.expect(res.data.hasOwnProperty('counterBackward')).to.equal(true);
                    chai_1.expect(res.data.counterBackward.value).to.equal(2);
                    chai_1.expect(res.data.hasOwnProperty('meterBackward')).to.equal(true);
                    chai_1.expect(res.data.meterBackward.value).to.equal('0');
                    chai_1.expect(res.data.hasOwnProperty('histogramBackward')).to.equal(true);
                    chai_1.expect(res.data.histogramBackward.value).to.equal('0');
                    chai_1.expect(res.data.hasOwnProperty('Loop delay')).to.equal(true);
                    chai_1.expect(res.data.hasOwnProperty('Active handles')).to.equal(true);
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should return metrics object with clean keys', () => {
            const pmx = require(__dirname + '/../build/main/src/index.js');
            const metrics = pmx.metric([
                {
                    name: 'metricHistogram',
                    type: 'histogram',
                    id: 'metric/custom'
                },
                {
                    name: 'metric with spaces',
                    type: 'histogram',
                    id: 'metric/custom'
                },
                {
                    name: 'metric wi!th special chars % ///',
                    type: 'histogram',
                    id: 'metric/custom'
                },
                {
                    name: 'metricFailure',
                    type: 'notExist'
                }
            ]);
            chai_1.expect(metrics.hasOwnProperty('metricHistogram')).to.equal(true);
            chai_1.expect(metrics.hasOwnProperty('metric_with_spaces')).to.equal(true);
            chai_1.expect(metrics.hasOwnProperty('metric_with_special_chars__')).to.equal(true);
            chai_1.expect(Object.keys(metrics).length).to.equal(3);
        });
        it('should return null', () => {
            const pmx = require(__dirname + '/../build/main/src/index.js');
            const probe = pmx.probe();
            const metric = probe.metric();
            chai_1.expect(metric).to.equal(null);
        });
        it('should return null when using init', () => {
            const pmx = require(__dirname + '/../build/main/src/index.js').init({ profiling: false });
            const probe = pmx.probe();
            const metric = probe.metric();
            chai_1.expect(metric).to.equal(null);
            pmx.destroy();
        });
        it('should receive data from event', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiBackwardEventChild.js'));
            child.on('message', res => {
                if (res.type === 'human:event') {
                    chai_1.expect(res.data.__name).to.equal('myEvent');
                    chai_1.expect(res.data.prop1).to.equal('value1');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
        it('should receive data from notify', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiBackwardNotifyChild.js'));
            child.on('message', msg => {
                if (msg !== 'test' && msg !== 'testError' && msg.success) {
                    chai_1.assert.fail();
                }
            });
            child.on('exit', () => {
                done();
            });
        });
        it('should receive data with old config', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiBackwardConfChild.js'));
            let tracingDone = false;
            let metricsDone = false;
            let finished = false;
            child.on('message', pck => {
                if (pck.type === 'axm:trace') {
                    chai_1.expect(pck.data.hasOwnProperty('projectId')).to.equal(true);
                    chai_1.expect(pck.data.hasOwnProperty('traceId')).to.equal(true);
                    tracingDone = true;
                }
                if (pck.data && pck.data.hasOwnProperty('New space used size')) {
                    chai_1.expect(pck.data.hasOwnProperty('New space used size')).to.equal(true);
                    chai_1.expect(pck.data.hasOwnProperty('Network Download')).to.equal(true);
                    chai_1.expect(pck.data.hasOwnProperty('Network Upload')).to.equal(true);
                    chai_1.expect(pck.data.hasOwnProperty('Open ports')).to.equal(true);
                    chai_1.expect(pck.data.hasOwnProperty('HTTP: Response time')).to.equal(true);
                    metricsDone = true;
                }
                if (tracingDone && metricsDone && !finished) {
                    finished = true;
                    child.kill('SIGINT');
                    done();
                }
            });
        });
    });
    describe('Compatibility actions', () => {
        const MODULE = 'v8-profiler';
        before(function (done) {
            child_process_1.exec('npm uninstall ' + MODULE, done);
        });
        after(function (done) {
            child_process_1.exec('npm uninstall ' + MODULE, done);
        });
        describe('Profiling', () => {
            before(function (done) {
                child_process_1.exec('npm install ' + MODULE, function (err) {
                    chai_1.expect(err).to.equal(null);
                    setTimeout(done, 1000);
                });
            });
            it('should receive data from default actions', (done) => {
                const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiBackwardActionsChild.js'));
                const actionDone = [];
                child.on('message', pck => {
                    if (pck.type === 'axm:action') {
                        if (actionDone.indexOf(pck.data.action_name) === -1) {
                            actionDone.push(pck.data.action_name);
                        }
                        if (actionDone.length === 5) {
                            chai_1.expect(actionDone.indexOf('km:heap:sampling:start') > -1).to.equal(true);
                            chai_1.expect(actionDone.indexOf('km:heap:sampling:stop') > -1).to.equal(true);
                            chai_1.expect(actionDone.indexOf('km:cpu:profiling:start') > -1).to.equal(true);
                            chai_1.expect(actionDone.indexOf('km:cpu:profiling:stop') > -1).to.equal(true);
                            chai_1.expect(actionDone.indexOf('km:heapdump') > -1).to.equal(true);
                            child.kill('SIGINT');
                            done();
                        }
                    }
                });
            });
        });
    });
    describe('InitModule', () => {
        it('should return module conf', () => {
            const pmx = require(__dirname + '/../build/main/src/index.js');
            process.env.mocha = JSON.stringify({
                test: 'processTest',
                bool: true,
                boolAsString: 'true',
                number: '12',
                object: {
                    prop1: 'value1'
                }
            });
            const conf = pmx.initModule({
                test2: 'toto'
            });
            chai_1.expect(conf.test2).to.equal('toto');
            chai_1.expect(conf.module_conf.test).to.equal('processTest');
            chai_1.expect(conf.module_conf.bool).to.equal(true);
            chai_1.expect(conf.module_conf.boolAsString).to.equal(true);
            chai_1.expect(typeof conf.module_conf.number).to.equal('number');
            chai_1.expect(conf.module_conf.number).to.equal(12);
            chai_1.expect(typeof conf.module_conf.object).to.equal('object');
            chai_1.expect(conf.module_conf.object.prop1).to.equal('value1');
            chai_1.expect(conf.module_name).to.equal('mocha');
            chai_1.expect(typeof conf.module_version).to.equal('string');
            chai_1.expect(typeof conf.module_name).to.equal('string');
            chai_1.expect(typeof conf.description).to.equal('string');
            chai_1.expect(typeof conf.pmx_version).to.equal('string');
        });
        it('should return module conf with callback', () => {
            const pmx = require(__dirname + '/../build/main/src/index.js');
            process.env.mocha = JSON.stringify(new Date());
            pmx.initModule({
                test2: 'toto'
            }, (err, conf) => {
                chai_1.expect(typeof conf.module_conf).to.equal('object');
                chai_1.expect(typeof conf.module_version).to.equal('string');
                chai_1.expect(typeof conf.module_name).to.equal('string');
                chai_1.expect(typeof conf.description).to.equal('string');
                chai_1.expect(typeof conf.pmx_version).to.equal('string');
                chai_1.expect(conf.test2).to.equal('toto');
                chai_1.expect(conf.module_name).to.equal('mocha');
                chai_1.expect(err).to.equal(null);
            });
        });
        it('should return minimal conf', () => {
            const pmx = require(__dirname + '/../build/main/src/index.js');
            const conf = pmx.initModule();
            chai_1.expect(conf.module_name).to.equal('mocha');
            chai_1.expect(typeof conf.module_version).to.equal('string');
            chai_1.expect(typeof conf.module_name).to.equal('string');
            chai_1.expect(typeof conf.description).to.equal('string');
            chai_1.expect(typeof conf.pmx_version).to.equal('string');
        });
        it('should receive data from init module', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/apiInitModuleChild.js'));
            child.on('message', pck => {
                if (pck.type === 'axm:option:configuration') {
                    const conf = pck.data;
                    chai_1.expect(conf.module_name).to.equal('fixtures');
                    chai_1.expect(conf.module_version).to.equal('0.0.1');
                    chai_1.expect(typeof conf.module_name).to.equal('string');
                    chai_1.expect(typeof conf.pmx_version).to.equal('string');
                    child.kill('SIGINT');
                    done();
                }
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90ZXN0L2FwaS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQXdDO0FBQ3hDLCtCQUFxQztBQUVyQyxpQkFBYztBQUVkLGlEQUEwQztBQUUxQyxRQUFRLENBQUMsS0FBSyxFQUFFO0lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVuQixRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUN0QixFQUFFLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QyxNQUFNLEtBQUssR0FBRyxvQkFBSSxDQUFDLGVBQVMsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFBO1lBRXpFLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixJQUFJLEdBQUcsS0FBSyxVQUFVLEVBQUU7b0JBQ3RCLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO29CQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUNwQixJQUFJLEVBQUUsQ0FBQTtpQkFDUDtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3ZCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdDLE1BQU0sS0FBSyxHQUFHLG9CQUFJLENBQUMsZUFBUyxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUE7WUFFMUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBRXhCLElBQUksR0FBRyxDQUFDLElB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