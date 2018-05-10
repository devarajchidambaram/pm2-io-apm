"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../src/features/actions");
const actions = new actions_1.default();
actions.init({ profilingCpu: false, profilingHeap: false });
actions.action('myAction', {}, function (reply) { reply({ data: 'testActionReply' }); });
actions.action('myActionNoOpts', function (reply) { reply({ data: 'myActionNoOptsReply' }); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc0NoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGVzdC9maXh0dXJlcy9mZWF0dXJlcy9hY3Rpb25zQ2hpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBMEQ7QUFFMUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBYyxFQUFFLENBQUE7QUFFcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUE7QUFDekQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLFVBQVUsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNyRixPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQSJ9