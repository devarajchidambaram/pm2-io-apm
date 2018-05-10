"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const metricConfig_1 = require("../utils/metricConfig");
const serviceManager_1 = require("../serviceManager");
class ProfilingHeap {
    constructor() {
        this.defaultConf = {
            samplingInterval: 32768
        };
        this.inspectorService = serviceManager_1.ServiceManager.get('inspector');
    }
    init(config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            config = metricConfig_1.default.getConfig(config, this.defaultConf);
            this.config = config;
            this.inspectorService.createSession();
            this.inspectorService.connect();
            return this.inspectorService.post('HeapProfiler.enable');
        });
    }
    destroy() {
        this.inspectorService.disconnect();
    }
    start() {
        return this.inspectorService.post('HeapProfiler.startSampling', {
            samplingInterval: this.config.samplingInterval
        });
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.getProfileInfo();
        });
    }
    takeSnapshot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const chunks = [];
            this.inspectorService.on('HeapProfiler.addHeapSnapshotChunk', (data) => {
                chunks.push(data.params.chunk);
            });
            yield this.inspectorService.post('HeapProfiler.takeHeapSnapshot', {
                reportProgress: false
            });
            return file_1.default.writeDumpFile(chunks.join(''), '.heapprofile');
        });
    }
    getProfileInfo() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                data = yield this.inspectorService.post('HeapProfiler.stopSampling');
            }
            catch (err) {
                debug_1.default('Heap profiling stopped !');
                return reject(err);
            }
            resolve(file_1.default.writeDumpFile(JSON.stringify(data.profile), '.heapprofile'));
        }));
    }
}
exports.default = ProfilingHeap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nSGVhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm9maWxpbmcvcHJvZmlsaW5nSGVhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBeUI7QUFDekIsZUFBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRXRCLHdDQUFxQztBQUNyQyx3REFBZ0Q7QUFFaEQsc0RBQWtEO0FBRWxEO0lBVUU7UUFOUSxnQkFBVyxHQUFHO1lBQ3BCLGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQTtRQUtDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0lBRUssSUFBSSxDQUFFLE1BQU87O1lBQ2pCLE1BQU0sR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1lBRXBCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDMUQsQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtZQUM5RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtTQUMvQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssSUFBSTs7WUFDUixPQUFPLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3BDLENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2hCLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUE7WUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFDLENBQUE7WUFFRixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUU7Z0JBQ2hFLGNBQWMsRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQTtZQUVGLE9BQU8sY0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFBO1FBQ2pFLENBQUM7S0FBQTtJQUVPLGNBQWM7UUFDcEIsT0FBTyxJQUFJLE9BQU8sQ0FBRSxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM1QyxJQUFJLElBQUksQ0FBQTtZQUNSLElBQUk7Z0JBQ0YsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO2FBQ3JFO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osZUFBSyxDQUFDLDBCQUEwQixDQUFDLENBQUE7Z0JBQ2pDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ25CO1lBRUQsT0FBTyxDQUFDLGNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtRQUNoRixDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGO0FBL0RELGdDQStEQyJ9