"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../fixtures/utils");
const chai_1 = require("chai");
const child_process_1 = require("child_process");
const MODULE = 'v8-profiler';
describe('ProfilingAction', function () {
    this.timeout(50000);
    before(function (done) {
        child_process_1.exec('npm uninstall ' + MODULE, done);
    });
    after(function (done) {
        child_process_1.exec('npm uninstall ' + MODULE, done);
    });
    describe('CPU', () => {
        before(function (done) {
            child_process_1.exec('npm install ' + MODULE, function (err) {
                chai_1.expect(err).to.equal(null);
                setTimeout(done, 1000);
            });
        });
        it('should get cpu profile data', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/actions/profilingCPUChild.js'));
            let uuid;
            child.on('message', res => {
                if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.return.success).to.equal(true);
                    if (res.data.action_name === 'km:cpu:profiling:start') {
                        uuid = res.data.return.uuid;
                    }
                    if (res.data.action_name === 'km:cpu:profiling:stop') {
                        chai_1.expect(typeof res.data.return.dump_file).to.equal('string');
                        chai_1.expect(typeof res.data.return.dump_file_size).to.equal('number');
                        chai_1.expect(res.data.return.cpuprofile).to.equal(true);
                        chai_1.expect(res.data.return.uuid).to.equal(uuid);
                        child.kill('SIGINT');
                        done();
                    }
                }
                if (res === 'initialized') {
                    child.send('km:cpu:profiling:start');
                    setTimeout(function () {
                        child.send('km:cpu:profiling:stop');
                    }, 500);
                }
            });
        });
    });
    describe('Heap', () => {
        before(function (done) {
            child_process_1.exec('npm install ' + MODULE, function (err) {
                chai_1.expect(err).to.equal(null);
                setTimeout(done, 1000);
            });
        });
        it('should get heap profile data', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/actions/profilingHeapChild.js'));
            let uuid;
            child.on('message', res => {
                if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.return.success).to.equal(true);
                    if (res.data.action_name === 'km:heap:sampling:start') {
                        uuid = res.data.return.uuid;
                    }
                    if (res.data.action_name === 'km:heap:sampling:stop') {
                        chai_1.expect(typeof res.data.return.dump_file).to.equal('string');
                        chai_1.expect(typeof res.data.return.dump_file_size).to.equal('number');
                        chai_1.expect(res.data.return.heapdump).to.equal(true);
                        chai_1.expect(res.data.return.uuid).to.equal(uuid);
                        child.kill('SIGINT');
                        done();
                    }
                }
                if (res === 'initialized') {
                    setTimeout(function () {
                        child.send('km:heap:sampling:start');
                    }, 100);
                    setTimeout(function () {
                        child.send('km:heap:sampling:stop');
                    }, 500);
                }
            });
        });
        it('should get heap dump data', (done) => {
            const child = child_process_1.fork(utils_1.default.buildTestPath('fixtures/actions/profilingHeapChild.js'));
            child.on('message', res => {
                if (res.type === 'axm:reply') {
                    chai_1.expect(res.data.return.success).to.equal(true);
                    if (res.data.action_name === 'km:heapdump') {
                        chai_1.expect(res.data.return.heapdump).to.equal(true);
                        chai_1.expect(typeof res.data.return.dump_file).to.equal('string');
                        child.kill('SIGINT');
                        done();
                    }
                }
                if (res === 'initialized') {
                    setTimeout(function () {
                        child.send('km:heapdump');
                    }, 500);
                }
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2FjdGlvbnMvcHJvZmlsaW5nLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBeUM7QUFDekMsK0JBQTZCO0FBQzdCLGlEQUEwQztBQUUxQyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUE7QUFFNUIsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFbkIsTUFBTSxDQUFDLFVBQVUsSUFBSTtRQUNuQixvQkFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDLENBQUMsQ0FBQTtJQUVGLEtBQUssQ0FBQyxVQUFVLElBQUk7UUFDbEIsb0JBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFDLENBQUE7SUFFRixRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtRQUNuQixNQUFNLENBQUMsVUFBVSxJQUFJO1lBQ25CLG9CQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sRUFBRSxVQUFVLEdBQUc7Z0JBQ3pDLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMxQixVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFFRixFQUFFLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QyxNQUFNLEtBQUssR0FBRyxvQkFBSSxDQUFDLGVBQVMsQ0FBQyxhQUFhLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFBO1lBQ3BGLElBQUksSUFBSSxDQUFBO1lBRVIsS0FBSyxDQUFDLEVBQUUsQ0FB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