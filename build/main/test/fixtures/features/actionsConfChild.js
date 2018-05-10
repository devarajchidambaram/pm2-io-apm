"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../src/features/actions");
const actions = new actions_1.default();
actions.init({ profiling: { profilingCpu: true } }, true);
actions.action('myActionConf', {}, function (opts, reply) { reply({ data: 'myActionConfReply', opts: opts }); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc0NvbmZDaGlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rlc3QvZml4dHVyZXMvZmVhdHVyZXMvYWN0aW9uc0NvbmZDaGlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUEwRDtBQUUxRCxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFjLEVBQUUsQ0FBQTtBQUVwQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBQyxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDckQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLFVBQVUsSUFBSSxFQUFFLEtBQUssSUFBSSxLQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQSJ9