"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const chai_1 = require("chai");
require("mocha");
const profiling_1 = require("../../src/features/profiling");
const semver = require("semver");
const fs = require("fs");
const MODULE = 'v8-profiler-node8';
describe('ProfilingFeature', function () {
    this.timeout(50000);
    after(function (done) {
        child_process_1.exec('npm uninstall ' + MODULE, done);
    });
    describe('Profiling without module', () => {
        it('Should fail on heap profiling cause no profiler install', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profiling = new profiling_1.default().init(true);
            try {
                yield profiling.heapProfiling.init();
            }
            catch (e) {
                chai_1.expect(e.message.indexOf('Profiler not loaded !')).to.equal(0);
            }
        }));
        it('Should fail on CPU profiling cause no profiler install', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profiling = new profiling_1.default().init(true);
            try {
                yield profiling.cpuProfiling.init();
            }
            catch (e) {
                chai_1.expect(e.message.indexOf('Profiler not loaded !')).to.equal(0);
            }
        }));
    });
    describe('CPU', () => {
        before(function (done) {
            child_process_1.exec('npm install ' + MODULE, function (err) {
                chai_1.expect(err).to.equal(null);
                setTimeout(done, 1000);
            });
        });
        it('should get CPU profile from inspector', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profiling = new profiling_1.default().init();
            yield profiling.cpuProfiling.init();
            profiling.cpuProfiling.start();
            yield setTimeoutCPUProfile(profiling);
        }));
        it('should get CPU profile from v8-profiler module', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profiling = new profiling_1.default().init(true);
            yield profiling.cpuProfiling.init();
            profiling.cpuProfiling.start();
            yield setTimeoutCPUProfile(profiling);
        }));
    });
    describe('Heap', () => {
        before(function (done) {
            child_process_1.exec('npm install ' + MODULE, function (err) {
                chai_1.expect(err).to.equal(null);
                setTimeout(done, 1000);
            });
        });
        it('should get Heap profile from inspector', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profiling = new profiling_1.default().init();
            yield profiling.heapProfiling.init();
            profiling.heapProfiling.start();
            yield setTimeoutHeapProfile(profiling);
        }));
        it('should get Heap snapshot', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profiling = new profiling_1.default().init();
            yield profiling.heapProfiling.init();
            const res = yield profiling.heapProfiling.takeSnapshot();
            const content = JSON.parse(fs.readFileSync(res, 'utf8'));
            if (semver.satisfies(process.version, '>= 8.0.0')) {
                chai_1.expect(typeof content).to.equal('object');
                chai_1.expect(content.hasOwnProperty('snapshot')).to.equal(true);
            }
            yield profiling.heapProfiling.destroy();
        }));
        it('should get Heap profile from v8-profiler module', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const profiling = new profiling_1.default().init(true);
            yield profiling.heapProfiling.init();
            yield setTimeoutProfile(profiling);
        }));
    });
});
function setTimeoutHeapProfile(profiling) {
    return new Promise((resolve, reject) => {
        setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield profiling.heapProfiling.stop();
            const content = JSON.parse(fs.readFileSync(res, 'utf8'));
            if (semver.satisfies(process.version, '>= 8.0.0')) {
                chai_1.expect(typeof content).to.equal('object');
                chai_1.expect(content.hasOwnProperty('head')).to.equal(true);
            }
            else {
                chai_1.expect(typeof content).to.equal('object');
                chai_1.expect(content.hasOwnProperty('snapshot')).to.equal(true);
            }
            yield profiling.heapProfiling.destroy();
            resolve();
        }), 500);
    });
}
function setTimeoutCPUProfile(profiling) {
    return new Promise((resolve, reject) => {
        setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield profiling.cpuProfiling.stop();
            const content = JSON.parse(fs.readFileSync(res, 'utf8'));
            chai_1.expect(typeof content).to.equal('object');
            chai_1.expect(content.typeId).to.equal('CPU');
            chai_1.expect(Array.isArray(content.head)).to.equal(false);
            yield profiling.cpuProfiling.destroy();
            resolve();
        }), 500);
    });
}
function setTimeoutProfile(profiling) {
    return new Promise((resolve, reject) => {
        setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield profiling.heapProfiling.takeSnapshot();
            const content = JSON.parse(fs.readFileSync(res, 'utf8'));
            chai_1.expect(typeof content).to.equal('object');
            chai_1.expect(content.hasOwnProperty('snapshot')).to.equal(true);
            yield profiling.heapProfiling.destroy();
            resolve();
        }), 500);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2ZlYXR1cmVzL3Byb2ZpbGluZy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlEQUEwQztBQUMxQywrQkFBcUM7QUFDckMsaUJBQWM7QUFFZCw0REFBMkQ7QUFDM0QsaUNBQWdDO0FBQ2hDLHlCQUF3QjtBQUV4QixNQUFNLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQTtBQUVsQyxRQUFRLENBQUMsa0JBQWtCLEVBQUU7SUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVuQixLQUFLLENBQUMsVUFBVSxJQUFJO1FBQ2xCLG9CQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZDLENBQUMsQ0FBQyxDQUFBO0lBRUYsUUFBUSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRTtRQUN4QyxFQUFFLENBQUMseURBQXlELEVBQUUsR0FBUyxFQUFFO1lBQ3ZFLE1BQU0sU0FBUyxHQUFHLElBQUksbUJBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFbkQsSUFBSTtnQkFDRixNQUFNLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUE7YUFDckM7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixhQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDL0Q7UUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLHdEQUF3RCxFQUFFLEdBQVMsRUFBRTtZQUN0RSxNQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRW5ELElBQUk7Z0JBQ0Ys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