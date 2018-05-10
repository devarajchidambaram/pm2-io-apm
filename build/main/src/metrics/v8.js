"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v8 = require("v8");
const module_1 = require("../utils/module");
const metricConfig_1 = require("../utils/metricConfig");
class V8Metric {
    constructor(metricFeature) {
        this.unitKB = 'kB';
        this.allPossibleMetrics = {
            new_space: {
                name: 'New space used size',
                type: 'v8/heap/space/new',
                unit: this.unitKB,
                historic: true
            },
            old_space: {
                name: 'Old space used size',
                type: 'v8/heap/space/old',
                unit: this.unitKB,
                historic: true
            },
            map_space: {
                name: 'Map space used size',
                type: 'v8/heap/space/map',
                unit: this.unitKB,
                historic: false
            },
            code_space: {
                name: 'Code space used size',
                type: 'v8/heap/space/code',
                unit: this.unitKB,
                historic: false
            },
            large_object_space: {
                name: 'Large object space used size',
                type: 'v8/heap/space/large',
                unit: this.unitKB,
                historic: false
            },
            total_physical_size: {
                name: 'Heap physical size',
                type: 'v8/heap/physical',
                unit: 'kB',
                historic: false
            },
            total_heap_size: {
                name: 'Heap size',
                type: 'v8/heap/used',
                unit: 'kB',
                historic: true
            },
            total_available_size: {
                name: 'Heap available size',
                type: 'v8/heap/available',
                unit: 'kB',
                historic: true
            },
            total_heap_size_executable: {
                name: 'Heap size executable',
                type: 'v8/heap/executable',
                unit: this.unitKB,
                historic: false
            },
            used_heap_size: {
                name: 'Used heap size',
                type: 'v8/heap/used',
                unit: this.unitKB,
                historic: true
            },
            heap_size_limit: {
                name: 'Heap size limit',
                type: 'v8/heap/limit',
                unit: this.unitKB,
                historic: true
            },
            malloced_memory: {
                name: 'Malloced memory',
                type: 'v8/heap/malloced',
                unit: this.unitKB,
                historic: false
            },
            peak_malloced_memory: {
                name: 'Peak malloced memory',
                type: 'v8/heap/peakmalloced',
                unit: this.unitKB,
                historic: false
            },
            does_zap_garbage: {
                name: 'Zap garbage',
                type: 'v8/heap/zapgarbage',
                unit: '',
                historic: false
            },
            GC: {
                totalHeapSize: {
                    name: 'GC Heap size',
                    type: 'v8/gc/heap/size',
                    unit: this.unitKB,
                    historic: true
                },
                totalHeapExecutableSize: {
                    name: 'GC Executable heap size',
                    type: 'v8/gc/heap/executable',
                    unit: this.unitKB,
                    historic: false
                },
                usedHeapSize: {
                    name: 'GC Used heap size',
                    type: 'v8/gc/heap/used',
                    unit: this.unitKB,
                    historic: true
                },
                heapSizeLimit: {
                    name: 'GC heap size limit',
                    type: 'v8/gc/heap/limit',
                    unit: this.unitKB,
                    historic: false
                },
                totalPhysicalSize: {
                    name: 'GC physical size',
                    type: 'v8/gc/heap/physical',
                    unit: this.unitKB,
                    historic: false
                },
                totalAvailableSize: {
                    name: 'GC available size',
                    type: 'v8/gc/heap/available',
                    unit: this.unitKB,
                    historic: false
                },
                mallocedMemory: {
                    name: 'GC malloced memory',
                    type: 'v8/gc/heap/malloced',
                    unit: this.unitKB,
                    historic: false
                },
                peakMallocedMemory: {
                    name: 'GC peak malloced memory',
                    type: 'v8/gc/heap/peakmalloced',
                    unit: this.unitKB,
                    historic: false
                },
                gcType: {
                    name: 'GC Type',
                    type: 'v8/gc/type',
                    historic: false
                },
                gcPause: {
                    name: 'GC Pause',
                    type: 'v8/gc/pause',
                    unit: 'ms',
                    historic: false
                }
            }
        };
        this.defaultConf = {
            new_space: true,
            old_space: true,
            map_space: true,
            code_space: true,
            large_object_space: true,
            total_heap_size: true,
            total_heap_size_executable: true,
            used_heap_size: true,
            heap_size_limit: true,
            GC: {
                totalHeapSize: true,
                totalHeapExecutableSize: true,
                usedHeapSize: true,
                gcType: true,
                gcPause: true
            }
        };
        this.TIME_INTERVAL = 1000;
        this.metricFeature = metricFeature;
    }
    init(config) {
        config = metricConfig_1.default.getConfig(config, this.defaultConf);
        let heapProbes;
        const self = this;
        if (v8.hasOwnProperty('getHeapSpaceStatistics') && v8.hasOwnProperty('getHeapStatistics')) {
            heapProbes = metricConfig_1.default.initProbes(this.allPossibleMetrics, config, this.metricFeature);
        }
        this.timer = setInterval(function () {
            if (v8.hasOwnProperty('getHeapSpaceStatistics')) {
                const data = v8.getHeapSpaceStatistics();
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (heapProbes.hasOwnProperty(item.space_name)) {
                        heapProbes[item.space_name].set(Math.round(item.space_used_size / 1000));
                    }
                }
            }
            if (v8.hasOwnProperty('getHeapStatistics')) {
                const heapStats = v8.getHeapStatistics();
                metricConfig_1.default.setProbesValue(this.allPossibleMetrics, heapStats, heapProbes, self.unitKB);
            }
        }.bind(this), this.TIME_INTERVAL);
        module_1.default.detectModule('gc-stats', (err, gcPath) => {
            if (err) {
                return false;
            }
            return this._sendGCStats(gcPath, config.GC);
        });
    }
    destroy() {
        clearInterval(this.timer);
    }
    _sendGCStats(gcPath, config) {
        let gc;
        try {
            gc = (require(gcPath))();
        }
        catch (e) {
            console.error('error when requiring gc-stats on path', gcPath);
            console.error(e);
            return false;
        }
        config = metricConfig_1.default.getConfig(config, this.defaultConf.GC);
        const gcProbes = metricConfig_1.default.initProbes(this.allPossibleMetrics.GC, config, this.metricFeature);
        const self = this;
        gc.on('stats', (stats) => {
            metricConfig_1.default.setProbesValue(this.allPossibleMetrics.GC, stats.after, gcProbes, self.unitKB);
            gcProbes['gcType'].set(stats.gctype);
            gcProbes['gcPause'].set(Math.round(stats.pause / 1000000)); // convert to milliseconds (cause pauseMs seems to use Math.floor)
        });
    }
}
exports.default = V8Metric;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWV0cmljcy92OC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF3QjtBQUN4Qiw0Q0FBbUM7QUFHbkMsd0RBQWdEO0FBRWhEO0lBK0tFLFlBQWEsYUFBNkI7UUF6S2xDLFdBQU0sR0FBRyxJQUFJLENBQUE7UUFFYix1QkFBa0IsR0FBRztZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNqQixRQUFRLEVBQUUsSUFBSTthQUNmO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLElBQUksRUFBRSxtQkFBbUI7Z0JBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDakIsUUFBUSxFQUFFLElBQUk7YUFDZjtZQUNELFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUscUJBQXFCO2dCQUMzQixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDakIsUUFBUSxFQUFFLEtBQUs7YUFDaEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDbEIsSUFBSSxFQUFFLDhCQUE4QjtnQkFDcEMsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNoQjtZQUNELG1CQUFtQixFQUFFO2dCQUNuQixJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4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