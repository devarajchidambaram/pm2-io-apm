"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:eventloopaction');
const module_1 = require("../utils/module");
class Inspector {
    constructor(actionFeature) {
        this.MODULE_NAME = 'event-loop-inspector';
        this.actionFeature = actionFeature;
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                module_1.default.detectModule(this.MODULE_NAME, (err, inspectorPath) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    const res = this.exposeActions(inspectorPath);
                    if (res instanceof Error) {
                        return reject(res);
                    }
                    return resolve();
                });
            });
        });
    }
    exposeActions(inspectorPath) {
        let inspector = module_1.default.loadModule(inspectorPath, this.MODULE_NAME, [true]);
        if (inspector instanceof Error || !inspector) {
            return inspector;
        }
        /**
         * Heap snapshot
         */
        return this.actionFeature.action('km:event-loop-dump', function (reply) {
            const dump = inspector.dump();
            return reply({
                success: true,
                dump: dump
            });
        });
    }
}
exports.default = Inspector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRMb29wSW5zcGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvZXZlbnRMb29wSW5zcGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUF5QjtBQUN6QixlQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUU1Qiw0Q0FBbUM7QUFJbkM7SUFLRSxZQUFhLGFBQTZCO1FBSGxDLGdCQUFXLEdBQUcsc0JBQXNCLENBQUE7UUFJMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7SUFDcEMsQ0FBQztJQUVLLElBQUk7O1lBQ1IsT0FBTyxJQUFJLE9BQU8sQ0FBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDdEMsZ0JBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsRUFBRTtvQkFFMUQsSUFBSSxHQUFHLEVBQUU7d0JBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDbEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7cUJBQ25CO29CQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7b0JBRTdDLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTt3QkFDeEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7cUJBQ25CO29CQUNELE9BQU8sT0FBTyxFQUFFLENBQUE7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFTyxhQUFhLENBQUUsYUFBYTtRQUNsQyxJQUFJLFNBQVMsR0FBRyxnQkFBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFFekUsSUFBSSxTQUFTLFlBQVksS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVDLE9BQU8sU0FBUyxDQUFBO1NBQ2pCO1FBRUQ7O1dBRUc7UUFDSCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLFVBQVUsS0FBSztZQUNwRSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7WUFFN0IsT0FBTyxLQUFLLENBQUM7Z0JBQ1gsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7YUFDWCxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQS9DRCw0QkErQ0MifQ==