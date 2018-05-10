"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../src/features/actions");
const actions = new actions_1.default();
actions.init({ profilingCpu: false, profilingHeap: false });
actions.scopedAction('myScopedAction', function (opts, res) { res.send('myScopedActionReply'); });
actions.scopedAction('myScopedErrorAction', function (opts, res) { res.error('myScopedActionReplyError'); });
actions.scopedAction('myScopedEndAction', function (opts, res) { res.end('myScopedActionReplyEnd'); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc1Njb3BlZEJhc2ljQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2ZlYXR1cmVzL2FjdGlvbnNTY29wZWRCYXNpY0NoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQTBEO0FBRTFELE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQWMsRUFBRSxDQUFBO0FBRXBDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO0FBRXpELE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2hHLE9BQU8sQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUUsVUFBVSxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzNHLE9BQU8sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBIn0=