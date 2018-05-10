"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../src/features/actions");
const profilingHeap_1 = require("../../../src/actions/profilingHeap");
const action = new actions_1.default();
const profiling = new profilingHeap_1.default(action);
profiling.init().then(() => {
    if (process && process.send) {
        process.send('initialized');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nSGVhcENoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGVzdC9maXh0dXJlcy9hY3Rpb25zL3Byb2ZpbGluZ0hlYXBDaGlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUFrRDtBQUNsRCxzRUFBOEQ7QUFFOUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBTSxFQUFFLENBQUE7QUFFM0IsTUFBTSxTQUFTLEdBQUcsSUFBSSx1QkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzNDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ3pCLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7UUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtLQUM1QjtBQUNILENBQUMsQ0FBQyxDQUFBIn0=