"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const module_1 = require("../utils/module");
class ProfilingCPUFallback {
    constructor() {
        this.nsCpuProfiling = 'km-cpu-profiling';
        this.MODULE_NAME = 'v8-profiler-node8';
        this.FALLBACK_MODULE_NAME = 'v8-profiler';
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let path;
            let moduleName = this.MODULE_NAME;
            try {
                path = yield module_1.default.getModulePath(this.MODULE_NAME);
            }
            catch (e) {
                try {
                    moduleName = this.FALLBACK_MODULE_NAME;
                    path = yield module_1.default.getModulePath(this.FALLBACK_MODULE_NAME);
                }
                catch (err) {
                    throw new Error('Profiler not loaded !');
                }
            }
            this.profiler = module_1.default.loadModule(path, moduleName);
        });
    }
    destroy() {
        debug_1.default('Profiler destroyed !');
    }
    start() {
        this.profiler.startProfiling(this.nsCpuProfiling);
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.getProfileInfo();
        });
    }
    getProfileInfo() {
        const cpu = this.profiler.stopProfiling(this.nsCpuProfiling);
        return file_1.default.writeDumpFile(JSON.stringify(cpu));
    }
}
exports.default = ProfilingCPUFallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nQ1BVRmFsbGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcHJvZmlsaW5nL3Byb2ZpbGluZ0NQVUZhbGxiYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUF5QjtBQUN6QixlQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7QUFFdEIsd0NBQXFDO0FBQ3JDLDRDQUFtQztBQUVuQztJQUFBO1FBRVUsbUJBQWMsR0FBVyxrQkFBa0IsQ0FBQTtRQUUzQyxnQkFBVyxHQUFHLG1CQUFtQixDQUFBO1FBQ2pDLHlCQUFvQixHQUFHLGFBQWEsQ0FBQTtJQXFDOUMsQ0FBQztJQW5DTyxJQUFJOztZQUNSLElBQUksSUFBSSxDQUFBO1lBQ1IsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUVqQyxJQUFJO2dCQUNGLElBQUksR0FBRyxNQUFNLGdCQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTthQUNuRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLElBQUk7b0JBQ0YsVUFBVSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQTtvQkFDdEMsSUFBSSxHQUFHLE1BQU0sZ0JBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7aUJBQzVEO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtpQkFDekM7YUFDRjtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ3BELENBQUM7S0FBQTtJQUVELE9BQU87UUFDTCxlQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBRUssSUFBSTs7WUFDUixPQUFPLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3BDLENBQUM7S0FBQTtJQUVPLGNBQWM7UUFDcEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRTVELE9BQU8sY0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDckQsQ0FBQztDQUNGO0FBMUNELHVDQTBDQyJ9