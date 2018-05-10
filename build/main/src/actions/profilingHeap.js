"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:profilingaction');
const profiling_1 = require("../features/profiling");
const miscellaneous_1 = require("../utils/miscellaneous");
const file_1 = require("../utils/file");
class ProfilingHeapAction {
    constructor(actionFeature, config) {
        this.config = config;
        if (!config) {
            this.config = {};
        }
        this.actionFeature = actionFeature;
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.profilingFeature = new profiling_1.default();
            this.profilings = this.profilingFeature.init();
            try {
                yield this.profilings.heapProfiling.init(this.config.heap);
                this.exposeActions();
            }
            catch (err) {
                console.error(`Failed to load heap profiler: ${err.message}`);
            }
        });
    }
    destroy() {
        if (this.profilingFeature)
            this.profilingFeature.destroy();
    }
    exposeActions() {
        // -------------------------------------
        // Heap sampling
        // -------------------------------------
        this.actionFeature.action('km:heap:sampling:start', (reply) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.uuid = miscellaneous_1.default.generateUUID();
                yield this.profilings.heapProfiling.start();
                reply({ success: true, uuid: this.uuid });
            }
            catch (err) {
                return reply({
                    success: false,
                    err: err,
                    uuid: this.uuid
                });
            }
        }));
        this.actionFeature.action('km:heap:sampling:stop', (reply) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const dumpFile = yield this.profilings.heapProfiling.stop();
                let size;
                try {
                    size = yield file_1.default.getFileSize(dumpFile);
                }
                catch (err) {
                    size = -1;
                }
                return reply({
                    success: true,
                    heapdump: true,
                    dump_file: dumpFile,
                    dump_file_size: size,
                    uuid: this.uuid
                });
            }
            catch (err) {
                return reply({
                    success: false,
                    err: err,
                    uuid: this.uuid
                });
            }
        }));
        // -------------------------------------
        // Heap dump
        // -------------------------------------
        this.actionFeature.action('km:heapdump', (reply) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const dumpFile = yield this.profilings.heapProfiling.takeSnapshot();
                return reply({
                    success: true,
                    heapdump: true,
                    dump_file: dumpFile
                });
            }
            catch (err) {
                return reply({
                    success: false,
                    err: err
                });
            }
        }));
    }
}
exports.default = ProfilingHeapAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nSGVhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL3Byb2ZpbGluZ0hlYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLGVBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0FBRzVCLHFEQUFvRDtBQUVwRCwwREFBOEM7QUFDOUMsd0NBQXFDO0FBRXJDO0lBUUUsWUFBYSxhQUE2QixFQUFFLE1BQU87UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1NBQ2pCO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7SUFDcEMsQ0FBQztJQUVLLElBQUk7O1lBQ1IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUJBQWdCLEVBQUUsQ0FBQTtZQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUM5QyxJQUFJO2dCQUNGLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzFELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTthQUNyQjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLGdCQUFnQjtZQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1RCxDQUFDO0lBRU8sYUFBYTtRQUVuQix3Q0FBd0M7UUFDeEMsZ0JBQWdCO1FBQ2hCLHdDQUF3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