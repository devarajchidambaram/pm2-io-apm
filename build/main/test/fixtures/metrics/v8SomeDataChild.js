"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../../../src/features/metrics");
const metric = new metrics_1.default();
metric.init({
    v8: {
        new_space: true,
        old_space: false,
        map_space: false,
        code_space: false,
        large_object_space: false,
        total_heap_size: false,
        total_heap_size_executable: false,
        used_heap_size: false,
        heap_size_limit: true,
        total_physical_size: true // test non default metric
    }
}, true);
process.on('SIGINT', function () {
    metric.destroy();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjhTb21lRGF0YUNoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGVzdC9maXh0dXJlcy9tZXRyaWNzL3Y4U29tZURhdGFDaGlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJEQUFrRDtBQUVsRCxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFNLEVBQUUsQ0FBQTtBQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ1YsRUFBRSxFQUFFO1FBQ0YsU0FBUyxFQUFFLElBQUk7UUFDZixTQUFTLEVBQUUsS0FBSztRQUNoQixTQUFTLEVBQUUsS0FBSztRQUNoQixVQUFVLEVBQUUsS0FBSztRQUNqQixrQkFBa0IsRUFBRSxLQUFLO1FBQ3pCLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLDBCQUEwQixFQUFFLEtBQUs7UUFDakMsY0FBYyxFQUFFLEtBQUs7UUFDckIsZUFBZSxFQUFFLElBQUk7UUFDckIsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLDBCQUEwQjtLQUNyRDtDQUNGLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFFUixPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7QUFDbEIsQ0FBQyxDQUFDLENBQUEifQ==