"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pmx = require(__dirname + '/../../src/index.js');
pmx.init({ metrics: { v8: true } });
// should not fail but display a warning
pmx.metric();
pmx.metric({});
const allMetrics = pmx.metric([
    {
        name: 'metricHistogram',
        type: 'histogram',
        id: 'metric/custom'
    },
    {
        name: 'metric with spaces',
        type: 'histogram',
        id: 'metric/custom'
    },
    {
        name: 'metric wi!th special chars % ///',
        type: 'histogram',
        id: 'metric/custom'
    },
    {
        name: 'metricFailure',
        type: 'notExist'
    }
]);
allMetrics.metricHistogram.update(10);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpTWV0cmljc0NoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9maXh0dXJlcy9hcGlNZXRyaWNzQ2hpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLENBQUE7QUFFdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRyxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUMsRUFBQyxDQUFDLENBQUE7QUFFaEMsd0NBQXdDO0FBQ3hDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7QUFFZCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUMzQjtJQUNFO1FBQ0UsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixJQUFJLEVBQUUsV0FBVztRQUNqQixFQUFFLEVBQUUsZUFBZTtLQUNwQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixJQUFJLEVBQUUsV0FBVztRQUNqQixFQUFFLEVBQUUsZUFBZTtLQUNwQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGtDQUFrQztRQUN4QyxJQUFJLEVBQUUsV0FBVztRQUNqQixFQUFFLEVBQUUsZUFBZTtLQUNwQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLFVBQVU7S0FDakI7Q0FDRixDQUNGLENBQUE7QUFFRCxVQUFVLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQSJ9