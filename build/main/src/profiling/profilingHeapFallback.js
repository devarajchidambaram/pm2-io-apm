"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const module_1 = require("../utils/module");
class ProfilingHeapFallback {
    constructor() {
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
        this.snapshot = this.profiler.takeSnapshot('km-heap-snapshot');
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.getProfileInfo();
        });
    }
    takeSnapshot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.start();
            return yield this.stop();
        });
    }
    getProfileInfo() {
        return new Promise(resolve => {
            let buffer = '';
            this.snapshot.serialize((data, length) => {
                buffer += data;
            }, () => {
                this.snapshot.delete();
                resolve(buffer);
            });
        }).then((buffer) => {
            return file_1.default.writeDumpFile(buffer, '.heapprofile');
        });
    }
}
exports.default = ProfilingHeapFallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nSGVhcEZhbGxiYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2ZpbGluZy9wcm9maWxpbmdIZWFwRmFsbGJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLGVBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUV0Qix3Q0FBcUM7QUFDckMsNENBQW1DO0FBRW5DO0lBQUE7UUFJVSxnQkFBVyxHQUFHLG1CQUFtQixDQUFBO1FBQ2pDLHlCQUFvQixHQUFHLGFBQWEsQ0FBQTtJQXNEOUMsQ0FBQztJQXBETyxJQUFJOztZQUNSLElBQUksSUFBSSxDQUFBO1lBQ1IsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUVqQyxJQUFJO2dCQUNGLElBQUksR0FBRyxNQUFNLGdCQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTthQUNuRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLElBQUk7b0JBQ0YsVUFBVSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQTtvQkFDdEMsSUFBSSxHQUFHLE1BQU0sZ0JBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7aUJBQzVEO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtpQkFDekM7YUFDRjtZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO1FBQ3BELENBQUM7S0FBQTtJQUVELE9BQU87UUFDTCxlQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBRUssSUFBSTs7WUFDUixPQUFPLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3BDLENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUNaLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDMUIsQ0FBQztLQUFBO0lBRU8sY0FBYztRQUNwQixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUNyQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDZixNQUFNLElBQUksSUFBSSxDQUFBO1lBQ2hCLENBQUMsRUFDRCxHQUFHLEVBQUU7Z0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtnQkFFdEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ2pCLENBQUMsQ0FDRixDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakIsT0FBTyxjQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUN4RCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQTNERCx3Q0EyREMifQ==