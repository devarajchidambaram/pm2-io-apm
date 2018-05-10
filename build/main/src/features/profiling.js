"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
debug_1.default('axm:profiling');
const profilingCPUFallback_1 = require("../profiling/profilingCPUFallback");
const profilingHeapFallback_1 = require("../profiling/profilingHeapFallback");
const configuration_1 = require("../configuration");
class ProfilingFeature {
    constructor() {
        this.configurationModule = new configuration_1.default();
    }
    init(forceFallback) {
        // allow to force the fallback via environment
        if (process.env.PM2_PROFILING_FORCE_FALLBACK)
            forceFallback = true;
        const isInspectorOk = require('semver').satisfies(process.version, '>= 8.0.0') && !forceFallback;
        let ProfilingCPU;
        let ProfilingHeap;
        if (isInspectorOk) {
            ProfilingCPU = require('../profiling/profilingCPU').default;
            ProfilingHeap = require('../profiling/profilingHeap').default;
        }
        this.configurationModule.configureModule({
            heapdump: true
        });
        this.profilings = {
            cpuProfiling: isInspectorOk ? new ProfilingCPU() : new profilingCPUFallback_1.default(),
            heapProfiling: isInspectorOk ? new ProfilingHeap() : new profilingHeapFallback_1.default()
        };
        return this.profilings;
    }
    destroy() {
        for (let profilingName in this.profilings) {
            if (typeof this.profilings[profilingName].destroy === 'function') {
                this.profilings[profilingName].destroy();
            }
        }
    }
}
exports.default = ProfilingFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL3Byb2ZpbGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUF5QjtBQUN6QixlQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7QUFFdEIsNEVBQW9FO0FBQ3BFLDhFQUFzRTtBQUN0RSxvREFBNEM7QUFFNUM7SUFLRTtRQUNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLHVCQUFhLEVBQUUsQ0FBQTtJQUNoRCxDQUFDO0lBRUQsSUFBSSxDQUFFLGFBQXVCO1FBQzNCLDhDQUE4QztRQUM5QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCO1lBQUUsYUFBYSxHQUFHLElBQUksQ0FBQTtRQUVsRSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDaEcsSUFBSSxZQUFZLENBQUE7UUFDaEIsSUFBSSxhQUFhLENBQUE7UUFFakIsSUFBSSxhQUFhLEVBQUU7WUFDakIsWUFBWSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtZQUMzRCxhQUFhLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsT0FBTyxDQUFBO1NBQzlEO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQztZQUN2QyxRQUFRLEVBQUcsSUFBSTtTQUNoQixDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsVUFBVSxHQUFHO1lBQ2hCLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksOEJBQW9CLEVBQUU7WUFDN0UsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSwrQkFBcUIsRUFBRTtTQUNqRixDQUFBO1FBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO0lBQ3hCLENBQUM7SUFFRCxPQUFPO1FBQ0wsS0FBSyxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3pDLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7YUFDekM7U0FDRjtJQUNILENBQUM7Q0FDRjtBQXpDRCxtQ0F5Q0MifQ==