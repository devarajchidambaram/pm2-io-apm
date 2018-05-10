"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:profilingaction');
const profiling_1 = require("../features/profiling");
const miscellaneous_1 = require("../utils/miscellaneous");
const file_1 = require("../utils/file");
class ProfilingCPUAction {
    constructor(actionFeature) {
        this.actionFeature = actionFeature;
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.profilingFeature = new profiling_1.default();
            this.profilings = this.profilingFeature.init();
            try {
                yield this.profilings.cpuProfiling.init();
                // expose actions only if the feature is available
                this.exposeActions();
            }
            catch (err) {
                console.error(`Failed to load cpu profiler: ${err.message}`);
            }
        });
    }
    destroy() {
        if (this.profilingFeature)
            this.profilingFeature.destroy();
    }
    exposeActions() {
        this.actionFeature.action('km:cpu:profiling:start', (reply) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.uuid = miscellaneous_1.default.generateUUID();
                yield this.profilings.cpuProfiling.start();
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
        this.actionFeature.action('km:cpu:profiling:stop', (reply) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const dumpFile = yield this.profilings.cpuProfiling.stop();
                let size;
                try {
                    size = yield file_1.default.getFileSize(dumpFile);
                }
                catch (err) {
                    size = -1;
                }
                return reply({
                    success: true,
                    cpuprofile: true,
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
    }
}
exports.default = ProfilingCPUAction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nQ3B1LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvcHJvZmlsaW5nQ3B1LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUF5QjtBQUN6QixlQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUc1QixxREFBb0Q7QUFFcEQsMERBQThDO0FBQzlDLHdDQUFxQztBQUVyQztJQU9FLFlBQWEsYUFBNkI7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7SUFDcEMsQ0FBQztJQUVLLElBQUk7O1lBQ1IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUJBQWdCLEVBQUUsQ0FBQTtZQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUM5QyxJQUFJO2dCQUNGLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3pDLGtEQUFrRDtnQkFDbEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2FBQ3JCO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7YUFDN0Q7UUFDSCxDQUFDO0tBQUE7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVELENBQUM7SUFFTyxhQUFhO1FBRW5CLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLENBQU8sS0FBSyxFQUFFLEVBQUU7WUFDbEUsSUFBSTtnQkFDRixJQUFJLENBQUMsSUFBSSxHQUFHLHVCQUFTLENBQUMsWUFBWSxFQUFFLENBQUE7Z0JBQ3BDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQzFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO2FBQzNDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxLQUFLLENBQUM7b0JBQ1gsT0FBTyxFQUFHLEtBQUs7b0JBQ2YsR0FBRyxFQUFPLEdBQUc7b0JBQ2IsSUFBSSxFQUFNLElBQUksQ0FBQyxJQUFJO2lCQUNwQixDQUFDLENBQUE7YUFDSDtRQUNILENBQUMsQ0FBQSxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRSxDQUFPLEtBQUssRUFBRSxFQUFFO1lBQ2pFLElBQUk7Z0JBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFFMUQsSUFBSSxJQUFJLENBQUE7Z0JBQ1IsSUFBSTtvQkFDRixJQUFJLEdBQUcsTUFBTSxjQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lCQUM3QztnQkFBQyxPQUFPLEdBQUcsRUFBRTtvQkFDWixJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7aUJBQ1Y7Z0JBRUQsT0FBTyxLQUFLLENBQUM7b0JBQ1gsT0FBTyxFQUFPLElBQUk7b0JBQ2xCLFVBQVUsRUFBSSxJQUFJO29CQUNsQixTQUFTLEVBQUssUUFBUTtvQkFDdEIsY0FBYyxFQUFHLElBQUk7b0JBQ3JCLElBQUksRUFBVSxJQUFJLENBQUMsSUFBSTtpQkFDeEIsQ0FBQyxDQUFBO2FBQ0g7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixPQUFPLEtBQUssQ0FBQztvQkFDWCxPQUFPLEVBQUcsS0FBSztvQkFDZixHQUFHLEVBQU8sR0FBRztvQkFDYixJQUFJLEVBQU0sSUFBSSxDQUFDLElBQUk7aUJBQ3BCLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQXRFRCxxQ0FzRUMifQ==