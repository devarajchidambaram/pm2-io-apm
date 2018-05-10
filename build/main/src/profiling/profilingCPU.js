"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:profiling');
const file_1 = require("../utils/file");
const serviceManager_1 = require("../serviceManager");
class ProfilingCPU {
    constructor() {
        this.inspectorService = serviceManager_1.ServiceManager.get('inspector');
    }
    init() {
        this.inspectorService.createSession();
        this.inspectorService.connect();
        return this.inspectorService.post('Profiler.enable');
    }
    destroy() {
        this.inspectorService.disconnect();
    }
    start() {
        return this.inspectorService.post('Profiler.start');
    }
    stop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.getProfileInfo();
        });
    }
    _convertTimeDeltas(profile) {
        if (!profile.timeDeltas)
            return null;
        let lastTimeUsec = profile.startTime;
        const timestamps = new Array(profile.timeDeltas.length + 1);
        for (let i = 0; i < profile.timeDeltas.length; ++i) {
            timestamps[i] = lastTimeUsec;
            lastTimeUsec += profile.timeDeltas[i];
        }
        timestamps[profile.timeDeltas.length] = lastTimeUsec;
        return timestamps;
    }
    getProfileInfo() {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let rawData = yield this.inspectorService.post('Profiler.stop');
                if (!rawData || !rawData.profile)
                    return reject(`V8 Interval Error`);
                rawData = rawData.profile;
                let data = rawData;
                // recursively reformat the flatten tree into an actual tree
                const reformatNode = node => {
                    if (!node.children)
                        node.children = [];
                    node.children = node.children.map(childID => {
                        if (typeof childID !== 'number')
                            return childID;
                        const childNode = data.nodes.find(node => node.id === childID);
                        if (typeof childNode !== 'object')
                            return null;
                        childNode.callUID = node.id;
                        return childNode;
                    });
                    return {
                        functionName: node.callFrame.functionName,
                        url: node.callFrame.url,
                        lineNumber: node.callFrame.lineNumber,
                        callUID: node.callUID,
                        bailoutReason: '',
                        id: node.id,
                        scriptId: 0,
                        hitCount: node.hitCount,
                        children: node.children.map(reformatNode)
                    };
                };
                // reformat then only keep the root as top level node
                const nodes = data.nodes
                    .map(reformatNode)
                    .filter(node => node.functionName === '(root)')[0];
                // since it can be undefined, create an array so execution still works
                if (!data.timeDeltas) {
                    data.timeDeltas = [];
                }
                return resolve(file_1.default.writeDumpFile(JSON.stringify({
                    head: nodes,
                    typeId: 'CPU',
                    uid: '1',
                    startTime: Math.floor(data.startTime / 1000000),
                    title: 'km-cpu-profiling',
                    endTime: Math.floor(data.endTime / 1000000),
                    samples: data.samples,
                    timestamps: this._convertTimeDeltas(data)
                })));
            }
            catch (err) {
                debug_1.default('Cpu profiling stopped !');
                return reject(err);
            }
        }));
    }
}
exports.default = ProfilingCPU;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nQ1BVLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2ZpbGluZy9wcm9maWxpbmdDUFUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQXlCO0FBQ3pCLGVBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUd0Qix3Q0FBcUM7QUFDckMsc0RBQWtEO0FBR2xEO0lBSUU7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsK0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3BDLENBQUM7SUFFRCxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVLLElBQUk7O1lBQ1IsT0FBTyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtRQUNwQyxDQUFDO0tBQUE7SUFFTyxrQkFBa0IsQ0FBRSxPQUFzQjtRQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQTtRQUNwQyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFBO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENB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